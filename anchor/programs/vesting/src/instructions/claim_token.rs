use anchor_lang::{prelude::*, solana_program::system_instruction::transfer};
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{self, Mint, TokenAccount, TokenInterface, TransferChecked},
};

use crate::{
    errors::CustomErrors,
    state::{EmployeeVestingAccount, VestingAccount},
};

pub fn claim_token(ctx: Context<ClaimToken>, _company_name: String) -> Result<()> {
    let employee_vesting_account = &mut ctx.accounts.employee_vesting_account;

    let current_time = Clock::get()?.unix_timestamp;
    if current_time < employee_vesting_account.cliff_time {
        return Err(CustomErrors::ClaimNotAvailableYet.into());
    }

    let time_since_start = current_time.saturating_sub(employee_vesting_account.start_time);
    let total_vesting_duration = employee_vesting_account
        .end_time
        .saturating_sub(employee_vesting_account.start_time);

    if total_vesting_duration == 0 {
        return Err(CustomErrors::InvalidVestingDuration.into());
    }

    let total_vested_amount = if current_time >= employee_vesting_account.end_time {
        employee_vesting_account.total_amount_vested
    } else {
        match employee_vesting_account
            .total_amount_vested
            .checked_mul(time_since_start as u64)
        {
            Some(product) => product / total_vesting_duration as u64,
            None => return Err(CustomErrors::CalculationErrorInVestedAmount.into()),
        }
    };

    let total_claimable_amount =
        total_vested_amount.saturating_sub(employee_vesting_account.total_amount_claimed);

    if total_claimable_amount == 0 {
        return Err(CustomErrors::InvalidTotalAmountClaimed.into());
    }

    if total_claimable_amount > employee_vesting_account.total_amount_vested {
        return Err(CustomErrors::ClaimableVestedTokenExceedsAlottedVestedToken.into());
    }

    let transfer_cpi_accounts = TransferChecked {
        from: ctx.accounts.treasury_token_account.to_account_info(),
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.employee_token_account.to_account_info(),
        authority: ctx.accounts.treasury_token_account.to_account_info(),
    };

    let transfer_cpi_token_program = ctx.accounts.token_program.to_account_info();

    let signer_seeds: &[&[&[u8]]] = &[&[
        b"vesting_treasury",
        ctx.accounts.vesting_account.company_name.as_ref(),
        &[ctx.accounts.vesting_account.treasury_bump],
    ]];

    let cpi_ctx = CpiContext::new(transfer_cpi_token_program, transfer_cpi_accounts)
        .with_signer(signer_seeds);

    token_interface::transfer_checked(cpi_ctx, total_claimable_amount, ctx.accounts.mint.decimals);

    employee_vesting_account.total_amount_claimed += total_claimable_amount;

    Ok(())
}

#[derive(Accounts)]
#[instruction(company_name: String)]
pub struct ClaimToken<'info> {
    #[account(mut)]
    pub beneficiary: Signer<'info>,

    #[account(
        mut,
        seeds = [
            b"employee_vesting_account",
            beneficiary.key().as_ref(),
            vesting_account.key().as_ref()
        ],
        bump = employee_vesting_account.bump,
        has_one = beneficiary,
        has_one = vesting_account,
    )]
    pub employee_vesting_account: Account<'info, EmployeeVestingAccount>,

    #[account(
        mut,
        seeds = [
            company_name.as_ref()
        ],
        bump =  vesting_account.bump,
        has_one = mint,
        has_one = treasury_token_account,
    )]
    pub vesting_account: Account<'info, VestingAccount>,

    pub mint: InterfaceAccount<'info, Mint>,

    #[account(mut)]
    pub treasury_token_account: InterfaceAccount<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = beneficiary,
        associated_token::mint = mint,
        associated_token::authority = beneficiary,
        associated_token::token_program = token_program
    )]
    pub employee_token_account: InterfaceAccount<'info, TokenAccount>,

    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

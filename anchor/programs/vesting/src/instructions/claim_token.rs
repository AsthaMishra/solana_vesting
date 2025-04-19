use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{Mint, TokenAccount, TokenInterface},
};

use crate::{
    errors::CustomErrors,
    state::{employee_vesting_account, EmployeeVestingAccount, VestingAccount},
};

pub fn claim_token(ctx: Context<ClaimToken>, company_name: String) -> Result<()> {
    let employee_vesting_account = &mut ctx.accounts.employee_vesting_account;

    let current_time = Clock::get()?.unix_timestamp;
    if current_time < employee_vesting_account.cliff_time {
        return Err(CustomErrors::ClaimNotAvailableYet.into());
    }

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
            company_name.as_bytes(),
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
        associated_token::token_program = token_program,
    )]
    pub employee_token_account: InterfaceAccount<'info, TokenAccount>,

    pub token_program: Interface<'info, TokenInterface>,
    pub associated_token_program: Interface<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

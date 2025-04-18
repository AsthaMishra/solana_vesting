use anchor_lang::prelude::*;

use crate::{
    constants::ANCHOR_DISCRIMINATOR,
    errors::CustomErrors,
    state::{EmployeeVestingAccount, VestingAccount},
};

pub fn create_employee_vesting_account(
    ctx: Context<CreateEmployeeVestingAccount>,
    start_time: i64,
    cliff_time: i64,
    end_time: i64,
    total_amount_vested: u64,
) -> Result<()> {
    if start_time <= 0 || start_time >= cliff_time {
        return Err(CustomErrors::InvalidStartTime.into());
    }
    if cliff_time <= 0 || cliff_time >= end_time {
        return Err(CustomErrors::InvalidCliffTime.into());
    }
    if total_amount_vested == 0 {
        return Err(CustomErrors::InvalidTotalAmountVested.into());
    }

    *ctx.accounts.employee_vesting_account = EmployeeVestingAccount {
        beneficiary: ctx.accounts.beneficiary.key(),
        start_time,
        cliff_time,
        end_time,
        total_amount_vested,
        total_amount_claimed: 0,
        vesting_account: ctx.accounts.vesting_account.key(),
        bump: ctx.bumps.employee_vesting_account,
    };

    Ok(())
}

#[derive(Accounts)]
pub struct CreateEmployeeVestingAccount<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    pub beneficiary: SystemAccount<'info>,

    #[account(
        has_one = owner,
    )]
    pub vesting_account: Account<'info, VestingAccount>,

    #[account(
        init,
        payer = owner,
        space = ANCHOR_DISCRIMINATOR + EmployeeVestingAccount::INIT_SPACE,
        seeds = [
            b"employee_vesting_account",
            beneficiary.key().as_ref(),
            vesting_account.key().as_ref()
        ],
        bump,
    )]
    pub employee_vesting_account: Account<'info, EmployeeVestingAccount>,

    pub system_program: Program<'info, System>,
}

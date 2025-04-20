#![allow(clippy::result_large_err)]
pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;
use crate::instructions::*;
use anchor_lang::prelude::*;

declare_id!("6kTVRnYeL3sPYiPEfVb5KmsTCq2iDMaJ3CqKVweQG5LT");

#[program]
pub mod vesting {

    use super::*;

    pub fn create_employer_vesting_account(
        ctx: Context<CreateVestingAccount>,
        company_name: String,
    ) -> Result<()> {
        instructions::create_vesting_account::create_vesting_account(ctx, company_name)
    }

    pub fn create_employee_vesting_account(
        ctx: Context<CreateEmployeeVestingAccount>,
        start_time: i64,
        cliff_time: i64,
        end_time: i64,
        total_amount_vested: u64,
    ) -> Result<()> {
        instructions::create_employee_vesting_account::create_employee_vesting_account(
            ctx,
            start_time,
            cliff_time,
            end_time,
            total_amount_vested,
        )
    }

    pub fn claim_token(ctx: Context<ClaimToken>, company_name: String) -> Result<()> {
        instructions::claim_token::claim_token(ctx, company_name)
    }
}

use anchor_lang::prelude::*;

// vesting account for the employer for all of the employees in a company
#[account]
#[derive(InitSpace)]
pub struct EmployeeVestingAccount {
    pub beneficiary: Pubkey,
    pub start_time: i64,           // start time of the vesting period
    pub cliff_time: i64,           // cliff time of the vesting period
    pub end_time: i64,             // end time of the vesting period
    pub total_amount_vested: u64,  // amount to be released at the cliff time
    pub total_amount_claimed: u64, // amount claimed so far
    pub vesting_account: Pubkey,   // vesting account
    pub bump: u8,                  // bump seed
}

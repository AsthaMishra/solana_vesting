use anchor_lang::prelude::*;

// vesting account for the employer for all of the employees in a company
#[account]
#[derive(InitSpace)]
pub struct VestingAccount {
    pub owner: Pubkey,                  //who can chaneg vesting account settings
    pub mint: Pubkey,                   //token mint
    pub treasury_token_account: Pubkey, // treasury token account
    #[max_len(64)]
    pub company_name: String, //company name
    pub treasury_bump: u8,              // treasury bump
    pub bump: u8,                       // vesting bump
}

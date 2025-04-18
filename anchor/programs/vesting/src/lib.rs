#![allow(clippy::result_large_err)]
pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;
use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod vesting {
    use super::*;
}

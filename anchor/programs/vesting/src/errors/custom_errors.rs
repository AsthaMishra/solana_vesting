use anchor_lang::prelude::*;

#[error_code]
pub enum CustomErrors {
    #[msg("The provided start time is not a valid")]
    InvalidStartTime,
    #[msg("The provided cliff time is not a valid")]
    InvalidCliffTime,
    #[msg("The provided end time is not a valid")]
    InvalidEndTime,
    #[msg("The provided total amount vested is not a valid")]
    InvalidTotalAmountVested,
    #[msg("The provided total amount claimed is not a valid")]
    InvalidTotalAmountClaimed,
}

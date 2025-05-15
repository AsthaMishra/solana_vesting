import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair, PublicKey } from '@solana/web3.js'
import { BanksClient, Clock, ProgramTestContext, startAnchor } from 'solana-bankrun';
import { Vesting } from '../target/types/vesting'

import IDL from '../target/idl/vesting.json';
import { SYSTEM_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/native/system';
import { BankrunProvider } from 'anchor-bankrun';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';

import { createMint, mintTo } from 'spl-token-bankrun';
import {  TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { BN } from '@coral-xyz/anchor';
const company_name = "company_name";

describe('vesting', () => {
  
let beneficiary: Keypair;
let context : ProgramTestContext;
let provider : BankrunProvider;
let program: Program<Vesting>;
let banksClient: BanksClient;
let employer: Keypair;
let mint: PublicKey;
let beneficiaryProvider : BankrunProvider;
let program2: Program<Vesting>;

let vestingAccount: PublicKey;
let treasuryAccount: PublicKey;
let employeeAccount: PublicKey;

  beforeAll(async () => {
    beneficiary = new anchor.web3.Keypair();

    context = await startAnchor(
      "",
      [{ name: "vesting", programId: new PublicKey(IDL.address) }],
      [
        {
          address: beneficiary.publicKey,
          info:{
            lamports : 1_000_000_000,
            data: Buffer.alloc(0),
            owner: SYSTEM_PROGRAM_ID,
            executable: false,
          }
        },
      ]
    );

    provider = new BankrunProvider(context);
    anchor.setProvider(provider);

    program = new Program<Vesting>(
      IDL as Vesting,
      provider);

      banksClient = context.banksClient;

      employer = provider.wallet.payer;

      mint = await createMint(
        banksClient,
        employer,
        employer.publicKey,
        null,
        9,
      );

      beneficiaryProvider = new BankrunProvider(
        context
      );

      beneficiaryProvider.wallet = new NodeWallet(
        beneficiary
      );

      program2 = new Program<Vesting>(
        IDL as Vesting,
        beneficiaryProvider);



        [vestingAccount] = PublicKey.findProgramAddressSync(
          [
            Buffer.from(company_name)
          ],
          program.programId 
        );

        [treasuryAccount] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("vesting_treasury"),
            Buffer.from(company_name)
          ],
          program.programId 
        );

        [employeeAccount] = PublicKey.findProgramAddressSync(
          [
            Buffer.from("employee_vesting_account"),
            beneficiary.publicKey.toBuffer(),
            vestingAccount.toBuffer(),
          ],
          program.programId 
        );

  });

  it('create Vesting', async () => {
    const tx = await program.methods.createEmployerVestingAccount(
      company_name).accounts({
        signer: employer.publicKey,
        mint,
        tokenProgram: TOKEN_PROGRAM_ID}).rpc({commitment: "confirmed"});


        const vestingAccountInfo = await program.account.vestingAccount.fetch(vestingAccount,'confirmed');

        console.log("Vesting Account Info: ", vestingAccountInfo);
        console.log("Vesting Account tx: ", tx);

        const amount = 10000 * 10 ** 9;

        //fund treasury account
        const fundTx = await mintTo(
          banksClient,
          employer,
          mint,
          treasuryAccount,
          employer,
          amount);

        console.log("Fund Treasury Account tx: ", fundTx);

  });

  it('create employee vesting account', async () => {
    const tx = await program.methods.createEmployeeVestingAccount(
      new BN(1),
      new BN(2),  
      new BN(2),
      new BN(100),
    ).accounts({
      beneficiary: beneficiary.publicKey,
      vestingAccount,}).rpc({commitment: "confirmed", skipPreflight: true});

      const employeeAccountInfo = await program.account.employeeVestingAccount.fetch(employeeAccount,'confirmed');

      console.log("Employee Vesting Account tx: ", tx);
      console.log("Employee Account Info: ", employeeAccountInfo);
  });


  it('claim vesting', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const currentClock = await banksClient.getClock();
    context.setClock(
      new Clock(
          currentClock.slot,
          currentClock.epochStartTimestamp,
          currentClock.epoch,
          currentClock.leaderScheduleEpoch,
          currentClock.unixTimestamp // add 2 days to the current unix timestam,
      )
    );
    const tx = await program2.methods.claimToken(company_name).accounts({
      tokenProgram: TOKEN_PROGRAM_ID,
    }).rpc({commitment: "confirmed"});

    console.log("Claim Vesting tx: ", tx);
  });
                                                  
})


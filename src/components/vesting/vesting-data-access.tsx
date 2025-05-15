'use client'

import { getVestingProgram, getVestingProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { BN } from 'bn.js'
import { CreateEmployeeArgs, CreateVestingArgs } from '../../types/index';
import { toUnixBN } from '@/utils/helper'

export function useVestingProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getVestingProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getVestingProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['vesting', 'all', { cluster }],
    queryFn: () => program.account.vestingAccount.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const createEmployerVestingAccount = useMutation<string , Error, CreateVestingArgs>({
    mutationKey: ['vesting', 'create', { cluster }],
    mutationFn: ({company_name, mint}) =>
      program.methods.createEmployerVestingAccount(company_name).accounts({ mint: new PublicKey(mint), 
        tokenProgram: TOKEN_PROGRAM_ID
       }).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to createEmployerVestingAccount account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createEmployerVestingAccount,
  }
}

export function useVestingProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useVestingProgram()

  const accountQuery = useQuery({
    queryKey: ['vesting', 'fetch', { cluster, account }],
    queryFn: () => program.account.vestingAccount.fetch(account),
  })

  const createEmployeeVestingAccount = useMutation<string, Error, CreateEmployeeArgs>({
    mutationKey: ['vesting', 'close', { cluster, account }],
    mutationFn: ({start_time, cliff_time, end_time, amount, beneficiary}) => 
      program.methods.createEmployeeVestingAccount(
        toUnixBN(start_time),  
        toUnixBN(cliff_time), 
        toUnixBN(end_time),  
        new BN(amount))
      .accounts({
          beneficiary: new PublicKey(beneficiary), 
          vestingAccount: account,
        }).rpc(),
      onSuccess: (tx) => {
          transactionToast(tx)
          return accounts.refetch()
      },
      onError: () => toast.error('Failed to createEmployeeVestingAccount account'),
  })

  return {
    accountQuery,
    createEmployeeVestingAccount
  }
}

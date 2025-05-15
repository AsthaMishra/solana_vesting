import { CreateEmployeeArgs, CreateVestingArgs } from "@/types";


// Mock data for demonstration purposes
export const mockCompanies: CreateVestingArgs[] = [
  {
    company_name: 'Solana Labs',
    mint: 'So11111111111111111111111111111111111111111',
  },
  {
    company_name: 'Serum Foundation',
    mint: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt',
  }
];

export const mockEmployeeVestings: CreateEmployeeArgs[] = [
//   {
//     start_time: new Date('2023-01-01'),
//     end_time: new Date('2024-01-01'),
//     cliff_time: new Date('2023-04-01'),
//     amount: 10000,
//   },
//   {
//     start_time: new Date('2023-02-15'),
//     end_time: new Date('2024-02-15'),
//     cliff_time: new Date('2023-05-15'),
//     amount: 5000,
//   }
];

// export const mockVestingStatus: VestingStatus = {
//   id: '1',
//   progress: 65,
//   claimableAmount: 6500,
//   totalAmount: 10000,
//   nextClaimDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//   lastClaimed: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
// };

export const getCurrentTimestamp = (): number => {
  return Math.floor(Date.now() / 1000);
};

export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};
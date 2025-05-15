// import React, { createContext, useContext, useState, ReactNode } from 'react';
// import { CreateEmployeeArgs, CreateVestingArgs } from "@/types";
// import { mockCompanies, mockEmployeeVestings } from '../utils/mockData';

// interface VestingContextType {
//   companies: CompanyVesting[];
//   employeeVestings: EmployeeVesting[];
//   vestingStatus: VestingStatus;
//   selectedTab: string;
//   setSelectedTab: (tab: string) => void;
//   addCompany: (company: Omit<CompanyVesting, 'id' | 'createdAt'>) => void;
//   addEmployeeVesting: (vesting: Omit<EmployeeVesting, 'id' | 'createdAt'>) => void;
//   claimVesting: () => Promise<boolean>;
// }

// const VestingContext = createContext<VestingContextType | undefined>(undefined);

// export const VestingProvider = ({ children }: { children: ReactNode }) => {
//   const [companies, setCompanies] = useState<CompanyVesting[]>(mockCompanies);
//   const [employeeVestings, setEmployeeVestings] = useState<EmployeeVesting[]>(mockEmployeeVestings);
//   const [vestingStatus, setVestingStatus] = useState<VestingStatus>(mockVestingStatus);
//   const [selectedTab, setSelectedTab] = useState('company');

//   // Add a new company vesting
//   const addCompany = (company: Omit<CompanyVesting, 'id' | 'createdAt'>) => {
//     const newCompany: CompanyVesting = {
//       ...company,
//       id: `${companies.length + 1}`,
//       createdAt: new Date(),
//     };
    
//     setCompanies([...companies, newCompany]);
//   };

//   // Add a new employee vesting
//   const addEmployeeVesting = (vesting: Omit<EmployeeVesting, 'id' | 'createdAt'>) => {
//     const newVesting: EmployeeVesting = {
//       ...vesting,
//       id: `${employeeVestings.length + 1}`,
//       createdAt: new Date(),
//     };
    
//     setEmployeeVestings([...employeeVestings, newVesting]);
//   };

//   // Simulate claiming tokens
//   const claimVesting = async (): Promise<boolean> => {
//     return new Promise((resolve) => {
//       // Simulate network delay
//       setTimeout(() => {
//         // Update vesting status
//         setVestingStatus({
//           ...vestingStatus,
//           claimableAmount: 0,
//           lastClaimed: new Date(),
//         });
//         resolve(true);
//       }, 1500);
//     });
//   };

//   const value = {
//     companies,
//     employeeVestings,
//     vestingStatus,
//     selectedTab,
//     setSelectedTab,
//     addCompany,
//     addEmployeeVesting,
//     claimVesting,
//   };

//   return <VestingContext.Provider value={value}>{children}</VestingContext.Provider>;
// };

// export const useVesting = (): VestingContextType => {
//   const context = useContext(VestingContext);
  
//   if (context === undefined) {
//     throw new Error('useVesting must be used within a VestingProvider');
//   }
  
//   return context;
// };
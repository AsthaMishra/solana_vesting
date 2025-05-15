// import React from 'react';
// import { useVesting } from '../../contexts/VestingContext';
// import { Building2, Users, Clock } from 'lucide-react';

// const NavTabs: React.FC = () => {
//   const { selectedTab, setSelectedTab } = useVesting();

//   const tabs = [
//     { id: 'company', label: 'Create Company Vesting', icon: <Building2 className="w-5 h-5" /> },
//     { id: 'employee', label: 'Create Employee Vesting', icon: <Users className="w-5 h-5" /> },
//     { id: 'status', label: 'User Vesting Status', icon: <Clock className="w-5 h-5" /> },
//   ];

//   return (
//     <div className="flex flex-col sm:flex-row justify-center mb-8 border-b border-gray-200">
//       {tabs.map((tab) => (
//         <button
//           key={tab.id}
//           onClick={() => setSelectedTab(tab.id)}
//           className={`flex items-center px-4 py-3 text-sm sm:text-base font-medium transition-colors duration-200
//                      ${selectedTab === tab.id 
//                        ? 'text-purple-600 border-b-2 border-purple-600 -mb-px' 
//                        : 'text-gray-600 hover:text-purple-500 hover:bg-purple-50'}`}
//         >
//           <span className="mr-2">{tab.icon}</span>
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default NavTabs;
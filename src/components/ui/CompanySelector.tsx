// import React from 'react';
// import { useVesting } from '../../contexts/VestingContext';

// interface CompanySelectorProps {
//   value: string;
//   onChange: (value: string) => void;
//   error?: string;
// }

// const CompanySelector: React.FC<CompanySelectorProps> = ({ value, onChange, error }) => {
//   const { companies } = useVesting();

//   return (
//     <div className="mb-4">
//       <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
//         Company
//       </label>
//       <select
//         id="company"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className={`w-full px-3 py-2 border ${
//           error ? 'border-red-300' : 'border-gray-300'
//         } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
//       >
//         <option value="">Select a company</option>
//         {companies.map((company) => (
//           <option key={company.id} value={company.id}>
//             {company.name}
//           </option>
//         ))}
//       </select>
//       {error && (
//         <p className="mt-1 text-xs text-red-600">{error}</p>
//       )}
//     </div>
//   );
// };

// export default CompanySelector;
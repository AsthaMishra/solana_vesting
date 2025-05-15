import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useVesting } from '../contexts/VestingContext';
import { Building2 } from 'lucide-react';

interface FormData {
  name: string;
  mintAddress: string;
}

interface FormErrors {
  name?: string;
  mintAddress?: string;
}

const CompanyVesting: React.FC = () => {
  const { addCompany } = useVesting();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mintAddress: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }
    
    if (!formData.mintAddress.trim()) {
      newErrors.mintAddress = 'Mint address is required';
    } else if (!/^[A-Za-z0-9]{32,44}$/.test(formData.mintAddress)) {
      newErrors.mintAddress = 'Please enter a valid Solana address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      addCompany({
        name: formData.name,
        mintAddress: formData.mintAddress,
      });
      
      setIsSuccess(true);
      setFormData({ name: '', mintAddress: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating company vesting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <div className="flex items-center justify-center mb-6">
          <div className="bg-purple-100 p-3 rounded-full">
            <Building2 className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">Create Company Vesting</h2>
        
        {isSuccess && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            Company vesting created successfully!
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <Input
            id="name"
            name="name"
            label="Company Name"
            placeholder="Enter company name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          
          <Input
            id="mintAddress"
            name="mintAddress"
            label="Mint Address"
            placeholder="Enter Solana token mint address"
            value={formData.mintAddress}
            onChange={handleChange}
            error={errors.mintAddress}
            helpText="The token that will be vested to employees"
            required
          />
          
          <div className="mt-6">
            <Button
              type="submit"
              fullWidth
              isLoading={isSubmitting}
            >
              Create Vesting Contract
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CompanyVesting;
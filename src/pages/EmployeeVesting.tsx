import React, { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import DateTimeInput from '../components/DateTimeInput';
import CompanySelector from '../components/CompanySelector';
import { useVesting } from '../contexts/VestingContext';
import { Users } from 'lucide-react';

interface FormData {
  companyId: string;
  startTime: string;
  endTime: string;
  cliffTime: string;
  totalAmount: string;
}

interface FormErrors {
  companyId?: string;
  startTime?: string;
  endTime?: string;
  cliffTime?: string;
  totalAmount?: string;
}

const EmployeeVesting: React.FC = () => {
  const { addEmployeeVesting } = useVesting();
  const [formData, setFormData] = useState<FormData>({
    companyId: '',
    startTime: '',
    endTime: '',
    cliffTime: '',
    totalAmount: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.companyId) {
      newErrors.companyId = 'Company selection is required';
    }
    
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }
    
    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    } else if (new Date(formData.endTime) <= new Date(formData.startTime)) {
      newErrors.endTime = 'End time must be after start time';
    }
    
    if (!formData.cliffTime) {
      newErrors.cliffTime = 'Cliff time is required';
    } else if (
      new Date(formData.cliffTime) < new Date(formData.startTime) ||
      new Date(formData.cliffTime) > new Date(formData.endTime)
    ) {
      newErrors.cliffTime = 'Cliff time must be between start and end times';
    }
    
    if (!formData.totalAmount) {
      newErrors.totalAmount = 'Total amount is required';
    } else if (isNaN(Number(formData.totalAmount)) || Number(formData.totalAmount) <= 0) {
      newErrors.totalAmount = 'Please enter a valid amount greater than 0';
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
      
      addEmployeeVesting({
        companyId: formData.companyId,
        startTime: new Date(formData.startTime),
        endTime: new Date(formData.endTime),
        cliffTime: new Date(formData.cliffTime),
        totalAmount: Number(formData.totalAmount),
      });
      
      setIsSuccess(true);
      setFormData({
        companyId: '',
        startTime: '',
        endTime: '',
        cliffTime: '',
        totalAmount: '',
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating employee vesting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <div className="flex items-center justify-center mb-6">
          <div className="bg-purple-100 p-3 rounded-full">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">Create Employee Vesting</h2>
        
        {isSuccess && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
            Employee vesting schedule created successfully!
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <CompanySelector
            value={formData.companyId}
            onChange={(value) => handleChange({ target: { name: 'companyId', value } } as React.ChangeEvent<HTMLSelectElement>)}
            error={errors.companyId}
          />
          
          <DateTimeInput
            id="startTime"
            name="startTime"
            label="Start Time"
            value={formData.startTime}
            onChange={handleChange}
            error={errors.startTime}
            helpText="When the vesting period begins"
            required
          />
          
          <DateTimeInput
            id="endTime"
            name="endTime"
            label="End Time"
            value={formData.endTime}
            onChange={handleChange}
            error={errors.endTime}
            helpText="When the vesting period completes"
            required
          />
          
          <DateTimeInput
            id="cliffTime"
            name="cliffTime"
            label="Cliff Time"
            value={formData.cliffTime}
            onChange={handleChange}
            error={errors.cliffTime}
            helpText="When the first tokens become available"
            required
          />
          
          <Input
            id="totalAmount"
            name="totalAmount"
            label="Total Vested Amount"
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={formData.totalAmount}
            onChange={handleChange}
            error={errors.totalAmount}
            helpText="Total tokens to be vested"
            required
          />
          
          <div className="mt-6">
            <Button
              type="submit"
              fullWidth
              isLoading={isSubmitting}
            >
              Create Vesting Schedule
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EmployeeVesting;
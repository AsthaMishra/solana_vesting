import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { useVesting } from '../contexts/VestingContext';
import { Clock, Check, Calendar, Timer } from 'lucide-react';
import { formatAmount, formatDate } from '../utils/mockData';

const VestingStatus: React.FC = () => {
  const { vestingStatus, claimVesting } = useVesting();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClaim = async () => {
    if (vestingStatus.claimableAmount <= 0) return;
    
    setIsProcessing(true);
    
    try {
      const success = await claimVesting();
      
      if (success) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error claiming tokens:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="md:col-span-2">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-8">Your Vesting Status</h2>
          
          {isSuccess && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center">
              <Check className="w-5 h-5 mr-2" />
              Tokens claimed successfully!
            </div>
          )}
          
          <div className="mb-8">
            <ProgressBar 
              progress={vestingStatus.progress}
              className="h-4"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center mb-2">
                <Timer className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-gray-600">Total Vesting</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {formatAmount(vestingStatus.totalAmount)} tokens
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="flex items-center mb-2">
                <Check className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-600">Claimable Now</span>
              </div>
              <p className="text-2xl font-bold text-purple-800">
                {formatAmount(vestingStatus.claimableAmount)} tokens
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
            <div className="flex items-center mb-2 md:mb-0">
              <Calendar className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm text-gray-600">
                Next unlock: {vestingStatus.nextClaimDate ? formatDate(vestingStatus.nextClaimDate) : 'N/A'}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {vestingStatus.lastClaimed ? `Last claimed: ${formatDate(vestingStatus.lastClaimed)}` : 'No claims yet'}
            </div>
          </div>
          
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            disabled={vestingStatus.claimableAmount <= 0}
            isLoading={isProcessing}
            onClick={handleClaim}
            className="mt-2"
          >
            {vestingStatus.claimableAmount > 0 ? 'Claim Available Tokens' : 'No Tokens to Claim'}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default VestingStatus;
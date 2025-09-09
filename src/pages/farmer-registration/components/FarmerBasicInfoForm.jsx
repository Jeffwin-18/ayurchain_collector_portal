import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FarmerBasicInfoForm = ({ 
  formData, 
  onFormChange, 
  errors = {},
  isOffline = false 
}) => {
  const governmentIdOptions = [
    { value: 'aadhar', label: 'Aadhar Card' },
    { value: 'voter', label: 'Voter ID' },
    { value: 'pan', label: 'PAN Card' },
    { value: 'driving', label: 'Driving License' },
    { value: 'passport', label: 'Passport' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange(field, value);
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value?.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limited = digits?.slice(0, 10);
    
    // Format as Indian phone number
    if (limited?.length >= 6) {
      return `${limited?.slice(0, 5)} ${limited?.slice(5)}`;
    } else if (limited?.length >= 3) {
      return `${limited?.slice(0, 5)}`;
    }
    return limited;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e?.target?.value);
    handleInputChange('contactNumber', formatted);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <span className="text-primary font-semibold text-sm">1</span>
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Basic Information
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Farmer Name */}
        <div className="md:col-span-2">
          <Input
            label="Farmer Name"
            type="text"
            placeholder="Enter farmer's full name"
            value={formData?.farmerName || ''}
            onChange={(e) => handleInputChange('farmerName', e?.target?.value)}
            error={errors?.farmerName}
            required
            disabled={isOffline}
          />
        </div>

        {/* Contact Number */}
        <div>
          <Input
            label="Contact Number"
            type="tel"
            placeholder="98765 43210"
            value={formData?.contactNumber || ''}
            onChange={handlePhoneChange}
            error={errors?.contactNumber}
            description="10-digit mobile number"
            required
            disabled={isOffline}
          />
        </div>

        {/* Government ID Type */}
        <div>
          <Select
            label="Government ID Type"
            placeholder="Select ID type"
            options={governmentIdOptions}
            value={formData?.governmentIdType || ''}
            onChange={(value) => handleInputChange('governmentIdType', value)}
            error={errors?.governmentIdType}
            required
            disabled={isOffline}
          />
        </div>

        {/* Government ID Number */}
        <div className="md:col-span-2">
          <Input
            label="Government ID Number"
            type="text"
            placeholder="Enter ID number"
            value={formData?.governmentIdNumber || ''}
            onChange={(e) => handleInputChange('governmentIdNumber', e?.target?.value?.toUpperCase())}
            error={errors?.governmentIdNumber}
            description="Enter the complete ID number as shown on document"
            required
            disabled={isOffline}
          />
        </div>
      </div>
      {/* Offline Notice */}
      {isOffline && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2 text-warning">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span className="text-sm font-medium">
              Working offline - data will be saved locally
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerBasicInfoForm;
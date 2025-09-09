import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FarmDetailsForm = ({ 
  formData, 
  onFormChange, 
  errors = {},
  isOffline = false 
}) => {
  const farmSizeUnitOptions = [
    { value: 'acres', label: 'Acres' },
    { value: 'hectares', label: 'Hectares' },
    { value: 'bigha', label: 'Bigha' },
    { value: 'katha', label: 'Katha' }
  ];

  const primaryCropOptions = [
    { value: 'ashwagandha', label: 'Ashwagandha' },
    { value: 'tulsi', label: 'Tulsi (Holy Basil)' },
    { value: 'brahmi', label: 'Brahmi' },
    { value: 'neem', label: 'Neem' },
    { value: 'turmeric', label: 'Turmeric' },
    { value: 'ginger', label: 'Ginger' },
    { value: 'aloe-vera', label: 'Aloe Vera' },
    { value: 'amla', label: 'Amla' },
    { value: 'giloy', label: 'Giloy' },
    { value: 'shatavari', label: 'Shatavari' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange(field, value);
  };

  const handleCheckboxChange = (field, checked) => {
    onFormChange(field, checked);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <span className="text-primary font-semibold text-sm">3</span>
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Farm Details
        </h3>
      </div>
      <div className="space-y-6">
        {/* Farm Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Farm Size"
              type="number"
              placeholder="0.0"
              value={formData?.farmSize || ''}
              onChange={(e) => handleInputChange('farmSize', e?.target?.value)}
              error={errors?.farmSize}
              step="0.1"
              min="0"
              required
              disabled={isOffline}
            />
          </div>
          <div>
            <Select
              label="Unit"
              placeholder="Select unit"
              options={farmSizeUnitOptions}
              value={formData?.farmSizeUnit || ''}
              onChange={(value) => handleInputChange('farmSizeUnit', value)}
              error={errors?.farmSizeUnit}
              required
              disabled={isOffline}
            />
          </div>
        </div>

        {/* Primary Crops */}
        <div>
          <Select
            label="Primary Crops Grown"
            placeholder="Select primary crops"
            options={primaryCropOptions}
            value={formData?.primaryCrops || []}
            onChange={(value) => handleInputChange('primaryCrops', value)}
            error={errors?.primaryCrops}
            multiple
            searchable
            description="Select all crops currently grown on the farm"
            disabled={isOffline}
          />
        </div>

        {/* Other Crops (if selected) */}
        {formData?.primaryCrops && formData?.primaryCrops?.includes('other') && (
          <div>
            <Input
              label="Other Crops Details"
              type="text"
              placeholder="Specify other crops grown"
              value={formData?.otherCrops || ''}
              onChange={(e) => handleInputChange('otherCrops', e?.target?.value)}
              error={errors?.otherCrops}
              description="Please specify the other crops you grow"
              required
              disabled={isOffline}
            />
          </div>
        )}

        {/* Farming Experience */}
        <div>
          <Input
            label="Years of Farming Experience"
            type="number"
            placeholder="0"
            value={formData?.farmingExperience || ''}
            onChange={(e) => handleInputChange('farmingExperience', e?.target?.value)}
            error={errors?.farmingExperience}
            min="0"
            max="100"
            description="Total years of farming experience"
            disabled={isOffline}
          />
        </div>

        {/* Certification Status */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Certification Status</h4>
          
          <div className="space-y-3">
            <Checkbox
              label="Organic Certified"
              description="Farm has organic certification from recognized authority"
              checked={formData?.isOrganicCertified || false}
              onChange={(e) => handleCheckboxChange('isOrganicCertified', e?.target?.checked)}
              disabled={isOffline}
            />

            <Checkbox
              label="Pesticide-Free Farming"
              description="Uses no chemical pesticides or fertilizers"
              checked={formData?.isPesticideFree || false}
              onChange={(e) => handleCheckboxChange('isPesticideFree', e?.target?.checked)}
              disabled={isOffline}
            />

            <Checkbox
              label="Traditional/Indigenous Methods"
              description="Uses traditional farming methods and indigenous seeds"
              checked={formData?.usesTraditionalMethods || false}
              onChange={(e) => handleCheckboxChange('usesTraditionalMethods', e?.target?.checked)}
              disabled={isOffline}
            />
          </div>
        </div>

        {/* Organic Certificate Details */}
        {formData?.isOrganicCertified && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-success/5 border border-success/20 rounded-lg">
            <div>
              <Input
                label="Organic Certificate Number"
                type="text"
                placeholder="Enter certificate number"
                value={formData?.organicCertificateNumber || ''}
                onChange={(e) => handleInputChange('organicCertificateNumber', e?.target?.value)}
                error={errors?.organicCertificateNumber}
                required
                disabled={isOffline}
              />
            </div>
            <div>
              <Input
                label="Certifying Authority"
                type="text"
                placeholder="Enter certifying body name"
                value={formData?.certifyingAuthority || ''}
                onChange={(e) => handleInputChange('certifyingAuthority', e?.target?.value)}
                error={errors?.certifyingAuthority}
                required
                disabled={isOffline}
              />
            </div>
            <div>
              <Input
                label="Certificate Valid Until"
                type="date"
                value={formData?.certificateValidUntil || ''}
                onChange={(e) => handleInputChange('certificateValidUntil', e?.target?.value)}
                error={errors?.certificateValidUntil}
                required
                disabled={isOffline}
              />
            </div>
          </div>
        )}

        {/* Additional Notes */}
        <div>
          <Input
            label="Additional Notes"
            type="text"
            placeholder="Any additional information about the farm"
            value={formData?.additionalNotes || ''}
            onChange={(e) => handleInputChange('additionalNotes', e?.target?.value)}
            error={errors?.additionalNotes}
            description="Optional: Special farming practices, soil type, water source, etc."
            disabled={isOffline}
          />
        </div>

        {/* Offline Notice */}
        {isOffline && (
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2 text-warning">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-sm font-medium">
                Working offline - data will be saved locally
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmDetailsForm;
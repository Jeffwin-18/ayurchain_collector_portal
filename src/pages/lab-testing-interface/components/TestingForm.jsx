import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const TestingForm = ({ 
  batch,
  onSubmit,
  onSaveDraft,
  className = "" 
}) => {
  const [formData, setFormData] = useState({
    certificateNumber: '',
    labNumber: '',
    testingDate: '',
    expiryDate: '',
    qualityGrade: '',
    testResults: {
      moisture: '',
      purity: '',
      contamination: '',
      activeCompounds: '',
      heavyMetals: '',
      pesticides: '',
      microbial: ''
    },
    testsPassed: [],
    additionalNotes: '',
    technicianId: 'LAB001',
    technicianName: 'Dr. Priya Sharma'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const qualityGradeOptions = [
    { value: 'A+', label: 'Grade A+ (Premium Quality)', description: 'Highest quality, meets all standards' },
    { value: 'A', label: 'Grade A (High Quality)', description: 'High quality, minor variations acceptable' },
    { value: 'B+', label: 'Grade B+ (Good Quality)', description: 'Good quality, some variations present' },
    { value: 'B', label: 'Grade B (Standard Quality)', description: 'Standard quality, meets basic requirements' },
    { value: 'C', label: 'Grade C (Below Standard)', description: 'Below standard, requires additional processing' },
    { value: 'REJECT', label: 'Reject', description: 'Does not meet quality standards' }
  ];

  const standardTests = [
    { id: 'moisture', label: 'Moisture Content Test', description: 'Optimal moisture levels verified' },
    { id: 'purity', label: 'Purity Analysis', description: 'No foreign matter detected' },
    { id: 'contamination', label: 'Contamination Check', description: 'Free from harmful contaminants' },
    { id: 'activeCompounds', label: 'Active Compounds', description: 'Required compounds present in adequate levels' },
    { id: 'heavyMetals', label: 'Heavy Metals Test', description: 'Within acceptable limits' },
    { id: 'pesticides', label: 'Pesticide Residue', description: 'No harmful pesticide residues detected' },
    { id: 'microbial', label: 'Microbial Analysis', description: 'Microbial count within safe limits' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTestResultChange = (test, value) => {
    setFormData(prev => ({
      ...prev,
      testResults: {
        ...prev?.testResults,
        [test]: value
      }
    }));
  };

  const handleTestPassedChange = (testId, checked) => {
    setFormData(prev => ({
      ...prev,
      testsPassed: checked 
        ? [...prev?.testsPassed, testId]
        : prev?.testsPassed?.filter(id => id !== testId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.certificateNumber?.trim()) {
      newErrors.certificateNumber = 'Certificate number is required';
    }

    if (!formData?.labNumber?.trim()) {
      newErrors.labNumber = 'Lab number is required';
    }

    if (!formData?.testingDate) {
      newErrors.testingDate = 'Testing date is required';
    }

    if (!formData?.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }

    if (!formData?.qualityGrade) {
      newErrors.qualityGrade = 'Quality grade is required';
    }

    // Validate that testing date is not in the future
    if (formData?.testingDate && new Date(formData.testingDate) > new Date()) {
      newErrors.testingDate = 'Testing date cannot be in the future';
    }

    // Validate that expiry date is after testing date
    if (formData?.testingDate && formData?.expiryDate && 
        new Date(formData.expiryDate) <= new Date(formData.testingDate)) {
      newErrors.expiryDate = 'Expiry date must be after testing date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit({
        ...formData,
        batchId: batch?.id,
        submittedAt: new Date()?.toISOString()
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    onSaveDraft({
      ...formData,
      batchId: batch?.id,
      savedAt: new Date()?.toISOString()
    });
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date?.toISOString()?.split('T')?.[0];
  };

  const getTodayDate = () => {
    return new Date()?.toISOString()?.split('T')?.[0];
  };

  const getMinExpiryDate = () => {
    if (!formData?.testingDate) return getTodayDate();
    const testDate = new Date(formData.testingDate);
    testDate?.setDate(testDate?.getDate() + 1);
    return testDate?.toISOString()?.split('T')?.[0];
  };

  if (!batch) {
    return (
      <div className={`bg-card border border-border rounded-lg shadow-elevation-1 p-6 ${className}`}>
        <div className="text-center">
          <Icon name="FlaskConical" size={48} className="mx-auto text-text-secondary mb-3" />
          <p className="text-text-secondary">Select a batch to start testing</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              Lab Testing Form
            </h3>
            <p className="text-sm text-text-secondary">
              Complete quality assessment for batch {batch?.batchNumber}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="FlaskConical" size={16} />
            <span>Testing in progress</span>
          </div>
        </div>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Certificate Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Certificate Number"
            type="text"
            placeholder="CERT-2024-001"
            value={formData?.certificateNumber}
            onChange={(e) => handleInputChange('certificateNumber', e?.target?.value)}
            error={errors?.certificateNumber}
            required
          />

          <Input
            label="Lab Number"
            type="text"
            placeholder="LAB-AYR-001"
            value={formData?.labNumber}
            onChange={(e) => handleInputChange('labNumber', e?.target?.value)}
            error={errors?.labNumber}
            required
          />
        </div>

        {/* Testing Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Testing Date"
            type="date"
            value={formData?.testingDate}
            onChange={(e) => handleInputChange('testingDate', e?.target?.value)}
            error={errors?.testingDate}
            max={getTodayDate()}
            required
          />

          <Input
            label="Certificate Expiry Date"
            type="date"
            value={formData?.expiryDate}
            onChange={(e) => handleInputChange('expiryDate', e?.target?.value)}
            error={errors?.expiryDate}
            min={getMinExpiryDate()}
            required
          />
        </div>

        {/* Quality Grade */}
        <Select
          label="Quality Grade"
          options={qualityGradeOptions}
          value={formData?.qualityGrade}
          onChange={(value) => handleInputChange('qualityGrade', value)}
          error={errors?.qualityGrade}
          placeholder="Select quality grade"
          required
        />

        {/* Test Results */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icon name="BarChart3" size={16} className="mr-2" />
            Detailed Test Results
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Moisture Content (%)"
              type="number"
              placeholder="8.5"
              value={formData?.testResults?.moisture}
              onChange={(e) => handleTestResultChange('moisture', e?.target?.value)}
              min="0"
              max="100"
              step="0.1"
            />

            <Input
              label="Purity (%)"
              type="number"
              placeholder="95.2"
              value={formData?.testResults?.purity}
              onChange={(e) => handleTestResultChange('purity', e?.target?.value)}
              min="0"
              max="100"
              step="0.1"
            />

            <Input
              label="Contamination Level (ppm)"
              type="number"
              placeholder="0.5"
              value={formData?.testResults?.contamination}
              onChange={(e) => handleTestResultChange('contamination', e?.target?.value)}
              min="0"
              step="0.01"
            />

            <Input
              label="Active Compounds (%)"
              type="number"
              placeholder="12.8"
              value={formData?.testResults?.activeCompounds}
              onChange={(e) => handleTestResultChange('activeCompounds', e?.target?.value)}
              min="0"
              max="100"
              step="0.1"
            />

            <Input
              label="Heavy Metals (ppm)"
              type="number"
              placeholder="0.1"
              value={formData?.testResults?.heavyMetals}
              onChange={(e) => handleTestResultChange('heavyMetals', e?.target?.value)}
              min="0"
              step="0.01"
            />

            <Input
              label="Pesticide Residue (ppm)"
              type="number"
              placeholder="0.05"
              value={formData?.testResults?.pesticides}
              onChange={(e) => handleTestResultChange('pesticides', e?.target?.value)}
              min="0"
              step="0.01"
            />
          </div>

          <div className="mt-4">
            <Input
              label="Microbial Count (CFU/g)"
              type="number"
              placeholder="1000"
              value={formData?.testResults?.microbial}
              onChange={(e) => handleTestResultChange('microbial', e?.target?.value)}
              min="0"
              step="1"
            />
          </div>
        </div>

        {/* Standard Tests Passed */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2" />
            Standard Tests Passed
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {standardTests?.map((test) => (
              <Checkbox
                key={test?.id}
                label={test?.label}
                description={test?.description}
                checked={formData?.testsPassed?.includes(test?.id)}
                onChange={(e) => handleTestPassedChange(test?.id, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Additional Notes
          </label>
          <textarea
            value={formData?.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e?.target?.value)}
            placeholder="Enter any additional observations or comments..."
            rows={4}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-vertical"
          />
        </div>

        {/* Technician Information */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="User" size={16} className="mr-2" />
            Technician Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-text-secondary">Name:</span>
              <span className="ml-2 font-medium text-foreground">{formData?.technicianName}</span>
            </div>
            <div>
              <span className="text-text-secondary">ID:</span>
              <span className="ml-2 font-medium text-foreground">{formData?.technicianId}</span>
            </div>
            <div>
              <span className="text-text-secondary">Date:</span>
              <span className="ml-2 font-medium text-foreground">
                {new Date()?.toLocaleDateString('en-GB')}
              </span>
            </div>
            <div>
              <span className="text-text-secondary">Time:</span>
              <span className="ml-2 font-medium text-foreground">
                {new Date()?.toLocaleTimeString('en-GB', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            iconName="Save"
            iconPosition="left"
            className="flex-1 sm:flex-none"
          >
            Save Draft
          </Button>
          
          <div className="flex-1"></div>
          
          <Button
            type="submit"
            variant="default"
            loading={isSubmitting}
            iconName="CheckCircle"
            iconPosition="left"
            className="flex-1 sm:flex-none"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Complete Testing'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TestingForm;
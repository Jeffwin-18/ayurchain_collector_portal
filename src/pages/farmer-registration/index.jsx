import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import FarmerBasicInfoForm from './components/FarmerBasicInfoForm';
import FarmLocationForm from './components/FarmLocationForm';
import FarmDetailsForm from './components/FarmDetailsForm';
import DocumentUploadForm from './components/DocumentUploadForm';
import RegistrationSummary from './components/RegistrationSummary';

const FarmerRegistration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    farmerName: '',
    contactNumber: '',
    governmentIdType: '',
    governmentIdNumber: '',
    
    // Location Information
    farmAddress: '',
    latitude: '',
    longitude: '',
    village: '',
    district: '',
    state: '',
    pinCode: '',
    
    // Farm Details
    farmSize: '',
    farmSizeUnit: '',
    primaryCrops: [],
    otherCrops: '',
    farmingExperience: '',
    isOrganicCertified: false,
    isPesticideFree: false,
    usesTraditionalMethods: false,
    organicCertificateNumber: '',
    certifyingAuthority: '',
    certificateValidUntil: '',
    additionalNotes: '',
    
    // Documents
    farmerPhoto: null,
    governmentIdDocument: null,
    organicCertificateDocument: null,
    farmPhoto: null
  });
  const [errors, setErrors] = useState({});
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const steps = [
    { id: 1, title: 'Basic Info', icon: 'User' },
    { id: 2, title: 'Location', icon: 'MapPin' },
    { id: 3, title: 'Farm Details', icon: 'Leaf' },
    { id: 4, title: 'Documents', icon: 'FileImage' },
    { id: 5, title: 'Summary', icon: 'FileText' }
  ];

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('farmer-registration-draft');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('farmer-registration-draft', JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.farmerName?.trim()) {
          newErrors.farmerName = 'Farmer name is required';
        }
        if (!formData?.contactNumber?.trim()) {
          newErrors.contactNumber = 'Contact number is required';
        } else if (!/^\d{5}\s\d{5}$/?.test(formData?.contactNumber)) {
          newErrors.contactNumber = 'Please enter a valid 10-digit mobile number';
        }
        if (!formData?.governmentIdType) {
          newErrors.governmentIdType = 'Please select a government ID type';
        }
        if (!formData?.governmentIdNumber?.trim()) {
          newErrors.governmentIdNumber = 'Government ID number is required';
        }
        break;

      case 2:
        if (!formData?.farmAddress?.trim()) {
          newErrors.farmAddress = 'Farm address is required';
        }
        if (!formData?.state?.trim()) {
          newErrors.state = 'State is required';
        }
        break;

      case 3:
        if (!formData?.farmSize) {
          newErrors.farmSize = 'Farm size is required';
        }
        if (!formData?.farmSizeUnit) {
          newErrors.farmSizeUnit = 'Please select a unit';
        }
        if (formData?.isOrganicCertified) {
          if (!formData?.organicCertificateNumber?.trim()) {
            newErrors.organicCertificateNumber = 'Certificate number is required';
          }
          if (!formData?.certifyingAuthority?.trim()) {
            newErrors.certifyingAuthority = 'Certifying authority is required';
          }
          if (!formData?.certificateValidUntil) {
            newErrors.certificateValidUntil = 'Certificate validity date is required';
          }
        }
        break;

      case 4:
        if (!formData?.farmerPhoto) {
          newErrors.farmerPhoto = 'Farmer photo is required';
        }
        if (!formData?.governmentIdDocument) {
          newErrors.governmentIdDocument = 'Government ID document is required';
        }
        if (formData?.isOrganicCertified && !formData?.organicCertificateDocument) {
          newErrors.organicCertificateDocument = 'Organic certificate document is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps?.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('farmer-registration-draft', JSON.stringify(formData));
      
      // Simulate API call for online save
      if (!isOffline) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      alert('Draft saved successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error saving draft. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSaving(true);
    
    try {
      // Generate farmer ID
      const farmerId = `FRM${Date.now()}`;
      const registrationData = {
        ...formData,
        farmerId,
        registeredAt: new Date()?.toISOString(),
        registeredBy: 'collector-001', // Mock collector ID
        status: 'active',
        isOfflineRegistration: isOffline
      };

      // Save to localStorage
      const existingFarmers = JSON.parse(localStorage.getItem('registered-farmers') || '[]');
      existingFarmers?.push(registrationData);
      localStorage.setItem('registered-farmers', JSON.stringify(existingFarmers));

      // Clear draft
      localStorage.removeItem('farmer-registration-draft');

      // Simulate API call for online submission
      if (!isOffline) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      alert(`Farmer registered successfully! Farmer ID: ${farmerId}`);
      
      // Navigate to collection recording or dashboard
      const shouldContinueToCollection = window.confirm(
        'Farmer registered successfully! Would you like to record a collection for this farmer now?'
      );
      
      if (shouldContinueToCollection) {
        navigate('/herb-collection-recording', { 
          state: { 
            farmerId, 
            farmerName: formData?.farmerName 
          } 
        });
      } else {
        navigate('/collector-dashboard');
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Error submitting registration. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExit = () => {
    if (Object.values(formData)?.some(value => 
      value && (typeof value === 'string' ? value?.trim() : true)
    )) {
      setShowExitConfirm(true);
    } else {
      navigate('/collector-dashboard');
    }
  };

  const confirmExit = (saveDraft = false) => {
    if (saveDraft) {
      handleSaveDraft();
    }
    setShowExitConfirm(false);
    navigate('/collector-dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FarmerBasicInfoForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
            isOffline={isOffline}
          />
        );
      case 2:
        return (
          <FarmLocationForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
            isOffline={isOffline}
          />
        );
      case 3:
        return (
          <FarmDetailsForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
            isOffline={isOffline}
          />
        );
      case 4:
        return (
          <DocumentUploadForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
            isOffline={isOffline}
          />
        );
      case 5:
        return (
          <RegistrationSummary
            formData={formData}
            isOffline={isOffline}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="collector" 
        userName="Rajesh Kumar" 
        isOnline={!isOffline}
        syncStatus={isOffline ? 'pending' : 'synced'}
      />
      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  Farmer Registration
                </h1>
                <p className="text-text-secondary mt-1">
                  Register a new farmer to start collecting herbs
                </p>
              </div>
              <Button
                variant="ghost"
                iconName="X"
                onClick={handleExit}
                className="text-text-secondary hover:text-foreground"
              >
                Exit
              </Button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between bg-card rounded-lg border border-border p-4 shadow-elevation-1">
              {steps?.map((step, index) => (
                <React.Fragment key={step?.id}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-smooth ${
                      currentStep >= step?.id
                        ? 'bg-primary border-primary text-white' :'bg-background border-border text-text-secondary'
                    }`}>
                      {currentStep > step?.id ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        <Icon name={step?.icon} size={16} />
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <p className={`text-sm font-medium transition-smooth ${
                        currentStep >= step?.id ? 'text-foreground' : 'text-text-secondary'
                      }`}>
                        {step?.title}
                      </p>
                    </div>
                  </div>
                  {index < steps?.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 transition-smooth ${
                      currentStep > step?.id ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  iconName="ChevronLeft"
                  iconPosition="left"
                  onClick={handlePrevious}
                  disabled={isSaving}
                >
                  Previous
                </Button>
              )}
              
              <Button
                variant="ghost"
                iconName="Save"
                iconPosition="left"
                onClick={handleSaveDraft}
                disabled={isSaving}
                loading={isSaving}
              >
                Save Draft
              </Button>
            </div>

            <div className="flex gap-3">
              {currentStep < steps?.length ? (
                <Button
                  variant="default"
                  iconName="ChevronRight"
                  iconPosition="right"
                  onClick={handleNext}
                  disabled={isSaving}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="default"
                  iconName="UserPlus"
                  iconPosition="left"
                  onClick={handleSubmit}
                  disabled={isSaving}
                  loading={isSaving}
                >
                  Register Farmer
                </Button>
              )}
            </div>
          </div>

          {/* Offline Status */}
          {isOffline && (
            <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center space-x-2 text-warning">
                <Icon name="WifiOff" size={16} />
                <span className="text-sm font-medium">
                  Working offline - registration will be saved locally and synced when connection is restored
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full shadow-elevation-3">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Unsaved Changes
              </h3>
            </div>
            <p className="text-text-secondary mb-6">
              You have unsaved changes. What would you like to do?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => setShowExitConfirm(false)}
                className="flex-1"
              >
                Continue Editing
              </Button>
              <Button
                variant="secondary"
                iconName="Save"
                iconPosition="left"
                onClick={() => confirmExit(true)}
                className="flex-1"
              >
                Save & Exit
              </Button>
              <Button
                variant="destructive"
                onClick={() => confirmExit(false)}
                className="flex-1"
              >
                Exit Without Saving
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerRegistration;
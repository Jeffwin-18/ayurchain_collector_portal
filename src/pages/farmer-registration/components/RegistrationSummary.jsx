import React from 'react';
import Icon from '../../../components/AppIcon';


const RegistrationSummary = ({ 
  formData, 
  isOffline = false 
}) => {
  const formatPhoneNumber = (phone) => {
    if (!phone) return 'Not provided';
    return phone?.replace(/(\d{5})(\d{5})/, '$1 $2');
  };

  const formatFarmSize = () => {
    if (!formData?.farmSize || !formData?.farmSizeUnit) return 'Not specified';
    return `${formData?.farmSize} ${formData?.farmSizeUnit}`;
  };

  const formatCrops = () => {
    if (!formData?.primaryCrops || formData?.primaryCrops?.length === 0) {
      return 'Not specified';
    }
    
    const cropLabels = {
      'ashwagandha': 'Ashwagandha',
      'tulsi': 'Tulsi (Holy Basil)',
      'brahmi': 'Brahmi',
      'neem': 'Neem',
      'turmeric': 'Turmeric',
      'ginger': 'Ginger',
      'aloe-vera': 'Aloe Vera',
      'amla': 'Amla',
      'giloy': 'Giloy',
      'shatavari': 'Shatavari',
      'other': 'Other'
    };

    let crops = formData?.primaryCrops?.map(crop => cropLabels?.[crop] || crop);
    
    if (formData?.primaryCrops?.includes('other') && formData?.otherCrops) {
      crops = crops?.filter(crop => crop !== 'Other');
      crops?.push(formData?.otherCrops);
    }
    
    return crops?.join(', ');
  };

  const formatLocation = () => {
    const parts = [];
    if (formData?.village) parts?.push(formData?.village);
    if (formData?.district) parts?.push(formData?.district);
    if (formData?.state) parts?.push(formData?.state);
    if (formData?.pinCode) parts?.push(formData?.pinCode);
    
    return parts?.length > 0 ? parts?.join(', ') : formData?.farmAddress || 'Not provided';
  };

  const getCertificationStatus = () => {
    const certifications = [];
    if (formData?.isOrganicCertified) certifications?.push('Organic Certified');
    if (formData?.isPesticideFree) certifications?.push('Pesticide-Free');
    if (formData?.usesTraditionalMethods) certifications?.push('Traditional Methods');
    
    return certifications?.length > 0 ? certifications?.join(', ') : 'No certifications';
  };

  const getUploadedDocuments = () => {
    const documents = [];
    if (formData?.farmerPhoto) documents?.push('Farmer Photo');
    if (formData?.governmentIdDocument) documents?.push('Government ID');
    if (formData?.organicCertificateDocument) documents?.push('Organic Certificate');
    if (formData?.farmPhoto) documents?.push('Farm Photo');
    
    return documents;
  };

  const SummarySection = ({ title, children, icon }) => (
    <div className="bg-muted rounded-lg p-4 border border-border">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name={icon} size={16} className="text-primary" />
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );

  const SummaryItem = ({ label, value, highlight = false }) => (
    <div className="flex justify-between items-start">
      <span className="text-xs text-text-secondary">{label}:</span>
      <span className={`text-xs text-right max-w-[60%] ${highlight ? 'font-medium text-foreground' : 'text-foreground'}`}>
        {value}
      </span>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={16} className="text-primary" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Registration Summary
        </h3>
      </div>
      <div className="space-y-6">
        {/* Basic Information */}
        <SummarySection title="Basic Information" icon="User">
          <SummaryItem 
            label="Farmer Name" 
            value={formData?.farmerName || 'Not provided'} 
            highlight 
          />
          <SummaryItem 
            label="Contact Number" 
            value={formatPhoneNumber(formData?.contactNumber)} 
          />
          <SummaryItem 
            label="Government ID" 
            value={formData?.governmentIdType ? 
              `${formData?.governmentIdType?.toUpperCase()}: ${formData?.governmentIdNumber || 'Not provided'}` : 
              'Not provided'
            } 
          />
        </SummarySection>

        {/* Location Information */}
        <SummarySection title="Farm Location" icon="MapPin">
          <SummaryItem 
            label="Address" 
            value={formatLocation()} 
          />
          {formData?.latitude && formData?.longitude && (
            <SummaryItem 
              label="Coordinates" 
              value={`${formData?.latitude}, ${formData?.longitude}`} 
            />
          )}
        </SummarySection>

        {/* Farm Details */}
        <SummarySection title="Farm Details" icon="Leaf">
          <SummaryItem 
            label="Farm Size" 
            value={formatFarmSize()} 
          />
          <SummaryItem 
            label="Primary Crops" 
            value={formatCrops()} 
          />
          {formData?.farmingExperience && (
            <SummaryItem 
              label="Experience" 
              value={`${formData?.farmingExperience} years`} 
            />
          )}
          <SummaryItem 
            label="Certifications" 
            value={getCertificationStatus()} 
          />
        </SummarySection>

        {/* Organic Certificate Details */}
        {formData?.isOrganicCertified && formData?.organicCertificateNumber && (
          <SummarySection title="Organic Certification" icon="Award">
            <SummaryItem 
              label="Certificate Number" 
              value={formData?.organicCertificateNumber} 
            />
            <SummaryItem 
              label="Certifying Authority" 
              value={formData?.certifyingAuthority || 'Not provided'} 
            />
            {formData?.certificateValidUntil && (
              <SummaryItem 
                label="Valid Until" 
                value={new Date(formData.certificateValidUntil)?.toLocaleDateString('en-IN')} 
              />
            )}
          </SummarySection>
        )}

        {/* Documents */}
        <SummarySection title="Uploaded Documents" icon="FileImage">
          {getUploadedDocuments()?.length > 0 ? (
            <div className="space-y-2">
              {getUploadedDocuments()?.map((doc, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={12} className="text-success" />
                  <span className="text-xs text-foreground">{doc}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={12} className="text-warning" />
              <span className="text-xs text-text-secondary">No documents uploaded</span>
            </div>
          )}
        </SummarySection>

        {/* Additional Notes */}
        {formData?.additionalNotes && (
          <SummarySection title="Additional Notes" icon="MessageSquare">
            <p className="text-xs text-foreground">{formData?.additionalNotes}</p>
          </SummarySection>
        )}

        {/* Registration Status */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <h4 className="text-sm font-medium text-primary">Registration Status</h4>
          </div>
          <p className="text-xs text-text-secondary">
            {isOffline ? 
              'Registration will be saved locally and synced when online' : 'Ready to submit registration'
            }
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <Icon name="Calendar" size={12} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">
              {new Date()?.toLocaleDateString('en-IN')} at {new Date()?.toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        </div>

        {/* Offline Notice */}
        {isOffline && (
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="WifiOff" size={16} />
              <span className="text-sm font-medium">
                Working offline - registration will sync automatically
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationSummary;
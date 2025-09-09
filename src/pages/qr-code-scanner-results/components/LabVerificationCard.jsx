import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LabVerificationCard = ({ labData }) => {
  const isExpired = new Date(labData.expiryDate) < new Date();
  const daysUntilExpiry = Math.ceil((new Date(labData.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));

  const getExpiryStatus = () => {
    if (isExpired) {
      return {
        color: 'text-error bg-error/10 border-error/20',
        icon: 'AlertTriangle',
        text: 'Expired'
      };
    } else if (daysUntilExpiry <= 30) {
      return {
        color: 'text-warning bg-warning/10 border-warning/20',
        icon: 'Clock',
        text: `Expires in ${daysUntilExpiry} days`
      };
    } else {
      return {
        color: 'text-success bg-success/10 border-success/20',
        icon: 'CheckCircle',
        text: 'Valid'
      };
    }
  };

  const expiryStatus = getExpiryStatus();

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="FlaskConical" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">Lab Verification</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Certificate Details */}
        <div className="space-y-4">
          <div>
            <h4 className="text-base font-medium text-foreground mb-3">Certificate Information</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Certificate No:</span>
                <span className="text-sm font-mono text-foreground">{labData?.certificateNumber}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Lab Number:</span>
                <span className="text-sm font-mono text-foreground">{labData?.labNumber}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Testing Date:</span>
                <span className="text-sm text-foreground">{labData?.testingDate}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Expiry Date:</span>
                <span className="text-sm text-foreground">{labData?.expiryDate}</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg border ${expiryStatus?.color}`}>
            <Icon name={expiryStatus?.icon} size={16} />
            <span className="text-sm font-medium">{expiryStatus?.text}</span>
          </div>

          {/* Lab Information */}
          <div className="pt-4 border-t border-border">
            <h5 className="text-sm font-medium text-foreground mb-2">Testing Laboratory</h5>
            <div className="space-y-2">
              <p className="text-sm text-foreground">{labData?.labName}</p>
              <p className="text-sm text-text-secondary">{labData?.labAddress}</p>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={14} className="text-primary" />
                <span className="text-sm text-text-secondary">NABL Accredited</span>
              </div>
            </div>
          </div>
        </div>

        {/* Test Results & Seal */}
        <div className="space-y-4">
          <div>
            <h4 className="text-base font-medium text-foreground mb-3">Test Results</h4>
            <div className="space-y-3">
              {labData?.testResults?.map((result, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">{result?.parameter}:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-foreground">{result?.value}</span>
                    <Icon 
                      name={result?.status === 'pass' ? 'CheckCircle' : 'XCircle'} 
                      size={14} 
                      className={result?.status === 'pass' ? 'text-success' : 'text-error'} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Official Seal */}
          <div className="pt-4 border-t border-border">
            <h5 className="text-sm font-medium text-foreground mb-3">Official Seal</h5>
            <div className="w-32 h-32 mx-auto bg-muted rounded-lg border border-border flex items-center justify-center">
              <Image
                src={labData?.officialSeal}
                alt="Lab Official Seal"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <p className="text-xs text-text-secondary text-center mt-2">
              Digitally signed and verified
            </p>
          </div>

          {/* Verification QR */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-muted rounded border border-border flex items-center justify-center">
              <Icon name="QrCode" size={24} className="text-text-secondary" />
            </div>
            <p className="text-xs text-text-secondary mt-1">Verification QR</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabVerificationCard;
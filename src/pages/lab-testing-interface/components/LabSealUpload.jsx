import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';

const LabSealUpload = ({ 
  onSealUpload,
  existingSeal = null,
  className = "" 
}) => {
  const [sealData, setSealData] = useState({
    sealImage: existingSeal?.sealImage || null,
    digitalSignature: existingSeal?.digitalSignature || '',
    sealNumber: existingSeal?.sealNumber || '',
    authorizedBy: existingSeal?.authorizedBy || 'Dr. Priya Sharma',
    authorizationDate: existingSeal?.authorizationDate || '',
    validityPeriod: existingSeal?.validityPeriod || '365'
  });

  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const sealInputRef = useRef(null);
  const signatureInputRef = useRef(null);

  const handleSealImageUpload = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes?.includes(file?.type)) {
      setErrors(prev => ({ ...prev, sealImage: 'Please upload a valid image file (JPG, PNG, WEBP)' }));
      return;
    }

    // Validate file size (max 5MB)
    if (file?.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, sealImage: 'File size must be less than 5MB' }));
      return;
    }

    setUploading(true);
    
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const sealImage = {
        url: URL.createObjectURL(file),
        name: file?.name,
        size: file?.size,
        uploadedAt: new Date()?.toISOString()
      };

      setSealData(prev => ({ ...prev, sealImage }));
      setErrors(prev => ({ ...prev, sealImage: '' }));
    } catch (error) {
      setErrors(prev => ({ ...prev, sealImage: 'Upload failed. Please try again.' }));
    } finally {
      setUploading(false);
    }
  };

  const handleDigitalSignatureUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    
    try {
      // Simulate processing digital signature
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const signature = {
        url: URL.createObjectURL(file),
        name: file?.name,
        hash: 'SHA256:' + Math.random()?.toString(36)?.substring(2, 15),
        uploadedAt: new Date()?.toISOString()
      };

      setSealData(prev => ({ ...prev, digitalSignature: signature }));
      setErrors(prev => ({ ...prev, digitalSignature: '' }));
    } catch (error) {
      setErrors(prev => ({ ...prev, digitalSignature: 'Signature processing failed. Please try again.' }));
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSealData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!sealData?.sealImage) {
      newErrors.sealImage = 'Lab seal image is required';
    }

    if (!sealData?.sealNumber?.trim()) {
      newErrors.sealNumber = 'Seal number is required';
    }

    if (!sealData?.authorizationDate) {
      newErrors.authorizationDate = 'Authorization date is required';
    }

    // Validate authorization date is not in the future
    if (sealData?.authorizationDate && new Date(sealData.authorizationDate) > new Date()) {
      newErrors.authorizationDate = 'Authorization date cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    onSealUpload({
      ...sealData,
      submittedAt: new Date()?.toISOString(),
      status: 'verified'
    });
  };

  const getTodayDate = () => {
    return new Date()?.toISOString()?.split('T')?.[0];
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              Lab Seal & Digital Signature
            </h3>
            <p className="text-sm text-text-secondary">
              Upload official lab seal and digital signature for certification
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              sealData?.sealImage && sealData?.digitalSignature 
                ? 'bg-success' :'bg-warning'
            }`}></div>
            <span className="text-sm text-text-secondary">
              {sealData?.sealImage && sealData?.digitalSignature ? 'Complete' : 'Pending'}
            </span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Lab Seal Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Official Lab Seal *
          </label>
          
          {sealData?.sealImage ? (
            <div className="flex items-start space-x-4 p-4 bg-muted rounded-lg border border-border">
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-border bg-surface">
                <Image
                  src={sealData?.sealImage?.url}
                  alt="Lab seal"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {sealData?.sealImage?.name}
                </p>
                <p className="text-xs text-text-secondary">
                  Uploaded: {new Date(sealData.sealImage.uploadedAt)?.toLocaleString('en-GB')}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    onClick={() => window.open(sealData?.sealImage?.url, '_blank')}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => setSealData(prev => ({ ...prev, sealImage: null }))}
                    className="text-error hover:text-error"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                ref={sealInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleSealImageUpload(e?.target?.files?.[0])}
                className="hidden"
                disabled={uploading}
              />
              
              <div className="space-y-3">
                <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Icon 
                    name={uploading ? "Loader2" : "Stamp"} 
                    size={24} 
                    className={`text-text-secondary ${uploading ? 'animate-spin' : ''}`} 
                  />
                </div>
                
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {uploading ? 'Uploading seal...' : 'Upload Lab Seal'}
                  </p>
                  <p className="text-xs text-text-secondary">
                    High-resolution image of official lab seal (max 5MB)
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => sealInputRef?.current?.click()}
                  disabled={uploading}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Choose File
                </Button>
              </div>
            </div>
          )}
          
          {errors?.sealImage && (
            <p className="text-sm text-error mt-2">{errors?.sealImage}</p>
          )}
        </div>

        {/* Digital Signature Upload */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Digital Signature (Optional)
          </label>
          
          {sealData?.digitalSignature ? (
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-success" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Digital Signature Verified
                  </p>
                  <p className="text-xs text-text-secondary">
                    Hash: {sealData?.digitalSignature?.hash}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => setSealData(prev => ({ ...prev, digitalSignature: '' }))}
                  className="text-error hover:text-error"
                />
              </div>
            </div>
          ) : (
            <div className="border border-border rounded-lg p-4">
              <input
                ref={signatureInputRef}
                type="file"
                accept=".p12,.pfx,.pem"
                onChange={(e) => handleDigitalSignatureUpload(e?.target?.files?.[0])}
                className="hidden"
                disabled={uploading}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name="FileKey" size={20} className="text-text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Upload Digital Certificate
                    </p>
                    <p className="text-xs text-text-secondary">
                      .p12, .pfx, or .pem format
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signatureInputRef?.current?.click()}
                  disabled={uploading}
                  iconName="Upload"
                  iconPosition="left"
                >
                  Browse
                </Button>
              </div>
            </div>
          )}
          
          {errors?.digitalSignature && (
            <p className="text-sm text-error mt-2">{errors?.digitalSignature}</p>
          )}
        </div>

        {/* Seal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Seal Number"
            type="text"
            placeholder="SEAL-2024-001"
            value={sealData?.sealNumber}
            onChange={(e) => handleInputChange('sealNumber', e?.target?.value)}
            error={errors?.sealNumber}
            required
          />

          <Input
            label="Authorized By"
            type="text"
            value={sealData?.authorizedBy}
            onChange={(e) => handleInputChange('authorizedBy', e?.target?.value)}
            disabled
          />

          <Input
            label="Authorization Date"
            type="date"
            value={sealData?.authorizationDate}
            onChange={(e) => handleInputChange('authorizationDate', e?.target?.value)}
            error={errors?.authorizationDate}
            max={getTodayDate()}
            required
          />

          <Input
            label="Validity Period (Days)"
            type="number"
            value={sealData?.validityPeriod}
            onChange={(e) => handleInputChange('validityPeriod', e?.target?.value)}
            min="1"
            max="3650"
          />
        </div>

        {/* Security Notice */}
        <div className="bg-surface rounded-lg p-4 border border-border">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                Security & Validation
              </h4>
              <ul className="text-xs text-text-secondary space-y-1">
                <li>• All uploaded seals are encrypted and stored securely</li>
                <li>• Digital signatures are verified using industry-standard protocols</li>
                <li>• Seal authenticity is validated against registered lab database</li>
                <li>• Unauthorized use of lab seals is tracked and reported</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleSubmit}
            iconName="Shield"
            iconPosition="left"
            className="w-full"
            disabled={uploading || (!sealData?.sealImage)}
          >
            Verify & Apply Seal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LabSealUpload;
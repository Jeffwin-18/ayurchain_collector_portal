import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DocumentUploadForm = ({ 
  formData, 
  onFormChange, 
  errors = {},
  isOffline = false 
}) => {
  const [uploadingDocument, setUploadingDocument] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);

  const handleInputChange = (field, value) => {
    onFormChange(field, value);
  };

  const handleFileUpload = (field, event) => {
    const file = event?.target?.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes?.includes(file?.type)) {
      alert('Please upload only JPG, PNG, or WebP images');
      return;
    }

    // Validate file size (5MB limit)
    if (file?.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploadingDocument(field);

    // Simulate file upload with metadata
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = {
        file: file,
        url: e?.target?.result,
        name: file?.name,
        size: file?.size,
        type: file?.type,
        uploadedAt: new Date()?.toISOString(),
        location: formData?.latitude && formData?.longitude ? {
          lat: formData?.latitude,
          lng: formData?.longitude
        } : null
      };

      handleInputChange(field, imageData);
      setUploadingDocument(null);
    };

    reader?.readAsDataURL(file);
  };

  const capturePhoto = async (field) => {
    if (!navigator.mediaDevices || !navigator.mediaDevices?.getUserMedia) {
      alert('Camera not supported on this device');
      return;
    }

    try {
      setCameraActive(true);
      
      // Simulate camera capture (in real app, implement camera functionality)
      setTimeout(() => {
        const mockImageData = {
          url: `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop`,
          name: `${field}_${Date.now()}.jpg`,
          size: 245760,
          type: 'image/jpeg',
          capturedAt: new Date()?.toISOString(),
          location: formData?.latitude && formData?.longitude ? {
            lat: formData?.latitude,
            lng: formData?.longitude
          } : null,
          metadata: {
            timestamp: new Date()?.toISOString(),
            device: navigator.userAgent,
            geotagged: !!(formData?.latitude && formData?.longitude)
          }
        };

        handleInputChange(field, mockImageData);
        setCameraActive(false);
      }, 2000);
    } catch (error) {
      console.error('Camera error:', error);
      alert('Unable to access camera. Please try uploading a file instead.');
      setCameraActive(false);
    }
  };

  const removeDocument = (field) => {
    handleInputChange(field, null);
  };

  const DocumentUploadSection = ({ 
    field, 
    label, 
    description, 
    required = false 
  }) => {
    const document = formData?.[field];
    const isUploading = uploadingDocument === field;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-foreground">
              {label} {required && <span className="text-error">*</span>}
            </h4>
            {description && (
              <p className="text-xs text-text-secondary mt-1">{description}</p>
            )}
          </div>
        </div>
        {document ? (
          <div className="relative bg-muted rounded-lg p-4 border border-border">
            <div className="flex items-start space-x-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface border border-border flex-shrink-0">
                <Image
                  src={document?.url}
                  alt={label}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {document?.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {(document?.size / 1024)?.toFixed(1)} KB
                </p>
                {document?.capturedAt && (
                  <p className="text-xs text-success">
                    📸 Captured with geo-tag
                  </p>
                )}
                {document?.uploadedAt && (
                  <p className="text-xs text-text-secondary">
                    Uploaded: {new Date(document.uploadedAt)?.toLocaleString()}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => removeDocument(field)}
                className="text-error hover:text-error hover:bg-error/10"
                disabled={isOffline}
              />
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-6">
            <div className="text-center space-y-3">
              <Icon name="Upload" size={32} className="mx-auto text-text-secondary" />
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">
                  Upload document or capture photo
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Upload"
                    iconPosition="left"
                    onClick={() => document?.getElementById(`file-${field}`)?.click()}
                    disabled={isOffline || isUploading}
                    loading={isUploading}
                  >
                    Upload File
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Camera"
                    iconPosition="left"
                    onClick={() => capturePhoto(field)}
                    disabled={isOffline || cameraActive}
                    loading={cameraActive && uploadingDocument === field}
                  >
                    Capture Photo
                  </Button>
                </div>
              </div>
            </div>
            <input
              id={`file-${field}`}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(field, e)}
              className="hidden"
            />
          </div>
        )}
        {errors?.[field] && (
          <p className="text-sm text-error">{errors?.[field]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <span className="text-primary font-semibold text-sm">4</span>
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Document Upload
        </h3>
      </div>
      <div className="space-y-8">
        {/* Farmer Photo */}
        <DocumentUploadSection
          field="farmerPhoto"
          label="Farmer Photo"
          description="Clear photo of the farmer for identification"
          required
        />

        {/* Government ID Document */}
        <DocumentUploadSection
          field="governmentIdDocument"
          label="Government ID Document"
          description="Photo of the selected government ID document"
          required
        />

        {/* Organic Certificate (if applicable) */}
        {formData?.isOrganicCertified && (
          <DocumentUploadSection
            field="organicCertificateDocument"
            label="Organic Certificate"
            description="Photo or scan of the organic certification document"
            required
          />
        )}

        {/* Farm Photo */}
        <DocumentUploadSection
          field="farmPhoto"
          label="Farm Photo"
          description="Photo showing the farm/cultivation area"
        />

        {/* Upload Guidelines */}
        <div className="bg-muted rounded-lg p-4 border border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">
            Upload Guidelines
          </h4>
          <ul className="text-xs text-text-secondary space-y-1">
            <li>• Supported formats: JPG, PNG, WebP</li>
            <li>• Maximum file size: 5MB per image</li>
            <li>• Ensure documents are clearly visible and readable</li>
            <li>• Photos captured with camera will include location data</li>
            <li>• All uploaded documents are stored securely</li>
          </ul>
        </div>

        {/* Camera Status */}
        {cameraActive && (
          <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-center space-x-2 text-accent">
              <Icon name="Camera" size={16} className="animate-pulse" />
              <span className="text-sm font-medium">
                Camera is active - Please capture the photo
              </span>
            </div>
          </div>
        )}

        {/* Offline Notice */}
        {isOffline && (
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="WifiOff" size={16} />
              <span className="text-sm font-medium">
                Camera and upload features unavailable offline
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploadForm;
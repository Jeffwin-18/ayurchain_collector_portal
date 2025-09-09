import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotoCaptureForm = ({ 
  photos, 
  onPhotoCapture, 
  onPhotoRemove 
}) => {
  const photoSlots = [
    { 
      key: 'herb_sample', 
      label: 'Herb Sample', 
      description: 'Clear photo of the collected herbs',
      required: true 
    },
    { 
      key: 'collection_environment', 
      label: 'Collection Environment', 
      description: 'Photo of the collection area/farm',
      required: false 
    },
    { 
      key: 'farmer_interaction', 
      label: 'Farmer Interaction', 
      description: 'Photo with the farmer (optional)',
      required: false 
    },
    { 
      key: 'quality_verification', 
      label: 'Quality Verification', 
      description: 'Close-up for quality assessment',
      required: false 
    }
  ];

  const handleFileInput = (slotKey, event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoData = {
          id: Date.now(),
          file: file,
          url: e?.target?.result,
          timestamp: new Date()?.toISOString(),
          location: { latitude: 28.6139, longitude: 77.2090 }, // Mock GPS data
          metadata: {
            size: file?.size,
            type: file?.type,
            name: file?.name
          }
        };
        onPhotoCapture(slotKey, photoData);
      };
      reader?.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Photo Documentation
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {photoSlots?.map((slot) => (
          <div key={slot?.key} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-foreground flex items-center space-x-1">
                  <span>{slot?.label}</span>
                  {slot?.required && <span className="text-error">*</span>}
                </h4>
                <p className="text-xs text-text-secondary">{slot?.description}</p>
              </div>
            </div>

            <div className="relative">
              {photos?.[slot?.key] ? (
                <div className="relative group">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden border border-border">
                    <Image
                      src={photos?.[slot?.key]?.url}
                      alt={slot?.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Photo Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      iconName="Eye"
                      onClick={() => {/* View photo logic */}}
                    >
                      View
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => onPhotoRemove(slot?.key)}
                    >
                      Remove
                    </Button>
                  </div>

                  {/* Photo Info */}
                  <div className="mt-2 p-2 bg-muted rounded text-xs text-text-secondary">
                    <div className="flex items-center justify-between">
                      <span>Size: {(photos?.[slot?.key]?.metadata?.size / 1024)?.toFixed(1)}KB</span>
                      <span>{new Date(photos[slot.key].timestamp)?.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center space-y-3">
                  <Icon name="Camera" size={32} className="text-text-secondary" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      {slot?.required ? 'Required Photo' : 'Optional Photo'}
                    </p>
                    <p className="text-xs text-text-secondary">
                      Tap to capture or upload
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={(e) => handleFileInput(slot?.key, e)}
                      className="hidden"
                      id={`photo-${slot?.key}`}
                    />
                    <label htmlFor={`photo-${slot?.key}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Camera"
                        iconPosition="left"
                        asChild
                      >
                        <span>Capture</span>
                      </Button>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Photo Summary */}
      <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Photos Captured</span>
          <span className="text-sm text-text-secondary">
            {Object.keys(photos)?.length}/4 slots filled
          </span>
        </div>
        <div className="mt-2 w-full bg-border rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(Object.keys(photos)?.length / 4) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCaptureForm;
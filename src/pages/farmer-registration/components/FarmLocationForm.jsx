import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FarmLocationForm = ({ 
  formData, 
  onFormChange, 
  errors = {},
  isOffline = false 
}) => {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [hasLocationPermission, setHasLocationPermission] = useState(true);

  const handleInputChange = (field, value) => {
    onFormChange(field, value);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    setIsGettingLocation(true);
    setLocationError('');

    navigator.geolocation?.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position?.coords;
        handleInputChange('latitude', latitude?.toFixed(6));
        handleInputChange('longitude', longitude?.toFixed(6));
        setIsGettingLocation(false);
        
        // Reverse geocoding simulation (in real app, use Google Maps API)
        handleInputChange('farmAddress', `Location: ${latitude?.toFixed(4)}, ${longitude?.toFixed(4)}`);
      },
      (error) => {
        setIsGettingLocation(false);
        switch (error?.code) {
          case error?.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enable location services.');
            setHasLocationPermission(false);
            break;
          case error?.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable.');
            break;
          case error?.TIMEOUT:
            setLocationError('Location request timed out.');
            break;
          default:
            setLocationError('An unknown error occurred while getting location.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const getMapUrl = () => {
    const lat = formData?.latitude || '28.6139';
    const lng = formData?.longitude || '77.2090';
    return `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
          <span className="text-primary font-semibold text-sm">2</span>
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Farm Location
        </h3>
      </div>
      <div className="space-y-6">
        {/* Farm Address */}
        <div>
          <Input
            label="Farm Address"
            type="text"
            placeholder="Enter complete farm address"
            value={formData?.farmAddress || ''}
            onChange={(e) => handleInputChange('farmAddress', e?.target?.value)}
            error={errors?.farmAddress}
            description="Include village, district, and state"
            required
            disabled={isOffline}
          />
        </div>

        {/* Location Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Latitude"
              type="number"
              placeholder="0.000000"
              value={formData?.latitude || ''}
              onChange={(e) => handleInputChange('latitude', e?.target?.value)}
              error={errors?.latitude}
              step="0.000001"
              disabled={isOffline}
            />
          </div>
          <div>
            <Input
              label="Longitude"
              type="number"
              placeholder="0.000000"
              value={formData?.longitude || ''}
              onChange={(e) => handleInputChange('longitude', e?.target?.value)}
              error={errors?.longitude}
              step="0.000001"
              disabled={isOffline}
            />
          </div>
        </div>

        {/* Get Location Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            iconName="MapPin"
            iconPosition="left"
            onClick={getCurrentLocation}
            disabled={isGettingLocation || isOffline}
            loading={isGettingLocation}
            className="flex-1 sm:flex-none"
          >
            {isGettingLocation ? 'Getting Location...' : 'Get Current Location'}
          </Button>

          {!hasLocationPermission && (
            <Button
              variant="ghost"
              iconName="Settings"
              iconPosition="left"
              onClick={() => window.open('chrome://settings/content/location', '_blank')}
              className="flex-1 sm:flex-none"
            >
              Enable Location
            </Button>
          )}
        </div>

        {/* Location Error */}
        {locationError && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-2 text-error">
              <Icon name="AlertCircle" size={16} className="mt-0.5 flex-shrink-0" />
              <span className="text-sm">{locationError}</span>
            </div>
          </div>
        )}

        {/* Map Display */}
        {(formData?.latitude && formData?.longitude) && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Farm Location on Map</h4>
            <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Farm Location"
                referrerPolicy="no-referrer-when-downgrade"
                src={getMapUrl()}
                className="border-0"
              />
            </div>
            <p className="text-xs text-text-secondary">
              Location: {formData?.latitude}, {formData?.longitude}
            </p>
          </div>
        )}

        {/* Additional Location Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Village/Town"
              type="text"
              placeholder="Enter village or town name"
              value={formData?.village || ''}
              onChange={(e) => handleInputChange('village', e?.target?.value)}
              error={errors?.village}
              disabled={isOffline}
            />
          </div>
          <div>
            <Input
              label="District"
              type="text"
              placeholder="Enter district name"
              value={formData?.district || ''}
              onChange={(e) => handleInputChange('district', e?.target?.value)}
              error={errors?.district}
              disabled={isOffline}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="State"
              type="text"
              placeholder="Enter state name"
              value={formData?.state || ''}
              onChange={(e) => handleInputChange('state', e?.target?.value)}
              error={errors?.state}
              required
              disabled={isOffline}
            />
          </div>
          <div>
            <Input
              label="PIN Code"
              type="text"
              placeholder="000000"
              value={formData?.pinCode || ''}
              onChange={(e) => handleInputChange('pinCode', e?.target?.value?.replace(/\D/g, '')?.slice(0, 6))}
              error={errors?.pinCode}
              pattern="[0-9]{6}"
              maxLength={6}
              disabled={isOffline}
            />
          </div>
        </div>

        {/* Offline Notice */}
        {isOffline && (
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="WifiOff" size={16} />
              <span className="text-sm font-medium">
                GPS and map features unavailable offline
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmLocationForm;
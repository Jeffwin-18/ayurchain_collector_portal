import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LocationTrackingForm = ({ 
  location, 
  onLocationChange, 
  isGettingLocation, 
  onGetCurrentLocation,
  gpsStatus,
  locationError = null
}) => {
  const getGpsStatusConfig = () => {
    switch (gpsStatus) {
      case 'available':
        return {
          icon: 'MapPin',
          color: 'text-success',
          bgColor: 'bg-success/10',
          label: 'GPS Available'
        };
      case 'searching':
        return {
          icon: 'MapPin',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          label: 'Searching GPS...'
        };
      default:
        return {
          icon: 'MapPinOff',
          color: 'text-error',
          bgColor: 'bg-error/10',
          label: 'GPS Unavailable'
        };
    }
  };

  const gpsConfig = getGpsStatusConfig();

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Collection Location
        </h3>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${gpsConfig?.bgColor}`}>
          <Icon name={gpsConfig?.icon} size={16} className={gpsConfig?.color} />
          <span className={`text-xs font-medium ${gpsConfig?.color}`}>
            {gpsConfig?.label}
          </span>
        </div>
      </div>

      {/* Enhanced Error Display */}
      {locationError && (
        <div className="mb-4 p-3 bg-error/10 rounded-lg border border-error/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <span className="text-sm font-medium text-error">Location Issue</span>
          </div>
          <p className="text-xs text-text-secondary mb-2">{locationError?.message}</p>
          {locationError?.type === 'denied' && (
            <div className="space-y-2">
              <p className="text-xs text-text-secondary font-medium">To enable location access:</p>
              <ul className="text-xs text-text-secondary pl-4 space-y-1">
                <li>• Click the location icon in your browser's address bar</li>
                <li>• Select "Always allow" for this site</li>
                <li>• Refresh the page and try again</li>
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Latitude"
            type="number"
            placeholder="Enter latitude"
            value={location?.latitude}
            onChange={(e) => onLocationChange('latitude', e?.target?.value)}
            step="any"
            required
          />
          
          <Input
            label="Longitude"
            type="number"
            placeholder="Enter longitude"
            value={location?.longitude}
            onChange={(e) => onLocationChange('longitude', e?.target?.value)}
            step="any"
            required
          />
        </div>

        <Input
          label="Address/Landmark"
          type="text"
          placeholder="Enter collection address or landmark"
          value={location?.address}
          onChange={(e) => onLocationChange('address', e?.target?.value)}
        />

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="MapPin"
            iconPosition="left"
            onClick={onGetCurrentLocation}
            loading={isGettingLocation}
            disabled={gpsStatus === 'unavailable' && !locationError}
          >
            {isGettingLocation ? 'Getting Location...' : 'Use Current Location'}
          </Button>
          
          {location?.latitude && location?.longitude && (
            <div className="flex items-center space-x-2 text-success">
              <Icon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Location Captured</span>
            </div>
          )}
        </div>

        {/* Enhanced Location Preview */}
        {location?.latitude && location?.longitude && (
          <div className="p-4 bg-muted rounded-lg border border-border">
            <h4 className="text-sm font-medium text-foreground mb-2">Location Preview</h4>
            <div className="space-y-1 text-xs text-text-secondary">
              <p>Coordinates: {location?.latitude}, {location?.longitude}</p>
              {location?.address && <p>Address: {location?.address}</p>}
              <p>Accuracy: ±5 meters</p>
              <p className="text-success">✓ Ready for collection recording</p>
            </div>
          </div>
        )}

        {/* GPS Tips */}
        {gpsStatus === 'unavailable' && !isGettingLocation && (
          <div className="p-3 bg-muted rounded-lg border border-border">
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
              <Icon name="Lightbulb" size={16} />
              <span>GPS Tips</span>
            </h4>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Move to an open area with clear sky view</li>
              <li>• Ensure location services are enabled</li>
              <li>• Check if other apps can access your location</li>
              <li>• Try refreshing the page</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationTrackingForm;
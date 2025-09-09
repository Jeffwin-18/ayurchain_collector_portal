import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LocationIndicator = ({ 
  showFullAddress = false,
  onLocationUpdate = () => {},
  className = ""
}) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: null,
    accuracy: null,
    timestamp: null
  });
  const [locationStatus, setLocationStatus] = useState('loading'); // loading, available, denied, error
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [locationError, setLocationError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Enhanced error handling function
  const handleLocationError = (error, context = 'dashboard') => {
    const errorDetails = {
      code: error?.code || 'unknown',
      message: error?.message || 'Unknown location error',
      timestamp: new Date()?.toISOString(),
      context: context,
      retryCount: retryCount,
      userAgent: navigator?.userAgent?.slice(0, 100) || 'unknown',
      online: navigator?.onLine || false,
      coordinates: {
        latitude: location?.latitude || null,
        longitude: location?.longitude || null
      }
    };

    // Enhanced console logging with detailed error information
    console.error('Dashboard Location Error - Full Details:', {
      errorType: 'geolocation_error',
      ...errorDetails,
      originalError: {
        code: error?.code,
        message: error?.message,
        stack: error?.stack || 'No stack available',
        toString: error?.toString?.() || 'Cannot convert to string'
      },
      geolocationSupport: {
        supported: !!navigator?.geolocation,
        permissions: 'permissions' in navigator ? 'supported' : 'not_supported'
      }
    });

    let userMessage = '';
    let statusType = '';

    switch (error?.code) {
      case 1: // PERMISSION_DENIED
        userMessage = 'Location access denied by user';
        statusType = 'denied';
        break;
      case 2: // POSITION_UNAVAILABLE
        userMessage = 'Location information unavailable';
        statusType = 'error';
        break;
      case 3: // TIMEOUT
        userMessage = 'Location request timed out';
        statusType = 'error';
        break;
      default:
        userMessage = `Location error: ${error?.message || 'Unknown error'}`;
        statusType = 'error';
        break;
    }

    setLocationError({
      type: statusType,
      message: userMessage,
      details: errorDetails,
      canRetry: error?.code !== 1 // Don't retry if permission denied
    });

    setLocationStatus(statusType);
  };

  const getCurrentLocation = () => {
    if (!navigator?.geolocation) {
      handleLocationError({
        code: 0,
        message: 'Geolocation not supported by this browser'
      }, 'geolocation_not_supported');
      return;
    }

    setLocationStatus('loading');
    setLocationError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 12000, // 12 seconds
      maximumAge: 300000 // 5 minutes
    };

    // Create a promise wrapper for better error handling
    const locationPromise = new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Custom timeout: Location request exceeded 12 seconds'));
      }, options.timeout + 1000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          resolve(position);
        },
        (error) => {
          clearTimeout(timeoutId);
          reject(error);
        },
        options
      );
    });

    locationPromise?.then((position) => {
        const newLocation = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
          accuracy: position?.coords?.accuracy,
          timestamp: new Date(position.timestamp)
        };

        // Enhanced success logging
        console.log('Dashboard Location Success:', {
          coordinates: {
            lat: newLocation?.latitude,
            lng: newLocation?.longitude,
            accuracy: newLocation?.accuracy
          },
          timestamp: newLocation?.timestamp,
          additionalData: {
            altitude: position?.coords?.altitude,
            heading: position?.coords?.heading,
            speed: position?.coords?.speed
          }
        });

        // Mock address for demonstration
        const mockAddress = "Village Rampur, Tehsil Sadar, District Meerut, Uttar Pradesh 250001";
        newLocation.address = mockAddress;

        setLocation(newLocation);
        setLocationStatus('available');
        setLocationError(null);
        setRetryCount(0);
        onLocationUpdate(newLocation);
      })?.catch((error) => {
        setRetryCount(prev => prev + 1);
        handleLocationError(error, 'getCurrentPosition');
      });
  };

  const handleRetry = () => {
    if (retryCount < 3) {
      getCurrentLocation();
    } else {
      setLocationError(prev => ({
        ...prev,
        message: 'Maximum retry attempts reached. Please refresh the page or check your location settings.',
        canRetry: false
      }));
    }
  };

  const getLocationStatusConfig = () => {
    switch (locationStatus) {
      case 'loading':
        return {
          icon: 'MapPin',
          color: 'text-accent',
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/20',
          label: 'Getting location...',
          animate: 'animate-pulse'
        };
      case 'available':
        return {
          icon: 'MapPin',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          label: 'Location available',
          animate: ''
        };
      case 'denied':
        return {
          icon: 'MapPinOff',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          label: 'Location access denied',
          animate: ''
        };
      default:
        return {
          icon: 'MapPinOff',
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          label: 'Location unavailable',
          animate: ''
        };
    }
  };

  const getConnectivityConfig = () => {
    return isOnline ? {
      icon: 'Wifi',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      label: 'Online'
    } : {
      icon: 'WifiOff',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20',
      label: 'Offline'
    };
  };

  const formatCoordinates = () => {
    if (!location?.latitude || !location?.longitude) return 'N/A';
    return `${location?.latitude?.toFixed(6)}, ${location?.longitude?.toFixed(6)}`;
  };

  const formatAccuracy = () => {
    if (!location?.accuracy) return 'N/A';
    return `±${Math.round(location?.accuracy)}m`;
  };

  const formatTimestamp = () => {
    if (!location?.timestamp) return 'N/A';
    return location?.timestamp?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const locationConfig = getLocationStatusConfig();
  const connectivityConfig = getConnectivityConfig();

  return (
    <div className={`bg-card rounded-lg border border-border p-4 shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Navigation" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Location Status</h3>
        </div>
        <button
          onClick={getCurrentLocation}
          className="p-2 hover:bg-muted rounded-lg transition-smooth"
          disabled={locationStatus === 'loading'}
        >
          <Icon 
            name="RefreshCw" 
            size={16} 
            className={`text-text-secondary ${locationStatus === 'loading' ? 'animate-spin' : ''}`} 
          />
        </button>
      </div>

      {/* Enhanced Error Display */}
      {locationError && (
        <div className="mb-4 p-3 bg-error/10 rounded-lg border border-error/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm font-medium text-error">Location Error</span>
            </div>
            {locationError?.canRetry && retryCount < 3 && (
              <button
                onClick={handleRetry}
                className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/80 transition-smooth"
              >
                Retry ({3 - retryCount} left)
              </button>
            )}
          </div>
          <p className="text-xs text-text-secondary mb-2">{locationError?.message}</p>
          <details className="text-xs text-text-secondary">
            <summary className="cursor-pointer hover:text-foreground">Debug Information</summary>
            <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto max-h-32">
              {JSON.stringify(locationError?.details, null, 2)}
            </pre>
          </details>
        </div>
      )}

      {/* Status Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {/* Location Status */}
        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${locationConfig?.bgColor} ${locationConfig?.borderColor}`}>
          <Icon 
            name={locationConfig?.icon} 
            size={16} 
            className={`${locationConfig?.color} ${locationConfig?.animate}`} 
          />
          <span className={`text-sm font-medium ${locationConfig?.color}`}>
            {locationConfig?.label}
          </span>
        </div>

        {/* Connectivity Status */}
        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${connectivityConfig?.bgColor} ${connectivityConfig?.borderColor}`}>
          <Icon 
            name={connectivityConfig?.icon} 
            size={16} 
            className={connectivityConfig?.color} 
          />
          <span className={`text-sm font-medium ${connectivityConfig?.color}`}>
            {connectivityConfig?.label}
          </span>
        </div>
      </div>

      {/* Location Details */}
      {locationStatus === 'available' && (
        <div className="space-y-3">
          {/* Coordinates */}
          <div className="flex items-start space-x-2">
            <Icon name="MapPin" size={16} className="text-text-secondary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Coordinates</div>
              <div className="text-xs font-mono text-text-secondary">
                {formatCoordinates()}
              </div>
            </div>
            <div className="text-xs text-text-secondary">
              {formatAccuracy()}
            </div>
          </div>

          {/* Address */}
          {showFullAddress && location?.address && (
            <div className="flex items-start space-x-2">
              <Icon name="Home" size={16} className="text-text-secondary mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">Address</div>
                <div className="text-xs text-text-secondary">
                  {location?.address}
                </div>
              </div>
            </div>
          )}

          {/* Timestamp */}
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">Last Updated</div>
              <div className="text-xs text-text-secondary">
                {formatTimestamp()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Error States */}
      {locationStatus === 'denied' && !locationError && (
        <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Location Access Required</span>
          </div>
          <p className="text-xs text-text-secondary mb-2">
            Please enable location access in your browser settings to use GPS features.
          </p>
          <div className="space-y-1 text-xs text-text-secondary">
            <p className="font-medium">Instructions:</p>
            <p>1. Click the location icon in your address bar</p>
            <p>2. Select "Allow" for location access</p>
            <p>3. Refresh this page</p>
          </div>
        </div>
      )}

      {locationStatus === 'error' && !locationError && (
        <div className="p-3 bg-error/10 rounded-lg border border-error/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <span className="text-sm font-medium text-error">Location Error</span>
          </div>
          <p className="text-xs text-text-secondary">
            Unable to get your current location. Please check your GPS settings and try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationIndicator;
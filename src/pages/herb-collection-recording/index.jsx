import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HerbSelectionForm from './components/HerbSelectionForm';
import QualityAssessmentForm from './components/QualityAssessmentForm';
import FarmerSelectionForm from './components/FarmerSelectionForm';
import LocationTrackingForm from './components/LocationTrackingForm';
import PhotoCaptureForm from './components/PhotoCaptureForm';
import OfflineStatusIndicator from './components/OfflineStatusIndicator';
import CollectionSummary from './components/CollectionSummary';
import Icon from '../../components/AppIcon';


const HerbCollectionRecording = () => {
  const navigate = useNavigate();
  
  // Form state
  const [selectedHerb, setSelectedHerb] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [harvestDate, setHarvestDate] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [qualityIndicators, setQualityIndicators] = useState({});
  const [qualityGrade, setQualityGrade] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState('');
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
    address: ''
  });
  const [photos, setPhotos] = useState({});
  
  // Status state
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('synced');
  const [pendingRecords, setPendingRecords] = useState(0);
  const [gpsStatus, setGpsStatus] = useState('available');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(new Date()?.toISOString());
  const [locationError, setLocationError] = useState(null);

  // Enhanced geolocation error handler
  const handleGeolocationError = (error, context = 'unknown') => {
    const errorDetails = {
      code: error?.code || 'unknown',
      message: error?.message || 'Unknown error',
      timestamp: new Date()?.toISOString(),
      context: context,
      userAgent: navigator?.userAgent || 'unknown',
      online: navigator?.onLine || false
    };

    // Map error codes to user-friendly messages
    let userMessage = '';
    let errorType = 'error';

    switch (error?.code) {
      case 1: // PERMISSION_DENIED
        userMessage = 'Location access denied. Please enable location permissions in your browser settings.';
        errorType = 'denied';
        break;
      case 2: // POSITION_UNAVAILABLE
        userMessage = 'Location unavailable. Please check your GPS settings and ensure you have a clear view of the sky.';
        errorType = 'unavailable';
        break;
      case 3: // TIMEOUT
        userMessage = 'Location request timed out. Please try again or check your GPS connection.';
        errorType = 'timeout';
        break;
      default:
        userMessage = `Location error: ${error?.message || 'Unknown error occurred'}`;
        errorType = 'error';
        break;
    }

    // Enhanced console logging with full error details
    console.error('Enhanced Geolocation Error Details:', {
      ...errorDetails,
      originalError: error,
      stack: error?.stack || 'No stack trace available'
    });

    setLocationError({
      type: errorType,
      message: userMessage,
      details: errorDetails
    });

    setGpsStatus('unavailable');
    setIsGettingLocation(false);

    // Optional: Show user notification (if you have a toast system)
    // toast.error(userMessage);

    // Set fallback location for demo purposes
    setTimeout(() => {
      setLocation(prev => ({
        ...prev,
        latitude: '28.6139',
        longitude: '77.2090',
        address: 'New Delhi, India (Fallback Location)'
      }));
    }, 1000);
  };

  // Generate batch number on component mount
  useEffect(() => {
    const generateBatchNumber = () => {
      const date = new Date();
      const year = date?.getFullYear()?.toString()?.slice(-2);
      const month = (date?.getMonth() + 1)?.toString()?.padStart(2, '0');
      const day = date?.getDate()?.toString()?.padStart(2, '0');
      const random = Math.floor(Math.random() * 1000)?.toString()?.padStart(3, '0');
      return `AY${year}${month}${day}${random}`;
    };

    setBatchNumber(generateBatchNumber());
  }, []);

  // Monitor online status
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

  // Handlers
  const handleQualityChange = (key, value) => {
    setQualityIndicators(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLocationChange = (field, value) => {
    setLocation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Enhanced geolocation handler
  const handleGetCurrentLocation = () => {
    setIsGettingLocation(true);
    setGpsStatus('searching');
    setLocationError(null);

    if (!navigator?.geolocation) {
      handleGeolocationError({
        code: 0,
        message: 'Geolocation is not supported by this browser'
      }, 'geolocation_not_supported');
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 15000, // Increased timeout
      maximumAge: 60000 // 1 minute cache
    };

    // Add timeout wrapper for better error handling
    const timeoutId = setTimeout(() => {
      handleGeolocationError({
        code: 3,
        message: 'Geolocation request timed out after 15 seconds'
      }, 'custom_timeout');
    }, options?.timeout + 1000);

    navigator.geolocation?.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        
        const locationData = {
          latitude: position?.coords?.latitude?.toString(),
          longitude: position?.coords?.longitude?.toString(),
          accuracy: position?.coords?.accuracy,
          timestamp: new Date(position?.timestamp)
        };

        console.log('Location acquired successfully:', {
          ...locationData,
          heading: position?.coords?.heading || null,
          speed: position?.coords?.speed || null,
          altitude: position?.coords?.altitude || null
        });

        setLocation(prev => ({
          ...prev,
          latitude: locationData?.latitude,
          longitude: locationData?.longitude
        }));
        
        setGpsStatus('available');
        setIsGettingLocation(false);
        setLocationError(null);
      },
      (error) => {
        clearTimeout(timeoutId);
        handleGeolocationError(error, 'getCurrentPosition');
      },
      options
    );
  };

  const handlePhotoCapture = (slotKey, photoData) => {
    setPhotos(prev => ({
      ...prev,
      [slotKey]: photoData
    }));
  };

  const handlePhotoRemove = (slotKey) => {
    setPhotos(prev => {
      const newPhotos = { ...prev };
      delete newPhotos?.[slotKey];
      return newPhotos;
    });
  };

  const handleAddNewFarmer = () => {
    navigate('/farmer-registration');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSyncStatus('syncing');

    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const collectionRecord = {
      id: Date.now(),
      selectedHerb,
      quantity,
      unit,
      harvestDate,
      batchNumber,
      qualityIndicators,
      qualityGrade,
      selectedFarmer,
      location,
      photos,
      timestamp: new Date()?.toISOString(),
      synced: isOnline
    };

    // Save to localStorage for offline capability
    const existingRecords = JSON.parse(localStorage.getItem('herbCollections') || '[]');
    existingRecords?.push(collectionRecord);
    localStorage.setItem('herbCollections', JSON.stringify(existingRecords));

    if (!isOnline) {
      setPendingRecords(prev => prev + 1);
      setSyncStatus('pending');
    } else {
      setSyncStatus('synced');
      setLastSyncTime(new Date()?.toISOString());
    }

    setIsSaving(false);
    navigate('/collector-dashboard');
  };

  const handleSaveAndNew = async () => {
    await handleSave();
    // Reset form for new entry
    setSelectedHerb('');
    setQuantity('');
    setUnit('kg');
    setHarvestDate('');
    setQualityIndicators({});
    setQualityGrade('');
    setSelectedFarmer('');
    setLocation({ latitude: '', longitude: '', address: '' });
    setPhotos({});
    
    // Generate new batch number
    const date = new Date();
    const year = date?.getFullYear()?.toString()?.slice(-2);
    const month = (date?.getMonth() + 1)?.toString()?.padStart(2, '0');
    const day = date?.getDate()?.toString()?.padStart(2, '0');
    const random = Math.floor(Math.random() * 1000)?.toString()?.padStart(3, '0');
    setBatchNumber(`AY${year}${month}${day}${random}`);
  };

  const handleCancel = () => {
    navigate('/collector-dashboard');
  };

  const collectionData = {
    selectedHerb,
    quantity,
    unit,
    harvestDate,
    batchNumber,
    qualityIndicators,
    qualityGrade,
    selectedFarmer,
    location,
    photos
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="collector" 
        userName="Rajesh Kumar" 
        isOnline={isOnline}
        syncStatus={syncStatus}
      />
      <main className="pt-20 pb-8 px-4 lg:px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Herb Collection Recording
              </h1>
              <p className="text-text-secondary mt-1">
                Document herb harvest with quality tracking and batch management
              </p>
            </div>
          </div>

          {/* Status Indicator */}
          <OfflineStatusIndicator
            isOnline={isOnline}
            syncStatus={syncStatus}
            pendingRecords={pendingRecords}
            lastSyncTime={lastSyncTime}
          />

          {/* Location Error Display */}
          {locationError && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <span className="text-sm font-medium text-error">Location Error</span>
              </div>
              <p className="text-sm text-text-secondary mb-2">{locationError?.message}</p>
              <details className="text-xs text-text-secondary">
                <summary className="cursor-pointer hover:text-foreground">Technical Details</summary>
                <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-x-auto">
                  {JSON.stringify(locationError?.details, null, 2)}
                </pre>
              </details>
            </div>
          )}

          {/* Form Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <HerbSelectionForm
                selectedHerb={selectedHerb}
                onHerbChange={setSelectedHerb}
                quantity={quantity}
                onQuantityChange={(e) => setQuantity(e?.target?.value)}
                unit={unit}
                onUnitChange={setUnit}
                harvestDate={harvestDate}
                onHarvestDateChange={(e) => setHarvestDate(e?.target?.value)}
                batchNumber={batchNumber}
              />

              <QualityAssessmentForm
                qualityIndicators={qualityIndicators}
                onQualityChange={handleQualityChange}
                qualityGrade={qualityGrade}
                onQualityGradeChange={setQualityGrade}
              />

              <FarmerSelectionForm
                selectedFarmer={selectedFarmer}
                onFarmerChange={setSelectedFarmer}
                onAddNewFarmer={handleAddNewFarmer}
              />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <LocationTrackingForm
                location={location}
                onLocationChange={handleLocationChange}
                isGettingLocation={isGettingLocation}
                onGetCurrentLocation={handleGetCurrentLocation}
                gpsStatus={gpsStatus}
                locationError={locationError}
              />

              <PhotoCaptureForm
                photos={photos}
                onPhotoCapture={handlePhotoCapture}
                onPhotoRemove={handlePhotoRemove}
              />
            </div>
          </div>

          {/* Collection Summary */}
          <CollectionSummary
            collectionData={collectionData}
            onSave={handleSave}
            onSaveAndNew={handleSaveAndNew}
            onCancel={handleCancel}
            isSaving={isSaving}
          />
        </div>
      </main>
    </div>
  );
};

export default HerbCollectionRecording;
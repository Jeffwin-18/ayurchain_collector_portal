import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BatchDetailsCard = ({ 
  batch,
  className = "" 
}) => {
  if (!batch) {
    return (
      <div className={`bg-card border border-border rounded-lg shadow-elevation-1 p-6 ${className}`}>
        <div className="text-center">
          <Icon name="Package" size={48} className="mx-auto text-text-secondary mb-3" />
          <p className="text-text-secondary">Select a batch to view details</p>
        </div>
      </div>
    );
  }

  const getQualityIndicatorColor = (indicator) => {
    switch (indicator) {
      case 'fresh':
        return 'text-success bg-success/10 border-success/20';
      case 'organic':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'pesticide-free':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'properly-dried':
        return 'text-secondary bg-secondary/10 border-secondary/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              Batch Details
            </h3>
            <p className="text-sm text-text-secondary">
              Complete information about the selected batch
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Package" size={20} className="text-primary" />
            <span className="font-mono text-sm font-medium text-foreground">
              {batch?.batchNumber}
            </span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                Herb Type
              </label>
              <p className="text-sm font-medium text-foreground mt-1">
                {batch?.herbType}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                Quantity
              </label>
              <p className="text-sm font-medium text-foreground mt-1">
                {batch?.quantity} kg
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                Collection Date
              </label>
              <p className="text-sm font-medium text-foreground mt-1">
                {formatDate(batch?.collectionDate)}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                Collector
              </label>
              <p className="text-sm font-medium text-foreground mt-1">
                {batch?.collectorName}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                Collector ID
              </label>
              <p className="text-sm font-medium text-foreground mt-1">
                {batch?.collectorId}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                Farm Location
              </label>
              <p className="text-sm font-medium text-foreground mt-1">
                {batch?.farmLocation}
              </p>
            </div>
          </div>
        </div>

        {/* Quality Indicators */}
        <div>
          <label className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-3 block">
            Quality Indicators
          </label>
          <div className="flex flex-wrap gap-2">
            {batch?.qualityIndicators?.map((indicator, index) => (
              <div
                key={index}
                className={`px-3 py-1 rounded-full border text-xs font-medium ${getQualityIndicatorColor(indicator)}`}
              >
                {indicator?.replace('-', ' ')}
              </div>
            ))}
          </div>
        </div>

        {/* Farmer Information */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="User" size={16} className="mr-2" />
            Farmer Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-text-secondary">Name:</span>
              <span className="ml-2 font-medium text-foreground">{batch?.farmerName}</span>
            </div>
            <div>
              <span className="text-text-secondary">Contact:</span>
              <span className="ml-2 font-medium text-foreground">{batch?.farmerContact}</span>
            </div>
            <div>
              <span className="text-text-secondary">ID:</span>
              <span className="ml-2 font-medium text-foreground">{batch?.farmerGovId}</span>
            </div>
            <div>
              <span className="text-text-secondary">Farm Size:</span>
              <span className="ml-2 font-medium text-foreground">{batch?.farmSize} acres</span>
            </div>
          </div>
        </div>

        {/* Collection Photos */}
        {batch?.photos && batch?.photos?.length > 0 && (
          <div>
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-3 block">
              Collection Photos
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {batch?.photos?.map((photo, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square overflow-hidden rounded-lg border border-border">
                    <Image
                      src={photo?.url}
                      alt={`Collection photo ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {photo?.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GPS Coordinates */}
        <div className="bg-surface rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="MapPin" size={16} className="mr-2" />
            GPS Coordinates
          </h4>
          <div className="text-sm">
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-text-secondary">Latitude:</span>
                <span className="ml-2 font-mono font-medium text-foreground">{batch?.gpsCoordinates?.latitude}</span>
              </div>
              <div>
                <span className="text-text-secondary">Longitude:</span>
                <span className="ml-2 font-mono font-medium text-foreground">{batch?.gpsCoordinates?.longitude}</span>
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              Recorded at: {batch?.gpsCoordinates?.timestamp}
            </p>
          </div>
        </div>

        {/* Additional Notes */}
        {batch?.notes && (
          <div>
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2 block">
              Collection Notes
            </label>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-sm text-foreground">{batch?.notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchDetailsCard;
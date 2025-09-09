import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotoGallery = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPhotoTypeIcon = (type) => {
    switch (type) {
      case 'collection':
        return 'Camera';
      case 'farmer':
        return 'User';
      case 'herb':
        return 'Leaf';
      case 'environment':
        return 'Mountain';
      default:
        return 'Image';
    }
  };

  const getPhotoTypeColor = (type) => {
    switch (type) {
      case 'collection':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'farmer':
        return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'herb':
        return 'text-success bg-success/10 border-success/20';
      case 'environment':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Camera" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">Photo Documentation</h3>
      </div>
      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {photos?.map((photo, index) => (
          <div
            key={index}
            className="relative group cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="aspect-square rounded-lg overflow-hidden border border-border bg-muted">
              <Image
                src={photo?.url}
                alt={photo?.description}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            
            {/* Photo Type Badge */}
            <div className={`absolute top-2 left-2 flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium border ${getPhotoTypeColor(photo?.type)}`}>
              <Icon name={getPhotoTypeIcon(photo?.type)} size={12} />
              <span className="capitalize">{photo?.type}</span>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 rounded-lg flex items-center justify-center">
              <Icon 
                name="ZoomIn" 
                size={24} 
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
              />
            </div>
          </div>
        ))}
      </div>
      {/* Photo Details */}
      {photos?.length > 0 && (
        <div className="border-t border-border pt-4">
          <div className="text-sm text-text-secondary">
            <div className="flex items-center justify-between">
              <span>{photos?.length} photos captured</span>
              <span>All photos geo-tagged and timestamped</span>
            </div>
          </div>
        </div>
      )}
      {/* Modal for Selected Photo */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <Icon name={getPhotoTypeIcon(selectedPhoto?.type)} size={20} className="text-primary" />
                <h4 className="text-lg font-medium text-foreground capitalize">{selectedPhoto?.type} Photo</h4>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name="X" size={20} className="text-text-secondary" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <div className="mb-4">
                <Image
                  src={selectedPhoto?.url}
                  alt={selectedPhoto?.description}
                  className="w-full max-h-96 object-contain rounded-lg"
                />
              </div>

              {/* Photo Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-foreground mb-2">Details</h5>
                  <div className="space-y-1">
                    <p className="text-text-secondary">{selectedPhoto?.description}</p>
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={14} className="text-text-secondary" />
                      <span className="text-text-secondary">{formatTimestamp(selectedPhoto?.timestamp)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-foreground mb-2">Location</h5>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={14} className="text-text-secondary" />
                      <span className="text-text-secondary">
                        {selectedPhoto?.coordinates?.lat}, {selectedPhoto?.coordinates?.lng}
                      </span>
                    </div>
                    <p className="text-text-secondary text-xs">GPS coordinates at capture time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
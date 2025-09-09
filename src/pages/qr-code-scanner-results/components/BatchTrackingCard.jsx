import React from 'react';
import Icon from '../../../components/AppIcon';

const BatchTrackingCard = ({ batchData }) => {
  const trackingStages = [
    {
      stage: 'Collection',
      status: 'completed',
      timestamp: batchData?.collectionTimestamp,
      location: batchData?.collectionLocation,
      coordinates: batchData?.collectionCoordinates,
      details: `Collected by ${batchData?.collectorName}`
    },
    {
      stage: 'Quality Check',
      status: 'completed',
      timestamp: batchData?.qualityCheckTimestamp,
      location: 'Field Assessment',
      coordinates: batchData?.collectionCoordinates,
      details: 'Initial quality assessment completed'
    },
    {
      stage: 'Processing',
      status: 'completed',
      timestamp: batchData?.processingTimestamp,
      location: 'Processing Center',
      coordinates: batchData?.processingCoordinates,
      details: 'Cleaned, sorted, and prepared for testing'
    },
    {
      stage: 'Lab Testing',
      status: 'completed',
      timestamp: batchData?.testingTimestamp,
      location: batchData?.labLocation,
      coordinates: batchData?.labCoordinates,
      details: 'Chemical composition and purity analysis'
    },
    {
      stage: 'Certification',
      status: 'completed',
      timestamp: batchData?.certificationTimestamp,
      location: 'Quality Assurance',
      coordinates: batchData?.labCoordinates,
      details: 'Official certification issued'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return { icon: 'CheckCircle', color: 'text-success' };
      case 'in-progress':
        return { icon: 'Clock', color: 'text-accent' };
      case 'pending':
        return { icon: 'Circle', color: 'text-text-secondary' };
      default:
        return { icon: 'Circle', color: 'text-text-secondary' };
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Package" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">Batch Tracking</h3>
      </div>
      {/* Batch Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{batchData?.batchNumber}</div>
          <div className="text-sm text-text-secondary">Batch Number</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{batchData?.totalQuantity} kg</div>
          <div className="text-sm text-text-secondary">Total Quantity</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">{trackingStages?.filter(s => s?.status === 'completed')?.length}</div>
          <div className="text-sm text-text-secondary">Stages Completed</div>
        </div>
      </div>
      {/* Tracking Timeline */}
      <div className="space-y-4">
        <h4 className="text-base font-medium text-foreground">Tracking Timeline</h4>
        
        {trackingStages?.map((stage, index) => {
          const statusConfig = getStatusIcon(stage?.status);
          
          return (
            <div key={index} className="flex items-start space-x-4 pb-4 border-b border-border last:border-b-0 last:pb-0">
              {/* Status Icon */}
              <div className="flex-shrink-0 mt-1">
                <Icon name={statusConfig?.icon} size={20} className={statusConfig?.color} />
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h5 className="text-base font-medium text-foreground">{stage?.stage}</h5>
                  <span className="text-sm text-text-secondary">{formatTimestamp(stage?.timestamp)}</span>
                </div>
                
                <p className="text-sm text-text-secondary mb-2">{stage?.details}</p>
                
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{stage?.location}</span>
                  </div>
                  {stage?.coordinates && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Navigation" size={12} />
                      <span>{stage?.coordinates?.lat}, {stage?.coordinates?.lng}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Quality Assurance Status */}
      <div className="border-t border-border pt-6 mt-6">
        <h4 className="text-base font-medium text-foreground mb-4">Quality Assurance Workflow</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <div>
              <p className="text-sm font-medium text-foreground">All Checks Passed</p>
              <p className="text-xs text-text-secondary">Quality standards met at every stage</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <Icon name="Shield" size={16} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Compliance Verified</p>
              <p className="text-xs text-text-secondary">Meets all regulatory requirements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchTrackingCard;
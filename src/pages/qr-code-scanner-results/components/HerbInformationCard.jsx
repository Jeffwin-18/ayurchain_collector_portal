import React from 'react';
import Icon from '../../../components/AppIcon';

const HerbInformationCard = ({ herbData }) => {
  const qualityIndicators = [
    { key: 'organic', label: 'Organic', icon: 'Leaf', active: herbData?.qualityIndicators?.organic },
    { key: 'pesticideFree', label: 'Pesticide Free', icon: 'Shield', active: herbData?.qualityIndicators?.pesticideFree },
    { key: 'properlyDried', label: 'Properly Dried', icon: 'Sun', active: herbData?.qualityIndicators?.properlyDried },
    { key: 'fresh', label: 'Fresh', icon: 'Sparkles', active: herbData?.qualityIndicators?.fresh }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Leaf" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">Herb Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <h4 className="text-base font-medium text-foreground mb-2">Basic Details</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Herb Type:</span>
                <span className="text-sm font-medium text-foreground">{herbData?.herbType}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Batch Number:</span>
                <span className="text-sm font-mono text-foreground">{herbData?.batchNumber}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Quantity:</span>
                <span className="text-sm font-medium text-foreground">{herbData?.quantity} kg</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Harvest Date:</span>
                <span className="text-sm text-foreground">{herbData?.harvestDate}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Collection Date:</span>
                <span className="text-sm text-foreground">{herbData?.collectionDate}</span>
              </div>
            </div>
          </div>

          {/* Grade Information */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">Grade:</span>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <Icon
                      key={star}
                      name="Star"
                      size={16}
                      className={star <= herbData?.grade ? 'text-accent fill-current' : 'text-border'}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">Grade {herbData?.grade}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Indicators */}
        <div className="space-y-4">
          <h4 className="text-base font-medium text-foreground">Quality Indicators</h4>
          
          <div className="grid grid-cols-2 gap-3">
            {qualityIndicators?.map((indicator) => (
              <div
                key={indicator?.key}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
                  indicator?.active
                    ? 'bg-success/10 text-success border-success/20' :'bg-muted text-text-secondary border-border'
                }`}
              >
                <Icon name={indicator?.icon} size={16} />
                <span className="text-sm font-medium">{indicator?.label}</span>
                {indicator?.active && <Icon name="Check" size={14} />}
              </div>
            ))}
          </div>

          {/* Additional Notes */}
          {herbData?.notes && (
            <div className="pt-4 border-t border-border">
              <h5 className="text-sm font-medium text-foreground mb-2">Collection Notes</h5>
              <p className="text-sm text-text-secondary">{herbData?.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HerbInformationCard;
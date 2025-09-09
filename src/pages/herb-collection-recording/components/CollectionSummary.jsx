import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CollectionSummary = ({ 
  collectionData, 
  onSave, 
  onSaveAndNew, 
  onCancel, 
  isSaving 
}) => {
  const getQualityScore = () => {
    const indicators = collectionData?.qualityIndicators || {};
    return Object.values(indicators)?.filter(Boolean)?.length;
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'premium': return 'text-success bg-success/10 border-success/20';
      case 'standard': return 'text-primary bg-primary/10 border-primary/20';
      case 'commercial': return 'text-warning bg-warning/10 border-warning/20';
      case 'reject': return 'text-error bg-error/10 border-error/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const isComplete = () => {
    return collectionData?.selectedHerb && 
           collectionData?.quantity && 
           collectionData?.unit && 
           collectionData?.harvestDate && 
           collectionData?.selectedFarmer && 
           collectionData?.location?.latitude && 
           collectionData?.location?.longitude &&
           collectionData?.photos?.herb_sample;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Collection Summary
      </h3>
      <div className="space-y-4">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Herb Details</h4>
            <div className="p-3 bg-muted rounded-lg border border-border">
              <p className="text-sm text-foreground">
                {collectionData?.selectedHerb ? 
                  collectionData?.selectedHerb?.charAt(0)?.toUpperCase() + collectionData?.selectedHerb?.slice(1) : 
                  'Not selected'
                }
              </p>
              <p className="text-xs text-text-secondary">
                {collectionData?.quantity || '0'} {collectionData?.unit || 'units'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Harvest Information</h4>
            <div className="p-3 bg-muted rounded-lg border border-border">
              <p className="text-sm text-foreground">
                {collectionData?.harvestDate ? 
                  new Date(collectionData.harvestDate)?.toLocaleDateString('en-IN') : 
                  'Not specified'
                }
              </p>
              <p className="text-xs text-text-secondary">
                Batch: {collectionData?.batchNumber || 'Not generated'}
              </p>
            </div>
          </div>
        </div>

        {/* Quality Assessment */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Quality Assessment</h4>
          <div className="p-3 bg-muted rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground">Quality Score</span>
              <span className="text-sm font-semibold text-primary">
                {getQualityScore()}/6
              </span>
            </div>
            {collectionData?.qualityGrade && (
              <div className={`inline-flex items-center px-2 py-1 rounded-lg border text-xs font-medium ${getGradeColor(collectionData?.qualityGrade)}`}>
                {collectionData?.qualityGrade?.charAt(0)?.toUpperCase() + collectionData?.qualityGrade?.slice(1)} Grade
              </div>
            )}
          </div>
        </div>

        {/* Location & Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Location</h4>
            <div className="p-3 bg-muted rounded-lg border border-border">
              {collectionData?.location?.latitude && collectionData?.location?.longitude ? (
                <div className="space-y-1">
                  <p className="text-xs text-text-secondary">
                    {collectionData?.location?.latitude?.toFixed(6)}, {collectionData?.location?.longitude?.toFixed(6)}
                  </p>
                  {collectionData?.location?.address && (
                    <p className="text-sm text-foreground">{collectionData?.location?.address}</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-text-secondary">Location not captured</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Documentation</h4>
            <div className="p-3 bg-muted rounded-lg border border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Camera" size={16} className="text-text-secondary" />
                <span className="text-sm text-foreground">
                  {Object.keys(collectionData?.photos || {})?.length} photos captured
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Status */}
        <div className={`p-4 rounded-lg border ${isComplete() ? 'bg-success/10 border-success/20' : 'bg-warning/10 border-warning/20'}`}>
          <div className="flex items-center space-x-2">
            <Icon 
              name={isComplete() ? "CheckCircle" : "AlertCircle"} 
              size={16} 
              className={isComplete() ? "text-success" : "text-warning"} 
            />
            <span className={`text-sm font-medium ${isComplete() ? "text-success" : "text-warning"}`}>
              {isComplete() ? 'Collection record is complete' : 'Some required fields are missing'}
            </span>
          </div>
          {!isComplete() && (
            <p className="text-xs text-warning mt-1 ml-6">
              Please ensure all required fields are filled before saving.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={onSave}
            loading={isSaving}
            disabled={!isComplete()}
            className="flex-1"
          >
            Save Collection
          </Button>
          
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
            onClick={onSaveAndNew}
            disabled={!isComplete() || isSaving}
            className="flex-1"
          >
            Save & Add New
          </Button>
          
          <Button
            variant="ghost"
            iconName="X"
            iconPosition="left"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollectionSummary;
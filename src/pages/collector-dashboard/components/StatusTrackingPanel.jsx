import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusTrackingPanel = ({ 
  currentStage = 'collection',
  stages = [],
  syncStatus = 'synced',
  pendingCount = 0,
  className = ""
}) => {
  const defaultStages = [
    { id: 'collection', label: 'Collection', icon: 'Package' },
    { id: 'quality-check', label: 'Quality Check', icon: 'CheckCircle' },
    { id: 'lab-testing', label: 'Lab Testing', icon: 'FlaskConical' },
    { id: 'certification', label: 'Certification', icon: 'Award' },
    { id: 'ready', label: 'Ready for Market', icon: 'Truck' }
  ];

  const processStages = stages?.length > 0 ? stages : defaultStages;

  const getStageStatus = (stageId) => {
    const currentIndex = processStages?.findIndex(stage => stage?.id === currentStage);
    const stageIndex = processStages?.findIndex(stage => stage?.id === stageId);
    
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'pending';
  };

  const getStageColors = (status) => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-success',
          text: 'text-white',
          border: 'border-success',
          icon: 'text-white'
        };
      case 'current':
        return {
          bg: 'bg-primary',
          text: 'text-white',
          border: 'border-primary',
          icon: 'text-white'
        };
      default:
        return {
          bg: 'bg-muted',
          text: 'text-text-secondary',
          border: 'border-border',
          icon: 'text-text-secondary'
        };
    }
  };

  const getSyncStatusConfig = () => {
    switch (syncStatus) {
      case 'syncing':
        return {
          icon: 'RefreshCw',
          color: 'text-accent',
          bgColor: 'bg-accent/10',
          label: 'Syncing...',
          animate: 'animate-spin'
        };
      case 'pending':
        return {
          icon: 'Clock',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          label: `${pendingCount} pending`,
          animate: ''
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          color: 'text-error',
          bgColor: 'bg-error/10',
          label: 'Sync failed',
          animate: ''
        };
      default:
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bgColor: 'bg-success/10',
          label: 'Up to date',
          animate: ''
        };
    }
  };

  const syncConfig = getSyncStatusConfig();

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Collection Progress</h3>
          <p className="text-sm text-text-secondary">Track your collection workflow</p>
        </div>
        
        {/* Sync Status */}
        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${syncConfig?.bgColor}`}>
          <Icon 
            name={syncConfig?.icon} 
            size={16} 
            className={`${syncConfig?.color} ${syncConfig?.animate}`} 
          />
          <span className={`text-sm font-medium ${syncConfig?.color}`}>
            {syncConfig?.label}
          </span>
        </div>
      </div>
      {/* Progress Steps - Desktop */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between">
          {processStages?.map((stage, index) => {
            const status = getStageStatus(stage?.id);
            const colors = getStageColors(status);
            const isLast = index === processStages?.length - 1;

            return (
              <div key={stage?.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full border-2 ${colors?.border} ${colors?.bg} flex items-center justify-center transition-smooth`}>
                    {status === 'completed' ? (
                      <Icon name="Check" size={20} className={colors?.icon} />
                    ) : (
                      <Icon name={stage?.icon} size={20} className={colors?.icon} />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${colors?.text === 'text-white' ? 'text-foreground' : colors?.text}`}>
                      {stage?.label}
                    </div>
                  </div>
                </div>
                {/* Connector Line */}
                {!isLast && (
                  <div className="flex-1 mx-4">
                    <div className={`h-0.5 ${status === 'completed' ? 'bg-success' : 'bg-border'} transition-smooth`}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Progress Steps - Mobile */}
      <div className="md:hidden space-y-4">
        {processStages?.map((stage, index) => {
          const status = getStageStatus(stage?.id);
          const colors = getStageColors(status);

          return (
            <div key={stage?.id} className="flex items-center space-x-4">
              {/* Step Circle */}
              <div className={`w-10 h-10 rounded-full border-2 ${colors?.border} ${colors?.bg} flex items-center justify-center flex-shrink-0 transition-smooth`}>
                {status === 'completed' ? (
                  <Icon name="Check" size={16} className={colors?.icon} />
                ) : (
                  <Icon name={stage?.icon} size={16} className={colors?.icon} />
                )}
              </div>
              {/* Step Info */}
              <div className="flex-1">
                <div className={`text-sm font-medium ${colors?.text === 'text-white' ? 'text-foreground' : colors?.text}`}>
                  {stage?.label}
                </div>
                {status === 'current' && (
                  <div className="text-xs text-primary mt-1">Current stage</div>
                )}
              </div>
              {/* Status Indicator */}
              <div className="flex-shrink-0">
                {status === 'completed' && (
                  <Icon name="CheckCircle" size={20} className="text-success" />
                )}
                {status === 'current' && (
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse-gentle"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Current Stage Info */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Current Stage</span>
        </div>
        <p className="text-sm text-text-secondary">
          {currentStage === 'collection' && "Collecting herbs from registered farmers"}
          {currentStage === 'quality-check' && "Performing initial quality assessment"}
          {currentStage === 'lab-testing' && "Samples sent for laboratory testing"}
          {currentStage === 'certification' && "Awaiting official certification"}
          {currentStage === 'ready' && "Ready for market distribution"}
        </p>
      </div>
    </div>
  );
};

export default StatusTrackingPanel;
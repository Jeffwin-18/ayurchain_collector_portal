import React from 'react';
import Icon from '../../../components/AppIcon';

const OfflineStatusIndicator = ({ 
  isOnline, 
  syncStatus, 
  pendingRecords,
  lastSyncTime 
}) => {
  const getSyncStatusConfig = () => {
    switch (syncStatus) {
      case 'syncing':
        return {
          icon: 'RefreshCw',
          color: 'text-accent',
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/20',
          label: 'Syncing data...',
          animate: 'animate-spin'
        };
      case 'pending':
        return {
          icon: 'Clock',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          label: `${pendingRecords} records pending`,
          animate: ''
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          label: 'Sync failed',
          animate: ''
        };
      default:
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          label: 'All data synced',
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
      label: 'Offline Mode'
    };
  };

  const syncConfig = getSyncStatusConfig();
  const connectivityConfig = getConnectivityConfig();

  const formatLastSync = () => {
    if (!lastSyncTime) return 'Never';
    const now = new Date();
    const sync = new Date(lastSyncTime);
    const diffMinutes = Math.floor((now - sync) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return sync?.toLocaleDateString();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-elevation-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        {/* Status Indicators */}
        <div className="flex items-center space-x-4">
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

          {/* Sync Status */}
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${syncConfig?.bgColor} ${syncConfig?.borderColor}`}>
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

        {/* Last Sync Time */}
        <div className="text-xs text-text-secondary">
          Last sync: {formatLastSync()}
        </div>
      </div>
      {/* Offline Notice */}
      {!isOnline && (
        <div className="mt-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-warning flex-shrink-0 mt-0.5" />
            <div className="text-sm text-warning">
              <p className="font-medium">Working in offline mode</p>
              <p className="text-xs mt-1">
                Your collection data will be saved locally and synced automatically when internet connection is restored.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Local Storage Confirmation */}
      <div className="mt-3 flex items-center space-x-2 text-xs text-text-secondary">
        <Icon name="HardDrive" size={14} />
        <span>Data saved to local storage</span>
        <div className="w-2 h-2 bg-success rounded-full animate-pulse-gentle"></div>
      </div>
    </div>
  );
};

export default OfflineStatusIndicator;
import React from 'react';
import Icon from '../AppIcon';

const StatusIndicatorPanel = ({ 
  isOnline = true,
  syncStatus = 'synced',
  pendingItems = 0,
  gpsStatus = 'available',
  lastSyncTime = null,
  className = ""
}) => {
  const getSyncStatusConfig = () => {
    switch (syncStatus) {
      case 'syncing':
        return {
          icon: 'RefreshCw',
          color: 'text-accent',
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/20',
          label: 'Syncing...',
          animate: 'animate-spin'
        };
      case 'pending':
        return {
          icon: 'Clock',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          label: `${pendingItems} pending`,
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
          label: 'Up to date',
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

  const getGpsConfig = () => {
    switch (gpsStatus) {
      case 'available':
        return {
          icon: 'MapPin',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          label: 'GPS Ready'
        };
      case 'searching':
        return {
          icon: 'MapPin',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          label: 'Searching...'
        };
      default:
        return {
          icon: 'MapPinOff',
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          label: 'GPS Off'
        };
    }
  };

  const syncConfig = getSyncStatusConfig();
  const connectivityConfig = getConnectivityConfig();
  const gpsConfig = getGpsConfig();

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
    <div className={`bg-card rounded-lg border border-border p-4 shadow-elevation-1 ${className}`}>
      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex items-center space-x-6">
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

          {/* GPS Status */}
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${gpsConfig?.bgColor} ${gpsConfig?.borderColor}`}>
            <Icon 
              name={gpsConfig?.icon} 
              size={16} 
              className={gpsConfig?.color} 
            />
            <span className={`text-sm font-medium ${gpsConfig?.color}`}>
              {gpsConfig?.label}
            </span>
          </div>
        </div>

        {/* Last Sync Time */}
        <div className="text-xs text-text-secondary">
          Last sync: {formatLastSync()}
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="sm:hidden space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {/* Connectivity */}
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

          {/* GPS */}
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${gpsConfig?.bgColor} ${gpsConfig?.borderColor}`}>
            <Icon 
              name={gpsConfig?.icon} 
              size={16} 
              className={gpsConfig?.color} 
            />
            <span className={`text-sm font-medium ${gpsConfig?.color}`}>
              {gpsConfig?.label}
            </span>
          </div>
        </div>

        {/* Sync Status - Full Width */}
        <div className={`flex items-center justify-between px-3 py-2 rounded-lg border ${syncConfig?.bgColor} ${syncConfig?.borderColor}`}>
          <div className="flex items-center space-x-2">
            <Icon 
              name={syncConfig?.icon} 
              size={16} 
              className={`${syncConfig?.color} ${syncConfig?.animate}`} 
            />
            <span className={`text-sm font-medium ${syncConfig?.color}`}>
              {syncConfig?.label}
            </span>
          </div>
          <span className="text-xs text-text-secondary">
            {formatLastSync()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusIndicatorPanel;
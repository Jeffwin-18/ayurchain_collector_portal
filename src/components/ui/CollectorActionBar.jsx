import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const CollectorActionBar = ({ 
  isOffline = false, 
  pendingSyncCount = 0,
  className = "" 
}) => {
  const navigate = useNavigate();

  const handleNewCollection = () => {
    navigate('/herb-collection-recording');
  };

  const handleRegisterFarmer = () => {
    navigate('/farmer-registration');
  };

  const handleScanQR = () => {
    navigate('/qr-code-scanner-results');
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-4 shadow-elevation-1 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <Button
            variant="default"
            size="lg"
            iconName="Plus"
            iconPosition="left"
            onClick={handleNewCollection}
            className="flex-1 sm:flex-none"
            disabled={isOffline}
          >
            New Collection
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            iconName="UserPlus"
            iconPosition="left"
            onClick={handleRegisterFarmer}
            className="flex-1 sm:flex-none"
          >
            Register Farmer
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            iconName="QrCode"
            iconPosition="left"
            onClick={handleScanQR}
            className="flex-1 sm:flex-none"
          >
            Scan QR
          </Button>
        </div>

        {/* Sync Status */}
        {pendingSyncCount > 0 && (
          <div className="flex items-center justify-center sm:justify-start">
            <div className="flex items-center space-x-2 px-3 py-2 bg-warning/10 text-warning rounded-lg border border-warning/20">
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse-gentle"></div>
              <span className="text-sm font-medium">
                {pendingSyncCount} pending sync
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Offline Notice */}
      {isOffline && (
        <div className="mt-3 p-3 bg-muted rounded-lg border border-border">
          <div className="flex items-center space-x-2 text-text-secondary">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span className="text-sm">
              Working offline - data will sync when connection is restored
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectorActionBar;
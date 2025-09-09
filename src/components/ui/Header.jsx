import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ 
  userRole = 'collector', 
  userName = 'User', 
  isOnline = true, 
  syncStatus = 'synced',
  onLogout = () => {} 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getNavigationItems = () => {
    switch (userRole) {
      case 'collector':
        return [
          { path: '/collector-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
          { path: '/farmer-registration', label: 'Register Farmer', icon: 'UserPlus' },
          { path: '/herb-collection-recording', label: 'Record Collection', icon: 'Clipboard' },
          { path: '/qr-code-scanner-results', label: 'QR Scanner', icon: 'QrCode' }
        ];
      case 'lab-technician':
        return [
          { path: '/lab-testing-interface', label: 'Lab Testing', icon: 'FlaskConical' },
          { path: '/qr-code-scanner-results', label: 'QR Scanner', icon: 'QrCode' }
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();
  const visibleItems = navigationItems?.slice(0, 4);
  const overflowItems = navigationItems?.slice(4);

  const getSyncStatusIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return <Icon name="RefreshCw" size={16} className="animate-spin text-accent" />;
      case 'pending':
        return <Icon name="Clock" size={16} className="text-warning" />;
      case 'error':
        return <Icon name="AlertCircle" size={16} className="text-error" />;
      default:
        return <Icon name="CheckCircle" size={16} className="text-success" />;
    }
  };

  const getConnectivityStatus = () => {
    return isOnline ? (
      <Icon name="Wifi" size={16} className="text-success" />
    ) : (
      <Icon name="WifiOff" size={16} className="text-warning" />
    );
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    onLogout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Leaf" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-heading font-semibold text-foreground">
                AyurChain
              </h1>
              <p className="text-xs text-text-secondary -mt-1">Collector Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-1">
          {visibleItems?.map((item) => (
            <Button
              key={item?.path}
              variant={location?.pathname === item?.path ? "default" : "ghost"}
              size="sm"
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              onClick={() => handleNavigation(item?.path)}
              className="text-sm"
            >
              {item?.label}
            </Button>
          ))}
          
          {overflowItems?.length > 0 && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                iconSize={16}
              >
                More
              </Button>
            </div>
          )}
        </nav>

        {/* Status & User Section */}
        <div className="flex items-center space-x-3">
          {/* Status Indicators - Collector Only */}
          {userRole === 'collector' && (
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-muted rounded-lg">
              <div className="flex items-center space-x-1">
                {getConnectivityStatus()}
                <span className="text-xs text-text-secondary">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center space-x-1">
                {getSyncStatusIcon()}
                <span className="text-xs text-text-secondary capitalize">
                  {syncStatus}
                </span>
              </div>
            </div>
          )}

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-foreground">
                {userName}
              </span>
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 py-1 z-1100">
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-sm font-medium text-foreground">{userName}</p>
                  <p className="text-xs text-text-secondary capitalize">{userRole?.replace('-', ' ')}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-muted transition-smooth flex items-center space-x-2"
                >
                  <Icon name="LogOut" size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-card">
        <div className="flex items-center justify-around py-2">
          {visibleItems?.slice(0, 4)?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center space-y-1 px-2 py-1 rounded-lg transition-smooth ${
                location?.pathname === item?.path
                  ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span className="text-xs font-medium">{item?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
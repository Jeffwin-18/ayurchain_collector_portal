import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue, className = "" }) => {
  const getTrendColor = () => {
    if (!trend) return '';
    return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-text-secondary';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 shadow-elevation-1 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-foreground">{value}</h3>
            {trend && trendValue && (
              <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
                <Icon name={getTrendIcon()} size={16} />
                <span className="text-sm font-medium">{trendValue}</span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-text-secondary mt-1">{subtitle}</p>
          )}
        </div>
        <div className="ml-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={24} className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
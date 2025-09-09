import React from 'react';
import Icon from '../../../components/AppIcon';


const FarmerDetailsCard = ({ farmerData }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="User" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">Farmer Information</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farmer Profile */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="User" size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-foreground">{farmerData?.name}</h4>
              <p className="text-sm text-text-secondary">Registered Farmer</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} className="text-text-secondary" />
              <span className="text-sm text-foreground">{farmerData?.phone}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="CreditCard" size={16} className="text-text-secondary" />
              <span className="text-sm text-foreground">ID: {farmerData?.governmentId}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={16} className="text-text-secondary" />
              <span className="text-sm text-foreground">Registered: {farmerData?.registrationDate}</span>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-lg border border-success/20">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Verified Farmer</span>
          </div>
        </div>

        {/* Farm Location */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="MapPin" size={16} className="text-primary" />
            <h4 className="text-base font-medium text-foreground">Farm Location</h4>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-foreground">{farmerData?.farmAddress}</p>
            <p className="text-sm text-text-secondary">
              {farmerData?.village}, {farmerData?.district}, {farmerData?.state}
            </p>
            <p className="text-sm text-text-secondary">PIN: {farmerData?.pincode}</p>
          </div>

          {/* Map */}
          <div className="w-full h-48 rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={`${farmerData?.name}'s Farm Location`}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${farmerData?.coordinates?.lat},${farmerData?.coordinates?.lng}&z=14&output=embed`}
              className="border-0"
            />
          </div>

          {/* Coordinates */}
          <div className="text-xs text-text-secondary">
            Coordinates: {farmerData?.coordinates?.lat}, {farmerData?.coordinates?.lng}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDetailsCard;
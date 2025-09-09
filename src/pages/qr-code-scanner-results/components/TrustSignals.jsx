import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = ({ certifications }) => {
  const trustBadges = [
    {
      id: 'government',
      name: 'Government Certified',
      icon: 'Award',
      color: 'text-primary bg-primary/10 border-primary/20',
      verified: certifications?.government
    },
    {
      id: 'organic',
      name: 'Organic Certified',
      icon: 'Leaf',
      color: 'text-success bg-success/10 border-success/20',
      verified: certifications?.organic
    },
    {
      id: 'lab',
      name: 'Lab Verified',
      icon: 'FlaskConical',
      color: 'text-secondary bg-secondary/10 border-secondary/20',
      verified: certifications?.lab
    },
    {
      id: 'quality',
      name: 'Quality Assured',
      icon: 'CheckCircle',
      color: 'text-accent bg-accent/10 border-accent/20',
      verified: certifications?.quality
    }
  ];

  const authorityEndorsements = [
    {
      name: 'Ministry of AYUSH',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      status: 'verified'
    },
    {
      name: 'FSSAI',
      logo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop&crop=center',
      status: 'verified'
    },
    {
      name: 'State Agriculture Dept',
      logo: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=100&h=100&fit=crop&crop=center',
      status: 'verified'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Shield" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">Trust & Certifications</h3>
      </div>
      {/* Trust Badges */}
      <div className="mb-6">
        <h4 className="text-base font-medium text-foreground mb-4">Certifications</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {trustBadges?.map((badge) => (
            <div
              key={badge?.id}
              className={`flex flex-col items-center space-y-2 p-4 rounded-lg border transition-all ${
                badge?.verified 
                  ? badge?.color 
                  : 'text-text-secondary bg-muted border-border opacity-50'
              }`}
            >
              <Icon name={badge?.icon} size={24} />
              <span className="text-xs font-medium text-center">{badge?.name}</span>
              {badge?.verified && (
                <Icon name="Check" size={14} className="text-current" />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Authority Endorsements */}
      <div className="border-t border-border pt-6">
        <h4 className="text-base font-medium text-foreground mb-4">Authority Endorsements</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {authorityEndorsements?.map((authority, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-muted rounded-lg border border-border"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-card border border-border flex-shrink-0">
                <Image
                  src={authority?.logo}
                  alt={`${authority?.name} Logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{authority?.name}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon name="CheckCircle" size={12} className="text-success" />
                  <span className="text-xs text-success">Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Features */}
      <div className="border-t border-border pt-6 mt-6">
        <h4 className="text-base font-medium text-foreground mb-4">Security Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-success/5 rounded-lg border border-success/20">
            <Icon name="Lock" size={16} className="text-success" />
            <div>
              <p className="text-sm font-medium text-foreground">Blockchain Verified</p>
              <p className="text-xs text-text-secondary">Immutable supply chain record</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <Icon name="QrCode" size={16} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">QR Authenticated</p>
              <p className="text-xs text-text-secondary">Tamper-proof verification</p>
            </div>
          </div>
        </div>
      </div>
      {/* Trust Score */}
      <div className="border-t border-border pt-6 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-medium text-foreground">Trust Score</h4>
            <p className="text-sm text-text-secondary">Based on verification completeness</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5]?.map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size={20}
                  className={star <= 5 ? 'text-accent fill-current' : 'text-border'}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-foreground">5.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;
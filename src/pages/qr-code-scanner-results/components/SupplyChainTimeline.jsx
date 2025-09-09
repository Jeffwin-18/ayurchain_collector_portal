import React from 'react';
import Icon from '../../../components/AppIcon';

const SupplyChainTimeline = ({ batchData }) => {
  const timelineStages = [
    {
      id: 'collection',
      title: 'Collection',
      date: batchData?.collectionDate,
      location: batchData?.farmLocation,
      status: 'completed',
      icon: 'Leaf',
      details: `Collected by ${batchData?.collectorName}`
    },
    {
      id: 'transport',
      title: 'Transport',
      date: batchData?.transportDate,
      location: 'Processing Center',
      status: 'completed',
      icon: 'Truck',
      details: 'Transported under controlled conditions'
    },
    {
      id: 'testing',
      title: 'Lab Testing',
      date: batchData?.testingDate,
      location: batchData?.labName,
      status: 'completed',
      icon: 'FlaskConical',
      details: `Certificate: ${batchData?.certificateNumber}`
    },
    {
      id: 'certification',
      title: 'Certification',
      date: batchData?.certificationDate,
      location: 'Quality Assurance',
      status: 'completed',
      icon: 'Award',
      details: 'Quality verified and certified'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'in-progress':
        return 'text-accent bg-accent/10 border-accent/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Route" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">Supply Chain Journey</h3>
      </div>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

        {/* Timeline Items */}
        <div className="space-y-6">
          {timelineStages?.map((stage, index) => (
            <div key={stage?.id} className="relative flex items-start space-x-4">
              {/* Timeline Icon */}
              <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${getStatusColor(stage?.status)}`}>
                <Icon name={stage?.icon} size={20} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h4 className="text-base font-medium text-foreground">{stage?.title}</h4>
                  <span className="text-sm text-text-secondary">{stage?.date}</span>
                </div>
                
                <p className="text-sm text-text-secondary mb-1">{stage?.location}</p>
                <p className="text-sm text-foreground">{stage?.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplyChainTimeline;
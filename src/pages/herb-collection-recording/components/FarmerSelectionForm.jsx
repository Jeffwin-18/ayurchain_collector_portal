import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FarmerSelectionForm = ({ 
  selectedFarmer, 
  onFarmerChange, 
  onAddNewFarmer 
}) => {
  const farmerOptions = [
    { 
      value: 'farmer-001', 
      label: 'Rajesh Kumar - ID: AY001234',
      description: 'Village: Rampur, Contact: +91 98765 43210'
    },
    { 
      value: 'farmer-002', 
      label: 'Priya Sharma - ID: AY001235',
      description: 'Village: Greenfield, Contact: +91 98765 43211'
    },
    { 
      value: 'farmer-003', 
      label: 'Mohan Singh - ID: AY001236',
      description: 'Village: Herbal Valley, Contact: +91 98765 43212'
    },
    { 
      value: 'farmer-004', 
      label: 'Sunita Devi - ID: AY001237',
      description: 'Village: Organic Hills, Contact: +91 98765 43213'
    },
    { 
      value: 'farmer-005', 
      label: 'Amit Patel - ID: AY001238',
      description: 'Village: Medicinal Gardens, Contact: +91 98765 43214'
    }
  ];

  const selectedFarmerData = farmerOptions?.find(f => f?.value === selectedFarmer);

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Farmer Information
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="UserPlus"
          iconPosition="left"
          onClick={onAddNewFarmer}
        >
          Add New
        </Button>
      </div>
      <div className="space-y-4">
        <Select
          label="Select Farmer"
          placeholder="Search and select farmer"
          options={farmerOptions}
          value={selectedFarmer}
          onChange={onFarmerChange}
          searchable
          required
        />

        {selectedFarmerData && (
          <div className="p-4 bg-muted rounded-lg border border-border">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={20} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {selectedFarmerData?.label?.split(' - ')?.[0]}
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  {selectedFarmerData?.description}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} className="text-text-secondary" />
                    <span className="text-xs text-text-secondary">
                      {selectedFarmerData?.description?.split(', ')?.[0]?.replace('Village: ', '')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Phone" size={14} className="text-text-secondary" />
                    <span className="text-xs text-text-secondary">
                      {selectedFarmerData?.description?.split(', ')?.[1]?.replace('Contact: ', '')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerSelectionForm;
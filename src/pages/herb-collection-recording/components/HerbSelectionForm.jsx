import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const HerbSelectionForm = ({ 
  selectedHerb, 
  onHerbChange, 
  quantity, 
  onQuantityChange, 
  unit, 
  onUnitChange,
  harvestDate,
  onHarvestDateChange,
  batchNumber 
}) => {
  const herbOptions = [
    { value: 'ashwagandha', label: 'Ashwagandha (Withania somnifera)' },
    { value: 'turmeric', label: 'Turmeric (Curcuma longa)' },
    { value: 'tulsi', label: 'Tulsi (Ocimum sanctum)' },
    { value: 'neem', label: 'Neem (Azadirachta indica)' },
    { value: 'brahmi', label: 'Brahmi (Bacopa monnieri)' },
    { value: 'amla', label: 'Amla (Phyllanthus emblica)' },
    { value: 'giloy', label: 'Giloy (Tinospora cordifolia)' },
    { value: 'shatavari', label: 'Shatavari (Asparagus racemosus)' },
    { value: 'arjuna', label: 'Arjuna (Terminalia arjuna)' },
    { value: 'triphala', label: 'Triphala Mix' }
  ];

  const unitOptions = [
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'grams', label: 'Grams (g)' },
    { value: 'bundles', label: 'Bundles' },
    { value: 'pieces', label: 'Pieces' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Herb Collection Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Select
            label="Herb Type"
            placeholder="Select herb type"
            options={herbOptions}
            value={selectedHerb}
            onChange={onHerbChange}
            searchable
            required
          />
        </div>

        <div>
          <Input
            label="Quantity"
            type="number"
            placeholder="Enter quantity"
            value={quantity}
            onChange={onQuantityChange}
            min="0.1"
            step="0.1"
            required
          />
        </div>

        <div>
          <Select
            label="Unit"
            placeholder="Select unit"
            options={unitOptions}
            value={unit}
            onChange={onUnitChange}
            required
          />
        </div>

        <div>
          <Input
            label="Harvest Date"
            type="date"
            value={harvestDate}
            onChange={onHarvestDateChange}
            max={new Date()?.toISOString()?.split('T')?.[0]}
            required
          />
        </div>

        <div>
          <Input
            label="Batch Number"
            type="text"
            value={batchNumber}
            disabled
            description="Auto-generated unique identifier"
          />
        </div>
      </div>
    </div>
  );
};

export default HerbSelectionForm;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuickFilters = ({ 
  onFilterChange = () => {},
  onSearchChange = () => {},
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: '',
    herbType: '',
    location: '',
    status: '',
    quality: ''
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'this-week', label: 'This Week' },
    { value: 'last-week', label: 'Last Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' }
  ];

  const herbTypeOptions = [
    { value: '', label: 'All Herbs' },
    { value: 'ashwagandha', label: 'Ashwagandha' },
    { value: 'turmeric', label: 'Turmeric' },
    { value: 'neem', label: 'Neem' },
    { value: 'tulsi', label: 'Tulsi' },
    { value: 'brahmi', label: 'Brahmi' },
    { value: 'amla', label: 'Amla' },
    { value: 'giloy', label: 'Giloy' },
    { value: 'shatavari', label: 'Shatavari' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'rampur', label: 'Village Rampur' },
    { value: 'khanpur', label: 'Village Khanpur' },
    { value: 'sultanpur', label: 'Village Sultanpur' },
    { value: 'mohammadpur', label: 'Village Mohammadpur' },
    { value: 'hasanpur', label: 'Village Hasanpur' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const qualityOptions = [
    { value: '', label: 'All Quality' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...selectedFilters,
      [filterType]: value
    };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: '',
      herbType: '',
      location: '',
      status: '',
      quality: ''
    };
    setSelectedFilters(clearedFilters);
    setSearchTerm('');
    onFilterChange(clearedFilters);
    onSearchChange('');
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters)?.filter(value => value !== '')?.length;
  };

  const hasActiveFilters = getActiveFilterCount() > 0 || searchTerm !== '';

  return (
    <div className={`bg-card rounded-lg border border-border p-4 shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {getActiveFilterCount() + (searchTerm ? 1 : 0)} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName={showAdvanced ? 'ChevronUp' : 'ChevronDown'}
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Less' : 'More'}
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={clearAllFilters}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search by batch number, farmer name, or herb type..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>
      {/* Basic Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={selectedFilters?.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
          placeholder="Select date range"
        />
        
        <Select
          label="Herb Type"
          options={herbTypeOptions}
          value={selectedFilters?.herbType}
          onChange={(value) => handleFilterChange('herbType', value)}
          placeholder="Select herb type"
          searchable
        />
        
        <Select
          label="Location"
          options={locationOptions}
          value={selectedFilters?.location}
          onChange={(value) => handleFilterChange('location', value)}
          placeholder="Select location"
        />
      </div>
      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
          <Select
            label="Status"
            options={statusOptions}
            value={selectedFilters?.status}
            onChange={(value) => handleFilterChange('status', value)}
            placeholder="Select status"
          />
          
          <Select
            label="Quality Grade"
            options={qualityOptions}
            value={selectedFilters?.quality}
            onChange={(value) => handleFilterChange('quality', value)}
            placeholder="Select quality"
          />
        </div>
      )}
      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                <Icon name="Search" size={12} />
                <span>"{searchTerm}"</span>
                <button
                  onClick={() => handleSearchChange({ target: { value: '' } })}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={10} />
                </button>
              </div>
            )}
            
            {Object.entries(selectedFilters)?.map(([key, value]) => {
              if (!value) return null;
              
              const getFilterLabel = () => {
                switch (key) {
                  case 'dateRange':
                    return dateRangeOptions?.find(opt => opt?.value === value)?.label;
                  case 'herbType':
                    return herbTypeOptions?.find(opt => opt?.value === value)?.label;
                  case 'location':
                    return locationOptions?.find(opt => opt?.value === value)?.label;
                  case 'status':
                    return statusOptions?.find(opt => opt?.value === value)?.label;
                  case 'quality':
                    return qualityOptions?.find(opt => opt?.value === value)?.label;
                  default:
                    return value;
                }
              };

              return (
                <div
                  key={key}
                  className="flex items-center space-x-1 px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                >
                  <span>{getFilterLabel()}</span>
                  <button
                    onClick={() => handleFilterChange(key, '')}
                    className="ml-1 hover:bg-accent/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={10} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickFilters;
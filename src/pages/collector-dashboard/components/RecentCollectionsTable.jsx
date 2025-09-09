import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentCollectionsTable = ({ collections = [], onViewDetails }) => {
  const [sortField, setSortField] = useState('collectionDate');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedCollections = [...collections]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'collectionDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const getQualityBadgeColor = (quality) => {
    switch (quality?.toLowerCase()) {
      case 'excellent':
        return 'bg-success/10 text-success border-success/20';
      case 'good':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'fair':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'in-progress':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={16} className="text-text-secondary" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={16} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('batchNumber')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Batch Number</span>
                  <SortIcon field="batchNumber" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('herbType')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Herb Type</span>
                  <SortIcon field="herbType" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('quantity')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Quantity</span>
                  <SortIcon field="quantity" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('farmerName')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Farmer</span>
                  <SortIcon field="farmerName" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('collectionDate')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Date</span>
                  <SortIcon field="collectionDate" />
                </button>
              </th>
              <th className="text-left p-4">Quality</th>
              <th className="text-left p-4">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedCollections?.map((collection) => (
              <tr key={collection?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                <td className="p-4">
                  <div className="font-mono text-sm font-medium text-foreground">
                    {collection?.batchNumber}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Leaf" size={16} className="text-success" />
                    <span className="text-sm font-medium text-foreground">
                      {collection?.herbType}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">
                    {collection?.quantity} {collection?.unit}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{collection?.farmerName}</span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-text-secondary">
                    {formatDate(collection?.collectionDate)}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getQualityBadgeColor(collection?.quality)}`}>
                    {collection?.quality}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(collection?.status)}`}>
                    {collection?.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => onViewDetails(collection)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border">
        {sortedCollections?.map((collection) => (
          <div key={collection?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-mono text-sm font-medium text-foreground mb-1">
                  {collection?.batchNumber}
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Leaf" size={14} className="text-success" />
                  <span className="text-sm font-medium text-foreground">
                    {collection?.herbType}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(collection?.status)}`}>
                  {collection?.status}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getQualityBadgeColor(collection?.quality)}`}>
                  {collection?.quality}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div>
                <span className="text-text-secondary">Quantity:</span>
                <div className="font-medium text-foreground">
                  {collection?.quantity} {collection?.unit}
                </div>
              </div>
              <div>
                <span className="text-text-secondary">Farmer:</span>
                <div className="font-medium text-foreground">{collection?.farmerName}</div>
              </div>
              <div className="col-span-2">
                <span className="text-text-secondary">Collection Date:</span>
                <div className="font-medium text-foreground">
                  {formatDate(collection?.collectionDate)}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                onClick={() => onViewDetails(collection)}
              >
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      {collections?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Package" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Collections Yet</h3>
          <p className="text-text-secondary mb-4">
            Start collecting herbs to see your recent collections here.
          </p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            New Collection
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentCollectionsTable;
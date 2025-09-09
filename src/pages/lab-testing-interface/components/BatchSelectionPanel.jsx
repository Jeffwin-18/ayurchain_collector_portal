import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BatchSelectionPanel = ({ 
  batches = [], 
  selectedBatch, 
  onBatchSelect,
  className = "" 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredBatches = batches?.filter(batch => {
    const matchesSearch = batch?.batchNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         batch?.herbType?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         batch?.collectorName?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesFilter = filterStatus === "all" || batch?.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'in-testing':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'rejected':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <Icon name="AlertTriangle" size={16} className="text-error" />;
      case 'medium':
        return <Icon name="Clock" size={16} className="text-warning" />;
      default:
        return <Icon name="Minus" size={16} className="text-text-secondary" />;
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            Pending Batches
          </h2>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Package" size={16} />
            <span>{filteredBatches?.length} batches</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search batches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Filter */}
        <div className="flex space-x-2">
          {['all', 'pending', 'in-testing']?.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-smooth capitalize ${
                filterStatus === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:bg-muted/80'
              }`}
            >
              {status === 'all' ? 'All' : status?.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
      {/* Batch List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredBatches?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Package" size={48} className="mx-auto text-text-secondary mb-3" />
            <p className="text-text-secondary">No batches found</p>
          </div>
        ) : (
          <div className="p-2">
            {filteredBatches?.map((batch) => (
              <div
                key={batch?.id}
                onClick={() => onBatchSelect(batch)}
                className={`p-3 rounded-lg border cursor-pointer transition-smooth mb-2 ${
                  selectedBatch?.id === batch?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-border/60 hover:bg-muted/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-foreground text-sm">
                        {batch?.batchNumber}
                      </span>
                      {getPriorityIcon(batch?.priority)}
                    </div>
                    <p className="text-sm text-text-secondary">
                      {batch?.herbType} • {batch?.quantity}kg
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(batch?.status)}`}>
                    {batch?.status?.replace('-', ' ')}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>{batch?.collectorName}</span>
                  <span>{batch?.collectionDate}</span>
                </div>

                {batch?.daysWaiting > 0 && (
                  <div className="mt-2 flex items-center space-x-1 text-xs text-warning">
                    <Icon name="Clock" size={12} />
                    <span>Waiting {batch?.daysWaiting} days</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            className="flex-1"
          >
            Refresh
          </Button>
          <Button
            variant="secondary"
            size="sm"
            iconName="Filter"
            iconPosition="left"
            className="flex-1"
          >
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BatchSelectionPanel;
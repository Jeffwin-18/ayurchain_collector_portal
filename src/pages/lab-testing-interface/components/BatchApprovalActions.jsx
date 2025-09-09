import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BatchApprovalActions = ({ 
  batch,
  onApprove,
  onRequestTesting,
  onReject,
  className = "" 
}) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [comments, setComments] = useState('');
  const [additionalTests, setAdditionalTests] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const actionOptions = [
    { 
      value: 'approve', 
      label: 'Certify and Approve', 
      description: 'Batch meets all quality standards' 
    },
    { 
      value: 'additional-testing', 
      label: 'Request Additional Testing', 
      description: 'Requires further analysis' 
    },
    { 
      value: 'reject', 
      label: 'Reject with Comments', 
      description: 'Does not meet quality standards' 
    }
  ];

  const additionalTestOptions = [
    { value: 'heavy-metals', label: 'Heavy Metals Analysis', description: 'Extended heavy metals testing' },
    { value: 'pesticide-residue', label: 'Pesticide Residue', description: 'Comprehensive pesticide screening' },
    { value: 'microbial-extended', label: 'Extended Microbial', description: 'Detailed microbial analysis' },
    { value: 'aflatoxin', label: 'Aflatoxin Testing', description: 'Mycotoxin contamination check' },
    { value: 'active-compounds', label: 'Active Compounds', description: 'Detailed phytochemical analysis' },
    { value: 'moisture-stability', label: 'Moisture Stability', description: 'Long-term moisture analysis' }
  ];

  const handleActionSubmit = async () => {
    if (!selectedAction) {
      alert('Please select an action');
      return;
    }

    if (selectedAction === 'additional-testing' && additionalTests?.length === 0) {
      alert('Please select at least one additional test');
      return;
    }

    if ((selectedAction === 'reject' || selectedAction === 'additional-testing') && !comments?.trim()) {
      alert('Please provide comments for this action');
      return;
    }

    setIsProcessing(true);

    try {
      const actionData = {
        batchId: batch?.id,
        action: selectedAction,
        comments: comments?.trim(),
        additionalTests: selectedAction === 'additional-testing' ? additionalTests : [],
        processedBy: 'Dr. Priya Sharma',
        processedAt: new Date()?.toISOString(),
        technicianId: 'LAB001'
      };

      switch (selectedAction) {
        case 'approve':
          await onApprove(actionData);
          break;
        case 'additional-testing':
          await onRequestTesting(actionData);
          break;
        case 'reject':
          await onReject(actionData);
          break;
      }

      // Reset form
      setSelectedAction('');
      setComments('');
      setAdditionalTests([]);
    } catch (error) {
      console.error('Error processing action:', error);
      alert('Failed to process action. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'approve':
        return 'CheckCircle';
      case 'additional-testing':
        return 'FlaskConical';
      case 'reject':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'approve':
        return 'text-success';
      case 'additional-testing':
        return 'text-warning';
      case 'reject':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  if (!batch) {
    return (
      <div className={`bg-card border border-border rounded-lg shadow-elevation-1 p-6 ${className}`}>
        <div className="text-center">
          <Icon name="ClipboardCheck" size={48} className="mx-auto text-text-secondary mb-3" />
          <p className="text-text-secondary">Select a batch to review approval actions</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg shadow-elevation-1 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              Batch Approval Actions
            </h3>
            <p className="text-sm text-text-secondary">
              Review and approve batch {batch?.batchNumber}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full animate-pulse"></div>
            <span className="text-sm text-text-secondary">Pending Review</span>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Batch Summary */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Package" size={16} className="mr-2" />
            Batch Summary
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-text-secondary">Herb:</span>
              <span className="ml-2 font-medium text-foreground">{batch?.herbType}</span>
            </div>
            <div>
              <span className="text-text-secondary">Quantity:</span>
              <span className="ml-2 font-medium text-foreground">{batch?.quantity}kg</span>
            </div>
            <div>
              <span className="text-text-secondary">Collector:</span>
              <span className="ml-2 font-medium text-foreground">{batch?.collectorName}</span>
            </div>
            <div>
              <span className="text-text-secondary">Collection:</span>
              <span className="ml-2 font-medium text-foreground">{batch?.collectionDate}</span>
            </div>
          </div>
        </div>

        {/* Action Selection */}
        <div>
          <Select
            label="Select Action"
            options={actionOptions}
            value={selectedAction}
            onChange={setSelectedAction}
            placeholder="Choose an action for this batch"
            required
          />
        </div>

        {/* Additional Tests Selection */}
        {selectedAction === 'additional-testing' && (
          <div>
            <Select
              label="Additional Tests Required"
              options={additionalTestOptions}
              value={additionalTests}
              onChange={setAdditionalTests}
              placeholder="Select tests to be performed"
              multiple
              searchable
              required
            />
          </div>
        )}

        {/* Comments */}
        {(selectedAction === 'reject' || selectedAction === 'additional-testing' || selectedAction === 'approve') && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {selectedAction === 'approve' ? 'Approval Notes (Optional)' : 'Comments *'}
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e?.target?.value)}
              placeholder={
                selectedAction === 'approve' ?'Add any additional notes about the approval...'
                  : selectedAction === 'additional-testing' ?'Explain why additional testing is required...' :'Provide detailed reasons for rejection...'
              }
              rows={4}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-vertical"
              required={selectedAction !== 'approve'}
            />
            <p className="text-xs text-text-secondary mt-1">
              {selectedAction === 'approve' ?'Optional notes will be included in the certificate' :'Detailed comments help improve the testing process'
              }
            </p>
          </div>
        )}

        {/* Action Preview */}
        {selectedAction && (
          <div className="bg-surface rounded-lg p-4 border border-border">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Icon name="Eye" size={16} className="mr-2" />
              Action Preview
            </h4>
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                selectedAction === 'approve' ? 'bg-success/10' :
                selectedAction === 'additional-testing' ? 'bg-warning/10' : 'bg-error/10'
              }`}>
                <Icon 
                  name={getActionIcon(selectedAction)} 
                  size={20} 
                  className={getActionColor(selectedAction)} 
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {actionOptions?.find(opt => opt?.value === selectedAction)?.label}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  {actionOptions?.find(opt => opt?.value === selectedAction)?.description}
                </p>
                
                {selectedAction === 'additional-testing' && additionalTests?.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-foreground mb-1">Tests Required:</p>
                    <div className="flex flex-wrap gap-1">
                      {additionalTests?.map(testId => {
                        const test = additionalTestOptions?.find(opt => opt?.value === testId);
                        return (
                          <span key={testId} className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
                            {test?.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {comments?.trim() && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-foreground mb-1">Comments:</p>
                    <p className="text-xs text-text-secondary bg-muted p-2 rounded">
                      {comments}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Technician Information */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="User" size={16} className="mr-2" />
            Reviewing Technician
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-text-secondary">Name:</span>
              <span className="ml-2 font-medium text-foreground">Dr. Priya Sharma</span>
            </div>
            <div>
              <span className="text-text-secondary">ID:</span>
              <span className="ml-2 font-medium text-foreground">LAB001</span>
            </div>
            <div>
              <span className="text-text-secondary">Date:</span>
              <span className="ml-2 font-medium text-foreground">
                {new Date()?.toLocaleDateString('en-GB')}
              </span>
            </div>
            <div>
              <span className="text-text-secondary">Time:</span>
              <span className="ml-2 font-medium text-foreground">
                {new Date()?.toLocaleTimeString('en-GB', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-border">
          <Button
            variant={selectedAction === 'approve' ? 'default' : selectedAction === 'reject' ? 'destructive' : 'secondary'}
            onClick={handleActionSubmit}
            loading={isProcessing}
            iconName={getActionIcon(selectedAction)}
            iconPosition="left"
            className="w-full"
            disabled={!selectedAction || isProcessing}
          >
            {isProcessing ? 'Processing...' : 
             selectedAction === 'approve' ? 'Certify & Approve Batch' :
             selectedAction === 'additional-testing' ? 'Request Additional Testing' :
             selectedAction === 'reject' ? 'Reject Batch' : 'Select Action'}
          </Button>
          
          {selectedAction && (
            <p className="text-xs text-text-secondary text-center mt-2">
              This action will be recorded and cannot be undone
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchApprovalActions;
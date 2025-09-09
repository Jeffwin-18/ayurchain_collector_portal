import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const QualityAssessmentForm = ({ 
  qualityIndicators, 
  onQualityChange, 
  qualityGrade, 
  onQualityGradeChange 
}) => {
  const gradeOptions = [
    { value: 'premium', label: 'Premium Grade (A+)', description: 'Highest quality, meets all standards' },
    { value: 'standard', label: 'Standard Grade (A)', description: 'Good quality, meets most standards' },
    { value: 'commercial', label: 'Commercial Grade (B)', description: 'Acceptable quality for processing' },
    { value: 'reject', label: 'Reject Grade (C)', description: 'Below standards, requires review' }
  ];

  const qualityChecks = [
    { key: 'fresh', label: 'Fresh Condition', description: 'Herbs are fresh and not wilted' },
    { key: 'organic', label: 'Organic Certified', description: 'Grown without synthetic chemicals' },
    { key: 'pesticideFree', label: 'Pesticide-Free', description: 'No pesticide residue detected' },
    { key: 'properlyDried', label: 'Properly Dried', description: 'Adequate moisture content' },
    { key: 'noContamination', label: 'No Contamination', description: 'Free from foreign materials' },
    { key: 'correctHarvest', label: 'Correct Harvest Time', description: 'Harvested at optimal maturity' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
        Quality Assessment
      </h3>
      <div className="space-y-6">
        {/* Quality Indicators */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Quality Indicators</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {qualityChecks?.map((check) => (
              <Checkbox
                key={check?.key}
                label={check?.label}
                description={check?.description}
                checked={qualityIndicators?.[check?.key] || false}
                onChange={(e) => onQualityChange(check?.key, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Quality Grade */}
        <div>
          <Select
            label="Quality Grade"
            placeholder="Select quality grade"
            options={gradeOptions}
            value={qualityGrade}
            onChange={onQualityGradeChange}
            required
          />
        </div>

        {/* Quality Score Display */}
        <div className="p-4 bg-muted rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Quality Score</span>
            <span className="text-lg font-semibold text-primary">
              {Object.values(qualityIndicators)?.filter(Boolean)?.length}/6
            </span>
          </div>
          <div className="mt-2 w-full bg-border rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(Object.values(qualityIndicators)?.filter(Boolean)?.length / 6) * 100}%` 
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityAssessmentForm;
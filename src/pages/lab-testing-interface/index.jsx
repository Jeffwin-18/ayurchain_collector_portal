import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BatchSelectionPanel from './components/BatchSelectionPanel';
import BatchDetailsCard from './components/BatchDetailsCard';
import TestingForm from './components/TestingForm';
import CertificateUpload from './components/CertificateUpload';
import LabSealUpload from './components/LabSealUpload';
import BatchApprovalActions from './components/BatchApprovalActions';

const LabTestingInterface = () => {
  const navigate = useNavigate();
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [activeTab, setActiveTab] = useState('testing');
  const [testingData, setTestingData] = useState({});
  const [certificates, setCertificates] = useState([]);
  const [labSeal, setLabSeal] = useState(null);

  // Mock data for pending batches
  const mockBatches = [
    {
      id: 'BATCH001',
      batchNumber: 'AYR-2024-001',
      herbType: 'Ashwagandha Root',
      quantity: 25.5,
      collectionDate: '15/12/2024',
      collectorName: 'Rajesh Kumar',
      collectorId: 'COL001',
      farmLocation: 'Rajasthan, India',
      farmerName: 'Mohan Singh',
      farmerContact: '+91 98765 43210',
      farmerGovId: 'AADHAR-1234-5678-9012',
      farmSize: 5.2,
      status: 'pending',
      priority: 'high',
      daysWaiting: 3,
      qualityIndicators: ['fresh', 'organic', 'pesticide-free', 'properly-dried'],
      photos: [
        {
          url: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg',
          timestamp: '15/12/2024 14:30'
        },
        {
          url: 'https://images.pexels.com/photos/6207734/pexels-photo-6207734.jpeg',
          timestamp: '15/12/2024 14:32'
        }
      ],
      gpsCoordinates: {
        latitude: '26.9124',
        longitude: '75.7873',
        timestamp: '15/12/2024 14:28'
      },
      notes: `High-quality Ashwagandha roots collected from organic farm.\nProper drying process followed as per traditional methods.\nFarmer confirmed no pesticide usage in last 2 years.`
    },
    {
      id: 'BATCH002',
      batchNumber: 'AYR-2024-002',
      herbType: 'Turmeric Rhizome',
      quantity: 18.3,
      collectionDate: '14/12/2024',
      collectorName: 'Priya Sharma',
      collectorId: 'COL002',
      farmLocation: 'Kerala, India',
      farmerName: 'Ravi Nair',
      farmerContact: '+91 87654 32109',
      farmerGovId: 'AADHAR-2345-6789-0123',
      farmSize: 3.8,
      status: 'in-testing',
      priority: 'medium',
      daysWaiting: 2,
      qualityIndicators: ['fresh', 'organic', 'properly-dried'],
      photos: [
        {
          url: 'https://images.pexels.com/photos/4198015/pexels-photo-4198015.jpeg',
          timestamp: '14/12/2024 11:15'
        }
      ],
      gpsCoordinates: {
        latitude: '10.8505',
        longitude: '76.2711',
        timestamp: '14/12/2024 11:12'
      },
      notes: `Premium quality turmeric with high curcumin content.\nTraditional cultivation methods used.\nExcellent color and aroma.`
    },
    {
      id: 'BATCH003',
      batchNumber: 'AYR-2024-003',
      herbType: 'Brahmi Leaves',
      quantity: 12.7,
      collectionDate: '13/12/2024',
      collectorName: 'Amit Patel',
      collectorId: 'COL003',
      farmLocation: 'Gujarat, India',
      farmerName: 'Kiran Patel',
      farmerContact: '+91 76543 21098',
      farmerGovId: 'AADHAR-3456-7890-1234',
      farmSize: 2.5,
      status: 'pending',
      priority: 'low',
      daysWaiting: 1,
      qualityIndicators: ['fresh', 'organic'],
      photos: [
        {
          url: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg',
          timestamp: '13/12/2024 09:45'
        }
      ],
      gpsCoordinates: {
        latitude: '23.0225',
        longitude: '72.5714',
        timestamp: '13/12/2024 09:42'
      },
      notes: `Fresh Brahmi leaves collected early morning.\nGrown in controlled environment.\nReady for immediate processing.`
    }
  ];

  const tabs = [
    { id: 'testing', label: 'Testing Form', icon: 'FlaskConical' },
    { id: 'certificates', label: 'Certificates', icon: 'FileText' },
    { id: 'seal', label: 'Lab Seal', icon: 'Stamp' },
    { id: 'approval', label: 'Approval', icon: 'CheckCircle' }
  ];

  useEffect(() => {
    // Check authentication
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'lab-technician') {
      navigate('/login');
    }
  }, [navigate]);

  const handleBatchSelect = (batch) => {
    setSelectedBatch(batch);
    setActiveTab('testing');
  };

  const handleTestingSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setTestingData(prev => ({
        ...prev,
        [selectedBatch?.id]: data
      }));
      
      // Move to certificates tab
      setActiveTab('certificates');
      
      alert('Testing data saved successfully!');
    } catch (error) {
      console.error('Error saving testing data:', error);
      alert('Failed to save testing data. Please try again.');
    }
  };

  const handleTestingDraft = (data) => {
    setTestingData(prev => ({
      ...prev,
      [selectedBatch?.id]: { ...data, isDraft: true }
    }));
    
    alert('Draft saved successfully!');
  };

  const handleCertificateUpload = (files) => {
    setCertificates(files);
  };

  const handleLabSealUpload = (sealData) => {
    setLabSeal(sealData);
    setActiveTab('approval');
    alert('Lab seal verified and applied successfully!');
  };

  const handleBatchApprove = async (actionData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate QR code and certificate
      const qrCode = `QR-${actionData?.batchId}-${Date.now()}`;
      
      alert(`Batch approved successfully!\nQR Code: ${qrCode}\nCertificate will be generated and sent to the collector.`);
      
      // Reset form and go back to batch selection
      setSelectedBatch(null);
      setActiveTab('testing');
      setTestingData({});
      setCertificates([]);
      setLabSeal(null);
    } catch (error) {
      console.error('Error approving batch:', error);
      throw error;
    }
  };

  const handleRequestAdditionalTesting = async (actionData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`Additional testing requested for batch ${selectedBatch?.batchNumber}.\nCollector will be notified about the required tests.`);
      
      // Reset selection
      setSelectedBatch(null);
      setActiveTab('testing');
    } catch (error) {
      console.error('Error requesting additional testing:', error);
      throw error;
    }
  };

  const handleBatchReject = async (actionData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`Batch ${selectedBatch?.batchNumber} has been rejected.\nCollector will be notified with detailed comments.`);
      
      // Reset selection
      setSelectedBatch(null);
      setActiveTab('testing');
    } catch (error) {
      console.error('Error rejecting batch:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'testing':
        return (
          <TestingForm
            batch={selectedBatch}
            onSubmit={handleTestingSubmit}
            onSaveDraft={handleTestingDraft}
          />
        );
      case 'certificates':
        return (
          <CertificateUpload
            onUpload={handleCertificateUpload}
            existingFiles={certificates}
          />
        );
      case 'seal':
        return (
          <LabSealUpload
            onSealUpload={handleLabSealUpload}
            existingSeal={labSeal}
          />
        );
      case 'approval':
        return (
          <BatchApprovalActions
            batch={selectedBatch}
            onApprove={handleBatchApprove}
            onRequestTesting={handleRequestAdditionalTesting}
            onReject={handleBatchReject}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole="lab-technician"
        userName="Dr. Priya Sharma"
        onLogout={handleLogout}
      />
      <div className="pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
              Lab Testing Interface
            </h1>
            <p className="text-text-secondary">
              Verify herb quality and upload official certification documentation
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Batch Selection Panel */}
            <div className="lg:col-span-4">
              <BatchSelectionPanel
                batches={mockBatches}
                selectedBatch={selectedBatch}
                onBatchSelect={handleBatchSelect}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-6">
              {/* Batch Details */}
              {selectedBatch && (
                <BatchDetailsCard batch={selectedBatch} />
              )}

              {/* Tab Navigation */}
              {selectedBatch && (
                <div className="bg-card border border-border rounded-lg shadow-elevation-1">
                  <div className="border-b border-border">
                    <nav className="flex space-x-1 p-1">
                      {tabs?.map((tab) => (
                        <button
                          key={tab?.id}
                          onClick={() => setActiveTab(tab?.id)}
                          className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-smooth ${
                            activeTab === tab?.id
                              ? 'bg-primary text-primary-foreground'
                              : 'text-text-secondary hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          <span className="w-4 h-4">
                            {/* Icon placeholder - would use Icon component */}
                          </span>
                          <span>{tab?.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Tab Content */}
                  <div className="p-0">
                    {renderTabContent()}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!selectedBatch && (
                <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-12 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧪</span>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Select a Batch to Begin Testing
                  </h3>
                  <p className="text-text-secondary max-w-md mx-auto">
                    Choose a batch from the left panel to start the quality assessment and certification process.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTestingInterface;
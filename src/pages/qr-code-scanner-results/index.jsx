import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SupplyChainTimeline from './components/SupplyChainTimeline';
import FarmerDetailsCard from './components/FarmerDetailsCard';
import HerbInformationCard from './components/HerbInformationCard';
import LabVerificationCard from './components/LabVerificationCard';
import PhotoGallery from './components/PhotoGallery';
import TrustSignals from './components/TrustSignals';
import BatchTrackingCard from './components/BatchTrackingCard';

const QRCodeScannerResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [batchData, setBatchData] = useState(null);

  // Mock batch data - in real app, this would be fetched based on QR code
  const mockBatchData = {
    batchNumber: "AYC-2024-TUL-001",
    qrCode: searchParams?.get('code') || "AYC-2024-TUL-001",
    
    // Farmer Information
    farmer: {
      name: "राम प्रसाद शर्मा (Ram Prasad Sharma)",
      phone: "+91 98765 43210",
      governmentId: "AADHAAR-1234-5678-9012",
      registrationDate: "15/03/2024",
      farmAddress: "Village Tulsipur, Near Primary School",
      village: "Tulsipur",
      district: "Rishikesh",
      state: "Uttarakhand",
      pincode: "249201",
      coordinates: {
        lat: 30.0869,
        lng: 78.2676
      }
    },

    // Herb Information
    herb: {
      herbType: "Tulsi (Holy Basil)",
      batchNumber: "AYC-2024-TUL-001",
      quantity: 25,
      harvestDate: "10/12/2024",
      collectionDate: "12/12/2024",
      grade: 5,
      qualityIndicators: {
        organic: true,
        pesticideFree: true,
        properlyDried: true,
        fresh: true
      },
      notes: "Premium quality Tulsi leaves harvested during optimal morning hours. Properly dried using traditional sun-drying methods to preserve essential oils and medicinal properties."
    },

    // Lab Verification
    lab: {
      certificateNumber: "LAB-2024-TUL-001-CERT",
      labNumber: "NABL-LAB-001",
      labName: "Himalayan Herbal Testing Laboratory",
      labAddress: "Sector 15, SIDCUL, Haridwar, Uttarakhand - 249403",
      testingDate: "14/12/2024",
      certificationDate: "15/12/2024",
      expiryDate: "15/12/2025",
      testResults: [
        { parameter: "Moisture Content", value: "8.5%", status: "pass" },
        { parameter: "Ash Content", value: "12.3%", status: "pass" },
        { parameter: "Essential Oil", value: "0.85%", status: "pass" },
        { parameter: "Heavy Metals", value: "Within Limits", status: "pass" },
        { parameter: "Pesticide Residue", value: "Not Detected", status: "pass" },
        { parameter: "Microbial Count", value: "Within Limits", status: "pass" }
      ],
      officialSeal: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=200&h=200&fit=crop&crop=center"
    },

    // Supply Chain Timeline
    collectionDate: "12/12/2024",
    transportDate: "13/12/2024",
    testingDate: "14/12/2024",
    certificationDate: "15/12/2024",
    farmLocation: "Tulsipur Village, Rishikesh",
    collectorName: "Collector ID: COL-001",

    // Photo Documentation
    photos: [
      {
        url: "https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?w=400&h=400&fit=crop&crop=center",
        type: "farmer",
        description: "Ram Prasad Sharma at his organic farm",
        timestamp: "2024-12-12T08:30:00Z",
        coordinates: { lat: 30.0869, lng: 78.2676 }
      },
      {
        url: "https://images.pexels.com/photos/4750275/pexels-photo-4750275.jpeg?w=400&h=400&fit=crop&crop=center",
        type: "herb",
        description: "Fresh Tulsi leaves ready for collection",
        timestamp: "2024-12-12T09:15:00Z",
        coordinates: { lat: 30.0869, lng: 78.2676 }
      },
      {
        url: "https://images.pexels.com/photos/4750276/pexels-photo-4750276.jpeg?w=400&h=400&fit=crop&crop=center",
        type: "collection",
        description: "Collection process documentation",
        timestamp: "2024-12-12T10:00:00Z",
        coordinates: { lat: 30.0869, lng: 78.2676 }
      },
      {
        url: "https://images.pexels.com/photos/4750277/pexels-photo-4750277.jpeg?w=400&h=400&fit=crop&crop=center",
        type: "environment",
        description: "Farm environment and growing conditions",
        timestamp: "2024-12-12T08:45:00Z",
        coordinates: { lat: 30.0869, lng: 78.2676 }
      }
    ],

    // Trust Signals
    certifications: {
      government: true,
      organic: true,
      lab: true,
      quality: true
    },

    // Batch Tracking
    batchTracking: {
      batchNumber: "AYC-2024-TUL-001",
      totalQuantity: 25,
      collectionTimestamp: "2024-12-12T10:00:00Z",
      collectionLocation: "Tulsipur Village Farm",
      collectionCoordinates: { lat: 30.0869, lng: 78.2676 },
      qualityCheckTimestamp: "2024-12-12T10:30:00Z",
      processingTimestamp: "2024-12-13T14:00:00Z",
      processingCoordinates: { lat: 30.0731, lng: 78.2647 },
      testingTimestamp: "2024-12-14T11:00:00Z",
      labLocation: "Himalayan Herbal Testing Lab",
      labCoordinates: { lat: 29.9457, lng: 78.1642 },
      certificationTimestamp: "2024-12-15T16:30:00Z",
      collectorName: "Collector ID: COL-001"
    }
  };

  useEffect(() => {
    // Simulate loading time for QR code processing
    const timer = setTimeout(() => {
      setBatchData(mockBatchData);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `AyurChain - Batch ${batchData?.batchNumber}`,
          text: `Verified ${batchData?.herb?.herbType} from ${batchData?.farmer?.name}`,
          url: window.location?.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard?.writeText(window.location?.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleScanAnother = () => {
    navigate('/qr-code-scanner-results');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="space-y-2">
              <h2 className="text-xl font-heading font-semibold text-foreground">Processing QR Code</h2>
              <p className="text-text-secondary">Retrieving supply chain information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-4 max-w-md mx-auto px-4">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto" />
            <div className="space-y-2">
              <h2 className="text-xl font-heading font-semibold text-foreground">QR Code Not Found</h2>
              <p className="text-text-secondary">The QR code you scanned is not valid or the batch information is not available.</p>
            </div>
            <Button variant="default" onClick={handleScanAnother}>
              Scan Another QR Code
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Leaf" size={20} color="white" />
              </div>
              <div>
                <h1 className="text-lg font-heading font-semibold text-foreground">AyurChain</h1>
                <p className="text-xs text-text-secondary -mt-1">Supply Chain Verification</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Share"
                iconPosition="left"
                onClick={handleShare}
                className="hidden sm:flex"
              >
                Share
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="QrCode"
                iconPosition="left"
                onClick={handleScanAnother}
              >
                Scan Another
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h2 className="text-2xl font-heading font-bold text-foreground">Supply Chain Verification</h2>
              <p className="text-text-secondary mt-1">Complete transparency from farm to your hands</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-lg border border-success/20">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm font-medium">Verified Authentic</span>
              </div>
            </div>
          </div>

          {/* Batch Info Banner */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="Package" size={20} className="text-primary" />
                <div>
                  <h3 className="text-lg font-medium text-foreground">{batchData?.herb?.herbType}</h3>
                  <p className="text-sm text-text-secondary">Batch: {batchData?.batchNumber}</p>
                </div>
              </div>
              <div className="text-right mt-3 sm:mt-0">
                <p className="text-sm text-text-secondary">Scanned on</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date()?.toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="space-y-8">
          {/* Supply Chain Timeline */}
          <SupplyChainTimeline batchData={batchData} />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Farmer Details */}
            <FarmerDetailsCard farmerData={batchData?.farmer} />
            
            {/* Herb Information */}
            <HerbInformationCard herbData={batchData?.herb} />
          </div>

          {/* Lab Verification */}
          <LabVerificationCard labData={batchData?.lab} />

          {/* Trust Signals */}
          <TrustSignals certifications={batchData?.certifications} />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Photo Gallery */}
            <PhotoGallery photos={batchData?.photos} />
            
            {/* Batch Tracking */}
            <BatchTrackingCard batchData={batchData?.batchTracking} />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-sm text-text-secondary">
                This verification was generated on {new Date()?.toLocaleDateString('en-IN')} at {new Date()?.toLocaleTimeString('en-IN')}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                Powered by AyurChain - Blockchain-based supply chain transparency
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Share"
                iconPosition="left"
                onClick={handleShare}
                className="sm:hidden"
              >
                Share Results
              </Button>
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                onClick={() => window.print()}
              >
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScannerResults;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CollectorActionBar from '../../components/ui/CollectorActionBar';
import StatusIndicatorPanel from '../../components/ui/StatusIndicatorPanel';
import MetricsCard from './components/MetricsCard';
import RecentCollectionsTable from './components/RecentCollectionsTable';
import FarmersTable from './components/FarmersTable';
import StatusTrackingPanel from './components/StatusTrackingPanel';
import LocationIndicator from './components/LocationIndicator';
import QuickFilters from './components/QuickFilters';

const CollectorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('collections');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('synced');
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  // Mock data for collections
  const mockCollections = [
    {
      id: 1,
      batchNumber: "AYC-2025-001",
      herbType: "Ashwagandha",
      quantity: 25,
      unit: "kg",
      farmerName: "Ramesh Kumar",
      farmerId: "F001",
      collectionDate: "2025-01-08",
      quality: "Excellent",
      status: "Completed",
      location: "Village Rampur"
    },
    {
      id: 2,
      batchNumber: "AYC-2025-002",
      herbType: "Turmeric",
      quantity: 40,
      unit: "kg",
      farmerName: "Suresh Patel",
      farmerId: "F002",
      collectionDate: "2025-01-08",
      quality: "Good",
      status: "Pending",
      location: "Village Khanpur"
    },
    {
      id: 3,
      batchNumber: "AYC-2025-003",
      herbType: "Neem",
      quantity: 15,
      unit: "kg",
      farmerName: "Mukesh Singh",
      farmerId: "F003",
      collectionDate: "2025-01-07",
      quality: "Excellent",
      status: "In-Progress",
      location: "Village Sultanpur"
    },
    {
      id: 4,
      batchNumber: "AYC-2025-004",
      herbType: "Tulsi",
      quantity: 30,
      unit: "kg",
      farmerName: "Rajesh Sharma",
      farmerId: "F004",
      collectionDate: "2025-01-07",
      quality: "Good",
      status: "Completed",
      location: "Village Mohammadpur"
    },
    {
      id: 5,
      batchNumber: "AYC-2025-005",
      herbType: "Brahmi",
      quantity: 20,
      unit: "kg",
      farmerName: "Dinesh Yadav",
      farmerId: "F005",
      collectionDate: "2025-01-06",
      quality: "Fair",
      status: "Pending",
      location: "Village Hasanpur"
    }
  ];

  // Mock data for farmers
  const mockFarmers = [
    {
      id: 1,
      farmerId: "F001",
      name: "Ramesh Kumar",
      phone: "9876543210",
      email: "ramesh.kumar@example.com",
      village: "Rampur",
      district: "Meerut",
      state: "Uttar Pradesh",
      govIdType: "Aadhar Card",
      govIdNumber: "1234-5678-9012",
      registrationDate: "2024-12-15",
      status: "Active"
    },
    {
      id: 2,
      farmerId: "F002",
      name: "Suresh Patel",
      phone: "9876543211",
      email: null,
      village: "Khanpur",
      district: "Meerut",
      state: "Uttar Pradesh",
      govIdType: "Voter ID",
      govIdNumber: "ABC1234567",
      registrationDate: "2024-12-20",
      status: "Active"
    },
    {
      id: 3,
      farmerId: "F003",
      name: "Mukesh Singh",
      phone: "9876543212",
      email: "mukesh.singh@example.com",
      village: "Sultanpur",
      district: "Meerut",
      state: "Uttar Pradesh",
      govIdType: "Aadhar Card",
      govIdNumber: "2345-6789-0123",
      registrationDate: "2024-12-25",
      status: "Pending"
    },
    {
      id: 4,
      farmerId: "F004",
      name: "Rajesh Sharma",
      phone: "9876543213",
      email: null,
      village: "Mohammadpur",
      district: "Meerut",
      state: "Uttar Pradesh",
      govIdType: "PAN Card",
      govIdNumber: "ABCDE1234F",
      registrationDate: "2025-01-02",
      status: "Active"
    },
    {
      id: 5,
      farmerId: "F005",
      name: "Dinesh Yadav",
      phone: "9876543214",
      email: "dinesh.yadav@example.com",
      village: "Hasanpur",
      district: "Meerut",
      state: "Uttar Pradesh",
      govIdType: "Aadhar Card",
      govIdNumber: "3456-7890-1234",
      registrationDate: "2025-01-05",
      status: "Active"
    }
  ];

  // Calculate metrics
  const totalCollections = mockCollections?.length;
  const totalQuantity = mockCollections?.reduce((sum, collection) => sum + collection?.quantity, 0);
  const activeFarmers = mockFarmers?.filter(farmer => farmer?.status === 'Active')?.length;
  const completedCollections = mockCollections?.filter(collection => collection?.status === 'Completed')?.length;

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setSyncStatus('syncing');
      // Simulate sync process
      setTimeout(() => {
        setSyncStatus('synced');
        setPendingSyncCount(0);
      }, 2000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('pending');
      setPendingSyncCount(3);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filters]);

  const applyFilters = () => {
    let filtered = [...mockCollections];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(collection =>
        collection?.batchNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        collection?.herbType?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        collection?.farmerName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply other filters
    Object.entries(filters)?.forEach(([key, value]) => {
      if (value) {
        switch (key) {
          case 'herbType':
            filtered = filtered?.filter(collection => 
              collection?.herbType?.toLowerCase() === value?.toLowerCase()
            );
            break;
          case 'status':
            filtered = filtered?.filter(collection => 
              collection?.status?.toLowerCase() === value?.toLowerCase()
            );
            break;
          case 'quality':
            filtered = filtered?.filter(collection => 
              collection?.quality?.toLowerCase() === value?.toLowerCase()
            );
            break;
          case 'location':
            filtered = filtered?.filter(collection => 
              collection?.location?.toLowerCase()?.includes(value?.toLowerCase())
            );
            break;
          case 'dateRange':
            // Implement date range filtering logic here
            break;
        }
      }
    });

    setFilteredCollections(filtered);

    // Filter farmers based on search
    let filteredFarmersData = [...mockFarmers];
    if (searchTerm) {
      filteredFarmersData = filteredFarmersData?.filter(farmer =>
        farmer?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        farmer?.farmerId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        farmer?.village?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }
    setFilteredFarmers(filteredFarmersData);
  };

  const handleViewCollectionDetails = (collection) => {
    navigate('/herb-collection-recording', { state: { collection } });
  };

  const handleViewFarmer = (farmer) => {
    navigate('/farmer-registration', { state: { farmer, mode: 'view' } });
  };

  const handleEditFarmer = (farmer) => {
    navigate('/farmer-registration', { state: { farmer, mode: 'edit' } });
  };

  const handleLocationUpdate = (location) => {
    console.log('Location updated:', location);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole="collector"
        userName="Collector Name"
        isOnline={isOnline}
        syncStatus={syncStatus}
        onLogout={handleLogout}
      />
      <main className="pt-20 pb-8 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Collector Dashboard</h1>
              <p className="text-text-secondary mt-1">
                Manage your herb collections and farmer registrations
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-sm text-text-secondary">
              Last updated: {new Date()?.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Status Panel */}
          <StatusIndicatorPanel
            isOnline={isOnline}
            syncStatus={syncStatus}
            pendingItems={pendingSyncCount}
            gpsStatus="available"
            lastSyncTime={new Date(Date.now() - 300000)}
          />

          {/* Action Bar */}
          <CollectorActionBar
            isOffline={!isOnline}
            pendingSyncCount={pendingSyncCount}
          />

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricsCard
              title="Total Collections"
              value={totalCollections}
              subtitle="This month"
              icon="Package"
              trend="up"
              trendValue="+12%"
            />
            <MetricsCard
              title="Total Quantity"
              value={`${totalQuantity} kg`}
              subtitle="Herbs collected"
              icon="Weight"
              trend="up"
              trendValue="+8%"
            />
            <MetricsCard
              title="Active Farmers"
              value={activeFarmers}
              subtitle="Registered farmers"
              icon="Users"
              trend="up"
              trendValue="+3"
            />
            <MetricsCard
              title="Completed"
              value={completedCollections}
              subtitle="Collections done"
              icon="CheckCircle"
              trend="up"
              trendValue="+5"
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filters */}
              <QuickFilters
                onFilterChange={setFilters}
                onSearchChange={setSearchTerm}
              />

              {/* Tabs */}
              <div className="bg-card rounded-lg border border-border shadow-elevation-1">
                <div className="border-b border-border">
                  <nav className="flex space-x-8 px-6">
                    <button
                      onClick={() => setActiveTab('collections')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                        activeTab === 'collections' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground hover:border-border'
                      }`}
                    >
                      Recent Collections ({filteredCollections?.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('farmers')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                        activeTab === 'farmers' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground hover:border-border'
                      }`}
                    >
                      Farmers ({filteredFarmers?.length})
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === 'collections' && (
                    <RecentCollectionsTable
                      collections={filteredCollections}
                      onViewDetails={handleViewCollectionDetails}
                    />
                  )}
                  {activeTab === 'farmers' && (
                    <FarmersTable
                      farmers={filteredFarmers}
                      onViewFarmer={handleViewFarmer}
                      onEditFarmer={handleEditFarmer}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Tracking */}
              <StatusTrackingPanel
                currentStage="collection"
                syncStatus={syncStatus}
                pendingCount={pendingSyncCount}
              />

              {/* Location Indicator */}
              <LocationIndicator
                showFullAddress={true}
                onLocationUpdate={handleLocationUpdate}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollectorDashboard;
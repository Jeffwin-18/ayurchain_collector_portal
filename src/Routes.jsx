import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import FarmerRegistration from './pages/farmer-registration';
import LoginPage from './pages/login';
import HerbCollectionRecording from './pages/herb-collection-recording';
import LabTestingInterface from './pages/lab-testing-interface';
import QRCodeScannerResults from './pages/qr-code-scanner-results';
import CollectorDashboard from './pages/collector-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CollectorDashboard />} />
        <Route path="/farmer-registration" element={<FarmerRegistration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/herb-collection-recording" element={<HerbCollectionRecording />} />
        <Route path="/lab-testing-interface" element={<LabTestingInterface />} />
        <Route path="/qr-code-scanner-results" element={<QRCodeScannerResults />} />
        <Route path="/collector-dashboard" element={<CollectorDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

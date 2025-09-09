import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LanguageToggle from './components/LanguageToggle';
import TrustSignals from './components/TrustSignals';
import AppLogo from './components/AppLogo';

const LoginPage = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (isAuthenticated === 'true' && userRole) {
      // Redirect to appropriate dashboard
      if (userRole === 'collector') {
        navigate('/collector-dashboard');
      } else if (userRole === 'lab-technician') {
        navigate('/lab-testing-interface');
      }
    }

    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, [navigate]);

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-background to-muted">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header with Language Toggle */}
        <header className="flex justify-end p-4 lg:p-6">
          <LanguageToggle 
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-lg">
            {/* App Logo */}
            <AppLogo currentLanguage={currentLanguage} />

            {/* Login Form Card */}
            <div className="bg-card rounded-2xl border border-border shadow-elevation-2 p-6 lg:p-8 mb-8">
              <div className="mb-6">
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
                  {currentLanguage === 'hi' ? 'साइन इन करें' : 'Sign In'}
                </h2>
                <p className="text-text-secondary">
                  {currentLanguage === 'hi' ?'अपने खाते में पहुंचने के लिए अपनी जानकारी दर्ज करें' :'Enter your credentials to access your account'
                  }
                </p>
              </div>

              <LoginForm 
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>

            {/* Trust Signals */}
            <TrustSignals currentLanguage={currentLanguage} />
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 lg:p-6 text-center">
          <div className="space-y-2">
            <p className="text-xs text-text-secondary">
              {currentLanguage === 'hi' 
                ? `© ${new Date()?.getFullYear()} AyurChain. सभी अधिकार सुरक्षित।`
                : `© ${new Date()?.getFullYear()} AyurChain. All rights reserved.`
              }
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
              <span>
                {currentLanguage === 'hi' ? 'संस्करण 1.0.0' : 'Version 1.0.0'}
              </span>
              <span>•</span>
              <span>
                {currentLanguage === 'hi' ? 'ऑफलाइन सक्षम' : 'Offline Enabled'}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
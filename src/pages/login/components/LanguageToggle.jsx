import React from 'react';
import Button from '../../../components/ui/Button';


const LanguageToggle = ({ currentLanguage, onLanguageChange }) => {
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    onLanguageChange(newLanguage);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        iconName="Languages"
        iconPosition="left"
        iconSize={16}
        className="text-text-secondary hover:text-foreground"
      >
        {currentLanguage === 'en' ? 'हिंदी' : 'English'}
      </Button>
    </div>
  );
};

export default LanguageToggle;
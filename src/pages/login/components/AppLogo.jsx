import React from 'react';
import Icon from '../../../components/AppIcon';

const AppLogo = ({ currentLanguage }) => {
  return (
    <div className="text-center mb-8">
      {/* Logo Icon */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-elevation-2">
            <Icon name="Leaf" size={32} color="white" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <Icon name="Shield" size={12} color="white" />
          </div>
        </div>
      </div>

      {/* App Name */}
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
        AyurChain
      </h1>
      
      {/* Subtitle */}
      <p className="text-lg text-text-secondary mb-1">
        {currentLanguage === 'hi' ? 'संग्राहक पोर्टल' : 'Collector Portal'}
      </p>
      
      {/* Tagline */}
      <p className="text-sm text-text-secondary max-w-sm mx-auto leading-relaxed">
        {currentLanguage === 'hi' ?'आयुर्वेदिक जड़ी-बूटियों की आपूर्ति श्रृंखला में पारदर्शिता और प्रामाणिकता सुनिश्चित करना' :'Ensuring transparency and authenticity in ayurvedic herb supply chain'
        }
      </p>
    </div>
  );
};

export default AppLogo;
import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = ({ currentLanguage }) => {
  const trustBadges = [
    {
      id: 1,
      icon: 'Shield',
      title: currentLanguage === 'hi' ? 'सरकारी प्रमाणित' : 'Government Certified',
      description: currentLanguage === 'hi' ? 'आयुष मंत्रालय द्वारा अनुमोदित' : 'Approved by Ministry of AYUSH'
    },
    {
      id: 2,
      icon: 'Award',
      title: currentLanguage === 'hi' ? 'ISO प्रमाणित' : 'ISO Certified',
      description: currentLanguage === 'hi' ? 'गुणवत्ता आश्वासन मानक' : 'Quality Assurance Standards'
    },
    {
      id: 3,
      icon: 'CheckCircle',
      title: currentLanguage === 'hi' ? 'स्थानीय प्राधिकरण' : 'Local Authority',
      description: currentLanguage === 'hi' ? 'राज्य कृषि विभाग द्वारा समर्थित' : 'Endorsed by State Agriculture Dept'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-sm font-medium text-text-secondary mb-3">
          {currentLanguage === 'hi' ? 'विश्वसनीयता के संकेत' : 'Trust & Security'}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustBadges?.map((badge) => (
          <div
            key={badge?.id}
            className="flex flex-col items-center text-center p-3 bg-muted/50 rounded-lg border border-border/50"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={badge?.icon} size={20} className="text-primary" />
            </div>
            <h4 className="text-xs font-medium text-foreground mb-1">
              {badge?.title}
            </h4>
            <p className="text-xs text-text-secondary leading-tight">
              {badge?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Additional Security Notice */}
      <div className="flex items-center justify-center space-x-2 p-3 bg-success/5 border border-success/20 rounded-lg">
        <Icon name="Lock" size={16} className="text-success" />
        <span className="text-xs text-success font-medium">
          {currentLanguage === 'hi' ?'आपका डेटा 256-बिट एन्क्रिप्शन से सुरक्षित है' :'Your data is secured with 256-bit encryption'
          }
        </span>
      </div>
    </div>
  );
};

export default TrustSignals;
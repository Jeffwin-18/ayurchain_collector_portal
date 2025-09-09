import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLanguageChange, currentLanguage }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock credentials for different roles
  const mockCredentials = {
    collector: {
      email: 'collector@ayurchain.com',
      password: 'collector123',
      role: 'collector'
    },
    labTechnician: {
      email: 'lab@ayurchain.com',
      password: 'lab123',
      role: 'lab-technician'
    }
  };

  const roleOptions = [
    { value: 'collector', label: currentLanguage === 'hi' ? 'जड़ी बूटी संग्राहक' : 'Herb Collector' },
    { value: 'lab-technician', label: currentLanguage === 'hi' ? 'प्रयोगशाला तकनीशियन' : 'Lab Technician' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = currentLanguage === 'hi' ? 'ईमेल आवश्यक है' : 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = currentLanguage === 'hi' ? 'वैध ईमेल दर्ज करें' : 'Please enter a valid email';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड आवश्यक है' : 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए' : 'Password must be at least 6 characters';
    }

    if (!formData?.role) {
      newErrors.role = currentLanguage === 'hi' ? 'भूमिका चुनें' : 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check mock credentials
      const roleCredentials = formData?.role === 'collector' 
        ? mockCredentials?.collector 
        : mockCredentials?.labTechnician;

      if (formData?.email === roleCredentials?.email && formData?.password === roleCredentials?.password) {
        // Store auth data
        localStorage.setItem('userRole', formData?.role);
        localStorage.setItem('userEmail', formData?.email);
        localStorage.setItem('isAuthenticated', 'true');
        
        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Navigate based on role
        if (formData?.role === 'collector') {
          navigate('/collector-dashboard');
        } else {
          navigate('/lab-testing-interface');
        }
      } else {
        setErrors({
          general: currentLanguage === 'hi' 
            ? `गलत क्रेडेंशियल। कृपया ${roleCredentials?.email} और ${roleCredentials?.password} का उपयोग करें`
            : `Invalid credentials. Please use ${roleCredentials?.email} and ${roleCredentials?.password}`
        });
      }
    } catch (error) {
      setErrors({
        general: currentLanguage === 'hi' ? 'लॉगिन में त्रुटि हुई' : 'Login failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert(currentLanguage === 'hi' ?'पासवर्ड रीसेट सुविधा जल्द ही उपलब्ध होगी' :'Password reset feature coming soon'
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <Input
          label={currentLanguage === 'hi' ? 'ईमेल पता' : 'Email Address'}
          type="email"
          placeholder={currentLanguage === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            label={currentLanguage === 'hi' ? 'पासवर्ड' : 'Password'}
            type={showPassword ? 'text' : 'password'}
            placeholder={currentLanguage === 'hi' ? 'अपना पासवर्ड दर्ज करें' : 'Enter your password'}
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-text-secondary hover:text-foreground transition-smooth"
            disabled={isLoading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        {/* Role Selection */}
        <Select
          label={currentLanguage === 'hi' ? 'भूमिका चुनें' : 'Select Role'}
          placeholder={currentLanguage === 'hi' ? 'अपनी भूमिका चुनें' : 'Choose your role'}
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleInputChange('role', value)}
          error={errors?.role}
          required
          disabled={isLoading}
        />

        {/* Remember Me */}
        <Checkbox
          label={currentLanguage === 'hi' ? 'मुझे याद रखें' : 'Remember Me'}
          checked={formData?.rememberMe}
          onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
          disabled={isLoading}
        />

        {/* General Error */}
        {errors?.general && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
        >
          {currentLanguage === 'hi' ? 'साइन इन करें' : 'Sign In'}
        </Button>

        {/* Forgot Password */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-smooth"
            disabled={isLoading}
          >
            {currentLanguage === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot Password?'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
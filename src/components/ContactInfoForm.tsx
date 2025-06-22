
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Phone, Mail } from 'lucide-react';

interface ContactInfoFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrev?: () => void;
}

const ContactInfoForm = ({ formData, setFormData, onNext, onPrev }: ContactInfoFormProps) => {
  const [phone, setPhone] = useState(formData.personalInfo?.phone || '');
  const [email, setEmail] = useState(formData.personalInfo?.email || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length <= 3) return phone;
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    const phoneDigits = phone.replace(/\D/g, '');
    if (!phoneDigits) {
      newErrors.phone = 'Phone number is required';
    } else if (phoneDigits.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        phone: phone.replace(/\D/g, ''),
        email: email.trim()
      }
    }));
    
    onNext();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 animate-slide-in-right">
      {onPrev && (
            <div className="absolute top-6 left-6 z-20">
              <Button 
                onClick={onPrev}
                variant="outline"
                size="sm"
                className="animate-fade-in"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          )}
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-10">
        {/* Header */}
        <div className="bg-white px-6 py-8">
          
          
          <div className="flex items-center justify-center mb-6 animate-scale-in">
            <Phone className="w-8 h-8 text-purple-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">SOLAR LEGION</h1>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center animate-slide-in-top">
            How can we reach you?
          </h2>
          {/* <p className="text-gray-600 text-center animate-fade-in-delay">
            How can we reach you?
          </p> */}
        </div>

        {/* Form */}
        <div className="px-6 pb-8">
          <div className="space-y-4">
            <div className="animate-fade-in">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="tel"
                  placeholder="Phone Number*"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`w-full pl-12 pr-4 py-4 text-lg border-2 rounded-xl ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-purple-500 focus:outline-none`}
                  maxLength={14}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div className="animate-slide-in-bottom">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Email Address*"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full pl-12 pr-4 py-4 text-lg border-2 rounded-xl ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-purple-500 focus:outline-none`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            

          </div>
        </div>
      </div>
      <div className="h-24" /> {/* Spacer so input fields are not hidden behind fixed button */}

<div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg z-50 animate-slide-in-bottom">
  <div className="max-w-md mx-auto">
    <Button 
      onClick={handleSubmit}
      disabled={!phone || !email}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
    >
      Continue
    </Button>
  </div>
</div>
    </div>
  );
};

export default ContactInfoForm;

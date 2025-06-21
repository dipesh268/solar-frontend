
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, User } from 'lucide-react';

interface PersonalInfoFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrev?: () => void;
}

const PersonalInfoForm = ({ formData, setFormData, onNext, onPrev }: PersonalInfoFormProps) => {
  const [firstName, setFirstName] = useState(formData.personalInfo?.firstName || '');
  const [lastName, setLastName] = useState(formData.personalInfo?.lastName || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        firstName: firstName.trim(),
        lastName: lastName.trim()
      }
    }));
    
    onNext();
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'firstName') {
      setFirstName(value);
      if (errors.firstName) setErrors(prev => ({ ...prev, firstName: '' }));
    } else {
      setLastName(value);
      if (errors.lastName) setErrors(prev => ({ ...prev, lastName: '' }));
    }
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
            <User className="w-8 h-8 text-green-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">SOLAR LEGION</h1>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center animate-slide-in-top">
            Let's get to know you
          </h2>
          {/* <p className="text-gray-600 text-center animate-fade-in-delay">
            Tell us about yourself
          </p> */}
        </div>

        {/* Form */}
        <div className="px-6 pb-8">
          <div className="space-y-4">
            <div className="animate-fade-in">
              <Input
                type="text"
                placeholder="First Name*"
                value={firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:border-green-500 focus:outline-none`}
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div className="animate-slide-in-bottom">
              <Input
                type="text"
                placeholder="Last Name*"
                value={lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:border-green-500 focus:outline-none`}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={!firstName.trim() || !lastName.trim()}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-4 rounded-xl text-lg mt-6 disabled:opacity-50 animate-slide-in-bottom"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;

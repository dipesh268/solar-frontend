import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileInput } from '@/components/ui/file-input';
import { Sun, ArrowLeft } from 'lucide-react';

interface QualificationFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrev?: () => void;
}

const QualificationForm = ({ formData, setFormData, onNext, onPrev }: QualificationFormProps) => {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: formData.personalInfo?.firstName || '',
    lastName: formData.personalInfo?.lastName || '',
    phone: formData.personalInfo?.phone || '',
    email: formData.personalInfo?.email || '',
    address: formData.personalInfo?.address || ''
  });
  const [uploadedFile, setUploadedFile] = useState<File | null>(formData.utilityBill || null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!personalInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!personalInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!personalInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(personalInfo.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!personalInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!personalInfo.address.trim()) newErrors.address = 'Address is required';
    if (!uploadedFile) newErrors.utilityBill = 'Utility bill is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (file: File | null) => {
    setUploadedFile(file);
    if (file && errors.utilityBill) {
      setErrors(prev => ({ ...prev, utilityBill: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('personalInfo', JSON.stringify(personalInfo));
      
      if (uploadedFile) {
        formDataToSend.append('utilityBill', uploadedFile);
      }

      const response = await fetch('http://localhost:5000/api/customers', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const savedCustomer = await response.json();
        console.log('Customer data saved to database:', savedCustomer);
        
        setFormData(prev => ({
          ...prev,
          personalInfo,
          utilityBill: uploadedFile,
          customerId: savedCustomer._id
        }));
        
        onNext();
      } else {
        console.error('Failed to save customer data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 animate-slide-in-left">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-white px-6 py-8">
          {/* Previous Button */}
          {onPrev && (
            <div className="mb-4">
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
          
          <div className="flex items-center justify-center mb-6 animate-scale-in">
            <Sun className="w-8 h-8 text-orange-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">SOLAR LEGION</h1>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6 animate-fade-in">
            <div className="bg-teal-600 h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center animate-slide-in-top">
            Do you qualify for savings?
          </h2>
        </div>

        {/* Form */}
        <div className="px-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Utility Bill Upload */}
            <div className="animate-fade-in">
              <div className="border-2 border-gray-300 border-dashed rounded-xl p-6 text-center bg-gray-50">
                <div className="mb-3">
                  <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your utility bill*</h3>
                <FileInput onChange={handleFileChange} />
                {errors.utilityBill && <p className="text-red-500 text-sm mt-2">{errors.utilityBill}</p>}
                {uploadedFile && (
                  <p className="text-green-600 text-sm mt-2">✓ {uploadedFile.name}</p>
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4 animate-slide-in-bottom">
              <div>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First name*"
                  value={personalInfo.firstName}
                  onChange={handlePersonalInfoChange}
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:border-gray-500 focus:outline-none`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last name*"
                  value={personalInfo.lastName}
                  onChange={handlePersonalInfoChange}
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:border-gray-500 focus:outline-none`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <Input
                  type="text"
                  name="address"
                  placeholder="Address*"
                  value={personalInfo.address}
                  onChange={handlePersonalInfoChange}
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:border-gray-500 focus:outline-none`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-gray-500 focus:outline-none`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone*"
                  value={personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-gray-500 focus:outline-none`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-4 px-4 rounded-xl text-lg mt-6 disabled:opacity-50 animate-slide-in-bottom"
            >
              {isSubmitting ? 'Saving...' : 'Continue'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QualificationForm;

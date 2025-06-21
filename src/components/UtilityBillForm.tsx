
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileInput } from '@/components/ui/file-input';
import { ArrowLeft, FileText } from 'lucide-react';

interface UtilityBillFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrev?: () => void;
}

const UtilityBillForm = ({ formData, setFormData, onNext, onPrev }: UtilityBillFormProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(formData.utilityBill || null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (file: File | null) => {
    setUploadedFile(file);
    if (file && error) {
      setError('');
    }
  };

const handleSubmit = async () => {
  if (!uploadedFile) {
    setError('Utility bill is required');
    return;
  }

  setIsSubmitting(true);
  setError('');

  try {
    // // ✅ Format location into a simple string (e.g., "Chicago, Illinois")
    // const locationString = formData.location?.['place name'] && formData.location?.state
    //   ? `${formData.location['place name']}, ${formData.location.state}`
    //   : '';

    // if (!locationString) {
    //   setError('Location is missing or invalid');
    //   setIsSubmitting(false);
    //   return;
    // }
    console.log(formData.location);
    // Create FormData for the backend
    const formDataToSend = new FormData();
    formDataToSend.append('personalInfo', JSON.stringify(formData.personalInfo));
    formDataToSend.append('location', formData.location);
    formDataToSend.append('zipCode', formData.zipCode);
    formDataToSend.append('utilityBill', uploadedFile);

    console.log('Sending request to backend...');

    const response = await fetch('https://solar-backend-production.up.railway.app/api/customers', {
      method: 'POST',
      body: formDataToSend,
    });

    console.log('Response status:', response.status);

    if (response.ok) {
      const savedCustomer = await response.json();
      console.log('Customer data saved to database:', savedCustomer);

      setFormData(prev => ({
        ...prev,
        utilityBill: uploadedFile,
        customerId: savedCustomer._id
      }));

      onNext();
    } else {
      const errorData = await response.json().catch(()=>({error}));
      console.error('Failed to save customer data:', errorData);
      setError(`Failed to upload file: ${errorData.message || 'Please try again.'}`);
    }
  } catch (error) {
    console.error('Network error submitting form:', error);
    setError('Network error. Please check your connection and try again.');
  } finally {
    setIsSubmitting(false);
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
            <FileText className="w-8 h-8 text-orange-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">SOLAR LEGION</h1>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center animate-slide-in-top">
            Upload Utility Bill
          </h2>
          <p className="text-gray-600 text-center animate-fade-in-delay">
            We need this to calculate your savings
          </p>
        </div>

        {/* Form */}
        <div className="px-6 pb-8">
          <div className="animate-fade-in">
            <div className="border-2 border-gray-300 border-dashed rounded-xl p-8 text-center bg-gray-50">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Upload Your Utility Bill</h3>
              <p className="text-gray-600 mb-6">
                PDF, JPG, or PNG files accepted
              </p>
              <FileInput onChange={handleFileChange} />
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
              {uploadedFile && (
                <p className="text-green-600 text-sm mt-4 flex items-center justify-center">
                  <FileText className="w-4 h-4 mr-2" />
                  {uploadedFile.name}
                </p>
              )}
            </div>
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!uploadedFile || isSubmitting}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-4 px-4 rounded-xl text-lg mt-8 disabled:opacity-50 animate-slide-in-bottom"
          >
            {isSubmitting ? 'Uploading...' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UtilityBillForm;

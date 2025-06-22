import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MapPin } from 'lucide-react';

interface ZipCodeFormProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrev?: () => void;
}

const ZipCodeForm = ({ formData, setFormData, onNext, onPrev }: ZipCodeFormProps) => {
  const [fullAddress, setFullAddress] = useState(
  typeof formData.location === 'string' ? formData.location : ''
);
  

  const handleSubmit = () => {
    if (!fullAddress) return;

    setFormData(prev => ({
      ...prev,
      location: fullAddress
    }));

    onNext();
    console.log("Added address : ",fullAddress)
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
            <MapPin className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">SOLAR LEGION</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center animate-slide-in-top">
            Enter your full home address
          </h2>
        </div>

        {/* Form */}
        <div className="px-6 pb-8">
          <div className="space-y-6">
            <Input
              type="text"
              placeholder="e.g. 123 Main St, Chicago, IL 60653"
              // value={fullAddress}
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              className="w-full px-4 py-4 text-lg border-2 rounded-xl border-gray-300 focus:border-blue-500 focus:outline-none"
            />


           
          </div>
        </div>
        
      </div>
      <div className="h-24" /> {/* Spacer so input fields are not hidden behind fixed button */}

<div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg z-50 animate-slide-in-bottom">
  <div className="max-w-md mx-auto">
     <Button 
              onClick={handleSubmit}
              disabled={!fullAddress}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-4 rounded-xl text-lg mt-6 disabled:opacity-50 animate-slide-in-bottom"
            >
              Continue
            </Button>
  </div>
</div>
    </div>
    
  );
};

export default ZipCodeForm;

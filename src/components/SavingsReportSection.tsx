
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, FileText, Users, Video } from 'lucide-react';

interface SavingsReportSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrev?: () => void;
}

const SavingsReportSection = ({ formData, setFormData, onNext, onPrev }: SavingsReportSectionProps) => {
  const [deliveryMethod, setDeliveryMethod] = useState<string>(formData.savingsReportDelivery || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!deliveryMethod) return;

    setIsSubmitting(true);
    
    try {
      if (formData.customerId) {
        const response = await fetch(`https://solar-backend-production.up.railway.app/api/customers/${formData.customerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ savingsReportDelivery: deliveryMethod }),
        });

        if (response.ok) {
          console.log('Savings report delivery method saved to database');
        }
      }

      setFormData(prev => ({
        ...prev,
        savingsReportDelivery: deliveryMethod
      }));
      
      onNext();
    } catch (error) {
      console.error('Error saving delivery method:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-6 animate-slide-in-right">
      {/* Header with Back Button */}
      {onPrev && (
          <div className="absolute top-6 left-6 z-20 animate-fade-in">
            <Button 
              onClick={onPrev}
              variant="outline"
              size="sm"
              className="bg-slate-100 border-slate-300 hover:bg-slate-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        )}
      <div className="max-w-2xl mx-auto mt-10">
        
        

        <Card className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden animate-scale-in border-slate-200">
          <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-200 px-6 py-8">
            <CardTitle className="text-2xl font-bold text-slate-800 text-center flex items-center justify-center animate-slide-in-top">
              <FileText className="w-8 h-8 mr-3 text-slate-600" />
              Savings Report Drop Off!
            </CardTitle>
            <p className="text-slate-600 text-center mt-2 animate-fade-in-delay">
              How would you like to receive your savings report?
            </p>
          </CardHeader>

          <CardContent className="px-6 pb-8">
            <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
              <div className="grid grid-cols-1 gap-6 mb-8">
                <div className="flex items-center space-x-4 p-6 border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-400 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] mt-4 animate-slide-in-left cursor-pointer group">
                  <RadioGroupItem value="inperson" id="inperson" className="text-slate-700 border-slate-400" />
                  <Label htmlFor="inperson" className="flex items-center gap-4 cursor-pointer flex-1 group-hover:text-slate-900 transition-colors duration-200">
                    <Users className="w-8 h-8 text-slate-600 group-hover:text-slate-800 transition-colors duration-200" />
                    <div>
                      <div className="text-xl font-semibold text-slate-800">In Person</div>
                      <div className="text-slate-600">Meet with our representative at your home</div>
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-4 p-6 border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-400 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] animate-slide-in-right cursor-pointer group" style={{ animationDelay: '0.1s' }}>
                  <RadioGroupItem value="virtual" id="virtual" className="text-slate-700 border-slate-400" />
                  <Label htmlFor="virtual" className="flex items-center gap-4 cursor-pointer flex-1 group-hover:text-slate-900 transition-colors duration-200">
                    <Video className="w-8 h-8 text-slate-600 group-hover:text-slate-800 transition-colors duration-200" />
                    <div>
                      <div className="text-xl font-semibold text-slate-800">Virtual</div>
                      <div className="text-slate-600">Online video consultation from anywhere</div>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>

            <div className="text-center animate-slide-in-bottom">
              <Button 
                onClick={handleSubmit}
                disabled={!deliveryMethod || isSubmitting}
                className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
              >
                {isSubmitting ? 'Saving Preference...' : 'Continue to Scheduling'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SavingsReportSection;

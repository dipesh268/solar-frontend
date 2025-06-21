
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Phone, Mail, ArrowLeft } from 'lucide-react';

interface ThankYouSectionProps {
  onNext?: () => void;
  onPrev?: () => void;
}

const ThankYouSection = ({ onPrev }: ThankYouSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 animate-slide-in-top">
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
        <div className="max-w-2xl mx-auto text-center animate-fade-in-delay">
          {/* Success Icon */}
          <div className="mb-8 animate-bounce-in">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-2xl">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 animate-slide-in-top bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Thank You!!
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 animate-fade-in-delay-2">
            Your consultation has been scheduled successfully.
          </p>

          {/* Confirmation Details */}
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl p-8 mb-8 animate-slide-in-bottom border border-slate-200">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">What's Next?</h2>
            
            <div className="space-y-6 text-left">
              <div className="flex items-start animate-slide-in-left">
                <Calendar className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Scheduled Consultation</h3>
                  <p className="text-slate-600">A solar expert will contact you at your scheduled time to discuss your solar options and answer any questions.</p>
                </div>
              </div>
              
              <div className="flex items-start animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                <Phone className="w-6 h-6 text-emerald-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Free Assessment</h3>
                  <p className="text-slate-600">We'll review your energy usage and provide a customized solar solution for your home.</p>
                </div>
              </div>
              
              <div className="flex items-start animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
                <Mail className="w-6 h-6 text-purple-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Follow-up Information</h3>
                  <p className="text-slate-600">You'll receive detailed information about your solar options and potential savings via email.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 animate-fade-in-delay-3 border border-slate-200">
            {/* <h3 className="text-lg font-semibold text-slate-800 mb-2">Need to reschedule?</h3> */}
            <p className="text-slate-600 mb-4">Contact us anytime</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+1234567890" className="flex items-center justify-center text-slate-600 hover:text-slate-800 transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                (123) 456-7890
              </a>
              <a href="mailto:info@solarlegion.com" className="flex items-center justify-center text-slate-600 hover:text-slate-800 transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                info@solarlegion.com
              </a>
            </div>
          </div>
        </div>

        {/* Previous Button at Bottom
        {onPrev && (
          <div className="absolute bottom-6 left-6 animate-fade-in">
            <Button 
              onClick={onPrev}
              variant="outline"
              size="sm"
              className="bg-white/80 border-slate-300 text-slate-700 hover:bg-white shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ThankYouSection;

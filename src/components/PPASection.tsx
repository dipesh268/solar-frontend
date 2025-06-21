
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, CheckCircle, Home, Zap } from 'lucide-react';

interface PPASectionProps {
  onNext: () => void;
  onPrev?: () => void;
}

const PPASection = ({ onNext, onPrev }: PPASectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 animate-slide-in-left">
      <div className="container mx-auto px-4 py-8">
        {/* Previous Button */}
        {onPrev && (
          <div className="mb-6 animate-fade-in">
            <Button 
              onClick={onPrev}
              variant="outline"
              size="sm"
              className="bg-white/80 border-green-200 text-green-700 hover:bg-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        )}

        <div className="max-w-4xl mx-auto text-center animate-fade-in-delay">
          {/* Step indicator */}
          {/* <div className="mb-6">
            <span className="text-green-600 text-sm font-medium">Step 3 of 7</span>
          </div> */}

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 animate-slide-in-top">
            Power Purchase Agreement (PPA)
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 animate-fade-in-delay-2">
            No upfront costs. Start saving from day one.
          </p>

          {/* PPA Benefits */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 animate-scale-in">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">How PPAs Work</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">$0 Down</h3>
                      <p className="text-gray-600">No upfront installation costs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Immediate Savings</h3>
                      <p className="text-gray-600">Start saving on your first bill</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Full Maintenance</h3>
                      <p className="text-gray-600">We handle all maintenance and monitoring</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">25-Year Guarantee</h3>
                      <p className="text-gray-600">Performance guaranteed for 25+ years</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-8">
                  <Home className="w-20 h-20 mx-auto mb-4 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Your Home</h3>
                  <Zap className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
                  <p className="text-gray-600">Powered by clean solar energy</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={onNext}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl animate-slide-in-bottom"
          >
            Compare Options
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PPASection;

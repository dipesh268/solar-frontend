
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';

interface ComparisonSectionProps {
  onNext: () => void;
  onPrev?: () => void;
}

const ComparisonSection = ({ onNext, onPrev }: ComparisonSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 animate-slide-in-bottom">
      <div className="container mx-auto px-4 py-8">
        {/* Previous Button */}
        {onPrev && (
          <div className="mb-6 animate-fade-in">
            <Button 
              onClick={onPrev}
              variant="outline"
              size="sm"
              className="bg-white/80 border-purple-200 text-purple-700 hover:bg-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        )}

        <div className="max-w-6xl mx-auto text-center animate-fade-in-delay">
          {/* Step indicator */}
          {/* <div className="mb-6">
            <span className="text-purple-600 text-sm font-medium">Step 4 of 7</span>
          </div> */}

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 animate-slide-in-top">
            Utility vs Solar Comparison
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 animate-fade-in-delay-2">
            See the difference solar can make for your wallet
          </p>

          {/* Comparison Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Utility Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-red-500 animate-slide-in-left">
              <div className="text-center mb-6">
                <TrendingUp className="w-16 h-16 mx-auto text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">Traditional Utility</h2>
              </div>
              
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Monthly Bill</span>
                  <span className="font-bold text-red-600">$250</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Annual Increases</span>
                  <span className="font-bold text-red-600">3-5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">25-Year Cost</span>
                  <span className="font-bold text-red-600">$95,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Environmental Impact</span>
                  <span className="font-bold text-red-600">High Carbon</span>
                </div>
              </div>
            </div>

            {/* Solar Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-green-500 animate-slide-in-right">
              <div className="text-center mb-6">
                <TrendingDown className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">Solar with PPA</h2>
              </div>
              
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Monthly Bill</span>
                  <span className="font-bold text-green-600">$125</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rate Increases</span>
                  <span className="font-bold text-green-600">0-2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">25-Year Cost</span>
                  <span className="font-bold text-green-600">$45,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Environmental Impact</span>
                  <span className="font-bold text-green-600">Zero Carbon</span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Highlight */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 mb-12 animate-scale-in">
            <h3 className="text-3xl font-bold mb-4">Potential 25-Year Savings</h3>
            <p className="text-5xl font-bold mb-2">$50,000+</p>
            <p className="text-xl opacity-90">That's real money back in your pocket</p>
          </div>

          {/* CTA Button */}
          
        </div>
      </div>
       <div className="h-24" /> {/* Spacer to prevent content overlap */}

<div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 shadow-lg animate-slide-in-bottom z-50">
  <div className="max-w-4xl mx-auto text-center">
   <Button 
            onClick={onNext}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl animate-slide-in-bottom"
          >
            Get Your Quote
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
  </div>
</div>
    </div>
  );
};

export default ComparisonSection;

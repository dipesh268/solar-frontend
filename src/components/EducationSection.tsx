
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Zap, DollarSign, Shield } from 'lucide-react';

interface EducationSectionProps {
  onNext: () => void;
  onPrev?: () => void;
}

const EducationSection = ({ onNext, onPrev }: EducationSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 animate-slide-in-right relative">
      {/* Previous Button at Top */}
      {onPrev && (
        <div className="absolute top-6 left-6 z-20 animate-fade-in">
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
      )}

      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-delay">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-12 text-slate-800 animate-slide-in-top bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Why Solar?
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 animate-fade-in-delay-2">
            Discover the benefits of switching to solar energy
          </p>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl shadow-xl animate-slide-in-left border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce-in">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Save Money</h3>
              <p className="text-slate-600">
                Reduce your electricity bills by up to 90% and lock in your energy costs for 25+ years.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl shadow-xl animate-slide-in-right border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce-in" style={{ animationDelay: '0.4s' }}>
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Energy Independence</h3>
              <p className="text-slate-600">
                Protect yourself from rising utility rates and power outages with your own energy source.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl shadow-xl animate-scale-in border border-slate-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Clean Energy</h3>
              <p className="text-slate-600">
                Generate clean, renewable energy and reduce your carbon footprint for a better planet.
              </p>
            </div>

            
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
            className="bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl animate-slide-in-bottom border border-slate-400"
          >
            Learn About PPAs
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;

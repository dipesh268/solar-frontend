
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, AlertTriangle } from 'lucide-react';

interface HeroSectionProps {
  onNext: () => void;
  onPrev?: () => void;
}

const HeroSection = ({ onNext, onPrev }: HeroSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-600 to-gray-800 text-white relative overflow-hidden animate-fade-in">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Previous Button at Top */}
      {onPrev && (
        <div className="absolute top-6 left-6 z-20 animate-fade-in">
          <Button 
            onClick={onPrev}
            variant="outline"
            size="sm"
            className="bg-gray-800/50 border-gray-400 text-gray-100 hover:bg-gray-700/70 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen text-center">
        {/* Warning Icon */}
        <div className="mb-8 animate-bounce-in">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl">
            <AlertTriangle className="w-12 h-12 text-gray-800" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight animate-slide-in-left bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
          Edison Rates Are Rising
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-amber-400 animate-slide-in-right">
          Fast
        </h2>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl leading-relaxed animate-fade-in-delay">
          See how you can protect your home from 
          SCE's skyrocketing electricity costs.
        </p>

        {/* Additional Info */}
        <p className="text-base md:text-lg text-gray-200 mb-12 max-w-xl animate-fade-in-delay-2">
          What's happening in SoCal: 
          Utility rates climbing faster than ever before
        </p>

        {/* CTA Button */}
        <Button 
          onClick={onNext}
          size="lg"
          className="bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white text-gray-800 font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl mb-6 animate-slide-in-bottom border border-gray-200"
        >
          Start: How To Save
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>

        {/* Disclaimer */}
        <p className="text-gray-300 text-sm max-w-md animate-fade-in-delay-3">
          Free consultation • No obligation • Quick approval
        </p>
      </div>
    </div>
  );
};

export default HeroSection;

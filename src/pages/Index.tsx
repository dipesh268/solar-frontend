
import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import EducationSection from '@/components/EducationSection';
import PPASection from '@/components/PPASection';
import ComparisonSection from '@/components/ComparisonSection';
import ZipCodeForm from '@/components/ZipCodeForm';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import ContactInfoForm from '@/components/ContactInfoForm';
import UtilityBillForm from '@/components/UtilityBillForm';
import QuizSection from '@/components/QuizSection';
import SavingsReportSection from '@/components/SavingsReportSection';
import SchedulingSection from '@/components/SchedulingSection';
import ThankYouSection from '@/components/ThankYouSection';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    zipCode: '',
    location: {},
    personalInfo: {},
    utilityBill: null,
    quizAnswers: {},
    savingsReportDelivery: '',
    customerId: null
  });

  const sections = [
    { id: 'hero', component: HeroSection, needsFormData: false },
    { id: 'education', component: EducationSection, needsFormData: false },
    { id: 'ppa', component: PPASection, needsFormData: false },
    { id: 'comparison', component: ComparisonSection, needsFormData: false },
    { id: 'zipcode', component: ZipCodeForm, needsFormData: true },
    { id: 'personalinfo', component: PersonalInfoForm, needsFormData: true },
    { id: 'contactinfo', component: ContactInfoForm, needsFormData: true },
    { id: 'utilitybill', component: UtilityBillForm, needsFormData: true },
    { id: 'quiz', component: QuizSection, needsFormData: true },
    { id: 'savingsreport', component: SavingsReportSection, needsFormData: true },
    { id: 'scheduling', component: SchedulingSection, needsFormData: true },
    { id: 'thankyou', component: ThankYouSection, needsFormData: false }
  ];

  const nextStep = () => {
    if (currentStep < sections.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentSection = sections[currentStep];
  const CurrentComponent = currentSection.component;

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full bg-card shadow-sm z-50">
        <div className="h-2 bg-muted">
          <div 
            className="h-full bg-gradient-to-r from-slate-400 to-slate-600 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-2">
        {currentSection.needsFormData ? (
          <CurrentComponent 
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={currentStep > 0 ? prevStep : undefined}
          />
        ) : (
          <CurrentComponent 
            onNext={nextStep} 
            onPrev={currentStep > 0 ? prevStep : undefined}
          />
        )}
      </div>
    </div>
  );
};

export default Index;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Sun, ChevronLeft, ChevronRight, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

interface QuizSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrev?: () => void;
}

const QuizSection = ({ formData, setFormData, onNext, onPrev }: QuizSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>(formData.quizAnswers || {});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTileOptions, setShowTileOptions] = useState(false);

  const questions = [
    {
      question: "Do you own your home?",
      options: [
        "Yes, I own my home",
        "yes, my spouse/relative owns the home",
        "No, I rent",
        "I'm in the process of buying"
      ]
    },
    {
      question: "What type of roof do you have?",
      subtext: "Select the closest match below. If your roof is tile, please select the specific type:",
      options: [
        "Shingle / Asphalt (most common in SoCal, easy for solar installs)",
        "Tile",
        "Metal (standing seam or corrugated)",
        "Flat / Other (e.g., TPO, tar & gravel, foam)",
        "I don't know"
      ],
      tileOptions: [
        "Clay",
        "Concrete",
        "Spanish / S-tile",
        "Flat Tile",
        "Lightweight Composite"
      ]
    }
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
    
    // Show tile options if "Tile" is selected
    if (currentQuestion === 1 && value === "Tile") {
      setShowTileOptions(true);
    } else if (currentQuestion === 1 && value !== "Tile" && !value.startsWith("Tile - ")) {
      setShowTileOptions(false);
    }
    };

  const handleTileSubOptionChange = (tileOption: string) => {
    const fullValue = `Tile - ${tileOption}`;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: fullValue
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowTileOptions(false);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowTileOptions(false);
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    
    try {
      if (formData.customerId) {
        const response = await fetch(`https://solar-backend-production.up.railway.app/api/customers/${formData.customerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quizAnswers: answers }),
        });

        if (response.ok) {
          console.log('Quiz answers saved to database');
        }
      }

      setFormData(prev => ({
        ...prev,
        quizAnswers: answers
      }));
      
      onNext();
    } catch (error) {
      console.error('Error saving quiz answers:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQuestionData = questions[currentQuestion];
   const currentAnswer = answers[currentQuestion] || '';
  const isTileSelected = currentAnswer === "Tile" || currentAnswer.startsWith("Tile - ");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-8 animate-slide-in-right">
      {onPrev && currentQuestion === 0 && (
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
        {/* Header with Back Button */}
        
        <Card className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden animate-scale-in border-slate-200">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-200 px-6 py-8">
            <div className="flex items-center justify-center mb-6 animate-fade-in">
              <Sun className="w-8 h-8 text-amber-500 mr-3 animate-bounce" />
              <h1 className="text-2xl font-bold text-slate-800">SOLAR LEGION</h1>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-300 rounded-full h-3 mb-6 animate-fade-in shadow-inner">
              <div 
                className="bg-gradient-to-r from-slate-600 to-slate-700 h-3 rounded-full transition-all duration-700 ease-out shadow-sm" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* <CardTitle className="text-2xl font-bold text-slate-800 text-center animate-slide-in-top">
              Assessment Quiz
            </CardTitle>
            <p className="text-slate-600 text-center mt-2 animate-fade-in-delay">
              Question {currentQuestion + 1} of {questions.length}
            </p> */}
          </CardHeader>

          {/* Question Content */}
          <CardContent className="px-6 pb-8">
            <div className="mb-8 animate-fade-in">
              <h3 className="text-xl font-semibold text-slate-900 mb-2 text-center leading-relaxed animate-slide-in-top">
                {currentQuestionData.question}
              </h3>
              {currentQuestionData.subtext && (
                <p className="text-slate-600 text-center mb-6 animate-fade-in-delay">
                  {currentQuestionData.subtext}
                </p>
              )}
              
              <RadioGroup 
                value={currentAnswer.startsWith("Tile - ") ? "Tile" : currentAnswer} 
                onValueChange={handleAnswerChange}
                className="space-y-3"
              >
                {currentQuestionData.options.map((option, index) => (
                  <div key={index}>
                    <div 
                      className="flex items-center space-x-3 p-4 border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-400 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 animate-slide-in-left cursor-pointer group" 
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <RadioGroupItem 
                        value={option} 
                        id={`option-${index}`} 
                        className="text-slate-700 border-slate-400"
                      />
                      <Label 
                        htmlFor={`option-${index}`} 
                        className="flex-1 text-lg cursor-pointer text-slate-800 group-hover:text-slate-900 transition-colors duration-200"
                      >
                        {option}
                      </Label>
                      {option === "Tile" && (
                        <div className="ml-auto">
                          {isTileSelected && showTileOptions ? (
                            <ChevronUp className="w-5 h-5 text-slate-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-600" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Tile Sub-options */}
                    {option === "Tile" && isTileSelected && (
                      <div className="ml-8 mt-3 space-y-2 animate-fade-in">
                        {currentQuestionData.tileOptions?.map((tileOption, tileIndex) => (
                          <div 
                            key={tileIndex}
                            className="flex items-center space-x-3 p-3 border border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all duration-200 cursor-pointer"
                            onClick={() => handleTileSubOptionChange(tileOption)}
                          >
                            <RadioGroupItem 
                              value={`Tile - ${tileOption}`} 
                              id={`tile-option-${tileIndex}`} 
                              className="text-slate-700 border-slate-400"
                              checked={currentAnswer === `Tile - ${tileOption}`}
                            />
                            <Label 
                              htmlFor={`tile-option-${tileIndex}`} 
                              className="flex-1 cursor-pointer text-slate-700"
                            >
                              {tileOption}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center animate-slide-in-bottom">
              <Button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                variant="outline"
                className="flex items-center gap-2 px-6 py-3 border-slate-300 hover:bg-slate-100 hover:border-slate-400 transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion] || isSubmitting}
                className="bg-slate-700 hover:bg-slate-800 text-white flex items-center gap-2 px-6 py-3 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {currentQuestion === questions.length - 1 ? (
                  isSubmitting ? 'Submitting...' : 'Next'
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizSection;


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, User, FileText, ClipboardList } from 'lucide-react';

interface ReviewSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
}

const ReviewSection = ({ formData, onNext }: ReviewSectionProps) => {
  const { personalInfo, utilityBill, quizAnswers } = formData;

  const handleSubmit = () => {
    // Create comprehensive submission data
    const submissionData = {
      id: Date.now().toString(),
      personalInfo: {
        firstName: personalInfo.firstName || 'Not provided',
        lastName: personalInfo.lastName || 'Not provided',
        phone: personalInfo.phone || 'Not provided',
        email: personalInfo.email || 'Not provided',
        address: personalInfo.address || 'Not provided'
      },
      utilityBill: utilityBill ? {
        name: utilityBill.name,
        uploadDate: new Date().toISOString()
      } : null,
      quizAnswers: quizAnswers || {},
      submissionDate: new Date().toISOString(),
      status: 'New Lead'
    };

    console.log('Saving submission to database:', submissionData);
    
    // Store in localStorage (simulating database storage)
    const existingData = JSON.parse(localStorage.getItem('solarLeads') || '[]');
    existingData.push(submissionData);
    localStorage.setItem('solarLeads', JSON.stringify(existingData));
    
    // In a real application, you would send this to your backend API
    // fetch('/api/leads', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(submissionData)
    // });

    onNext();
  };

  return (
    <div className="min-h-screen bg-white py-8 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Review Your Information
          </h2>
          <p className="text-lg text-gray-600">
            Please review all the details before submitting
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {/* Personal Information Review */}
          <Card className="border-2 border-gray-200 rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                <User className="w-6 h-6 mr-3 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="text-gray-900">{personalInfo.firstName} {personalInfo.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Phone:</span>
                  <span className="text-gray-900">{personalInfo.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="text-gray-900">{personalInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Address:</span>
                  <span className="text-gray-900">{personalInfo.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Utility Bill Review */}
          <Card className="border-2 border-gray-200 rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-orange-600" />
                Utility Bill
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <span className="text-gray-900">
                  {utilityBill ? `File uploaded: ${utilityBill.name}` : 'No file uploaded'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Answers Review */}
          <Card className="border-2 border-gray-200 rounded-xl">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                <ClipboardList className="w-6 h-6 mr-3 text-purple-600" />
                Qualification Answers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(quizAnswers).map(([questionIndex, answer]) => {
                  const questions = [
                    "How long since roof was replaced?",
                    "Do you have open beam ceilings?", 
                    "Roof material?",
                    "Do you own an EV?",
                    "Plan to buy EV?",
                    "Plan to switch appliances to electric?"
                  ];
                  
                  return (
                    <div key={questionIndex} className="flex justify-between">
                      <span className="font-medium text-gray-700">{questions[parseInt(questionIndex)]}:</span>
                      <span className="text-gray-900">{answer as string}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4">
          <div className="max-w-md mx-auto">
            <Button 
              onClick={handleSubmit}
              className="w-full bg-black text-white hover:bg-gray-800 rounded-full py-4 text-lg font-semibold"
            >
              Submit All Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;

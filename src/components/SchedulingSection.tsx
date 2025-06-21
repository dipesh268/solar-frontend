
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Calendar as CalendarIcon, Clock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';

interface SchedulingSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onPrev?: () => void;
}

const SchedulingSection = ({ formData, setFormData, onNext, onPrev }: SchedulingSectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate next 5 days starting from today (today + next 4 days)
  const today = new Date();
  const availableDates = Array.from({ length: 5 }, (_, i) => addDays(today, i));
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
  ];


  // Generate calendar days for the current month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Check if a date is clickable (within our 5 available dates)
  const isDateClickable = (date: Date) => {
    return availableDates.some(availableDate => isSameDay(date, availableDate));
  };

  // Check if a date is highlighted (clickable)
  const isDateHighlighted = (date: Date) => {
    return isDateClickable(date);
  };

  const handleDateClick = (date: Date) => {
    if (isDateClickable(date)) {
      setSelectedDate(date);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(addDays(startOfMonth(currentMonth), -1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(addDays(endOfMonth(currentMonth), 1));
  };

  const handleScheduleSubmit = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    
    try {
      const schedulingData = {
        scheduledDate: selectedDate.toISOString(),
        scheduledTime: selectedTime,
        status: 'Scheduled'
      };

      if (formData.customerId) {
        const response = await fetch(`https://solar-backend-production.up.railway.app/${formData.customerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(schedulingData),
        });

        if (response.ok) {
          console.log('Scheduling data saved to database');
          setFormData(prev => ({
            ...prev,
            scheduledDate: selectedDate,
            scheduledTime: selectedTime
          }));
          onNext();
        }
      }
    } catch (error) {
      console.error('Error saving scheduling data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-6 animate-slide-in-right">
      {onPrev && (
            <div className="absolute top-6 left-6 z-20">
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
      <div className="max-w-4xl mx-auto mt-10">
        {/* Header with Back Button */}
        <div className="flex items-center mb-8 animate-fade-in">
          
          <div className="text-center flex-1">
            <h2 className="text-3xl font-bold mb-4 text-slate-800 animate-slide-in-top">
              Schedule
               {/* Your Consultation */}
            </h2>
            {/* <p className="text-lg text-slate-600 animate-fade-in-delay">
              Choose your preferred date and time
            </p> */}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <Card className="border-2 border-slate-200 rounded-xl shadow-lg animate-slide-in-left bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800 flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarIcon className="w-6 h-6 mr-3 text-slate-600" />
                  Select a Day
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={goToPreviousMonth}
                  className="p-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h3 className="text-lg font-semibold text-slate-800">
                  {format(currentMonth, 'MMMM yyyy')}
                </h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={goToNextMonth}
                  className="p-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Calendar Grid */}
              <div className="space-y-4">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-slate-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((date, index) => {
                    const isClickable = isDateClickable(date);
                    const isHighlighted = isDateHighlighted(date);
                    const isSelected = selectedDate && isSameDay(date, selectedDate);
                    const isTodayDate = isToday(date);

                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        className={`
                          h-10 w-10 p-0 text-sm relative
                          ${!isSameMonth(date, currentMonth) ? 'text-slate-300' : ''}
                          ${isClickable ? 'hover:bg-blue-100 cursor-pointer' : 'cursor-not-allowed opacity-50'}
                          ${isHighlighted ? 'bg-blue-50 text-blue-700 font-semibold' : ''}
                          ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                          ${isTodayDate && !isSelected ? 'bg-slate-200 font-bold' : ''}
                        `}
                        onClick={() => handleDateClick(date)}
                        disabled={!isClickable}
                      >
                        {format(date, 'd')}
                        {isTodayDate && !isSelected && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Available Dates Info
              <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-2">Available Dates:</p>
                <div className="space-y-1">
                  {availableDates.map((date, index) => (
                    <p key={index} className="text-sm text-blue-700">
                      {format(date, 'EEEE, MMMM do')}
                    </p>
                  ))}
                </div>
              </div> */}
            </CardContent>
          </Card>

          {/* Time Slots Section */}
          <Card className="border-2 border-slate-200 rounded-xl shadow-lg animate-slide-in-right bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-slate-600" />
                Available Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate ? (
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time, index) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className={`p-3 text-center transition-all duration-200 ${
                        selectedTime === time 
                          ? 'bg-slate-700 text-white hover:bg-slate-800' 
                          : 'hover:bg-slate-100 hover:border-slate-400 border-slate-300'
                      }`}
                      onClick={() => setSelectedTime(time)}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Please select a date first</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Selected Appointment Summary */}
        {selectedDate && selectedTime && (
          <Card className="mt-8 border-2 border-slate-300 bg-green-100 animate-fade-in shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-slate-700 mr-3" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Appointment Scheduled
                  </h3>
                  <p className="text-slate-700">
                    {format(selectedDate, 'EEEE, MMMM do, yyyy')} at {selectedTime}
                  </p>
                  <p className="text-slate-600 text-sm mt-1">
                    Report delivery: {formData.savingsReportDelivery === 'inperson' ? 'In Person' : 'Virtual'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="mt-8 text-center animate-slide-in-bottom">
          <Button 
            onClick={handleScheduleSubmit}
            disabled={!selectedDate || !selectedTime || isSubmitting}
            className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
          >
            {isSubmitting ? 'Confirming Appointment...' : 'Confirm Appointment'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchedulingSection;

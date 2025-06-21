import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Users, Calendar, FileText, MapPin, Phone, Mail, User, Download, Trash2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus !== 'true') {
      navigate('/admin-login');
      return;
    }
    setIsAuthenticated(true);
  }, [navigate]);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCustomers();
      
      // Auto-refresh every 30 seconds
      const interval = setInterval(fetchCustomers, 30000);
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin-login');
  };

  const downloadUtilityBill = async (customerId: string, fileName: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${customerId}/file`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName || 'utility-bill';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const deleteCustomer = async (customerId: string) => {
    if (window.confirm('Are you sure you want to delete this customer record?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/customers/${customerId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Remove the customer from the local state
          setCustomers(customers.filter(customer => customer._id !== customerId));
          console.log('Customer deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-green-100 text-green-800';
      case 'New Lead': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customer data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Solar Legion Admin</h1>
              <p className="text-gray-600">Manage customer leads and appointments</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                Auto-refresh: 30s
              </Badge>
              <Button onClick={fetchCustomers} variant="outline">
                Refresh Now
              </Button>
              <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Scheduled</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {customers.filter(c => c.status === 'Scheduled').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">With Utility Bills</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {customers.filter(c => c.utilityBill?.name).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer List */}
        <div className="space-y-6">
          {customers.map((customer) => (
            <Card key={customer._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-600" />
                    {customer.personalInfo?.firstName} {customer.personalInfo?.lastName}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteCustomer(customer._id)}
                      className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {customer.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {customer.location}
                      </span>
                    </div>
                  )}
                  
                  {customer.personalInfo?.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{customer.personalInfo.phone}</span>
                    </div>
                  )}
                  
                  {customer.personalInfo?.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{customer.personalInfo.email}</span>
                    </div>
                  )}
                </div>

                {/* Quiz Answers */}
                {customer.quizAnswers && Object.keys(customer.quizAnswers).length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Quiz Answers:</h4>
                    <div className="space-y-1">
                      {Object.entries(customer.quizAnswers).map(([questionIndex, answer]) => (
                        <p key={questionIndex} className="text-sm text-gray-600">
                          Q{parseInt(questionIndex) + 1}: {String(answer)}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Savings Report Delivery */}
                {customer.savingsReportDelivery && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Preferred Delivery: </span>
                    <Badge variant="outline" className="ml-2">
                      {customer.savingsReportDelivery === 'inperson' ? 'In Person' : 'Virtual'}
                    </Badge>
                  </div>
                )}

                {/* Scheduling Information */}
                {customer.scheduledDate && customer.scheduledTime && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Scheduled Appointment</span>
                    </div>
                    <p className="text-sm text-green-700">
                      {format(new Date(customer.scheduledDate), 'EEEE, MMMM do, yyyy')} at {customer.scheduledTime}
                    </p>
                    {customer.schedulingNotes && (
                      <p className="text-sm text-green-600 mt-1">
                        Notes: {customer.schedulingNotes}
                      </p>
                    )}
                  </div>
                )}

                {/* Utility Bill */}
                {customer.utilityBill?.name && (
                  <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        Utility Bill: {customer.utilityBill.name}
                      </span>
                      <span className="text-xs text-blue-600">
                        ({Math.round(customer.utilityBill.size / 1024)} KB)
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadUtilityBill(customer._id, customer.utilityBill.name)}
                      className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}

                {/* Submission Date */}
                <div className="text-xs text-gray-500 pt-2 border-t">
                  Submitted: {format(new Date(customer.submissionDate), 'MMM do, yyyy at h:mm a')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {customers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No customers yet</h3>
            <p className="text-gray-600">Customer data will appear here once they submit forms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simple authentication - in real app, this would be handled by Supabase
    if (credentials.username === 'admin' && credentials.password === 'solar123') {
      localStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-600 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 font-heading">Admin Portal</h1>
          <p className="text-gray-300">Enter your credentials to access the admin dashboard</p>
        </div>

        <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-center">Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm">
                {error}
              </div>
            )}
            
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black-400" />
              <Input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="pl-10 bg-white/10 border-white/20 text-black placeholder-gray-400"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black-400" />
              <Input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="pl-10 bg-white/10 border-white/20 text-black placeholder-gray-400"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            
            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold"
            >
              Login to Admin Panel
            </Button>
            
            <div className="text-center text-gray-400 text-sm mt-4">
              <p>Demo credentials:</p>
              <p>Username: admin | Password: solar123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;

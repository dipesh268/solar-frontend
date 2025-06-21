
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User } from 'lucide-react';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth = ({ onAuthenticated }: AdminAuthProps) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (isAuthenticated === 'true') {
      onAuthenticated();
    }
  }, [onAuthenticated]);

  const handleLogin = () => {
    if (credentials.username === 'admin' && credentials.password === 'solar123') {
      localStorage.setItem('adminAuthenticated', 'true');
      onAuthenticated();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-white">Admin Authentication</CardTitle>
          <p className="text-gray-400">Login to access the admin dashboard</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm">
              {error}
            </div>
          )}
          
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
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
  );
};

export default AdminAuth;

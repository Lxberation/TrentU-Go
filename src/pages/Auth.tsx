import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import Logo from '@/components/Logo';
import Bubbles from '@/components/Bubbles';
import { AtSign, Lock } from 'lucide-react';

const Auth = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(identifier.trim(), password);
      navigate('/profile');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Password Reset",
      description: "Please check your Trent email for password reset instructions.",
    });
  };

  const handleRetrieveStudentId = () => {
    toast({
      title: "Student ID Retrieval",
      description: "Please contact the IT Help Desk at helpdesk@trentu.ca for assistance.",
    });
  };

  const handleActivateAccount = () => {
    toast({
      title: "Account Activation",
      description: "New students can activate their account at activate.trentu.ca",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-trent-primary">
      <Bubbles />
      <Logo />
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-5 pb-20">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Student Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="identifier" className="block text-white mb-1">
                Trent Email or Student ID
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                <input
                  id="identifier"
                  type="text"
                  placeholder="name@trentu.ca or Student ID"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/50 rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-white mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 text-white placeholder:text-white/50 rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 border rounded bg-white/5 border-white/20 focus:ring-0 focus:ring-offset-0"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-white">Remember me</label>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-trent-primary font-medium py-2 rounded-md hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-trent-primary"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-6 space-y-3">
            <button onClick={handleRetrieveStudentId} className="w-full text-white text-sm text-center hover:underline">
              Retrieve your Student ID
            </button>
            <button onClick={handleForgotPassword} className="w-full text-white text-sm text-center hover:underline">
              Forgot Username/Password?
            </button>
            <button onClick={handleActivateAccount} className="w-full text-white text-sm text-center hover:underline">
              Activate Student Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

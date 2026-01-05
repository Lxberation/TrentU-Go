
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Bubbles from '@/components/Bubbles';
import Logo from '@/components/Logo';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-trent-primary flex flex-col">
      <Bubbles />
      <Logo />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-white mb-2">404</h1>
          <p className="text-xl text-white mb-6">Page not found</p>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-trent-primary font-medium px-6 py-2 rounded-md hover:bg-white/90 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

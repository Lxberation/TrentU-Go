
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Camera, Wallet } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-trent-primary border-t border-white/20 z-10">
      <button
        className={`flex flex-col items-center justify-center w-1/3 h-full ${
          isActive('/profile') ? 'text-white' : 'text-white/70'
        }`}
        onClick={() => navigate('/profile')}
      >
        <User className="h-6 w-6" />
        <span className="text-xs mt-1">Profile</span>
      </button>
      
      <button
        className={`flex flex-col items-center justify-center w-1/3 h-full ${
          isActive('/id-card') ? 'text-white' : 'text-white/70'
        }`}
        onClick={() => navigate('/id-card')}
      >
        <Camera className="h-6 w-6" />
        <span className="text-xs mt-1">ID Card</span>
      </button>
      
      <button
        className={`flex flex-col items-center justify-center w-1/3 h-full ${
          isActive('/finances') ? 'text-white' : 'text-white/70'
        }`}
        onClick={() => navigate('/finances')}
      >
        <Wallet className="h-6 w-6" />
        <span className="text-xs mt-1">Finance</span>
      </button>
    </div>
  );
};

export default BottomNavigation;

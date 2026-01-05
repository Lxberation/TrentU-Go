
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import ProfilePicture from '@/components/ProfilePicture';
import Bubbles from '@/components/Bubbles';
import Logo from '@/components/Logo';

const IdCard = () => {
  const { user } = useAuth();
  const [qrValue, setQrValue] = useState('');

  useEffect(() => {
    // Generate a QR code value based on student ID
    if (user) {
      setQrValue(`TRENT-${user.studentId}-${user.cardNumber}`);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-trent-primary pb-20">
      <Bubbles />
      <Logo />
      
      <div className="container px-4 py-6">
        <div className="flex flex-col items-center mb-8">
          <ProfilePicture size="md" src={user?.profilePicture} />
          <h2 className="text-xl font-bold text-white mt-4">{user?.fullName}</h2>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white p-4 rounded-xl mb-8 w-64 h-64 flex items-center justify-center">
            {/* QR Code - Using placeholder for demo */}
            <div className="relative w-full h-full grid place-items-center">
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${Math.random() > 0.7 ? 'bg-trent-primary' : 'bg-transparent'}`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 m-auto w-16 h-16 bg-white z-10 grid place-items-center">
                <div className="w-12 h-12 bg-trent-primary rounded-sm" />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-8 bg-white rounded-sm flex items-center justify-center">
                <div className="h-1 w-40 bg-black" />
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-white text-lg font-semibold">Card Number</p>
            <p className="text-white text-2xl font-bold tracking-widest mt-1">
              {user?.cardNumber || '0000000'}
            </p>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default IdCard;

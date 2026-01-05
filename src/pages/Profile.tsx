
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import BottomNavigation from '@/components/BottomNavigation';
import ProfilePicture from '@/components/ProfilePicture';
import ActionButton from '@/components/ActionButton';
import Bubbles from '@/components/Bubbles';
import Logo from '@/components/Logo';
import PasswordChangeForm from '@/components/PasswordChangeForm';
import PhotoUploadForm from '@/components/PhotoUploadForm';
import { Camera, KeyRound, CreditCard, AlertOctagon, Phone } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);

  const handleChangePhoto = () => {
    setPhotoDialogOpen(true);
  };

  const handleChangePassword = () => {
    setPasswordDialogOpen(true);
  };

  const handleManageTrentCards = () => {
    // Open in new tab
    window.open('https://www.trentu.ca/trentucard/', '_blank');
  };

  const handleReportCard = () => {
    // Open in new tab
    window.open('https://secure.touchnet.net/C20636_ustores/web/product_detail.jsp?PRODUCTID=84', '_blank');
  };

  return (
    <div className="min-h-screen bg-trent-primary pb-20">
      <Bubbles />
      <Logo />
      
      <div className="container px-4 py-6">
        <div className="flex flex-col items-center mb-8">
          <ProfilePicture size="lg" src={user?.profilePicture} />
          <h2 className="text-xl font-bold text-white mt-4">{user?.fullName}</h2>
          <p className="text-white/80">Student ID: {user?.studentId}</p>
        </div>
        
        <div className="space-y-4 mb-8">
          <ActionButton 
            icon={Camera} 
            label="Change ID Photo"
            onClick={handleChangePhoto}
          />
          
          <ActionButton 
            icon={KeyRound} 
            label="Change Password"
            onClick={handleChangePassword}
          />
          
          <ActionButton 
            icon={CreditCard} 
            label="Manage Trent Cards"
            onClick={handleManageTrentCards}
          />
          
          <ActionButton 
            icon={AlertOctagon} 
            label="Report Missing/Stolen Card"
            onClick={handleReportCard}
          />
        </div>
        
        <div className="bg-white/10 rounded-xl p-4 mb-8">
          <h3 className="text-white font-semibold mb-4">Campus Security</h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-white mr-3" />
              <div>
                <p className="text-white text-sm">Peterborough Campus:</p>
                <p className="text-white font-semibold">(705) 748-1333</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-white mr-3" />
              <div>
                <p className="text-white text-sm">Durham Campus:</p>
                <p className="text-white font-semibold">(905) 345-5102 x5111</p>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="w-full bg-white/10 border border-white/20 text-white py-2 rounded-lg hover:bg-white/20 transition-colors"
        >
          Sign Out
        </button>
      </div>
      
      <PasswordChangeForm
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
      />
      
      <PhotoUploadForm
        open={photoDialogOpen}
        onOpenChange={setPhotoDialogOpen}
      />
      
      <BottomNavigation />
    </div>
  );
};

export default Profile;

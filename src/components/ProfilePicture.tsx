
import React from 'react';
import { User } from 'lucide-react';

interface ProfilePictureProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ 
  src, 
  alt = "Profile Picture",
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-trent-secondary/30 flex items-center justify-center ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      ) : (
        <User className="w-2/3 h-2/3 text-white" />
      )}
    </div>
  );
};

export default ProfilePicture;

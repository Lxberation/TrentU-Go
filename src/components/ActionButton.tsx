
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon: Icon, 
  label, 
  onClick,
  className
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center p-4 rounded-lg bg-white/10 border border-white/20 w-full hover:bg-white/20 transition-colors",
        className
      )}
    >
      <Icon className="h-5 w-5 text-white mr-3" />
      <span className="text-white text-left">{label}</span>
    </button>
  );
};

export default ActionButton;

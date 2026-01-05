import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/components/ui/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Image, Upload } from 'lucide-react';

interface PhotoUploadFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PhotoUploadForm: React.FC<PhotoUploadFormProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const { user, updateProfilePicture } = useAuth();
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file (JPEG, PNG).",
        variant: "destructive",
      });
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleUpload = async () => {
    if (!preview) return;
    
    setIsUploading(true);
    
    try {
      // In a real application, you would upload the file to a server
      // For demo purposes, we'll just update the local state
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the profile picture in the auth context
      updateProfilePicture(preview);
      
      toast({
        title: "Photo Updated",
        description: "Your ID photo has been updated successfully.",
      });
      
      onOpenChange(false);
      setPreview(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change ID Photo</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 py-4">
          <div 
            className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
            onClick={triggerFileInput}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <>
                <Image className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to select image</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG formats</p>
              </>
            )}
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
          />
          
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={triggerFileInput}
              className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Browse...
            </button>
            
            <button
              type="button"
              onClick={handleUpload}
              disabled={!preview || isUploading}
              className={`bg-trent-primary text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors ${!preview ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isUploading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoUploadForm;

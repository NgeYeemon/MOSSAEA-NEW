
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  images: string[];
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInsertImage: (imageUrl: string) => void;
}

const ImageUpload = ({ images, onImageUpload, onInsertImage }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h3 className="font-semibold text-white mb-3">Images</h3>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageUpload}
        accept="image/*"
        multiple
        className="hidden"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload Images
      </Button>
      
      {images.length > 0 && (
        <div className="mt-3 space-y-2">
          {images.map((img, index) => (
            <div key={index} className="flex items-center space-x-2">
              <img src={img} alt="Uploaded" className="w-8 h-8 rounded object-cover" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onInsertImage(img)}
                className="text-white hover:bg-white/10"
              >
                Insert
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

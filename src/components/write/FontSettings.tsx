
import React from 'react';
import { Type } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FontSettingsProps {
  fontSize: number;
  fontFamily: string;
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (family: string) => void;
}

const FontSettings = ({ fontSize, fontFamily, onFontSizeChange, onFontFamilyChange }: FontSettingsProps) => {
  const fonts = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 
    'Playfair Display', 'Merriweather', 'Crimson Text', 'Libre Baskerville'
  ];

  return (
    <div>
      <h3 className="font-semibold text-white mb-3">Font Settings</h3>
      <div className="space-y-3">
        <Select value={fontFamily} onValueChange={onFontFamilyChange}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fonts.map(font => (
              <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="flex items-center space-x-2">
          <Type className="w-4 h-4 text-white" />
          <input
            type="range"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) => onFontSizeChange(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-white text-sm">{fontSize}px</span>
        </div>
      </div>
    </div>
  );
};

export default FontSettings;

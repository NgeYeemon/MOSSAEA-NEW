
import React from 'react';
import { Palette } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BackgroundSettingsProps {
  backgroundColor: string;
  textColor: string;
  onBackgroundColorChange: (color: string) => void;
  onTextColorChange: (color: string) => void;
}

const BackgroundSettings = ({ 
  backgroundColor, 
  textColor, 
  onBackgroundColorChange, 
  onTextColorChange 
}: BackgroundSettingsProps) => {
  const backgroundOptions = [
    { value: 'gradient-sage-navy', label: 'Sage & Navy', class: 'bg-gradient-to-br from-emerald-900 via-slate-800 to-slate-900' },
    { value: 'gradient-purple', label: 'Purple Night', class: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' },
    { value: 'gradient-blue', label: 'Ocean Blue', class: 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' },
    { value: 'dark-navy', label: 'Deep Navy', class: 'bg-slate-900' },
    { value: 'sage-green', label: 'Sage Green', class: 'bg-emerald-900' }
  ];

  const textColorOptions = [
    { value: 'white', label: 'White', class: 'text-white' },
    { value: 'cream', label: 'Cream', class: 'text-amber-50' },
    { value: 'sage', label: 'Light Sage', class: 'text-emerald-200' },
    { value: 'sky', label: 'Sky Blue', class: 'text-sky-200' },
    { value: 'warm', label: 'Warm Gray', class: 'text-gray-200' }
  ];

  return (
    <div>
      <h3 className="font-semibold text-white mb-3 flex items-center">
        <Palette className="w-4 h-4 mr-2" />
        Colors
      </h3>
      <div className="space-y-3">
        <div>
          <label className="text-white/70 text-sm mb-1 block">Background</label>
          <Select value={backgroundColor} onValueChange={onBackgroundColorChange}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {backgroundOptions.map(bg => (
                <SelectItem key={bg.value} value={bg.value}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded ${bg.class} border border-white/20`}></div>
                    <span>{bg.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-white/70 text-sm mb-1 block">Text Color</label>
          <Select value={textColor} onValueChange={onTextColorChange}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {textColorOptions.map(color => (
                <SelectItem key={color.value} value={color.value}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded bg-gray-800 ${color.class} border border-white/20 flex items-center justify-center text-xs`}>A</div>
                    <span>{color.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSettings;

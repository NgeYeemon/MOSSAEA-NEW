
import React from 'react';
import { Bold, Italic, Underline, List, ListOrdered } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FormattingControlsProps {
  onApplyFormatting: (format: string) => void;
}

const FormattingControls = ({ onApplyFormatting }: FormattingControlsProps) => {
  return (
    <>
      <div>
        <h3 className="font-semibold text-white mb-3">Formatting</h3>
        <p className="text-white/60 text-xs mb-3">Select text first, then apply formatting</p>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApplyFormatting('bold')}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApplyFormatting('italic')}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApplyFormatting('underline')}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Underline className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-white mb-3">Lists</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApplyFormatting('list')}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onApplyFormatting('numbered')}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default FormattingControls;


import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChapterNavigationProps {
  currentChapter: number;
  totalChapters: number;
  onPrevChapter: () => void;
  onNextChapter: () => void;
}

const ChapterNavigation = ({ currentChapter, totalChapters, onPrevChapter, onNextChapter }: ChapterNavigationProps) => {
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/20">
      <Button 
        variant="outline" 
        onClick={onPrevChapter}
        disabled={currentChapter === 1}
        className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous Chapter
      </Button>
      <span className="text-sm text-white/60">Chapter {currentChapter} of {totalChapters}</span>
      <Button 
        onClick={onNextChapter}
        disabled={currentChapter === totalChapters}
        className="bg-white/20 text-white hover:bg-white/30 disabled:opacity-50"
      >
        Next Chapter
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default ChapterNavigation;

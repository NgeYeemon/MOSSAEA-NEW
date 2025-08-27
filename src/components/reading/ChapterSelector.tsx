
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ChapterSelectorProps {
  currentChapter: number;
  totalChapters: number;
  onChapterSelect: (chapter: number) => void;
}

const ChapterSelector = ({ 
  currentChapter, 
  totalChapters, 
  onChapterSelect
}: ChapterSelectorProps) => {
  const chapters = Array.from({ length: totalChapters }, (_, i) => ({
    number: i + 1,
    title: `Chapter ${i + 1}`
  }));

  const handleChapterSelect = (value: string) => {
    const chapterNum = parseInt(value);
    onChapterSelect(chapterNum);
  };

  return (
    <div className="flex items-center space-x-4">
      <Select value={currentChapter.toString()} onValueChange={handleChapterSelect}>
        <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
          <SelectValue />
          <ChevronDown className="w-4 h-4" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700">
          {chapters.map((chapter) => (
            <SelectItem 
              key={chapter.number} 
              value={chapter.number.toString()}
              className="text-white hover:bg-slate-700"
            >
              <span>{chapter.title}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChapterSelector;

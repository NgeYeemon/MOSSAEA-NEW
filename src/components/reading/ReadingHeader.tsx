
import React from 'react';
import { ArrowLeft, MessageSquare, Heart, Bookmark, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReadingHeaderProps {
  title: string;
  author: string;
  showComments: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
  onBack: () => void;
  onToggleComments: () => void;
  onToggleLike: () => void;
  onToggleBookmark: () => void;
}

const ReadingHeader = ({ 
  title, 
  author, 
  showComments, 
  isLiked,
  isBookmarked,
  onBack, 
  onToggleComments,
  onToggleLike,
  onToggleBookmark
}: ReadingHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 border-b bg-black/20 backdrop-blur">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-semibold text-white">{title}</h1>
            <p className="text-sm text-white/60">by {author}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-white hover:bg-white/10 transition-all duration-300 ${
              showComments ? 'bg-cyan-500/30 text-cyan-300 shadow-lg shadow-cyan-500/20' : ''
            }`}
            onClick={onToggleComments}
          >
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-white hover:bg-white/10 transition-all duration-300 ${
              isLiked ? 'bg-red-500/30 text-red-300 shadow-lg shadow-red-500/20' : ''
            }`}
            onClick={onToggleLike}
          >
            <Heart className={`w-4 h-4 transition-all duration-300 ${isLiked ? 'fill-current scale-110' : ''}`} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-white hover:bg-white/10 transition-all duration-300 ${
              isBookmarked ? 'bg-cyan-500/30 text-cyan-300 shadow-lg shadow-cyan-500/20' : ''
            }`}
            onClick={onToggleBookmark}
          >
            <Bookmark className={`w-4 h-4 transition-all duration-300 ${isBookmarked ? 'fill-current scale-110' : ''}`} />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ReadingHeader;

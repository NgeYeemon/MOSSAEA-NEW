import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Plus, Coins } from 'lucide-react';
import { StoredStory } from '@/lib/storyStorage';

interface StoryPreviewProps {
  story: StoredStory;
  onRead: () => void;
  onEdit: () => void;
  onAddChapter: () => void;
}

const StoryPreview = ({ story, onRead, onEdit, onAddChapter }: StoryPreviewProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white text-lg mb-2">{story.title}</CardTitle>
            <p className="text-white/70 text-sm mb-3 line-clamp-2">{story.description}</p>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {story.genre}
              </Badge>
              <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                {story.chapters} chapter{story.chapters !== 1 ? 's' : ''}
              </Badge>
              {story.isPaid && (
                <Badge variant="outline" className="text-xs border-amber-400/40 text-amber-300 bg-amber-400/10">
                  <Coins className="w-3 h-3 mr-1" />
                  {story.price} coins
                </Badge>
              )}
            </div>
          </div>
          <img 
            src={story.coverImage} 
            alt={story.title}
            className="w-16 h-20 object-cover rounded ml-4"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRead}
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            <Eye className="w-4 h-4 mr-1" />
            Read
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onEdit}
            className="flex-1 border-white/20 text-white hover:bg-white/10"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onAddChapter}
            className="border-emerald-400/40 text-emerald-300 hover:bg-emerald-400/10"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryPreview;
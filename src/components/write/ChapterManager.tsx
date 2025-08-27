import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { X, Save } from 'lucide-react';
import { addChapterToStory, StoredStory } from '@/lib/storyStorage';
import { toast } from '@/hooks/use-toast';

interface ChapterManagerProps {
  story: StoredStory;
  onClose: () => void;
  onChapterAdded: () => void;
}

const ChapterManager = ({ story, onClose, onChapterAdded }: ChapterManagerProps) => {
  const [chapterContent, setChapterContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveChapter = async () => {
    if (!chapterContent.trim()) {
      toast({
        title: "Missing content",
        description: "Please write some content for the new chapter",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    
    try {
      const success = addChapterToStory(story.id, chapterContent.trim());
      
      if (success) {
        toast({
          title: "Chapter added!",
          description: `Chapter ${story.chapters + 1} has been added to "${story.title}"`,
        });
        onChapterAdded();
        onClose();
      } else {
        toast({
          title: "Error",
          description: "Failed to add chapter. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] bg-slate-900/95 backdrop-blur border-white/20 overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">
              Add New Chapter to "{story.title}"
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-white/70 text-sm">
            This will be Chapter {story.chapters + 1}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={chapterContent}
            onChange={(e) => setChapterContent(e.target.value)}
            placeholder={`Write Chapter ${story.chapters + 1} content here...`}
            className="min-h-[400px] bg-white/10 border-white/20 text-white placeholder-white/60 resize-none"
            style={{ fontSize: '16px', fontFamily: 'Inter' }}
          />
          
          <div className="flex items-center justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveChapter}
              disabled={isSaving}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Chapter'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChapterManager;
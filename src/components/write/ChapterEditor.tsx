import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Save, X } from 'lucide-react';
import { addChapterToStory, StoredStory, getStoryById, updateStoryContent, getStoryChapterContent, getUserStoryData, saveUserStoryData } from '@/lib/storyStorage';
import { toast } from '@/hooks/use-toast';

interface ChapterEditorState {
  story: StoredStory;
  chapterNumber?: number;
}

const ChapterEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ChapterEditorState;
  
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [story, setStory] = useState<StoredStory | null>(null);
  const [currentChapterNumber, setCurrentChapterNumber] = useState(1);

  useEffect(() => {
    if (state?.story) {
      setStory(state.story);
      const nextChapter = state.chapterNumber || (state.story.chapters + 1);
      setCurrentChapterNumber(nextChapter);
      setChapterTitle(`Chapter ${nextChapter}`);
      
      // Load chapter content using the new function
      const content = getStoryChapterContent(state.story.id, nextChapter);
      setChapterContent(content);
    } else {
      navigate('/profile');
    }
  }, [state, navigate]);

  // Auto-save functionality
  useEffect(() => {
    if (!story || !chapterContent.trim()) return;

    const timeoutId = setTimeout(() => {
      if (currentChapterNumber <= story.chapters) {
        // Update existing chapter
        updateStoryContent(story.id, chapterContent.trim(), currentChapterNumber);
      }
    }, 2000); // Auto-save after 2 seconds of no typing

    return () => clearTimeout(timeoutId);
  }, [chapterContent, story, currentChapterNumber]);

  const handleSaveChapter = async () => {
    if (!story || !chapterContent.trim()) {
      toast({
        title: "Missing content",
        description: "Please write some content for the chapter",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    
    try {
      if (currentChapterNumber <= story.chapters) {
        // Update existing chapter
        const success = updateStoryContent(story.id, chapterContent.trim(), currentChapterNumber);
        
        if (success) {
          toast({
            title: "Chapter updated!",
            description: `${chapterTitle} has been updated in "${story.title}"`,
          });
        } else {
          throw new Error("Failed to update chapter");
        }
      } else {
        // Add new chapter
        const success = addChapterToStory(story.id, chapterContent.trim());
        
        if (success) {
          toast({
            title: "Chapter added!",
            description: `${chapterTitle} has been added to "${story.title}"`,
          });
        } else {
          throw new Error("Failed to add chapter");
        }
      }
      
      navigate('/profile');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save chapter. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!story) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/profile')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{chapterTitle}</h1>
              <p className="text-white/70">Writing for "{story.title}"</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => navigate('/profile')}
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
        </div>

        {/* Editor */}
        <Card className="bg-slate-900/95 backdrop-blur border-white/20">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Input
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/60"
                placeholder="Chapter title..."
              />
              <span className="text-white/70 text-sm">
                Chapter {currentChapterNumber} of {Math.max(story.chapters, currentChapterNumber)}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={chapterContent}
              onChange={(e) => setChapterContent(e.target.value)}
              placeholder="Start writing your chapter here..."
              className="min-h-[500px] bg-white/10 border-white/20 text-white placeholder-white/60 resize-none text-base leading-relaxed"
              style={{ fontSize: '16px', fontFamily: 'Inter', lineHeight: '1.7' }}
            />
            
            <div className="mt-4 text-sm text-white/60">
              Words: {chapterContent.split(/\s+/).filter(word => word.length > 0).length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChapterEditor;
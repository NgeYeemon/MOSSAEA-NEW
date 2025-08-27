import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Heart, Bookmark, Share2 } from 'lucide-react';
import { StoredStory, getStoryChapterContent, updateStoryInteraction, isFavorited, addToFavorites, removeFromFavorites, isBookmarked, addToBookmarks, removeFromBookmarks } from '@/lib/storyStorage';
import { toast } from '@/hooks/use-toast';

interface StoryReaderState {
  story: StoredStory;
  chapterNumber?: number;
}

const StoryReader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as StoryReaderState;
  
  const [story, setStory] = useState<StoredStory | null>(null);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapterContent, setChapterContent] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);

  useEffect(() => {
    if (state?.story) {
      setStory(state.story);
      const chapter = state.chapterNumber || 1;
      setCurrentChapter(chapter);
      
      // Load chapter content
      const content = getStoryChapterContent(state.story.id, chapter);
      setChapterContent(content);
      
      // Set initial states for like and bookmark
      setIsLiked(isFavorited(state.story.id));
      setIsBookmarkedState(isBookmarked(state.story.id));
      
      // Track read interaction
      updateStoryInteraction(state.story.id, 'read');
    } else {
      navigate('/');
    }
  }, [state, navigate]);

  const handleLike = () => {
    if (!story) return;
    
    if (isLiked) {
      removeFromFavorites(story.id);
      updateStoryInteraction(story.id, 'unlike');
      setIsLiked(false);
      toast({
        title: "Removed from favorites",
        description: `"${story.title}" removed from your favorites`,
      });
    } else {
      addToFavorites(story.id);
      updateStoryInteraction(story.id, 'like');
      setIsLiked(true);
      toast({
        title: "Added to favorites",
        description: `"${story.title}" added to your favorites`,
      });
    }
  };

  const handleBookmark = () => {
    if (!story) return;
    
    if (isBookmarkedState) {
      removeFromBookmarks(story.id);
      setIsBookmarkedState(false);
      toast({
        title: "Bookmark removed",
        description: `"${story.title}" removed from your bookmarks`,
      });
    } else {
      addToBookmarks(story.id);
      updateStoryInteraction(story.id, 'addToLibrary');
      setIsBookmarkedState(true);
      toast({
        title: "Bookmarked",
        description: `"${story.title}" saved to your bookmarks`,
      });
    }
  };

  const handleChapterChange = (newChapter: number) => {
    if (!story || newChapter < 1 || newChapter > story.chapters) return;
    
    setCurrentChapter(newChapter);
    const content = getStoryChapterContent(story.id, newChapter);
    setChapterContent(content);
  };

  if (!story) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="sticky top-0 bg-slate-950/95 backdrop-blur border-b border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold">{story.title}</h1>
              <p className="text-white/70 text-sm">by {story.author}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`${isLiked ? 'text-red-500' : 'text-white'} hover:bg-white/10`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`${isBookmarkedState ? 'text-yellow-500' : 'text-white'} hover:bg-white/10`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarkedState ? 'fill-current' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chapter Navigation */}
      {story.chapters > 1 && (
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleChapterChange(currentChapter - 1)}
              disabled={currentChapter <= 1}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Previous
            </Button>
            
            <span className="text-white/70">
              Chapter {currentChapter} of {story.chapters}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleChapterChange(currentChapter + 1)}
              disabled={currentChapter >= story.chapters}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Story Content */}
      <div className="max-w-4xl mx-auto p-4">
        <Card className="bg-slate-900/95 backdrop-blur border-white/20">
          <CardHeader>
            <CardTitle className="text-white">
              Chapter {currentChapter}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <div className="text-white leading-relaxed whitespace-pre-wrap text-base">
                {chapterContent || 'No content available for this chapter.'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chapter List for Multi-Chapter Stories */}
      {story.chapters > 1 && (
        <div className="max-w-4xl mx-auto p-4">
          <Card className="bg-slate-900/95 backdrop-blur border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-sm">All Chapters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Array.from({ length: story.chapters }, (_, i) => i + 1).map((chapterNum) => (
                  <Button
                    key={chapterNum}
                    variant={currentChapter === chapterNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleChapterChange(chapterNum)}
                    className={currentChapter === chapterNum 
                      ? "bg-emerald-600 hover:bg-emerald-700" 
                      : "border-white/20 text-white hover:bg-white/10"
                    }
                  >
                    Chapter {chapterNum}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StoryReader;
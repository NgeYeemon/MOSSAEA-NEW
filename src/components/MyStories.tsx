import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StoryPreview from '@/components/write/StoryPreview';
import { getWrittenStories, StoredStory } from '@/lib/storyStorage';

const MyStories = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<StoredStory[]>([]);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = () => {
    const writtenStories = getWrittenStories();
    setStories(writtenStories);
  };

  const handleReadStory = (story: StoredStory) => {
    // Navigate to story reader with story data
    navigate(`/story-reader`, { state: { story } });
  };

  const handleEditStory = (story: StoredStory) => {
    // Navigate to write page with story data for editing
    navigate('/write', { state: { editingStory: story } });
  };

  const handleAddChapter = (story: StoredStory) => {
    // Navigate to main write page for adding chapter
    navigate('/write', { 
      state: { 
        addingChapterTo: story,
        chapterNumber: story.chapters + 1
      } 
    });
  };

  const handleChapterAdded = () => {
    loadStories(); // Refresh the stories list
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">My Stories</h2>
        <Button 
          onClick={() => navigate('/write')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Write New Story
        </Button>
      </div>

      {stories.length === 0 ? (
        <Card className="bg-white/10 backdrop-blur border-white/20">
          <CardContent className="text-center py-12">
            <div className="text-white/60 mb-4">
              <Plus className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No stories yet</h3>
              <p className="text-sm">Start writing your first story and share it with the world!</p>
            </div>
            <Button 
              onClick={() => navigate('/write')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Write Your First Story
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryPreview
              key={story.id}
              story={story}
              onRead={() => handleReadStory(story)}
              onEdit={() => handleEditStory(story)}
              onAddChapter={() => handleAddChapter(story)}
            />
          ))}
        </div>
      )}

      {/* Remove the old chapter manager modal since we're navigating to a separate page */}
    </div>
  );
};

export default MyStories;
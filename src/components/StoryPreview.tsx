
import React, { useState, useEffect } from 'react';
import { X, Heart, MessageCircle, Star, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { addToFavorites, removeFromFavorites, isFavorited, addToLibrary, isBookmarked } from '@/lib/storyStorage';
import { toast } from '@/hooks/use-toast';

interface Story {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genre: string;
  likes: number;
  comments: number;
  rating: number;
  chapters: number;
  isCompleted: boolean;
  lastUpdated: string;
  createdAt: string;
}

interface StoryPreviewProps {
  story: Story;
  isOpen: boolean;
  onClose: () => void;
  onStoryClick: (story: Story) => void;
}

const StoryPreview = ({ story, isOpen, onClose, onStoryClick }: StoryPreviewProps) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isInLibrary, setIsInLibrary] = useState(false);

  useEffect(() => {
    setIsLiked(isFavorited(story.id));
    setIsInLibrary(isBookmarked(story.id));
  }, [story.id]);

  if (!isOpen) return null;

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  const handleReadNow = () => {
    navigate(`/read/${story.id}/1`);
  };

  const handleLike = () => {
    if (isLiked) {
      removeFromFavorites(story.id);
      setIsLiked(false);
      toast({
        title: "Removed from favorites",
        description: "Story removed from your liked stories",
      });
    } else {
      addToFavorites(story.id);
      setIsLiked(true);
      toast({
        title: "Added to favorites",
        description: "Story added to your liked stories",
      });
    }
  };

  const handleAddToLibrary = () => {
    if (!isInLibrary) {
      addToLibrary(story.id);
      setIsInLibrary(true);
      toast({
        title: "Added to Library",
        description: "Story saved to your reading list",
      });
    } else {
      toast({
        title: "Already in Library",
        description: "This story is already in your reading list",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-navy rounded-xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Cover Image */}
          <div className="md:w-1/3 h-64 md:h-auto relative">
            <img
              src={story.coverImage}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-teal/20 text-teal text-xs rounded-full">
                    {story.genre}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    story.isCompleted 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {story.isCompleted ? 'Completed' : 'Ongoing'}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2">{story.title}</h2>
                <Link 
                  to={`/author/${encodeURIComponent(story.author)}`}
                  className="text-teal font-medium mb-4 hover:text-teal/80 transition-colors cursor-pointer inline-block"
                  onClick={(e) => e.stopPropagation()}
                >
                  by {story.author}
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{formatNumber(story.likes)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{formatNumber(story.comments)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">{story.rating}</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{story.chapters} chapters</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Updated {story.lastUpdated}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300 leading-relaxed">{story.description}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleReadNow}
                  className="flex-1 bg-teal hover:bg-teal/90 text-white font-medium"
                >
                  Read Now
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLike}
                  className={`px-6 border-gray-600 hover:bg-gray-700 ${
                    isLiked ? 'text-red-500 border-red-500' : 'text-gray-300'
                  }`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-red-500' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAddToLibrary}
                  className={`px-6 border-gray-600 hover:bg-gray-700 ${
                    isInLibrary ? 'text-green-500 border-green-500' : 'text-gray-300'
                  }`}
                >
                  <BookOpen className={`w-4 h-4 mr-2 ${isInLibrary ? 'fill-green-500' : ''}`} />
                  {isInLibrary ? 'In Library' : 'Library'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryPreview;

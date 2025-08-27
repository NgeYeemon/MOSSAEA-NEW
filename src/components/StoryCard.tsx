
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Star, Bookmark, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  addToFavorites, 
  removeFromFavorites, 
  isFavorited,
  addToBookmarks,
  removeFromBookmarks,
  isBookmarked,
  addToLibrary,
  updateStoryInteraction,
  getStoryInteractions
} from '@/lib/storyStorage';
import { toast } from '@/hooks/use-toast';

interface StoryCardProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  likes: number;
  comments: number;
  rating: number;
  onClick?: () => void;
  isPaid?: boolean;
  price?: number;
}

const StoryCard = ({ id, title, author, coverImage, likes, comments, rating, onClick, isPaid, price }: StoryCardProps) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  useEffect(() => {
    setIsLiked(isFavorited(id));
    setIsBookmarkedState(isBookmarked(id));
    
    // Get updated interaction counts
    const interactions = getStoryInteractions(id);
    setLikeCount(likes + interactions.likes);
  }, [id, likes]);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  const handleReadNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToLibrary(id);
    updateStoryInteraction(id, 'addToLibrary');
    setLikeCount(prev => prev + 1);
    navigate(`/read/${id}`, { state: { storyId: id } });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      removeFromFavorites(id);
      updateStoryInteraction(id, 'unlike');
      setLikeCount(prev => Math.max(0, prev - 1));
    } else {
      addToFavorites(id);
      updateStoryInteraction(id, 'like');
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
    
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: `"${title}" ${isLiked ? 'removed from' : 'added to'} your favorites`,
    });
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBookmarkedState) {
      removeFromBookmarks(id);
    } else {
      addToBookmarks(id);
    }
    setIsBookmarkedState(!isBookmarkedState);
    
    toast({
      title: isBookmarkedState ? "Bookmark removed" : "Bookmarked",
      description: `"${title}" ${isBookmarkedState ? 'removed from' : 'added to'} your bookmarks`,
    });
  };

  const handleAddToLibrary = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToLibrary(id);
    updateStoryInteraction(id, 'addToLibrary');
    setLikeCount(prev => prev + 1);
    toast({
      title: "Added to library",
      description: `"${title}" added to your reading list`,
    });
  };

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action buttons - appears on hover */}
        <div className="absolute bottom-2 left-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleReadNow}
            className="w-full bg-teal hover:bg-teal/90 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Read Now
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={handleLike}
              className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition-colors ${
                isLiked 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <Heart className={`w-4 h-4 mx-auto ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleBookmark}
              className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition-colors ${
                isBookmarkedState 
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 mx-auto ${isBookmarkedState ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleAddToLibrary}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md font-medium text-sm transition-colors"
            >
              <BookOpen className="w-4 h-4 mx-auto" />
            </button>
          </div>
        </div>
        
        {/* Stats overlay */}
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs text-white font-medium">{rating}</span>
        </div>
        
        {/* Paid story indicator */}
        {isPaid && (
          <div className="absolute top-2 left-2 flex items-center space-x-1 bg-amber-500/90 rounded-full px-2 py-1">
            <span className="text-xs text-black font-medium">💰 {price}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-white line-clamp-2 leading-tight">
          {title}
        </h3>
        <p className="text-xs text-gray-400 hover:text-primary transition-colors cursor-pointer" onClick={(e) => {
          e.stopPropagation();
          navigate(`/author/${encodeURIComponent(author)}`);
        }}>by {author}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Heart className={`w-3 h-3 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
              <span>{formatNumber(likeCount)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-3 h-3" />
              <span>{formatNumber(comments)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;

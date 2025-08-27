import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WelcomeBonus from '@/components/WelcomeBonus';
import StoryPreview from '@/components/StoryPreview';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, BookOpen, Heart, MessageCircle, Bookmark } from 'lucide-react';
import { addToFavorites, removeFromFavorites, isFavorited, addToBookmarks, removeFromBookmarks, isBookmarked, getWrittenStories, type StoredStory } from '@/lib/storyStorage';
import { toast } from '@/hooks/use-toast';

interface StoryData extends Omit<StoredStory, 'content'> {
  isCompleted: boolean;
  lastUpdated: string;
  description: string;
}

const Discover = () => {
  const [searchParams] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [showWelcomeBonus, setShowWelcomeBonus] = useState(false);
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [favoriteStories, setFavoriteStories] = useState<string[]>([]);
  const [bookmarkedStories, setBookmarkedStories] = useState<string[]>([]);

  useEffect(() => {
    // Check if user is new and show welcome bonus
    const isNewUser = !localStorage.getItem('hasSeenWelcomeBonus');
    if (isNewUser) {
      setShowWelcomeBonus(true);
      localStorage.setItem('hasSeenWelcomeBonus', 'true');
    }

    // Get genre from URL params
    const genre = searchParams.get('genre');
    if (genre) {
      const normalizedGenre = genre.replace('-', ' ').split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      setSelectedGenre(normalizedGenre);
    }

    // Load user's favorites and bookmarks
    const userData = JSON.parse(localStorage.getItem('userStoryData') || '{}');
    setFavoriteStories(userData.favoriteStories || []);
    setBookmarkedStories(userData.bookmarkedStories || []);
  }, [searchParams]);

  // Get written stories and combine with default stories
  const writtenStories: StoryData[] = getWrittenStories().map(story => ({
    ...story,
    likes: story.likes || Math.floor(Math.random() * 20) + 1,
    comments: story.comments || Math.floor(Math.random() * 15) + 1,
    rating: story.rating || (Math.random() * 2 + 3), // 3-5 rating
    chapters: story.chapters || Math.floor(Math.random() * 20) + 1,
    coverImage: story.coverImage || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    isCompleted: false,
    lastUpdated: 'Just published'
  }));

  const defaultStories: StoryData[] = [
    // Romance - 2 stories
    {
      id: '1',
      title: 'The Midnight Chronicles',
      author: 'Elena Rodriguez',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      genre: 'Romance',
      rating: 4.8,
      likes: 8,
      comments: 12,
      chapters: 25,
      description: 'Two hearts meet under the midnight sky, where love blooms in the most unexpected places.',
      createdAt: '2023-01-01T00:00:00.000Z',
      isCompleted: false,
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      title: 'Crimson Hearts',
      author: 'Ricardo Silva',
      coverImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop',
      genre: 'Romance',
      rating: 4.2,
      likes: 13,
      comments: 11,
      chapters: 22,
      description: 'Two rival artists find their lives intertwined as they compete for a prestigious scholarship, only to discover an undeniable connection.',
      createdAt: '2023-01-04T00:00:00.000Z',
      isCompleted: true,
      lastUpdated: '5 days ago'
    },
    // Fantasy - 2 stories
    {
      id: '3',
      title: 'The Forgotten Prophecy',
      author: 'Ingrid Bjornstad',
      coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop',
      genre: 'Fantasy',
      rating: 4.9,
      likes: 14,
      comments: 6,
      chapters: 20,
      description: 'A young mage discovers an ancient prophecy that could either save the kingdom or plunge it into eternal darkness.',
      createdAt: '2023-01-05T00:00:00.000Z',
      isCompleted: false,
      lastUpdated: '1 week ago'
    },
    {
      id: '4',
      title: 'Realm of Shadows',
      author: 'Marcus Blackwood',
      coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      genre: 'Fantasy',
      rating: 4.6,
      likes: 11,
      comments: 8,
      chapters: 18,
      description: 'In a world where shadows have power, a young warrior must master the darkness within to save her people.',
      createdAt: '2023-01-06T00:00:00.000Z',
      isCompleted: false,
      lastUpdated: '3 days ago'
    },
    // Mystery - 2 stories
    {
      id: '5',
      title: 'Echoes of the Past',
      author: 'Jameson Holt',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
      genre: 'Mystery',
      rating: 4.5,
      likes: 6,
      comments: 9,
      chapters: 18,
      description: 'A detective haunted by his past must solve a series of perplexing murders that mirror events from decades ago.',
      createdAt: '2023-01-02T00:00:00.000Z',
      isCompleted: true,
      lastUpdated: '1 day ago'
    },
    {
      id: '6',
      title: 'Beneath the Surface',
      author: 'Omar Hassan',
      coverImage: 'https://images.unsplash.com/photo-1503443207922-dff7d5439e18?w=400&h=600&fit=crop',
      genre: 'Mystery',
      rating: 4.6,
      likes: 11,
      comments: 7,
      chapters: 15,
      description: 'A marine biologist uncovers a sinister conspiracy while studying the effects of pollution on marine life.',
      createdAt: '2023-01-06T00:00:00.000Z',
      isCompleted: true,
      lastUpdated: '2 weeks ago'
    },
    // Sci-Fi - 2 stories
    {
      id: '7',
      title: 'The Last Starfarer',
      author: 'Aisha Khan',
      coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop',
      genre: 'Sci-Fi',
      rating: 4.7,
      likes: 9,
      comments: 8,
      chapters: 32,
      description: 'In a dying galaxy, a lone starfarer embarks on a perilous journey to find a new home for humanity.',
      createdAt: '2023-01-03T00:00:00.000Z',
      isCompleted: false,
      lastUpdated: '3 days ago'
    },
    {
      id: '8',
      title: 'The Quantum Enigma',
      author: 'Lena Moreau',
      coverImage: 'https://images.unsplash.com/photo-1503614472-8c03139954ca?w=400&h=600&fit=crop',
      genre: 'Sci-Fi',
      rating: 4.8,
      likes: 17,
      comments: 5,
      chapters: 20,
      description: 'A brilliant physicist makes a groundbreaking discovery that challenges the very fabric of reality.',
      createdAt: '2023-01-09T00:00:00.000Z',
      isCompleted: false,
      lastUpdated: '2 months ago'
    },
    // Adventure - 2 stories
    {
      id: '9',
      title: 'The Alchemist\'s Legacy',
      author: 'Svetlana Petrova',
      coverImage: 'https://images.unsplash.com/photo-1484820301354-6397b0014114?w=400&h=600&fit=crop',
      genre: 'Adventure',
      rating: 4.4,
      likes: 7,
      comments: 9,
      chapters: 28,
      description: 'In Renaissance Italy, a young apprentice must protect a powerful alchemical secret from falling into the wrong hands.',
      createdAt: '2023-01-07T00:00:00.000Z',
      isCompleted: false,
      lastUpdated: '3 weeks ago'
    },
    {
      id: '10',
      title: 'Island of Secrets',
      author: 'Captain Morgan',
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
      genre: 'Adventure',
      rating: 4.5,
      likes: 12,
      comments: 6,
      chapters: 24,
      description: 'A treasure hunter discovers that the greatest treasure isn\'t gold, but the friendships forged along the way.',
      createdAt: '2023-01-11T00:00:00.000Z',
      isCompleted: false,
      lastUpdated: '1 week ago'
    },
    // Teen Fiction - 2 stories
    {
      id: '11',
      title: 'Silent Shadows',
      author: 'Kenji Tanaka',
      coverImage: 'https://images.unsplash.com/photo-1504198453319-5ce911bafc59?w=400&h=600&fit=crop',
      genre: 'Teen Fiction',
      rating: 4.3,
      likes: 5,
      comments: 8,
      chapters: 12,
      description: 'A group of high school friends navigate the challenges of growing up while discovering who they really are.',
      createdAt: '2023-01-08T00:00:00.000Z',
      isCompleted: true,
      lastUpdated: '1 month ago'
    },
    {
      id: '12',
      title: 'Summer Before Tomorrow',
      author: 'Madison Clarke',
      coverImage: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&h=600&fit=crop',
      genre: 'Teen Fiction',
      rating: 4.7,
      likes: 15,
      comments: 12,
      chapters: 16,
      description: 'The last summer before college changes everything for a group of best friends.',
      createdAt: '2023-01-12T00:00:00.000Z',
      isCompleted: false,
      lastUpdated: '2 days ago'
    },
    // Poetry - 2 stories
    {
      id: '13',
      title: 'Whispers of the Wind',
      author: 'Eamon O\'Connell',
      coverImage: 'https://images.unsplash.com/photo-1502694352047-b343d3f9484f?w=400&h=600&fit=crop',
      genre: 'Poetry',
      rating: 4.6,
      likes: 10,
      comments: 4,
      chapters: 18,
      description: 'A collection of poems that capture the beauty and pain of human experience through the metaphor of nature.',
      createdAt: '2023-01-10T00:00:00.000Z',
      isCompleted: false,
      lastUpdated: '3 months ago'
    },
    {
      id: '14',
      title: 'Verses of the Heart',
      author: 'Luna Sterling',
      coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop',
      genre: 'Poetry',
      rating: 4.8,
      likes: 9,
      comments: 7,
      chapters: 22,
      description: 'Raw, emotional poetry exploring love, loss, and the journey of self-discovery.',
      createdAt: '2023-01-13T00:00:00.000Z',
      isCompleted: true,
      lastUpdated: '4 days ago'
    },
    // General Fiction - 2 stories
    {
      id: '15',
      title: 'Coffee Shop Chronicles',
      author: 'Sarah Mitchell',
      coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
      genre: 'General Fiction',
      rating: 4.4,
      likes: 8,
      comments: 11,
      chapters: 20,
      description: 'The everyday stories of people whose lives intersect at a small neighborhood coffee shop.',
      createdAt: '2023-01-14T00:00:00.000Z',
      isCompleted: false,
      lastUpdated: '1 week ago'
    },
    {
      id: '16',
      title: 'The Letters We Never Sent',
      author: 'David Chen',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      genre: 'General Fiction',
      rating: 4.2,
      likes: 6,
      comments: 5,
      chapters: 14,
      description: 'A man discovers a box of unsent letters in his grandmother\'s attic, each revealing family secrets.',
      createdAt: '2023-01-15T00:00:00.000Z',
      isCompleted: true,
      lastUpdated: '2 weeks ago'
    }
  ];

  // Combine written stories with default stories
  const allStories = [...writtenStories, ...defaultStories];

  const filteredStories = selectedGenre === 'All' ? allStories : allStories.filter(story => story.genre === selectedGenre);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  const handleStoryClick = (story: StoryData) => {
    setSelectedStory(story);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedStory(null);
  };

  const handleHeartClick = (e: React.MouseEvent, storyId: string) => {
    e.stopPropagation();
    
    if (isFavorited(storyId)) {
      removeFromFavorites(storyId);
      setFavoriteStories(prev => prev.filter(id => id !== storyId));
      toast({
        title: "Removed from favorites",
        description: "Story removed from your favorites",
      });
    } else {
      addToFavorites(storyId);
      setFavoriteStories(prev => [...prev, storyId]);
      toast({
        title: "Added to favorites",
        description: "Story added to your favorites",
      });
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent, storyId: string) => {
    e.stopPropagation();
    
    if (isBookmarked(storyId)) {
      removeFromBookmarks(storyId);
      setBookmarkedStories(prev => prev.filter(id => id !== storyId));
      toast({
        title: "Removed from bookmarks",
        description: "Story removed from your bookmarks",
      });
    } else {
      addToBookmarks(storyId);
      setBookmarkedStories(prev => [...prev, storyId]);
      toast({
        title: "Added to bookmarks",
        description: "Story saved to your bookmarks",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-sage-100 to-deep-navy-900">
      <Header />
      
      <WelcomeBonus 
        isOpen={showWelcomeBonus} 
        onClose={() => setShowWelcomeBonus(false)} 
      />

      {selectedStory && (
        <StoryPreview 
          story={selectedStory}
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          onStoryClick={handleStoryClick}
        />
      )}

      <main className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-deep-navy-900 mb-4">Discover New Stories</h1>
          <div className="flex items-center space-x-4">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-[180px] bg-deep-navy-900/80 border-sage-200 text-white">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent className="bg-deep-navy-900 border-sage-200">
                <SelectItem value="All" className="text-white hover:bg-sage-600">All Genres</SelectItem>
                <SelectItem value="Romance" className="text-white hover:bg-sage-600">Romance</SelectItem>
                <SelectItem value="Fantasy" className="text-white hover:bg-sage-600">Fantasy</SelectItem>
                <SelectItem value="Mystery" className="text-white hover:bg-sage-600">Mystery</SelectItem>
                <SelectItem value="Sci-Fi" className="text-white hover:bg-sage-600">Sci-Fi</SelectItem>
                <SelectItem value="Adventure" className="text-white hover:bg-sage-600">Adventure</SelectItem>
                <SelectItem value="Teen Fiction" className="text-white hover:bg-sage-600">Teen Fiction</SelectItem>
                <SelectItem value="Poetry" className="text-white hover:bg-sage-600">Poetry</SelectItem>
                <SelectItem value="General Fiction" className="text-white hover:bg-sage-600">General Fiction</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sage-600 text-sm">
              {filteredStories.length} stories found
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredStories.map(story => (
            <div key={story.id} onClick={() => handleStoryClick(story)}>
              <Card className="bg-deep-navy-900/90 backdrop-blur-sm border-sage-200/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group h-full">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {story.chapters} chapters
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="bg-sage-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {story.genre}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-white mb-1 line-clamp-2 group-hover:text-sage-400 transition-colors">
                    {story.title}
                  </h3>
                  <Link 
                    to={`/author/${encodeURIComponent(story.author)}`}
                    className="text-sage-400 text-sm mb-2 hover:text-sage-300 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    by {story.author}
                  </Link>
                  
                  <p className="text-sage-300 text-xs mb-3 line-clamp-2 flex-1">
                    {story.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-sage-400 mt-auto">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{story.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart 
                        className={`w-3 h-3 cursor-pointer transition-colors ${
                          favoriteStories.includes(story.id) 
                            ? 'text-red-500 fill-red-500' 
                            : 'text-sage-400 hover:text-red-400'
                        }`}
                        onClick={(e) => handleHeartClick(e, story.id)}
                      />
                      <span>{formatNumber(story.likes)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-sage-400 mt-1">
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{formatNumber(story.comments)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bookmark 
                        className={`w-3 h-3 cursor-pointer transition-colors ${
                          bookmarkedStories.includes(story.id) 
                            ? 'text-yellow-500 fill-yellow-500' 
                            : 'text-sage-400 hover:text-yellow-400'
                        }`}
                        onClick={(e) => handleBookmarkClick(e, story.id)}
                      />
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{story.chapters}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discover;
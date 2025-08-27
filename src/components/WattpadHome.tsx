import React, { useState } from 'react';
import { ChevronRight, Search, Sparkles, TrendingUp, Crown, CheckCircle, Zap, Coins } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import StoryCard from './StoryCard';
import StoryPreview from './StoryPreview';
import PaidStoryUnlock from './PaidStoryUnlock';
import CoinDisplay from './CoinDisplay';
import { StoredStory } from '@/lib/storyStorage';

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
  isPaid?: boolean;
  price?: number;
  isUnlocked?: boolean;
}

const WattpadHome = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [selectedPaidStory, setSelectedPaidStory] = useState<Story | null>(null);
  const [userCoins, setUserCoins] = useState(() => {
    return parseInt(localStorage.getItem('userCoins') || '100');
  });
  const navigate = useNavigate();

  const handleStoryClick = (story: Story) => {
    if (story.isPaid && !story.isUnlocked) {
      setSelectedPaidStory(story);
      setShowUnlockModal(true);
    } else {
      setSelectedStory(story);
      setIsPreviewOpen(true);
    }
  };

  const handleUnlockSuccess = (newCoins: number) => {
    setUserCoins(newCoins);
    setShowUnlockModal(false);
    
    // Award coins to the author (simulate earning system)
    if (selectedPaidStory) {
      const authorEarnings = Math.floor(selectedPaidStory.price! * 0.7); // Author gets 70%
      console.log(`Author ${selectedPaidStory.author} earned ${authorEarnings} coins!`);
      
      // Mark story as unlocked and navigate to reading
      const updatedStory = { ...selectedPaidStory, isUnlocked: true };
      setSelectedStory(updatedStory);
      setIsPreviewOpen(true);
    }
    setSelectedPaidStory(null);
  };

  const handleUnlockCancel = () => {
    setShowUnlockModal(false);
    setSelectedPaidStory(null);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedStory(null);
  };

  const handleGenreClick = (genreName: string) => {
    navigate(`/discover?genre=${encodeURIComponent(genreName)}`);
  };

  // Search by genre categories with enhanced styling
  const searchGenres = [
    { name: 'bestfriends', stories: '15', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=200&fit=crop', color: 'from-pink-500 via-rose-500 to-pink-600' },
    { name: 'humor', stories: '18', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop', color: 'from-yellow-500 via-orange-500 to-yellow-600' },
    { name: 'forbiddenlove', stories: '12', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300&h=200&fit=crop', color: 'from-purple-500 via-indigo-500 to-purple-600' },
    { name: 'teen', stories: '20', image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop', color: 'from-teal-500 via-cyan-500 to-teal-600' },
    { name: 'romance', stories: '16', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop', color: 'from-red-500 via-pink-500 to-red-600' },
    { name: 'fantasy', stories: '14', image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop', color: 'from-indigo-500 via-purple-500 to-indigo-600' },
    { name: 'mystery', stories: '13', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop', color: 'from-gray-600 via-slate-600 to-gray-700' },
    { name: 'adventure', stories: '17', image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=200&fit=crop', color: 'from-green-500 via-emerald-500 to-green-600' },
  ];

  // Generate 5 stories for each category
  const generateStories = (baseStories: any[], count: number) => {
    const stories = [];
    for (let i = 0; i < count; i++) {
      const baseStory = baseStories[i % baseStories.length];
      stories.push({
        ...baseStory,
        id: `${baseStory.id}-${i}`,
        title: `${baseStory.title} ${i > 0 ? ` Part ${i + 1}` : ''}`,
        likes: baseStory.likes + Math.floor(Math.random() * 20),
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      });
    }
    return stories;
  };

  const baseHotStories = [
    {
      id: '1',
      title: 'Tempting',
      author: 'EMILY JEAN',
      description: 'My Brothers Best Friend',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
      genre: 'tattoos',
      likes: 18,
      comments: 12,
      rating: 4.8,
      chapters: 25,
      isCompleted: false,
      lastUpdated: '2 hours ago',
      createdAt: '2023-01-01T00:00:00.000Z'
    },
    {
      id: '2',
      title: 'CONTRAST',
      author: 'JANKEAST',
      description: 'A tale of opposites',
      coverImage: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=400&fit=crop',
      genre: 'mean',
      likes: 16,
      comments: 8,
      rating: 4.6,
      chapters: 18,
      isCompleted: true,
      lastUpdated: '1 day ago',
      createdAt: '2023-01-02T00:00:00.000Z'
    },
    {
      id: '3',
      title: 'ALPHA\'S REJECTION',
      author: 'ELAINE WATERS',
      description: 'A werewolf romance',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop',
      genre: 'spicy',
      likes: 15,
      comments: 19,
      rating: 4.9,
      chapters: 42,
      isCompleted: false,
      lastUpdated: '3 hours ago',
      createdAt: '2023-01-03T00:00:00.000Z'
    },
    {
      id: '4',
      title: 'Brothers',
      author: 'ELLIE B',
      description: 'Family drama',
      coverImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=400&fit=crop',
      genre: 'brother',
      likes: 11,
      comments: 6,
      rating: 4.7,
      chapters: 15,
      isCompleted: false,
      lastUpdated: '5 hours ago',
      createdAt: '2023-01-04T00:00:00.000Z'
    }
  ];

  const baseCompletedStories = [
    {
      id: '5',
      title: 'The REPLACEMENT',
      author: 'By Sasha',
      description: 'A completed drama',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
      genre: 'drama',
      likes: 17,
      comments: 12,
      rating: 4.8,
      chapters: 30,
      isCompleted: true,
      lastUpdated: '1 week ago',
      createdAt: '2023-01-05T00:00:00.000Z'
    },
    {
      id: '6',
      title: 'Sunset Love',
      author: 'MELAASH',
      description: 'A romantic story',
      coverImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=300&h=400&fit=crop',
      genre: 'desi',
      likes: 13,
      comments: 8,
      rating: 4.6,
      chapters: 25,
      isCompleted: true,
      lastUpdated: '2 weeks ago',
      createdAt: '2023-01-06T00:00:00.000Z'
    },
    {
      id: '7',
      title: 'DARK AGE',
      author: 'ALEX WINTERS',
      description: 'A dark romance',
      coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=400&fit=crop',
      genre: 'antihero',
      likes: 19,
      comments: 14,
      rating: 4.9,
      chapters: 35,
      isCompleted: true,
      lastUpdated: '1 month ago',
      createdAt: '2023-01-07T00:00:00.000Z'
    },
    {
      id: '8',
      title: 'BEHIND THE LIMIT',
      author: 'KAYLA M',
      description: 'Coming of age',
      coverImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=400&fit=crop',
      genre: 'boyxboy',
      likes: 9,
      comments: 6,
      rating: 4.7,
      chapters: 20,
      isCompleted: true,
      lastUpdated: '3 weeks ago',
      createdAt: '2023-01-08T00:00:00.000Z'
    }
  ];

  const baseTrendingStories = [
    {
      id: '9',
      title: 'Midnight Hearts',
      author: 'LUNA STAR',
      description: 'A supernatural romance',
      coverImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=400&fit=crop',
      genre: 'vampire',
      likes: 20,
      comments: 16,
      rating: 4.9,
      chapters: 28,
      isCompleted: false,
      lastUpdated: '1 hour ago',
      createdAt: '2023-01-09T00:00:00.000Z'
    }
  ];

  const baseNewStories = [
    {
      id: '10',
      title: 'First Love',
      author: 'MAYA ROSE',
      description: 'Young adult romance',
      coverImage: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=400&fit=crop',
      genre: 'youngadult',
      likes: 7,
      comments: 4,
      rating: 4.5,
      chapters: 8,
      isCompleted: false,
      lastUpdated: '30 minutes ago',
      createdAt: '2023-01-10T00:00:00.000Z'
    }
  ];

  const basePopularStories = [
    {
      id: '11',
      title: 'CEO\'s Secret',
      author: 'ANNA GOLD',
      description: 'Billionaire romance',
      coverImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=400&fit=crop',
      genre: 'billionaire',
      likes: 18,
      comments: 13,
      rating: 4.8,
      chapters: 50,
      isCompleted: true,
      lastUpdated: '2 days ago',
      createdAt: '2023-01-11T00:00:00.000Z'
    }
  ];

  // Paid Stories - Premium content
  const basePaidStories = [
    {
      id: 'paid-1',
      title: 'The Forbidden Crown',
      author: 'ROYAL MYSTERIES',
      description: 'An exclusive royal fantasy with dark secrets and forbidden love',
      coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop',
      genre: 'premium',
      likes: 25,
      comments: 18,
      rating: 4.9,
      chapters: 35,
      isCompleted: false,
      lastUpdated: '1 hour ago',
      createdAt: '2023-01-12T00:00:00.000Z',
      isPaid: true,
      price: 15,
      isUnlocked: false
    },
    {
      id: 'paid-2',
      title: 'Midnight Confessions',
      author: 'LUNA SHADOWS',
      description: 'Premium adult romance with supernatural elements',
      coverImage: 'https://images.unsplash.com/photo-1519734879123-4b1d37c8bc3b?w=300&h=400&fit=crop',
      genre: 'premium',
      likes: 32,
      comments: 24,
      rating: 4.8,
      chapters: 42,
      isCompleted: true,
      lastUpdated: '2 hours ago',
      createdAt: '2023-01-13T00:00:00.000Z',
      isPaid: true,
      price: 20,
      isUnlocked: false
    },
    {
      id: 'paid-3',
      title: 'Dragon\'s Heart',
      author: 'FIRE LEGENDS',
      description: 'Epic fantasy adventure with exclusive bonus chapters',
      coverImage: 'https://images.unsplash.com/photo-1578662018446-33ba861ac3c4?w=300&h=400&fit=crop',
      genre: 'premium',
      likes: 28,
      comments: 20,
      rating: 4.9,
      chapters: 38,
      isCompleted: false,
      lastUpdated: '3 hours ago',
      createdAt: '2023-01-14T00:00:00.000Z',
      isPaid: true,
      price: 25,
      isUnlocked: false
    },
    {
      id: 'paid-4',
      title: 'Secret Society',
      author: 'ELITE WRITERS',
      description: 'Mysterious thriller with interactive premium content',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop',
      genre: 'premium',
      likes: 22,
      comments: 16,
      rating: 4.7,
      chapters: 30,
      isCompleted: false,
      lastUpdated: '4 hours ago',
      createdAt: '2023-01-15T00:00:00.000Z',
      isPaid: true,
      price: 18,
      isUnlocked: false
    }
  ];

  // Generate 5 stories for each category
  const hotStories = generateStories(baseHotStories, 5);
  const completedStories = generateStories(baseCompletedStories, 5);
  const trendingStories = generateStories(baseTrendingStories, 5);
  const newStories = generateStories(baseNewStories, 5);
  const popularStories = generateStories(basePopularStories, 5);
  const paidStories = basePaidStories; // Use exact paid stories without generation

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-navy/95 via-primary/90 to-navy-light/85 relative overflow-hidden">
      {/* Enhanced floating background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal rounded-full animate-float animate-glow" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gold rounded-full animate-float animate-stagger-1" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-sky-blue rounded-full animate-float animate-stagger-2" />
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-moss-green rounded-full animate-float animate-stagger-3" />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-teal/30 rounded-full animate-pulse-soft" />
        <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-gold/40 rounded-full animate-pulse-soft animate-stagger-2" />
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal/5 via-transparent to-gold/5 animate-shimmer" />

      {/* User Coins Display */}
      <div className="fixed top-20 right-4 z-30">
        <CoinDisplay coins={userCoins} />
      </div>


      {/* Premium Paid Stories */}
      <div className="px-4 mb-12 pt-8 relative z-10">
        <div className="flex items-center space-x-4 mb-8 animate-slide-left">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Coins className="w-8 h-8 text-amber-500 animate-bounce" />
              <div className="absolute -inset-1 bg-amber-500/30 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-bold gradient-text">💰 Premium Stories</h2>
          </div>
        </div>
        <ScrollArea className="w-full whitespace-nowrap animate-fade-up">
          <div className="flex space-x-5">
            {paidStories.map((story, index) => (
              <div key={story.id} className={`flex-shrink-0 w-36 animate-scale-in animate-stagger-${(index % 4) + 1}`} onClick={() => handleStoryClick(story)}>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-3 cursor-pointer group transition-all duration-500 hover:scale-105 hover:-rotate-1 card-hover glass-effect">
                  <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover group-hover:brightness-125 group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Paid Badge */}
                  <div className="absolute top-2 right-2">
                    <div className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
                      <Coins className="w-3 h-3" />
                      {story.price}
                    </div>
                  </div>
                  
                  {/* Premium Label */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">💰 PREMIUM</div>
                  </div>
                </div>
                <div className="text-sm text-white font-semibold group-hover:text-amber-400 transition-colors duration-300">{story.title}</div>
                <div className="text-xs text-white/70">{story.author}</div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Hot MOSSAE'A Reads */}
      <div className="px-4 mb-12 relative z-10">
        <div className="flex items-center space-x-4 mb-8 animate-slide-left">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Zap className="w-8 h-8 text-red-500 animate-bounce" />
              <div className="absolute -inset-1 bg-red-500/30 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-bold gradient-text">🔥 Hot MOSSAE'A Reads</h2>
          </div>
        </div>
        <ScrollArea className="w-full whitespace-nowrap animate-fade-up">
          <div className="flex space-x-5">
            {hotStories.map((story, index) => (
              <div key={story.id} className={`flex-shrink-0 w-36 animate-scale-in animate-stagger-${(index % 4) + 1}`} onClick={() => handleStoryClick(story)}>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-3 cursor-pointer group transition-all duration-500 hover:scale-105 hover:-rotate-1 card-hover glass-effect">
                  <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover group-hover:brightness-125 group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-transparent to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">🔥 HOT</div>
                  </div>
                </div>
                <div className="text-sm text-white font-semibold group-hover:text-teal transition-colors duration-300">{story.genre}</div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Trending Now */}
      <div className="px-4 mb-12 relative z-10">
        <div className="flex items-center space-x-4 mb-8 animate-slide-right">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <TrendingUp className="w-8 h-8 text-green-500 animate-bounce" />
              <div className="absolute -inset-1 bg-green-500/30 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-bold gradient-text">📈 Trending Now</h2>
          </div>
        </div>
        <ScrollArea className="w-full whitespace-nowrap animate-fade-up">
          <div className="flex space-x-5">
            {trendingStories.map((story, index) => (
              <div key={story.id} className={`flex-shrink-0 w-36 animate-scale-in animate-stagger-${(index % 4) + 1}`} onClick={() => handleStoryClick(story)}>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-3 cursor-pointer group transition-all duration-500 hover:scale-105 hover:rotate-1 card-hover glass-effect">
                  <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover group-hover:brightness-125 group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">📈 TRENDING</div>
                  </div>
                </div>
                <div className="text-sm text-white font-semibold group-hover:text-teal transition-colors duration-300">{story.genre}</div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* New & Fresh */}
      <div className="px-4 mb-12 relative z-10">
        <div className="flex items-center space-x-4 mb-8 animate-slide-left">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-yellow-500 animate-spin" />
              <div className="absolute -inset-1 bg-yellow-500/30 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-bold gradient-text">✨ New & Fresh</h2>
          </div>
        </div>
        <ScrollArea className="w-full whitespace-nowrap animate-fade-up">
          <div className="flex space-x-5">
            {newStories.map((story, index) => (
              <div key={story.id} className={`flex-shrink-0 w-36 animate-scale-in animate-stagger-${(index % 4) + 1}`} onClick={() => handleStoryClick(story)}>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-3 cursor-pointer group transition-all duration-500 hover:scale-105 hover:-rotate-1 card-hover glass-effect">
                  <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover group-hover:brightness-125 group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-sky-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">✨ NEW</div>
                  </div>
                </div>
                <div className="text-sm text-white font-semibold group-hover:text-teal transition-colors duration-300">{story.genre}</div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Most Popular */}
      <div className="px-4 mb-12 relative z-10">
        <div className="flex items-center space-x-4 mb-8 animate-slide-right">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Crown className="w-8 h-8 text-yellow-600 animate-bounce" />
              <div className="absolute -inset-1 bg-yellow-600/30 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-bold gradient-text">👑 Most Popular</h2>
          </div>
        </div>
        <ScrollArea className="w-full whitespace-nowrap animate-fade-up">
          <div className="flex space-x-5">
            {popularStories.map((story, index) => (
              <div key={story.id} className={`flex-shrink-0 w-36 animate-scale-in animate-stagger-${(index % 4) + 1}`} onClick={() => handleStoryClick(story)}>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-3 cursor-pointer group transition-all duration-500 hover:scale-105 hover:rotate-1 card-hover glass-effect">
                  <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover group-hover:brightness-125 group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-transparent to-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">👑 POPULAR</div>
                  </div>
                </div>
                <div className="text-sm text-white font-semibold group-hover:text-teal transition-colors duration-300">{story.genre}</div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Completed Stories */}
      <div className="px-4 mb-12 relative z-10">
        <div className="flex justify-between items-center mb-8 animate-slide-left">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <CheckCircle className="w-8 h-8 text-green-600 animate-pulse" />
                <div className="absolute -inset-1 bg-green-600/30 rounded-full animate-pulse"></div>
              </div>
              <div>
                <div className="text-sm text-white/80 animate-fade-up">Binge from start to finish</div>
                <h2 className="text-3xl font-bold gradient-text animate-scale-bounce">✅ Completed Stories</h2>
              </div>
            </div>
          </div>
        </div>
        <ScrollArea className="w-full whitespace-nowrap animate-fade-up">
          <div className="flex space-x-5">
            {completedStories.map((story, index) => (
              <div key={story.id} className={`flex-shrink-0 w-36 animate-scale-in animate-stagger-${(index % 4) + 1}`} onClick={() => handleStoryClick(story)}>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-3 cursor-pointer group transition-all duration-500 hover:scale-105 hover:-rotate-1 card-hover glass-effect">
                  <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover group-hover:brightness-125 group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-transparent to-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full animate-bounce">✓</div>
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">COMPLETE</div>
                  </div>
                </div>
                <div className="text-sm text-white font-semibold group-hover:text-teal transition-colors duration-300">{story.genre}</div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Story Preview Modal */}
      {selectedStory && (
        <StoryPreview
          story={selectedStory}
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          onStoryClick={handleStoryClick}
        />
      )}

      {/* Paid Story Unlock Modal */}
      {selectedPaidStory && showUnlockModal && (
        <PaidStoryUnlock
          story={selectedPaidStory as StoredStory}
          userCoins={userCoins}
          onUnlock={handleUnlockSuccess}
          onCancel={handleUnlockCancel}
        />
      )}
    </div>
  );
};

export default WattpadHome;
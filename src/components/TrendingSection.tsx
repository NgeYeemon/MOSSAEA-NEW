
import React from 'react';
import { TrendingUp, Flame, Star } from 'lucide-react';
import StoryCard from './StoryCard';

interface Story {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genre: string;
  reads: number;
  likes: number;
  comments: number;
  rating: number;
  chapters: number;
  isCompleted: boolean;
  lastUpdated: string;
}

interface TrendingSectionProps {
  onStoryClick?: (story: Story) => void;
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ onStoryClick }) => {
  const trendingStories = [
    {
      id: '1',
      title: 'The Midnight Chronicles',
      author: 'Elena Rodriguez',
      description: 'A mysterious tale of magic and adventure in a world where midnight holds the key to everything.',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      genre: 'Fantasy',
      reads: 1240000,
      likes: 89000,
      comments: 12000,
      rating: 4.8,
      chapters: 25,
      isCompleted: false,
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      title: 'Love in Silicon Valley',
      author: 'Marcus Chen',
      description: 'A contemporary romance between two tech entrepreneurs navigating love and business.',
      coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      genre: 'Romance',
      reads: 890000,
      likes: 67000,
      comments: 8900,
      rating: 4.6,
      chapters: 18,
      isCompleted: true,
      lastUpdated: '1 day ago'
    },
    {
      id: '3',
      title: 'The Last Guardian',
      author: 'Aria Blackwood',
      description: 'In a post-apocalyptic world, one guardian stands between humanity and total destruction.',
      coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      genre: 'Sci-Fi',
      reads: 2100000,
      likes: 156000,
      comments: 23000,
      rating: 4.9,
      chapters: 42,
      isCompleted: false,
      lastUpdated: '3 hours ago'
    },
    {
      id: '4',
      title: 'Whispers of the Ocean',
      author: 'Luna Santos',
      description: 'A mesmerizing story of underwater kingdoms and the forbidden love between two worlds.',
      coverImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
      genre: 'Fantasy',
      reads: 567000,
      likes: 45000,
      comments: 6700,
      rating: 4.7,
      chapters: 15,
      isCompleted: false,
      lastUpdated: '5 hours ago'
    }
  ];

  const handleStoryClick = (story: Story) => {
    if (onStoryClick) {
      onStoryClick(story);
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Flame className="w-6 h-6 text-gold animate-pulse" />
              <h2 className="text-3xl font-bold">Trending Now</h2>
            </div>
            <TrendingUp className="w-5 h-5 text-teal" />
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span>Updated every hour</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingStories.map((story, index) => (
            <div
              key={story.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <StoryCard {...story} onClick={() => handleStoryClick(story)} />
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-gradient-to-r from-teal to-sky-blue text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
            View All Trending Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;

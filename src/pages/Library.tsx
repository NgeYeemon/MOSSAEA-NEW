
import React, { useState, useEffect } from 'react';
import { Bookmark, Clock, Heart, TrendingUp, Filter, Grid, List } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getFavoriteStoryIds, getBookmarkedStoryIds, getLibraryStoryIds, getWrittenStories, type StoredStory } from '@/lib/storyStorage';
import { Link } from 'react-router-dom';

const Library = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favoriteStoryIds, setFavoriteStoryIds] = useState<string[]>([]);
  const [bookmarkedStoryIds, setBookmarkedStoryIds] = useState<string[]>([]);
  const [libraryStoryIds, setLibraryStoryIds] = useState<string[]>([]);
  const [followingAuthors, setFollowingAuthors] = useState<any[]>([]);

  useEffect(() => {
    setFavoriteStoryIds(getFavoriteStoryIds());
    setBookmarkedStoryIds(getBookmarkedStoryIds());
    setLibraryStoryIds(getLibraryStoryIds());
    
    // Load following authors
    const following = JSON.parse(localStorage.getItem('followingAuthors') || '{}');
    const followingList = Object.values(following).filter((author: any) => author.isFollowing);
    setFollowingAuthors(followingList);
    
    // Listen for following changes
    const handleFollowingChange = (event: CustomEvent) => {
      setFollowingAuthors(event.detail);
    };
    
    window.addEventListener('followingChanged', handleFollowingChange as EventListener);
    
    return () => {
      window.removeEventListener('followingChanged', handleFollowingChange as EventListener);
    };
  }, []);

  // Get user's written stories and mock stories
  const writtenStories = getWrittenStories();
  const mockStories = [
    {
      id: '1',
      title: 'The Midnight Chronicles',
      author: 'Elena Rodriguez',
      description: 'A mysterious tale of magic and adventure.',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      genre: 'Fantasy',
      reads: 1240000,
      likes: 89000,
      comments: 12000,
      rating: 4.8,
      chapters: 25,
      isCompleted: false,
      lastUpdated: '2 hours ago',
      progress: 65
    },
    {
      id: '2',
      title: 'Love in Silicon Valley',
      author: 'Marcus Chen',
      description: 'A contemporary romance between two tech entrepreneurs.',
      coverImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      genre: 'Romance',
      reads: 890000,
      likes: 67000,
      comments: 8900,
      rating: 4.6,
      chapters: 18,
      isCompleted: true,
      lastUpdated: '1 day ago',
      progress: 100,
      isPaid: true,
      price: 10
    },
    {
      id: '3',
      title: 'Digital Dreams',
      author: 'Alex Kim',
      description: 'A cyberpunk adventure in the near future.',
      coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
      genre: 'Science Fiction',
      reads: 567000,
      likes: 45000,
      comments: 7800,
      rating: 4.5,
      chapters: 20,
      isPaid: true,
      price: 15
    }
  ];
  
  // Combine written stories and mock stories
  const allStories = [...writtenStories, ...mockStories];

  const readingList = allStories.filter(story => libraryStoryIds.includes(story.id));
  const favoriteStories = allStories.filter(story => favoriteStoryIds.includes(story.id));
  const bookmarkedStories = allStories.filter(story => bookmarkedStoryIds.includes(story.id));

  const handleStoryClick = (storyId: string) => {
    console.log('Story clicked:', storyId);
    // Navigate to story detail page
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Your Library</h1>
          <p className="text-muted-foreground">Keep track of your reading journey</p>
        </div>

        <Tabs defaultValue="reading" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reading" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Reading</span>
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className="flex items-center space-x-2">
              <Bookmark className="w-4 h-4" />
              <span>Bookmarks</span>
            </TabsTrigger>
            <TabsTrigger value="liked" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Liked</span>
            </TabsTrigger>
            <TabsTrigger value="following" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Following</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reading" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Continue Reading</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <div className="flex gap-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {readingList.map((story) => (
                <div key={story.id} className="relative">
                  <StoryCard {...story} onClick={() => handleStoryClick(story.id)} />
                  {(story as any).progress && (
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="bg-black/50 rounded-full p-2">
                        <div className="flex items-center justify-between text-white text-xs mb-1">
                          <span>Progress</span>
                          <span>{(story as any).progress}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-1">
                          <div 
                            className="bg-teal h-1 rounded-full transition-all"
                            style={{ width: `${(story as any).progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookmarks">
            {bookmarkedStories.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {bookmarkedStories.map((story) => (
                  <StoryCard key={story.id} {...story} onClick={() => handleStoryClick(story.id)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
                <p className="text-muted-foreground">Stories you bookmark will appear here</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="liked">
            {favoriteStories.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {favoriteStories.map((story) => (
                  <StoryCard key={story.id} {...story} onClick={() => handleStoryClick(story.id)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No liked stories yet</h3>
                <p className="text-muted-foreground">Stories you like will appear here</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="following" className="space-y-6">
            <h2 className="text-xl font-semibold">Following</h2>
            {followingAuthors.length > 0 ? (
              <div className="grid gap-4">
                {followingAuthors.map((author, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <Link 
                          to={`/author/${encodeURIComponent(author.name)}`}
                          className="font-semibold hover:text-primary transition-colors"
                        >
                          {author.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {author.followerCount || author.followers} followers • {author.storiesCount || author.stories} stories
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Following
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Not following anyone yet</h3>
                <p className="text-muted-foreground">Authors you follow will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Library;

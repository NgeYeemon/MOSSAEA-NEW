import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, Filter, BookOpen, User } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchType, setSearchType] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  // Sample search results with more diverse data
  const allStories = [
    {
      id: '1',
      title: 'The Midnight Chronicles',
      author: 'Elena Rodriguez',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      reads: 15420,
      likes: 1250,
      comments: 340,
      rating: 4.8,
      chapters: 25,
      genre: 'Fantasy',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Echoes of the Past',
      author: 'Jameson Holt',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
      reads: 8900,
      likes: 670,
      comments: 189,
      rating: 4.5,
      chapters: 18,
      genre: 'Mystery',
      createdAt: '2024-02-20'
    },
    {
      id: '3',
      title: 'Hearts in Harmony',
      author: 'Sofia Chen',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      reads: 23100,
      likes: 1890,
      comments: 567,
      rating: 4.9,
      chapters: 32,
      genre: 'Romance',
      createdAt: '2024-03-05'
    },
    {
      id: '4',
      title: 'Digital Shadows',
      author: 'Marcus Webb',
      coverImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=600&fit=crop',
      reads: 12340,
      likes: 980,
      comments: 234,
      rating: 4.6,
      chapters: 22,
      genre: 'Sci-Fi',
      createdAt: '2024-01-30'
    },
    {
      id: '5',
      title: 'The Crimson Investigation',
      author: 'Detective Reynolds',
      coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
      reads: 6780,
      likes: 445,
      comments: 123,
      rating: 4.3,
      chapters: 15,
      genre: 'Thriller',
      createdAt: '2024-02-14'
    },
    {
      id: '6',
      title: 'Enchanted Realms',
      author: 'Elena Rodriguez',
      coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      reads: 19870,
      likes: 1567,
      comments: 432,
      rating: 4.7,
      chapters: 28,
      genre: 'Fantasy',
      createdAt: '2024-03-12'
    }
  ];

  const allAuthors = [
    {
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
      followers: 2450,
      stories: 12,
      genres: ['Fantasy', 'Romance']
    },
    {
      name: 'Jameson Holt',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      followers: 1890,
      stories: 8,
      genres: ['Mystery', 'Thriller']
    },
    {
      name: 'Sofia Chen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      followers: 3200,
      stories: 15,
      genres: ['Romance', 'Contemporary']
    },
    {
      name: 'Marcus Webb',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      followers: 1567,
      stories: 6,
      genres: ['Sci-Fi', 'Dystopian']
    },
    {
      name: 'Detective Reynolds',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      followers: 987,
      stories: 4,
      genres: ['Thriller', 'Crime']
    }
  ];

  // Enhanced filtering with search type consideration
  const getFilteredResults = () => {
    let stories = [...allStories];
    let authors = [...allAuthors];

    // Apply search filtering
    if (searchQuery) {
      stories = stories.filter(story => 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );

      authors = authors.filter(author =>
        author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply sorting
    const sortStories = (stories: typeof allStories) => {
      switch (sortBy) {
        case 'rating':
          return stories.sort((a, b) => b.rating - a.rating);
        case 'likes':
          return stories.sort((a, b) => b.likes - a.likes);
        case 'reads':
          return stories.sort((a, b) => b.reads - a.reads);
        default: // relevance
          return stories;
      }
    };

    const sortAuthors = (authors: typeof allAuthors) => {
      switch (sortBy) {
        case 'followers':
          return authors.sort((a, b) => b.followers - a.followers);
        case 'stories':
          return authors.sort((a, b) => b.stories - a.stories);
        default:
          return authors;
      }
    };

    return {
      stories: sortStories(stories),
      authors: sortAuthors(authors)
    };
  };

  const { stories: filteredStories, authors: filteredAuthors } = getFilteredResults();

  // Update search query when URL params change
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  // Auto-update search results when query changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim() && searchQuery !== (searchParams.get('q') || '')) {
        setSearchParams({ q: searchQuery.trim() });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchParams, setSearchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative max-w-2xl mx-auto">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search stories, authors, genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
                <Button type="submit" className="absolute right-2 top-1 bottom-1 bg-gradient-to-r from-teal to-sky-blue">
                  Search
                </Button>
              </div>
            </form>

            {/* Search Results Info */}
            {searchQuery && (
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2">
                  Search results for "{searchQuery}"
                </h1>
                <p className="text-muted-foreground">
                  Found {filteredStories.length} stories and {filteredAuthors.length} authors
                </p>
              </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Search in" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="stories">Stories</SelectItem>
                  <SelectItem value="authors">Authors</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="likes">Likes</SelectItem>
                  <SelectItem value="reads">Reads</SelectItem>
                  <SelectItem value="followers">Followers</SelectItem>
                  <SelectItem value="stories">Stories Count</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="space-y-8">
              {/* Stories Results */}
              {(searchType === 'all' || searchType === 'stories') && filteredStories.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Stories ({filteredStories.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredStories.map((story) => (
                      <StoryCard key={story.id} {...story} />
                    ))}
                  </div>
                </div>
              )}

              {/* Authors Results */}
              {(searchType === 'all' || searchType === 'authors') && filteredAuthors.length > 0 && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAuthors.map((author) => (
                      <Link 
                        key={author.name} 
                        to={`/author/${encodeURIComponent(author.name)}`}
                        className="block"
                      >
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <img
                                src={author.avatar}
                                alt={author.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="font-bold text-lg mb-2 hover:text-primary transition-colors">{author.name}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                  <span>{author.followers} followers</span>
                                  <span>{author.stories} stories</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {author.genres.map((genre) => (
                                    <Badge key={genre} variant="secondary" className="text-xs">
                                      {genre}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {filteredStories.length === 0 && filteredAuthors.length === 0 && (
                <div className="text-center py-12">
                  <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-bold mb-2">No results found</h2>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, BookOpen, Star, Users, Calendar, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const AuthorProfile = () => {
  const { authorName } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  // Sample author data with smaller numbers
  const author = {
    name: authorName || 'Elena Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop',
    bio: 'Passionate storyteller who loves weaving tales of magic and adventure. When not writing, you can find me exploring hidden cafes and collecting vintage books.',
    followers: 5,
    following: 3,
    storiesCount: 2,
    totalReads: 8,
    joinedDate: 'March 2023',
    location: 'Barcelona, Spain',
    genres: ['Fantasy', 'Romance', 'Adventure']
  };

  useEffect(() => {
    // Check if user is already following this author
    const followingData = JSON.parse(localStorage.getItem('followingAuthors') || '{}');
    const authorKey = authorName || 'Elena Rodriguez';
    setIsFollowing(followingData[authorKey]?.isFollowing || false);
    setFollowerCount(followingData[authorKey]?.followerCount || author.followers);
  }, [authorName, author.followers]);

  const handleFollow = () => {
    const followingData = JSON.parse(localStorage.getItem('followingAuthors') || '{}');
    const authorKey = authorName || 'Elena Rodriguez';
    
    if (isFollowing) {
      // Unfollow
      setIsFollowing(false);
      setFollowerCount(prev => prev - 1);
      followingData[authorKey] = {
        ...author,
        isFollowing: false,
        followerCount: followerCount - 1
      };
      toast({
        title: "Unfollowed",
        description: `You unfollowed ${author.name}`,
      });
    } else {
      // Follow
      setIsFollowing(true);
      setFollowerCount(prev => prev + 1);
      followingData[authorKey] = {
        ...author,
        isFollowing: true,
        followerCount: followerCount + 1
      };
      toast({
        title: "Following",
        description: `You are now following ${author.name}`,
      });
    }
    
    localStorage.setItem('followingAuthors', JSON.stringify(followingData));
    
    // Update following authors list for Library refresh
    const followingList = Object.values(followingData).filter((author: any) => author.isFollowing);
    // This will help trigger refresh in Library component if user navigates there
    window.dispatchEvent(new CustomEvent('followingChanged', { detail: followingList }));
  };

  // Sample stories by this author with smaller numbers  
  const authorStories = [
    {
      id: '1',
      title: 'The Midnight Chronicles',
      author: author.name,
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      reads: 8,
      likes: 4,
      comments: 6,
      rating: 4.8,
      chapters: 12
    },
    {
      id: '5',
      title: 'The Forgotten Prophecy',
      author: author.name,
      coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=600&fit=crop',
      reads: 11,
      likes: 7,
      comments: 3,
      rating: 4.9,
      chapters: 18
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Author Header */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex flex-col items-center md:items-start">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                  />
                  <Button 
                    className={`mt-4 ${isFollowing ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gradient-to-r from-teal to-sky-blue'}`}
                    onClick={handleFollow}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
                  <p className="text-muted-foreground mb-4 max-w-2xl">
                    {author.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                    {author.genres.map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{author.storiesCount}</div>
                      <div className="text-sm text-muted-foreground">Stories</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{followerCount}</div>
                      <div className="text-sm text-muted-foreground">Followers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{author.following}</div>
                      <div className="text-sm text-muted-foreground">Following</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{author.totalReads}</div>
                      <div className="text-sm text-muted-foreground">Total Likes</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground justify-center md:justify-start">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {author.joinedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{author.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Author's Stories */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Published Stories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorStories.map((story) => (
                <StoryCard
                  key={story.id}
                  {...story}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthorProfile;
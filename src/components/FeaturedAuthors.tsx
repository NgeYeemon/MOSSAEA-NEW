
import React from 'react';
import { Star, Users, BookOpen, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const FeaturedAuthors = () => {
  const authors = [
    {
      id: '1',
      name: 'Elena Rodriguez',
      username: '@elena_writes',
      bio: 'Bestselling fantasy author with over 2M readers worldwide. Known for creating immersive magical worlds.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b192?w=150&h=150&fit=crop&crop=face',
      followers: 234000,
      stories: 15,
      totalReads: 5600000,
      badges: ['Featured Author', 'Trending'],
      isVerified: true,
      genres: ['Fantasy', 'Adventure']
    },
    {
      id: '2',
      name: 'Marcus Chen',
      username: '@marcus_romance',
      bio: 'Contemporary romance specialist who believes every love story deserves to be told beautifully.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      followers: 189000,
      stories: 22,
      totalReads: 3200000,
      badges: ['Romance Master', 'Editor\'s Choice'],
      isVerified: true,
      genres: ['Romance', 'Contemporary']
    },
    {
      id: '3',
      name: 'Aria Blackwood',
      username: '@aria_scifi',
      bio: 'Sci-fi visionary crafting the future one story at a time. Award-winning author and futurist.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      followers: 156000,
      stories: 8,
      totalReads: 2800000,
      badges: ['Sci-Fi Pioneer', 'Award Winner'],
      isVerified: true,
      genres: ['Sci-Fi', 'Thriller']
    },
    {
      id: '4',
      name: 'Luna Santos',
      username: '@luna_dreams',
      bio: 'Young adult fiction author who captures the essence of growing up in the digital age.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      followers: 298000,
      stories: 18,
      totalReads: 4100000,
      badges: ['Rising Star', 'YA Specialist'],
      isVerified: true,
      genres: ['YA', 'Contemporary']
    }
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <section className="py-16 bg-gradient-to-r from-background via-cream/10 to-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Award className="w-6 h-6 text-gold" />
            <h2 className="text-3xl md:text-4xl font-bold">Featured Authors</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the talented writers who are shaping the future of storytelling on MOSSAE'A
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {authors.map((author, index) => (
            <Card
              key={author.id}
              className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in bg-card/50 backdrop-blur-sm border border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                {/* Author Avatar */}
                <div className="relative mb-4">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-teal/20 group-hover:ring-teal/40 transition-all"
                  />
                  {author.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white fill-current" />
                    </div>
                  )}
                </div>

                {/* Author Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-teal transition-colors">
                      {author.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{author.username}</p>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {author.bio}
                  </p>

                  {/* Genres */}
                  <div className="flex flex-wrap justify-center gap-1">
                    {author.genres.map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="text-xs bg-teal/10 text-teal border-teal/20"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>

                  {/* Author Badges */}
                  <div className="flex flex-wrap justify-center gap-1">
                    {author.badges.map((badge) => (
                      <Badge
                        key={badge}
                        className="text-xs bg-gold/10 text-gold border-gold/20"
                        variant="outline"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div className="font-semibold text-teal">{formatNumber(author.followers)}</div>
                      <div className="text-muted-foreground">Followers</div>
                    </div>
                    <div>
                      <div className="font-semibold text-moss-green">{author.stories}</div>
                      <div className="text-muted-foreground">Stories</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gold">{formatNumber(author.totalReads)}</div>
                      <div className="text-muted-foreground">Reads</div>
                    </div>
                  </div>

                  {/* Follow Button */}
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-teal to-sky-blue hover:from-teal/90 hover:to-sky-blue/90 text-white"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-3 border-teal/30 text-teal hover:bg-teal/10"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Discover More Authors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAuthors;

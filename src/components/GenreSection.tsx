import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Zap, Crown, Globe, Sparkles, Shield, Music, Compass } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const GenreSection = () => {
  const genres = [
    {
      name: 'Romance',
      icon: Heart,
      color: 'from-pink-400 to-rose-600',
      stories: '1.2M',
      description: 'Love stories that make hearts flutter'
    },
    {
      name: 'Fantasy',
      icon: Sparkles,
      color: 'from-purple-400 to-indigo-600',
      stories: '890K',
      description: 'Magical worlds and epic adventures'
    },
    {
      name: 'Mystery',
      icon: Compass,
      color: 'from-gray-600 to-gray-800',
      stories: '567K',
      description: 'Thrilling mysteries and suspense'
    },
    {
      name: 'Sci-Fi',
      icon: Zap,
      color: 'from-cyan-400 to-blue-600',
      stories: '445K',
      description: 'Future worlds and technology'
    },
    {
      name: 'Adventure',
      icon: Shield,
      color: 'from-green-400 to-emerald-600',
      stories: '723K',
      description: 'Epic journeys and quests'
    },
    {
      name: 'Teen Fiction',
      icon: Crown,
      color: 'from-yellow-400 to-orange-600',
      stories: '934K',
      description: 'Coming of age stories'
    },
    {
      name: 'Poetry',
      icon: Music,
      color: 'from-teal-400 to-teal-600',
      stories: '234K',
      description: 'Beautiful verses and emotions'
    },
    {
      name: 'General Fiction',
      icon: Globe,
      color: 'from-slate-400 to-slate-600',
      stories: '1.5M',
      description: 'Stories from everyday life'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore by Genre
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive into your favorite genres and discover stories that speak to your soul
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {genres.map((genre, index) => {
            const IconComponent = genre.icon;
            return (
              <Link
                key={genre.name}
                to={`/discover?genre=${genre.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="block"
              >
                <Card
                  className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-fade-in border-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                <CardContent className="p-0">
                  <div className={`h-32 bg-gradient-to-br ${genre.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <IconComponent className="w-12 h-12 text-white relative z-10 group-hover:scale-110 transition-transform" />
                    
                    {/* Floating particles effect */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-4 left-3 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg group-hover:text-teal transition-colors">
                        {genre.name}
                      </h3>
                      <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                        {genre.stories}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {genre.description}
                    </p>
                  </div>
                </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/discover">
            <button className="px-8 py-3 bg-gradient-to-r from-moss-green to-teal text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
              Explore All Genres
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GenreSection;

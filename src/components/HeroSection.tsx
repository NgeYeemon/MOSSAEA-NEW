
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-deep-navy/95 via-primary/90 to-navy-light/85">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal rounded-full animate-float animate-glow" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gold rounded-full animate-float animate-stagger-1" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-sky-blue rounded-full animate-float animate-stagger-2" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-moss-green rounded-full animate-float animate-stagger-3" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-teal/30 rounded-full animate-pulse-soft" />
        <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-gold/40 rounded-full animate-pulse-soft animate-stagger-2" />
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal/10 via-transparent to-gold/10 animate-shimmer" />

      <div className="container px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Heading with enhanced animation */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight animate-fade-up">
            Where Stories
            <span className="block gradient-text animate-scale-bounce" style={{ animationDelay: '0.5s' }}>Come Alive</span>
          </h1>

          {/* Subheading with slide animation */}
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-slide-up transition-all duration-600">
            Discover millions of stories, create your own adventures, and connect with readers worldwide on MOSSAE'A
          </p>

          {/* Stats with staggered animations */}
          <div className="flex flex-wrap justify-center gap-8 text-white/80 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full animate-stagger-1">
              <BookOpen className="w-5 h-5 text-teal animate-pulse-soft" />
              <span className="transition-all duration-300 hover:text-teal">2M+ Stories</span>
            </div>
            <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full animate-stagger-2">
              <Users className="w-5 h-5 text-gold animate-pulse-soft" />
              <span className="transition-all duration-300 hover:text-gold">500K+ Writers</span>
            </div>
            <div className="flex items-center space-x-2 glass-effect px-4 py-2 rounded-full animate-stagger-3">
              <Star className="w-5 h-5 text-sky-blue animate-pulse-soft" />
              <span className="transition-all duration-300 hover:text-sky-blue">10M+ Readers</span>
            </div>
          </div>

          {/* CTA Buttons with enhanced effects */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/discover">
              <Button size="lg" className="bg-teal hover:bg-teal/90 text-white px-8 py-3 text-lg group button-glow card-hover transition-all duration-400">
                Start Reading
                <BookOpen className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to="/write">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg group glass-effect card-hover transition-all duration-400"
              >
                Start Writing
                <PenTool className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </Button>
            </Link>
          </div>

          {/* Featured Achievement with glow effect */}
          <div className="inline-flex items-center space-x-2 glass-effect rounded-full px-6 py-3 text-white/90 animate-fade-in card-hover animate-glow" style={{ animationDelay: '0.6s' }}>
            <Star className="w-4 h-4 text-gold animate-pulse-soft" />
            <span className="text-sm transition-colors duration-300">Featured Platform - Best Reading Experience 2024</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center glass-effect transition-all duration-400 hover:border-teal">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse-soft"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

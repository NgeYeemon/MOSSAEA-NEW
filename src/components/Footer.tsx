
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Twitter, Instagram, Facebook, Youtube, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal to-gold rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">MOSSAE'A</span>
            </Link>
            <p className="text-white/80 max-w-sm">
              Where stories come alive. Join millions of readers and writers in the world's largest storytelling community.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/discover" className="text-white/80 hover:text-white transition-colors">Discover</Link></li>
              <li><Link to="/library" className="text-white/80 hover:text-white transition-colors">My Library</Link></li>
              <li><Link to="/write" className="text-white/80 hover:text-white transition-colors">Write Stories</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <p className="text-white/80 mb-4">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <p className="text-white/80">
              support@mossaea.com
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-white/60">
              <span>© 2024 MOSSAE'A. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-400 fill-current" />
                <span>for storytellers</span>
              </div>
            </div>
            <div className="flex space-x-6 text-sm">
              <span className="text-white/60">Privacy Policy</span>
              <span className="text-white/60">Terms of Service</span>
              <span className="text-white/60">Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

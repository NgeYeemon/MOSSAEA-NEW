import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, Menu, X, BookOpen, PenTool, Library, Heart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CoinDisplay from '@/components/CoinDisplay';
import NotificationPanel from '@/components/NotificationPanel';
import { useNotifications } from '@/hooks/useNotifications';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userCoins, setUserCoins] = useState(0);
  const navigate = useNavigate();
  const notificationRef = useRef<HTMLDivElement>(null);
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  useEffect(() => {
    const coins = localStorage.getItem('userCoins') || '0';
    setUserCoins(parseInt(coins));
  }, []);

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search after navigating
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e as any);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userCoins');
    localStorage.removeItem('isNewUser');
    navigate('/auth');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-teal to-gold rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">MOSSAE'A</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/discover" className="text-sm font-medium hover:text-teal transition-colors flex items-center space-x-1">
            <Search className="w-4 h-4" />
            <span>Discover</span>
          </Link>
          <Link to="/library" className="text-sm font-medium hover:text-teal transition-colors flex items-center space-x-1">
            <Library className="w-4 h-4" />
            <span>Library</span>
          </Link>
          <Link to="/write" className="text-sm font-medium hover:text-teal transition-colors flex items-center space-x-1">
            <PenTool className="w-4 h-4" />
            <span>Write</span>
          </Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search stories, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 focus:bg-background"
            />
          </div>
        </form>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <CoinDisplay coins={userCoins} />
          <div className="relative" ref={notificationRef}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs flex items-center justify-center"
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Badge>
              )}
            </Button>
            
            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 z-50">
                <NotificationPanel
                  notifications={notifications}
                  onMarkAsRead={markAsRead}
                  onMarkAllAsRead={markAllAsRead}
                  onNotificationClick={(notification) => {
                    console.log('Notification clicked:', notification);
                    setIsNotificationOpen(false);
                  }}
                />
              </div>
            )}
          </div>
          <Link to="/profile">
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container py-4 px-4 space-y-4">
            {/* Mobile Coins Display */}
            <div className="flex justify-center">
              <CoinDisplay coins={userCoins} />
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search stories, authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-muted/50 border-0"
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              <Link
                to="/discover"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="w-5 h-5 text-teal" />
                <span>Discover</span>
              </Link>
              <Link
                to="/library"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Library className="w-5 h-5 text-teal" />
                <span>Library</span>
              </Link>
              <Link
                to="/write"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <PenTool className="w-5 h-5 text-teal" />
                <span>Write</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5 text-teal" />
                <span>Profile</span>
              </Link>
            </div>

            {/* Mobile Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors w-full"
            >
              <LogOut className="w-5 h-5 text-red-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

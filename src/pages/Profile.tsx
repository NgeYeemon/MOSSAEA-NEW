import React, { useState, useEffect } from 'react';
import { Edit, Settings, Share2, Users, BookOpen, Calendar, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MyStories from '@/components/MyStories';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getWrittenStories, type StoredStory } from '@/lib/storyStorage';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [userStories, setUserStories] = useState<StoredStory[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    bio: '',
    location: ''
  });

  useEffect(() => {
    // Load user's written stories
    const writtenStories = getWrittenStories();
    setUserStories(writtenStories);
    
    // Load saved profile data
    const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    setEditForm({
      name: savedProfile.name || 'Elena Rodriguez',
      bio: savedProfile.bio || 'Fantasy writer who loves crafting worlds where magic meets reality. Published author and Wattpad storyteller. ✨📚',
      location: savedProfile.location || 'Barcelona, Spain'
    });
  }, []);

  // Get following count from localStorage
  const getFollowingCount = () => {
    const followingData = JSON.parse(localStorage.getItem('followingAuthors') || '{}');
    return Object.values(followingData).filter((author: any) => author.isFollowing).length;
  };

  const user = {
    name: editForm.name,
    username: '@elenaWrites',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: editForm.bio,
    location: editForm.location,
    followers: 2,
    following: getFollowingCount(),
    stories: userStories.length,
    isVerified: true
  };

  // Use the actual written stories from storage, fallback to default if none exist
  const myStories = userStories.length > 0 ? userStories : [
    {
      id: '1',
      title: 'The Midnight Chronicles',
      author: 'Elena Rodriguez',
      description: 'A mysterious tale of magic and adventure.',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      genre: 'Fantasy',
      reads: 1240000,
      likes: 89000,
      comments: 12000,
      rating: 4.8,
      chapters: 25,
      isCompleted: false,
      lastUpdated: '2 hours ago'
    }
  ];

  const handleEditProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(editForm));
    setIsEditDialogOpen(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handleStoryClick = (storyId: string) => {
    console.log('Story clicked:', storyId);
    // Navigate to story detail page
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-teal/10 to-sky-blue/10 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover object-center"
              />
              {user.isVerified && (
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-teal rounded-full flex items-center justify-center text-white text-sm font-bold">
                  ✓
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <p className="text-lg text-muted-foreground mb-2">{user.username}</p>
                  <p className="text-muted-foreground mb-4 max-w-md">{user.bio}</p>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4 md:mt-0">
                  {isOwnProfile ? (
                    <>
                      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Name</label>
                              <Input
                                value={editForm.name}
                                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Your name"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Bio</label>
                              <Textarea
                                value={editForm.bio}
                                onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                                placeholder="Tell us about yourself"
                                className="min-h-[80px]"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Location</label>
                              <Input
                                value={editForm.location}
                                onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                                placeholder="Your location"
                              />
                            </div>
                            <Button onClick={handleEditProfile} className="w-full">
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="icon">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant={isFollowing ? "outline" : "default"}
                        onClick={() => setIsFollowing(!isFollowing)}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal">{user.followers}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal">{user.following}</div>
              <div className="text-sm text-muted-foreground">Following</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal">{user.stories}</div>
              <div className="text-sm text-muted-foreground">Stories</div>
            </div>
          </div>
        </div>

        <MyStories />
      </main>

      <Footer />
    </div>
  );
};

export default Profile;

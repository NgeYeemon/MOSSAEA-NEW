import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, Lock, Unlock } from 'lucide-react';
import { StoredStory, unlockPaidStory } from '@/lib/storyStorage';
import { toast } from '@/hooks/use-toast';

interface PaidStoryUnlockProps {
  story: StoredStory;
  userCoins: number;
  onUnlock: (newCoins: number) => void;
  onCancel: () => void;
}

const PaidStoryUnlock = ({ story, userCoins, onUnlock, onCancel }: PaidStoryUnlockProps) => {
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = async () => {
    if (!story.isPaid || !story.price) return;
    
    setIsUnlocking(true);
    
    try {
      const result = unlockPaidStory(story.id, userCoins, story);
      
      if (result.success) {
        toast({
          title: "Story unlocked!",
          description: `You can now read "${story.title}" for ${story.price} coins`,
        });
        onUnlock(result.newCoins);
      } else {
        toast({
          title: "Not enough coins",
          description: `You need ${story.price} coins to unlock this story. You have ${userCoins} coins.`,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unlock story. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUnlocking(false);
    }
  };

  if (!story.isPaid || !story.price) return null;

  const canAfford = userCoins >= story.price;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900/95 backdrop-blur border-white/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>
          <CardTitle className="text-white text-xl">Unlock Premium Story</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-white font-semibold text-lg mb-2">{story.title}</h3>
            <p className="text-white/70 text-sm mb-4">{story.description}</p>
            
            <div className="bg-white/10 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Story Price:</span>
                <div className="flex items-center space-x-1 text-amber-400">
                  <Coins className="w-4 h-4" />
                  <span className="font-semibold">{story.price}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Your Coins:</span>
                <div className="flex items-center space-x-1 text-white">
                  <Coins className="w-4 h-4" />
                  <span className="font-semibold">{userCoins}</span>
                </div>
              </div>
              <div className="border-t border-white/20 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">After Purchase:</span>
                  <div className="flex items-center space-x-1 text-white">
                    <Coins className="w-4 h-4" />
                    <span className="font-semibold">{userCoins - story.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUnlock}
              disabled={!canAfford || isUnlocking}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50"
            >
              <Unlock className="w-4 h-4 mr-2" />
              {isUnlocking ? 'Unlocking...' : 'Unlock Story'}
            </Button>
          </div>

          {!canAfford && (
            <p className="text-red-400 text-sm text-center">
              You need {story.price - userCoins} more coins to unlock this story.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaidStoryUnlock;
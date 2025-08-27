
import React from 'react';
import { Coins, Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface WelcomeBonusProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeBonus = ({ isOpen, onClose }: WelcomeBonusProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center bg-gradient-to-br from-gold-50 to-yellow-50 border-gold-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gold-700 mb-4">
            Welcome to MOSSAE'A!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gold-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Coins className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-gold-500 animate-bounce" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <Gift className="w-6 h-6 text-gold-600 animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gold-700 mb-2">
              You've received 200 Coins!
            </h3>
            <p className="text-gold-600">
              Use coins to unlock premium chapters and exclusive content. Happy reading!
            </p>
          </div>

          <div className="bg-white/50 p-4 rounded-lg border border-gold-200">
            <div className="flex items-center justify-center space-x-2">
              <Coins className="w-5 h-5 text-gold-600" />
              <span className="text-lg font-bold text-gold-700">200 Coins</span>
            </div>
          </div>

          <Button 
            onClick={onClose}
            className="w-full bg-gradient-to-r from-gold-500 to-yellow-500 hover:from-gold-600 hover:to-yellow-600 text-white font-semibold"
          >
            Start Reading!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeBonus;

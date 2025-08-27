import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, User, BookOpen, Star } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'story_update' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  avatar?: string;
  username?: string;
  storyTitle?: string;
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onClick?: (notification: Notification) => void;
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'like':
      return <Heart className="w-4 h-4 text-red-500" />;
    case 'comment':
      return <MessageCircle className="w-4 h-4 text-blue-500" />;
    case 'follow':
      return <User className="w-4 h-4 text-green-500" />;
    case 'story_update':
      return <BookOpen className="w-4 h-4 text-purple-500" />;
    case 'achievement':
      return <Star className="w-4 h-4 text-yellow-500" />;
    default:
      return null;
  }
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onClick
}) => {
  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    onClick?.(notification);
  };

  return (
    <div
      className={`p-4 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors ${
        !notification.read ? 'bg-primary/5' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-3">
        <div className="relative">
          <Avatar className="w-8 h-8">
            <AvatarImage src={notification.avatar} />
            <AvatarFallback>
              {notification.username ? notification.username[0].toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
            {getNotificationIcon(notification.type)}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-foreground truncate">
              {notification.title}
            </p>
            {!notification.read && (
              <Badge variant="secondary" className="w-2 h-2 p-0 bg-primary"></Badge>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {notification.message}
          </p>
          
          {notification.storyTitle && (
            <p className="text-xs text-primary mt-1 font-medium">
              "{notification.storyTitle}"
            </p>
          )}
          
          <p className="text-xs text-muted-foreground mt-2">
            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
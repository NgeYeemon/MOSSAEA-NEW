import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import NotificationItem, { Notification } from './NotificationItem';
import { Settings, Check } from 'lucide-react';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNotificationClick?: (notification: Notification) => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNotificationClick
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  const hasNotifications = notifications.length > 0;

  return (
    <div className="w-80 bg-background border border-border rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                className="text-xs h-8 px-2"
              >
                <Check className="w-3 h-3 mr-1" />
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {hasNotifications ? (
        <ScrollArea className="max-h-96">
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
                onClick={onNotificationClick}
              />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div className="p-8 text-center">
          <div className="text-muted-foreground">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Settings className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium mb-1">No notifications</p>
            <p className="text-xs">You're all caught up!</p>
          </div>
        </div>
      )}

      {/* Footer */}
      {hasNotifications && (
        <>
          <Separator />
          <div className="p-3">
            <Button variant="ghost" className="w-full text-sm h-8">
              View all notifications
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPanel;
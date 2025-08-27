import { useState, useEffect } from 'react';
import { Notification } from '@/components/NotificationItem';

// Mock notifications for demo
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    title: 'Sarah liked your story',
    message: 'Sarah Johnson liked "The Midnight Garden"',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
    avatar: '',
    username: 'sarah_j',
    storyTitle: 'The Midnight Garden'
  },
  {
    id: '2',
    type: 'comment',
    title: 'New comment on your story',
    message: 'Alex Martinez commented: "This chapter was absolutely amazing! Can\'t wait for the next one."',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    avatar: '',
    username: 'alex_m',
    storyTitle: 'The Midnight Garden'
  },
  {
    id: '3',
    type: 'follow',
    title: 'New follower',
    message: 'Emma Wilson started following you',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
    avatar: '',
    username: 'emma_w'
  },
  {
    id: '4',
    type: 'story_update',
    title: 'Story update',
    message: 'Maya Chen updated "Echoes of Tomorrow" - Chapter 12 is now available',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    read: true,
    avatar: '',
    username: 'maya_c',
    storyTitle: 'Echoes of Tomorrow'
  },
  {
    id: '5',
    type: 'achievement',
    title: 'Achievement unlocked!',
    message: 'Congratulations! You\'ve reached 1,000 reads on "The Midnight Garden"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    storyTitle: 'The Midnight Garden'
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Load notifications from localStorage or API
    const saved = localStorage.getItem('notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
        setNotifications(parsed);
      } catch {
        setNotifications(mockNotifications);
      }
    } else {
      setNotifications(mockNotifications);
    }
  }, []);

  useEffect(() => {
    // Save notifications to localStorage
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    addNotification,
    unreadCount: getUnreadCount()
  };
};
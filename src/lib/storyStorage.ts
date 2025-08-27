// Story storage management using localStorage

export interface StoredStory {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  genre: string;
  likes: number;
  comments: number;
  rating: number;
  chapters: number;
  content?: string;
  createdAt: string;
  userId?: string;
  isPaid?: boolean;
  price?: number;
  isUnlocked?: boolean;
  chapterContents?: { [key: number]: string };
}

export interface UserStoryData {
  writtenStories: StoredStory[];
  favoriteStories: string[];
  bookmarkedStories: string[];
  libraryStories: string[];
}

const STORAGE_KEY = 'userStoryData';

// Get all user story data
export const getUserStoryData = (): UserStoryData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored user data:', error);
    }
  }
  
  return {
    writtenStories: [],
    favoriteStories: [],
    bookmarkedStories: [],
    libraryStories: []
  };
};

// Save user story data
export const saveUserStoryData = (data: UserStoryData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

// Add story to favorites
export const addToFavorites = (storyId: string): void => {
  const data = getUserStoryData();
  if (!data.favoriteStories.includes(storyId)) {
    data.favoriteStories.push(storyId);
    saveUserStoryData(data);
  }
};

// Remove story from favorites
export const removeFromFavorites = (storyId: string): void => {
  const data = getUserStoryData();
  data.favoriteStories = data.favoriteStories.filter(id => id !== storyId);
  saveUserStoryData(data);
};

// Check if story is favorited
export const isFavorited = (storyId: string): boolean => {
  const data = getUserStoryData();
  return data.favoriteStories.includes(storyId);
};

// Add story to bookmarks
export const addToBookmarks = (storyId: string): void => {
  const data = getUserStoryData();
  if (!data.bookmarkedStories.includes(storyId)) {
    data.bookmarkedStories.push(storyId);
    saveUserStoryData(data);
  }
};

// Remove story from bookmarks
export const removeFromBookmarks = (storyId: string): void => {
  const data = getUserStoryData();
  data.bookmarkedStories = data.bookmarkedStories.filter(id => id !== storyId);
  saveUserStoryData(data);
};

// Check if story is bookmarked
export const isBookmarked = (storyId: string): boolean => {
  const data = getUserStoryData();
  return data.bookmarkedStories.includes(storyId);
};

// Add story to library (saved stories)
export const addToLibrary = (storyId: string): void => {
  const data = getUserStoryData();
  if (!data.libraryStories.includes(storyId)) {
    data.libraryStories.push(storyId);
    saveUserStoryData(data);
  }
};

// Save a written story
export const saveWrittenStory = (story: Omit<StoredStory, 'id' | 'createdAt'>): StoredStory => {
  const data = getUserStoryData();
  const newStory: StoredStory = {
    ...story,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    userId: 'current-user', // In a real app, this would be the actual user ID
    chapterContents: {
      1: story.content || '' // Store initial content as Chapter 1
    }
  };
  
  data.writtenStories.push(newStory);
  saveUserStoryData(data);
  
  return newStory;
};

// Update an existing story's content
export const updateStoryContent = (storyId: string, content: string, chapterNumber: number = 1): boolean => {
  const data = getUserStoryData();
  const storyIndex = data.writtenStories.findIndex(story => story.id === storyId);
  
  if (storyIndex === -1) return false;
  
  const story = data.writtenStories[storyIndex];
  
  // Initialize chapterContents if it doesn't exist
  if (!story.chapterContents) {
    story.chapterContents = {};
  }
  
  // Update the chapter content
  story.chapterContents[chapterNumber] = content;
  
  // Update main content field for backward compatibility
  if (chapterNumber === 1) {
    story.content = content;
  }
  
  saveUserStoryData(data);
  return true;
};

// Get story content for a specific chapter
export const getStoryChapterContent = (storyId: string, chapterNumber: number = 1): string => {
  const story = getStoryById(storyId);
  if (!story) return '';
  
  // Try to get from chapterContents first
  if (story.chapterContents && story.chapterContents[chapterNumber]) {
    return story.chapterContents[chapterNumber];
  }
  
  // Fallback to main content for chapter 1
  if (chapterNumber === 1 && story.content) {
    return story.content;
  }
  
  return '';
};

// Get user's written stories
export const getWrittenStories = (): StoredStory[] => {
  const data = getUserStoryData();
  return data.writtenStories;
};

// Get favorited stories
export const getFavoriteStoryIds = (): string[] => {
  const data = getUserStoryData();
  return data.favoriteStories;
};

// Get bookmarked stories
export const getBookmarkedStoryIds = (): string[] => {
  const data = getUserStoryData();
  return data.bookmarkedStories;
};

// Get library stories
export const getLibraryStoryIds = (): string[] => {
  const data = getUserStoryData();
  return data.libraryStories;
};

// Add a new chapter to an existing story
export const addChapterToStory = (storyId: string, chapterContent: string): boolean => {
  const data = getUserStoryData();
  const storyIndex = data.writtenStories.findIndex(story => story.id === storyId);
  
  if (storyIndex === -1) return false;
  
  const story = data.writtenStories[storyIndex];
  const newChapterNumber = story.chapters + 1;
  
  // Initialize chapterContents if it doesn't exist
  if (!story.chapterContents) {
    story.chapterContents = { 1: story.content || '' };
  }
  
  // Add new chapter
  story.chapterContents[newChapterNumber] = chapterContent;
  story.chapters = newChapterNumber;
  
  saveUserStoryData(data);
  return true;
};

// Get a specific story by ID (from written stories or all stories)
export const getStoryById = (storyId: string): StoredStory | null => {
  const data = getUserStoryData();
  return data.writtenStories.find(story => story.id === storyId) || null;
};

// Unlock a paid story
export const unlockPaidStory = (storyId: string, currentCoins: number, story?: StoredStory): { success: boolean; newCoins: number } => {
  // If story is passed directly (for external stories), use it; otherwise try to find it in written stories
  let targetStory = story || getStoryById(storyId);
  
  if (!targetStory || !targetStory.isPaid || targetStory.price === undefined) {
    return { success: false, newCoins: currentCoins };
  }
  
  if (currentCoins < targetStory.price) {
    return { success: false, newCoins: currentCoins };
  }
  
  // Mark story as unlocked in global unlock storage
  const unlockedStories = JSON.parse(localStorage.getItem('unlockedStories') || '{}');
  unlockedStories[storyId] = true;
  localStorage.setItem('unlockedStories', JSON.stringify(unlockedStories));
  
  // Also mark in written stories if it's user's own story
  const data = getUserStoryData();
  const storyIndex = data.writtenStories.findIndex(s => s.id === storyId);
  if (storyIndex !== -1) {
    data.writtenStories[storyIndex].isUnlocked = true;
    saveUserStoryData(data);
  }
  
  // Update user coins
  const newCoins = currentCoins - targetStory.price;
  localStorage.setItem('userCoins', newCoins.toString());
  
  return { success: true, newCoins };
};

// Check if a story is unlocked
export const isStoryUnlocked = (storyId: string): boolean => {
  // Check global unlock storage first
  const unlockedStories = JSON.parse(localStorage.getItem('unlockedStories') || '{}');
  if (unlockedStories[storyId]) {
    return true;
  }
  
  // Check user's written stories
  const story = getStoryById(storyId);
  return !story?.isPaid || story?.isUnlocked === true;
};

// Author following functionality
export interface AuthorData {
  name: string;
  avatar: string;
  isFollowing: boolean;
  followerCount: number;
  stories: number;
  bio?: string;
  genres?: string[];
}

const FOLLOWING_AUTHORS_KEY = 'followingAuthors';

// Follow an author
export const followAuthor = (authorData: Omit<AuthorData, 'isFollowing' | 'followerCount'> & { followerCount?: number }): void => {
  const following = JSON.parse(localStorage.getItem(FOLLOWING_AUTHORS_KEY) || '{}');
  const currentFollowerCount = following[authorData.name]?.followerCount || authorData.followerCount || 0;
  
  following[authorData.name] = {
    ...authorData,
    isFollowing: true,
    followerCount: currentFollowerCount + 1
  };
  
  localStorage.setItem(FOLLOWING_AUTHORS_KEY, JSON.stringify(following));
  updateAuthorStats(authorData.name, 'follow');
};

// Unfollow an author
export const unfollowAuthor = (authorName: string): void => {
  const following = JSON.parse(localStorage.getItem(FOLLOWING_AUTHORS_KEY) || '{}');
  
  if (following[authorName]) {
    following[authorName] = {
      ...following[authorName],
      isFollowing: false,
      followerCount: Math.max(0, following[authorName].followerCount - 1)
    };
  }
  
  localStorage.setItem(FOLLOWING_AUTHORS_KEY, JSON.stringify(following));
  updateAuthorStats(authorName, 'unfollow');
};

// Check if following an author
export const isFollowingAuthor = (authorName: string): boolean => {
  const following = JSON.parse(localStorage.getItem(FOLLOWING_AUTHORS_KEY) || '{}');
  return following[authorName]?.isFollowing || false;
};

// Get author follower count
export const getAuthorFollowerCount = (authorName: string): number => {
  const following = JSON.parse(localStorage.getItem(FOLLOWING_AUTHORS_KEY) || '{}');
  return following[authorName]?.followerCount || 0;
};

// Get all following authors
export const getFollowingAuthors = (): AuthorData[] => {
  const following = JSON.parse(localStorage.getItem(FOLLOWING_AUTHORS_KEY) || '{}');
  return Object.values(following).filter((author: any): author is AuthorData => 
    author && author.isFollowing && typeof author.name === 'string'
  );
};

// Update story interactions (likes, reads, etc.)
export const updateStoryInteraction = (storyId: string, interaction: 'like' | 'unlike' | 'read' | 'addToLibrary'): void => {
  // Update global story interactions for all stories (including other authors)
  const interactions = JSON.parse(localStorage.getItem('storyInteractions') || '{}');
  if (!interactions[storyId]) {
    interactions[storyId] = { likes: 0, reads: 0, libraryAdds: 0 };
  }
  
  switch (interaction) {
    case 'like':
      interactions[storyId].likes = Math.max(0, interactions[storyId].likes + 1);
      break;
    case 'unlike':
      interactions[storyId].likes = Math.max(0, interactions[storyId].likes - 1);
      break;
    case 'read':
      interactions[storyId].reads = Math.max(0, interactions[storyId].reads + 1);
      break;
    case 'addToLibrary':
      interactions[storyId].libraryAdds = Math.max(0, interactions[storyId].libraryAdds + 1);
      interactions[storyId].likes = Math.max(0, interactions[storyId].likes + 1);
      break;
  }
  
  localStorage.setItem('storyInteractions', JSON.stringify(interactions));
  
  // Also update own written stories if applicable
  const data = getUserStoryData();
  const storyIndex = data.writtenStories.findIndex(story => story.id === storyId);
  
  if (storyIndex !== -1) {
    const story = data.writtenStories[storyIndex];
    
    switch (interaction) {
      case 'like':
        story.likes = Math.max(0, story.likes + 1);
        break;
      case 'unlike':
        story.likes = Math.max(0, story.likes - 1);
        break;
      case 'read':
        // Could increment read count here if needed
        break;
      case 'addToLibrary':
        // Increment engagement when added to library
        story.likes = Math.max(0, story.likes + 1);
        break;
    }
    
    saveUserStoryData(data);
  }
};

// Get story interaction counts
export const getStoryInteractions = (storyId: string) => {
  const interactions = JSON.parse(localStorage.getItem('storyInteractions') || '{}');
  return interactions[storyId] || { likes: 0, reads: 0, libraryAdds: 0 };
};

// Update author stats when following/unfollowing
export const updateAuthorStats = (authorName: string, action: 'follow' | 'unfollow'): void => {
  const following = JSON.parse(localStorage.getItem(FOLLOWING_AUTHORS_KEY) || '{}');
  
  if (following[authorName]) {
    if (action === 'follow') {
      following[authorName].followerCount = Math.max(0, following[authorName].followerCount + 1);
      following[authorName].isFollowing = true;
    } else {
      following[authorName].followerCount = Math.max(0, following[authorName].followerCount - 1);
      following[authorName].isFollowing = false;
    }
    
    localStorage.setItem(FOLLOWING_AUTHORS_KEY, JSON.stringify(following));
  }
};

// Reading progress tracking
export interface ReadingProgress {
  storyId: string;
  currentChapter: number;
  progressPercentage: number;
  lastReadAt: string;
}

const READING_PROGRESS_KEY = 'readingProgress';

// Save reading progress for a story
export const saveReadingProgress = (storyId: string, chapter: number, progressPercentage: number): void => {
  const allProgress = JSON.parse(localStorage.getItem(READING_PROGRESS_KEY) || '{}');
  
  allProgress[storyId] = {
    storyId,
    currentChapter: chapter,
    progressPercentage: Math.round(progressPercentage),
    lastReadAt: new Date().toISOString()
  };
  
  localStorage.setItem(READING_PROGRESS_KEY, JSON.stringify(allProgress));
};

// Get reading progress for a story
export const getReadingProgress = (storyId: string): ReadingProgress | null => {
  const allProgress = JSON.parse(localStorage.getItem(READING_PROGRESS_KEY) || '{}');
  return allProgress[storyId] || null;
};

// Get all reading progress
export const getAllReadingProgress = (): ReadingProgress[] => {
  const allProgress = JSON.parse(localStorage.getItem(READING_PROGRESS_KEY) || '{}');
  return Object.values(allProgress);
};
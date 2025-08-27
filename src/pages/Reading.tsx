import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReadingHeader from '@/components/reading/ReadingHeader';
import ChapterContent from '@/components/reading/ChapterContent';
import ChapterNavigation from '@/components/reading/ChapterNavigation';
import ChapterSelector from '@/components/reading/ChapterSelector';
import CommentsPanel from '@/components/reading/CommentsPanel';
import { Progress } from '@/components/ui/progress';
import { getStoryById, StoredStory, isStoryUnlocked, getStoryChapterContent } from '@/lib/storyStorage';
import PaidStoryUnlock from '@/components/PaidStoryUnlock';
import { toast } from '@/hooks/use-toast';

const Reading = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fontSize, setFontSize] = useState(16);
  const [showComments, setShowComments] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [userCoins, setUserCoins] = useState(0);
  const [story, setStory] = useState<StoredStory | null>(null);
  const [showPaidUnlock, setShowPaidUnlock] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Initialize comments state
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'BookLover23',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      comment: 'This is such an amazing start! I love how Luna discovers her powers.',
      likes: 12,
      timestamp: '2 hours ago',
      replies: [
        {
          id: 11,
          user: 'FantasyFan',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
          comment: 'I totally agree! The time manipulation concept is so unique.',
          likes: 3,
          timestamp: '1 hour ago'
        }
      ]
    },
    {
      id: 2,
      user: 'FantasyFan',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      comment: 'The Order of Midnight sounds so mysterious! Can\'t wait to learn more.',
      likes: 8,
      timestamp: '4 hours ago',
      replies: []
    },
    {
      id: 3,
      user: 'TimeReader',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop&crop=face',
      comment: 'The way you describe Luna\'s emotions is so realistic. I can feel her confusion and fear.',
      likes: 15,
      timestamp: '6 hours ago',
      replies: []
    }
  ]);

  useEffect(() => {
    const coins = localStorage.getItem('userCoins') || '0';
    setUserCoins(parseInt(coins));
    
    // Get story from location state or ID
    const stateData = location.state as { story?: StoredStory; storyId?: string };
    
    if (stateData?.story) {
      setStory(stateData.story);
    } else if (stateData?.storyId) {
      const foundStory = getStoryById(stateData.storyId);
      if (foundStory) {
        setStory(foundStory);
      } else {
        // Fallback to default mock story
        setStory({
          id: '1',
          title: 'The Midnight Chronicles',
          author: 'Elena Rodriguez',
          coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
          description: 'A mysterious tale of magic and adventure.',
          genre: 'Fantasy',
          likes: 8,
          comments: 15,
          rating: 4.8,
          chapters: 2,
          createdAt: new Date().toISOString()
        });
      }
    } else {
      // Default fallback story
      setStory({
        id: '1',
        title: 'The Midnight Chronicles',
        author: 'Elena Rodriguez',
        coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
        description: 'A mysterious tale of magic and adventure.',
        genre: 'Fantasy',
        likes: 8,
        comments: 15,
        rating: 4.8,
        chapters: 2,
        createdAt: new Date().toISOString()
      });
    }
  }, [location.state]);

  // Calculate reading progress based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const element = contentRef.current;
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight - element.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => contentElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const chapterContent = {
    1: {
      title: "Chapter 1: The Discovery",
      content: `The clock tower chimed midnight as Luna pressed herself against the cold stone wall, her heart racing. She had never been out this late before, but the strange dreams had been calling to her for weeks now.

[Image: https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop]

The moonlight cast long shadows across the empty courtyard, and for a moment, everything seemed to shimmer and slow. Luna blinked, thinking her eyes were playing tricks on her, but then she saw it clearly—a leaf falling from the oak tree had stopped mid-air, suspended as if time itself had paused.

She reached out tentatively, her fingertips barely grazing the frozen leaf. The moment she touched it, time resumed its normal flow, and the leaf fluttered to the ground. Luna stumbled backward, her mind reeling.

"What just happened?" she whispered to herself.

From the shadows near the library, a figure emerged. It was Professor Blackwood, but he looked different somehow—older, more weathered, as if he carried the weight of centuries on his shoulders.

[Image: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop]

"You're beginning to understand," he said, his voice carrying across the courtyard despite the distance between them. "The power that flows through your veins is ancient, Luna. And there are those who would kill to possess it."

Luna wanted to run, to pretend this was all just another vivid dream, but something in the professor's eyes held her in place. She had always known she was different, had always felt like she was waiting for something to begin.

"I don't understand any of this," she said, her voice barely above a whisper.

Professor Blackwood stepped closer, and Luna could see the urgency in his expression. "Then it's time you learned the truth about who you really are, and why the Order of Midnight has been searching for you."

The name sent a chill down Luna's spine. She had heard whispers of the Order in her dreams, seen their symbol—a clock with hands pointing to midnight—burned into her mind during restless nights.

[Image: https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop]

"My parents," she started to say.

"Were members of the Order," Professor Blackwood finished. "They died protecting the secret of your bloodline. But now, on your eighteenth birthday, your powers are awakening, and the Order will stop at nothing to find you."

Luna's legs felt weak. Everything she thought she knew about her life, about her parents' death in that car accident when she was five, had been a lie.

"What am I supposed to do?" she asked.

"Learn to control your gift," Professor Blackwood said, "before they control you."

As if summoned by his words, dark figures began emerging from the surrounding buildings. Luna counted at least six of them, all wearing long black coats and moving with an unnatural grace.

"Run," Professor Blackwood commanded, but Luna found herself frozen in place.

The lead figure raised his hand, and Luna felt a strange pulling sensation, as if something was trying to reach into her very soul. But then, instinctively, she focused on that feeling she had experienced with the leaf.

Time slowed.

The world around her became a tableau of frozen motion—Professor Blackwood mid-stride, the Order members reaching for weapons that hung suspended in air, even her own breath visible as a stationary cloud in the cold night air.

In this bubble of stopped time, Luna ran.`
    },
    2: {
      title: "Chapter 2: The Awakening",
      content: `Luna burst through the dormitory doors, her chest heaving as she tried to process what had just happened. The familiar sight of her small room felt surreal after the impossible events in the courtyard.

[Image: https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop]

She collapsed onto her bed, staring at her hands. Were they shaking from fear or from whatever power now coursed through her veins? The memory of time stopping around her felt both vivid and dreamlike.

A soft knock interrupted her thoughts. "Luna? Are you alright?" It was Sarah, her roommate.

"I'm fine," Luna called back, though she was anything but. How could she explain that she had just discovered she could manipulate time itself?

Hours passed before Luna finally drifted into an uneasy sleep, only to be awakened by vivid dreams of clockwork mechanisms and shadowy figures. When morning came, she almost convinced herself it had all been an elaborate nightmare—until she found a note slipped under her door.

The handwriting was elegant but urgent: "Meet me in the old astronomy tower at sunset. There is much you need to learn. - B"

Professor Blackwood. So it hadn't been a dream after all.

[Image: https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop]

Luna spent the day in a daze, barely able to concentrate on her classes. Every shadow seemed to hide a potential threat, every ticking clock a reminder of her newfound abilities. She found herself unconsciously reaching out to touch falling leaves, pencils dropped by classmates, anything to see if she could recreate the impossible moment from the night before.

Nothing happened. Perhaps it really had been her imagination.

But as sunset approached, Luna found herself climbing the winding stairs to the astronomy tower, her heart pounding with each step. The ancient stones seemed to whisper secrets as she ascended, and by the time she reached the top, she was certain her life was about to change forever.

Professor Blackwood was waiting for her, silhouetted against the dying light. In his hands, he held an ornate pocket watch that seemed to pulse with its own inner light.

"You came," he said, relief evident in his voice. "I wasn't certain you would."

"I had to know if it was real," Luna replied, stepping closer. The pocket watch drew her attention like a magnet. "What is that?"

"This," Professor Blackwood said, holding up the watch, "belonged to your father. It's a Chronos Key—one of only seven ever created. And now, it's yours."`
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Math.max(...comments.map(c => c.id)) + 1,
        user: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
        comment: newComment,
        likes: 0,
        timestamp: 'just now',
        replies: []
      };
      
      setComments([newCommentObj, ...comments]);
      setNewComment('');
      
      toast({
        title: "Comment posted!",
        description: "Your comment has been added to the discussion.",
      });
    }
  };

  const handleReply = (commentId: number) => {
    if (replyText.trim()) {
      const newReply = {
        id: Math.max(...comments.flatMap(c => [c.id, ...c.replies.map(r => r.id)])) + 1,
        user: 'You',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
        comment: replyText,
        likes: 0,
        timestamp: 'just now'
      };
      
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      ));
      
      setReplyText('');
      setReplyTo(null);
      
      toast({
        title: "Reply posted!",
        description: "Your reply has been added to the comment.",
      });
    }
  };

  const handleLikeComment = (commentId: number, isReply: boolean = false, parentCommentId?: number) => {
    if (isReply && parentCommentId) {
      setComments(comments.map(comment => 
        comment.id === parentCommentId
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ));
    }
    
    toast({
      title: "Liked!",
      description: "You liked this comment.",
    });
  };

  const nextChapter = () => {
    if (currentChapter < (story?.chapters || 2)) {
      setCurrentChapter(currentChapter + 1);
      setReadingProgress(0);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
      setReadingProgress(0);
    }
  };

  const handleChapterSelect = (chapter: number) => {
    // Check if story is paid and not unlocked
    if (story?.isPaid && !isStoryUnlocked(story.id)) {
      setShowPaidUnlock(true);
      return;
    }
    
    setCurrentChapter(chapter);
    setReadingProgress(0);
  };

  const handleUnlockStory = (newCoins: number) => {
    setUserCoins(newCoins);
    setShowPaidUnlock(false);
    setCurrentChapter(1);
  };

  const getCurrentChapterContent = () => {
    // Check if story is paid and not unlocked
    if (story?.isPaid && !isStoryUnlocked(story.id)) {
      return {
        title: "Premium Content",
        content: "This is premium content. Please unlock this story to continue reading."
      };
    }
    
    // For user-written stories, get content from storage
    if (story?.id) {
      const content = getStoryChapterContent(story.id, currentChapter);
      if (content) {
        return {
          title: `Chapter ${currentChapter}`,
          content: content
        };
      }
    }
    
    // Fallback to story content if it's a single-chapter story
    if (story?.content && currentChapter === 1) {
      return {
        title: `Chapter 1`,
        content: story.content
      };
    }
    
    // Default mock content if no story content available
    return chapterContent[currentChapter as keyof typeof chapterContent] || chapterContent[1];
  };

  const currentChapterData = getCurrentChapterContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-slate-800 to-slate-900">
      <ReadingHeader
        title={story?.title || "The Midnight Chronicles"}
        author={story?.author || "Elena Rodriguez"}
        showComments={showComments}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
        onBack={() => navigate('/')}
        onToggleComments={() => setShowComments(!showComments)}
        onToggleLike={() => setIsLiked(!isLiked)}
        onToggleBookmark={() => setIsBookmarked(!isBookmarked)}
      />

      {/* Reading Progress Bar */}
      <div className="sticky top-16 z-40 bg-black/20 backdrop-blur border-b border-white/10">
        <div className="container px-4 py-3 space-y-2">
          <div className="flex items-center justify-between">
            <ChapterSelector
              currentChapter={currentChapter}
              totalChapters={story?.chapters || 2}
              onChapterSelect={handleChapterSelect}
            />
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-white/60 min-w-fit">Reading Progress</span>
            <Progress value={readingProgress} className="flex-1 h-2" />
            <span className="text-xs text-white/60 min-w-fit">{Math.round(readingProgress)}%</span>
          </div>
        </div>
      </div>

      <div className="flex relative">
        <div className={`transition-all duration-300 ${showComments ? 'pr-96' : ''} w-full`}>
          <div className="max-w-none" ref={contentRef} style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
            <ChapterContent
              chapter={currentChapterData}
              currentChapter={currentChapter}
              totalChapters={story?.chapters || 2}
              fontSize={fontSize}
            />
            
            <div className="max-w-4xl mx-auto px-8">
              <ChapterNavigation
                currentChapter={currentChapter}
                totalChapters={story?.chapters || 2}
                onPrevChapter={prevChapter}
                onNextChapter={nextChapter}
              />
            </div>
          </div>
        </div>

        {showComments && (
          <CommentsPanel
            comments={comments}
            newComment={newComment}
            replyTo={replyTo}
            replyText={replyText}
            onNewCommentChange={setNewComment}
            onAddComment={handleAddComment}
            onSetReplyTo={setReplyTo}
            onReplyTextChange={setReplyText}
            onSubmitReply={handleReply}
            onLikeComment={handleLikeComment}
          />
        )}
      </div>
      
      {/* Paid Story Unlock Modal */}
      {showPaidUnlock && story && (
        <PaidStoryUnlock
          story={story}
          userCoins={userCoins}
          onUnlock={handleUnlockStory}
          onCancel={() => setShowPaidUnlock(false)}
        />
      )}
    </div>
  );
};

export default Reading;

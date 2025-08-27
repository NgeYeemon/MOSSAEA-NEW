
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import CommentItem from './CommentItem';

interface CommentReply {
  id: number;
  user: string;
  avatar: string;
  comment: string;
  likes: number;
  timestamp: string;
}

interface Comment {
  id: number;
  user: string;
  avatar: string;
  comment: string;
  likes: number;
  timestamp: string;
  replies: CommentReply[];
}

interface CommentsPanelProps {
  comments: Comment[];
  newComment: string;
  replyTo: number | null;
  replyText: string;
  onNewCommentChange: (text: string) => void;
  onAddComment: () => void;
  onSetReplyTo: (commentId: number | null) => void;
  onReplyTextChange: (text: string) => void;
  onSubmitReply: (commentId: number) => void;
}

const CommentsPanel = ({
  comments,
  newComment,
  replyTo,
  replyText,
  onNewCommentChange,
  onAddComment,
  onSetReplyTo,
  onReplyTextChange,
  onSubmitReply
}: CommentsPanelProps) => {
  return (
    <div className="fixed right-0 top-16 bottom-0 w-96 bg-black/40 backdrop-blur border-l border-white/20 overflow-hidden z-40">
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-white/20">
          <h3 className="font-semibold mb-4 text-white">Comments ({comments.length})</h3>
          
          <div className="space-y-3">
            <Textarea
              value={newComment}
              onChange={(e) => onNewCommentChange(e.target.value)}
              placeholder="Share your thoughts about this chapter..."
              className="min-h-[80px] resize-none bg-white/10 border-white/20 text-white placeholder-white/60"
            />
            <Button onClick={onAddComment} className="w-full bg-white/20 text-white hover:bg-white/30">
              <Send className="w-4 h-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                replyTo={replyTo}
                replyText={replyText}
                onSetReplyTo={onSetReplyTo}
                onReplyTextChange={onReplyTextChange}
                onSubmitReply={onSubmitReply}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsPanel;

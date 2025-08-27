
import React from 'react';
import { ThumbsUp, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

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

interface CommentItemProps {
  comment: Comment;
  replyTo: number | null;
  replyText: string;
  onSetReplyTo: (commentId: number | null) => void;
  onReplyTextChange: (text: string) => void;
  onSubmitReply: (commentId: number) => void;
  onLikeComment: (commentId: number, isReply?: boolean, parentCommentId?: number) => void;
}

const CommentItem = ({ 
  comment, 
  replyTo, 
  replyText, 
  onSetReplyTo, 
  onReplyTextChange, 
  onSubmitReply,
  onLikeComment
}: CommentItemProps) => {
  return (
    <Card className="bg-white/10 border-white/20">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <img
              src={comment.avatar}
              alt={comment.user}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-sm text-white">{comment.user}</span>
                <span className="text-xs text-white/60">{comment.timestamp}</span>
              </div>
              <p className="text-sm mb-2 text-white/90">{comment.comment}</p>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 px-2 text-white/60 hover:bg-white/10 hover:text-red-400"
                  onClick={() => onLikeComment(comment.id)}
                >
                  <ThumbsUp className="w-3 h-3 mr-1" />
                  {comment.likes}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 px-2 text-white/60 hover:bg-white/10"
                  onClick={() => onSetReplyTo(replyTo === comment.id ? null : comment.id)}
                >
                  <Reply className="w-3 h-3 mr-1" />
                  Reply
                </Button>
              </div>
            </div>
          </div>

          {replyTo === comment.id && (
            <div className="ml-11 space-y-2">
              <Textarea
                value={replyText}
                onChange={(e) => onReplyTextChange(e.target.value)}
                placeholder={`Reply to ${comment.user}...`}
                className="min-h-[60px] text-sm resize-none bg-white/10 border-white/20 text-white placeholder-white/60"
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => onSubmitReply(comment.id)} className="bg-white/20 text-white hover:bg-white/30">
                  Reply
                </Button>
                <Button size="sm" variant="ghost" onClick={() => onSetReplyTo(null)} className="text-white/60 hover:bg-white/10">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-11 space-y-3">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex items-start space-x-3">
                  <img
                    src={reply.avatar}
                    alt={reply.user}
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-xs text-white">{reply.user}</span>
                      <span className="text-xs text-white/60">{reply.timestamp}</span>
                    </div>
                    <p className="text-xs mb-1 text-white/90">{reply.comment}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 px-1 text-xs text-white/60 hover:bg-white/10 hover:text-red-400"
                      onClick={() => onLikeComment(reply.id, true, comment.id)}
                    >
                      <ThumbsUp className="w-2 h-2 mr-1" />
                      {reply.likes}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentItem;

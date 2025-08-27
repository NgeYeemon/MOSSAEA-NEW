
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Save, Eye, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, useLocation } from 'react-router-dom';
import FontSettings from '@/components/write/FontSettings';
import FormattingControls from '@/components/write/FormattingControls';
import ImageUpload from '@/components/write/ImageUpload';
import PreviewRenderer from '@/components/write/PreviewRenderer';
import BackgroundSettings from '@/components/write/BackgroundSettings';
import { saveWrittenStory, addToLibrary, StoredStory, addChapterToStory, getUserStoryData, saveUserStoryData } from '@/lib/storyStorage';
import { toast } from '@/hooks/use-toast';

const Write = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [backgroundColor, setBackgroundColor] = useState('gradient-sage-navy');
  const [textColor, setTextColor] = useState('white');
  const [showPreview, setShowPreview] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [genre, setGenre] = useState('Fantasy');
  const [description, setDescription] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState(5);
  const [editingStory, setEditingStory] = useState<StoredStory | null>(null);
  const [addingChapterTo, setAddingChapterTo] = useState<StoredStory | null>(null);
  const [chapterNumber, setChapterNumber] = useState(1);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load story data if we're editing an existing story or adding a chapter
  useEffect(() => {
    if (location.state?.editingStory) {
      const story = location.state.editingStory as StoredStory;
      setEditingStory(story);
      setTitle(story.title);
      setContent(story.content || '');
      setDescription(story.description);
      setGenre(story.genre);
      setIsPaid(story.isPaid || false);
      setPrice(story.price || 5);
    } else if (location.state?.addingChapterTo) {
      const story = location.state.addingChapterTo as StoredStory;
      const nextChapter = location.state.chapterNumber || (story.chapters + 1);
      setAddingChapterTo(story);
      setChapterNumber(nextChapter);
      setTitle(`Chapter ${nextChapter}`);
      setContent(''); // No default content
      setDescription('');
      setGenre(story.genre);
      setIsPaid(story.isPaid || false);
      setPrice(story.price || 5);
    } else {
      // Reset for new story
      setTitle('');
      setContent('');
      setDescription('');
    }
  }, [location.state]);

  const getBackgroundClass = (bgColor: string) => {
    switch (bgColor) {
      case 'gradient-sage-navy': return 'bg-gradient-to-br from-emerald-900 via-slate-800 to-slate-900';
      case 'gradient-purple': return 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900';
      case 'gradient-blue': return 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900';
      case 'dark-navy': return 'bg-slate-900';
      case 'sage-green': return 'bg-emerald-900';
      default: return 'bg-gradient-to-br from-emerald-900 via-slate-800 to-slate-900';
    }
  };

  const getTextColorClass = (txtColor: string) => {
    switch (txtColor) {
      case 'white': return 'text-white';
      case 'cream': return 'text-amber-50';
      case 'sage': return 'text-emerald-200';
      case 'sky': return 'text-sky-200';
      case 'warm': return 'text-gray-200';
      default: return 'text-white';
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const insertImageAtCursor = (imageUrl: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const imageTag = `\n[Image: ${imageUrl}]\n`;
      const newContent = content.substring(0, start) + imageTag + content.substring(end);
      setContent(newContent);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + imageTag.length;
        textarea.focus();
      }, 0);
    }
  };

  const applyFormatting = (format: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);
      
      if (selectedText.length === 0) {
        alert('Please select some text to format');
        return;
      }
      
      let formattedText = selectedText;
      
      switch (format) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'underline':
          formattedText = `__${selectedText}__`;
          break;
        case 'list':
          formattedText = selectedText.split('\n').map(line => `• ${line}`).join('\n');
          break;
        case 'numbered':
          formattedText = selectedText.split('\n').map((line, index) => `${index + 1}. ${line}`).join('\n');
          break;
      }
      
      const newContent = content.substring(0, start) + formattedText + content.substring(end);
      setContent(newContent);
      
      setTimeout(() => {
        textarea.selectionStart = start;
        textarea.selectionEnd = start + formattedText.length;
        textarea.focus();
      }, 0);
    }
  };

  const saveStory = () => {
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please add a title to your story",
        variant: "destructive"
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: "Missing content", 
        description: "Please write some content for your story",
        variant: "destructive"
      });
      return;
    }

    if (addingChapterTo) {
      // Add chapter to existing story
      const success = addChapterToStory(addingChapterTo.id, content.trim());
      
      if (success) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
        
        toast({
          title: "Chapter added!",
          description: `Chapter ${chapterNumber} has been added to "${addingChapterTo.title}"`,
        });
        
        setTimeout(() => navigate('/profile'), 1000);
      } else {
        toast({
          title: "Error",
          description: "Failed to add chapter. Please try again.",
          variant: "destructive"
        });
      }
    } else if (editingStory) {
      // Update existing story
      const userData = getUserStoryData();
      const storyIndex = userData.writtenStories.findIndex(s => s.id === editingStory.id);
      
      if (storyIndex !== -1) {
        userData.writtenStories[storyIndex] = {
          ...userData.writtenStories[storyIndex],
          title: title.trim(),
          description: description.trim() || content.slice(0, 150) + '...',
          genre: genre,
          content: content,
          isPaid: isPaid,
          price: isPaid ? price : 0
        };
        
        saveUserStoryData(userData);
        
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
        
        toast({
          title: "Story updated!",
          description: "Your changes have been saved",
        });
      }
    } else {
      // Create new story
      const storyToSave = {
        title: title.trim(),
        author: 'You', // In a real app, this would be the current user
        coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
        description: description.trim() || content.slice(0, 150) + '...',
        genre: genre,
        reads: Math.floor(Math.random() * 1000) + 50,
        likes: Math.floor(Math.random() * 100) + 10,
        comments: Math.floor(Math.random() * 50) + 5,
        rating: Math.random() * 2 + 3, // 3-5 rating
        chapters: 1,
        content: content,
        isPaid: isPaid,
        price: isPaid ? price : 0
      };
      
      const savedStory = saveWrittenStory(storyToSave);
      addToLibrary(savedStory.id);
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
      
      toast({
        title: "Story published!",
        description: "Your story has been saved and published to Discover",
      });
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass(backgroundColor)}`}>
      <header className="sticky top-0 z-50 border-b bg-black/20 backdrop-blur">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10" onClick={() => navigate('/discover')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="font-semibold text-white">
              {addingChapterTo ? `Add Chapter to "${addingChapterTo.title}"` : 
               editingStory ? 'Edit Your Story' : 'Write Your Story'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/10"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-white hover:bg-white/10 transition-all duration-300 ${
                isSaved ? 'bg-cyan-500/30 text-cyan-300 shadow-lg shadow-cyan-500/20 scale-105' : ''
              }`}
              onClick={saveStory}
            >
              <Save className={`w-4 h-4 transition-all duration-300 ${isSaved ? 'scale-110' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1 bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6 space-y-6">
              <BackgroundSettings
                backgroundColor={backgroundColor}
                textColor={textColor}
                onBackgroundColorChange={setBackgroundColor}
                onTextColorChange={setTextColor}
              />

              <FontSettings
                fontSize={fontSize}
                fontFamily={fontFamily}
                onFontSizeChange={setFontSize}
                onFontFamilyChange={setFontFamily}
              />

              <FormattingControls onApplyFormatting={applyFormatting} />

              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Genre</label>
                <select 
                  value={genre} 
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                >
                  <option value="Fantasy" className="text-black">Fantasy</option>
                  <option value="Science Fiction" className="text-black">Science Fiction</option>
                  <option value="Mystery" className="text-black">Mystery</option>
                  <option value="Romance" className="text-black">Romance</option>
                  <option value="Thriller" className="text-black">Thriller</option>
                  <option value="Historical Fiction" className="text-black">Historical Fiction</option>
                  <option value="Horror" className="text-black">Horror</option>
                  <option value="Teen" className="text-black">Teen</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a brief description of your story..."
                  className="bg-white/10 border-white/20 text-white placeholder-white/60 min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white text-sm font-medium">Story Type</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPaid"
                    checked={isPaid}
                    onChange={(e) => setIsPaid(e.target.checked)}
                    className="rounded border-white/20"
                  />
                  <label htmlFor="isPaid" className="text-white text-sm">Paid Story</label>
                </div>
                {isPaid && (
                  <div className="space-y-1">
                    <label className="text-white text-xs">Price (coins)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                      min="1"
                      max="50"
                      className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
                    />
                  </div>
                )}
              </div>

              <ImageUpload
                images={images}
                onImageUpload={handleImageUpload}
                onInsertImage={insertImageAtCursor}
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6">
              {!showPreview ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Story Title..."
                    className={`w-full text-2xl font-bold bg-transparent border-none outline-none ${getTextColorClass(textColor)} placeholder-white/60`}
                    style={{ fontFamily: fontFamily }}
                  />
                  
                  <Textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Start writing your story..."
                    className={`min-h-[600px] bg-transparent border-white/20 ${getTextColorClass(textColor)} placeholder-white/60 resize-none`}
                    style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily }}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <h1 
                    className={`text-2xl font-bold ${getTextColorClass(textColor)}`}
                    style={{ fontFamily: fontFamily }}
                  >
                    {title || 'Story Title'}
                  </h1>
                  <PreviewRenderer
                    content={content}
                    fontSize={fontSize}
                    fontFamily={fontFamily}
                    textColor={textColor}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Write;

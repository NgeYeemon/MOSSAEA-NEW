
import React from 'react';

interface Chapter {
  title: string;
  content: string;
}

interface ChapterContentProps {
  chapter: Chapter;
  currentChapter: number;
  totalChapters: number;
  fontSize: number;
}

const ChapterContent = ({ chapter, currentChapter, totalChapters, fontSize }: ChapterContentProps) => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4 text-white">{chapter.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-white/60 mb-4">
          <span>Chapter {currentChapter} of {totalChapters}</span>
          <span>•</span>
          <span>12 min read</span>
        </div>
      </div>
      
      <div 
        className="prose prose-lg max-w-none leading-relaxed"
        style={{ fontSize: `${fontSize}px` }}
      >
        {chapter.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-6 text-white/90">
            {paragraph.trim()}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;

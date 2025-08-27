
import React from 'react';

interface PreviewRendererProps {
  content: string;
  fontSize: number;
  fontFamily: string;
  textColor?: string;
}

const PreviewRenderer = ({ content, fontSize, fontFamily, textColor = 'white' }: PreviewRendererProps) => {
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

  const renderPreview = () => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('[Image:') && line.endsWith(']')) {
        const imageUrl = line.slice(8, -1);
        return (
          <img key={index} src={imageUrl} alt="Story image" className="max-w-full h-auto my-4 rounded-lg" />
        );
      }
      
      let processedLine = line;
      processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
      processedLine = processedLine.replace(/__(.*?)__/g, '<u>$1</u>');
      
      return (
        <p 
          key={index} 
          className={`mb-4 ${getTextColorClass(textColor)}`}
          style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily }}
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    });
  };

  return (
    <div className="min-h-[600px]">
      {renderPreview()}
    </div>
  );
};

export default PreviewRenderer;

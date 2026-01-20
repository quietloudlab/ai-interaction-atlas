
import React from 'react';

interface HighlightedTextProps {
  text: string;
  term?: string;
  className?: string;
}

export const HighlightedText = ({ text, term, className = '' }: HighlightedTextProps) => {
  if (!text) return null;
  
  if (!term || term.trim() === '') {
    return <span className={className}>{text}</span>;
  }

  // Escape special regex characters in the search term
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escapedTerm})`, 'gi'));

  return (
    <span className={className}>
      {parts.map((part, i) => 
        part.toLowerCase() === term.toLowerCase() ? (
          <span key={i} className="bg-yellow-200 text-black px-0.5 rounded font-medium">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

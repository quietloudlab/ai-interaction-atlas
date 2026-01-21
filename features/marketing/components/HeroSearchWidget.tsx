import React, { useState, useEffect, useMemo } from 'react';
import { Search, ArrowRight, BrainCircuit, UserCircle, Settings, Database, Sliders, Smartphone } from 'lucide-react';
import { atlasService, type UnifiedSearchResult } from '../../../services/atlasService';

interface HeroSearchWidgetProps {
  onResultClick: (result: UnifiedSearchResult) => void;
}

const EXAMPLE_SEARCHES = [
  'image detection',
  'sentiment',
  'file upload',
  'review approve',
  'text generation',
  'latency',
  'mobile',
  'classify',
  'feedback',
  'privacy'
];

export const HeroSearchWidget: React.FC<HeroSearchWidgetProps> = ({ onResultClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isBackspacing, setIsBackspacing] = useState(false);

  // Auto-typing effect
  useEffect(() => {
    if (isUserTyping) return; // Don't auto-type if user is interacting

    const currentExample = EXAMPLE_SEARCHES[currentExampleIndex];

    // If we're backspacing
    if (isBackspacing) {
      if (currentCharIndex <= 0) {
        // Finished backspacing, move to next example
        setIsBackspacing(false);
        setCurrentExampleIndex((prev) => (prev + 1) % EXAMPLE_SEARCHES.length);
        setCurrentCharIndex(0);
        setSearchQuery('');
        return;
      }

      // Backspace one character
      const backspaceTimer = setTimeout(() => {
        setSearchQuery(currentExample.slice(0, currentCharIndex - 1));
        setCurrentCharIndex(prev => prev - 1);
      }, 50); // 50ms between backspaces (faster than typing)

      return () => clearTimeout(backspaceTimer);
    }

    // If we've finished typing the current example
    if (currentCharIndex >= currentExample.length) {
      // Pause for 2 seconds to show results, then start backspacing
      const pauseTimer = setTimeout(() => {
        setIsBackspacing(true);
      }, 2000);

      return () => clearTimeout(pauseTimer);
    }

    // Type next character
    const typingTimer = setTimeout(() => {
      setSearchQuery(currentExample.slice(0, currentCharIndex + 1));
      setCurrentCharIndex(prev => prev + 1);
    }, 100); // 100ms between characters

    return () => clearTimeout(typingTimer);
  }, [currentCharIndex, currentExampleIndex, isUserTyping, isBackspacing]);

  // Get search results
  const searchResults = useMemo(() => {
    if (searchQuery.trim().length < 2) {
      return []; // Show empty state with helper text
    }
    return atlasService.searchAll(searchQuery).slice(0, 8); // Top 8 results
  }, [searchQuery]);

  const getResultIcon = (result: UnifiedSearchResult) => {
    if (result.type === 'task') {
      if (result.taskType === 'ai') return BrainCircuit;
      if (result.taskType === 'human') return UserCircle;
      return Settings;
    }
    if (result.type === 'data') return Database;
    if (result.type === 'constraint') return Sliders;
    if (result.type === 'touchpoint') return Smartphone;
    return Search;
  };

  const getResultColor = (result: UnifiedSearchResult) => {
    if (result.type === 'task') {
      if (result.taskType === 'ai') return '#8B22F1';
      if (result.taskType === 'human') return '#2B5CF3';
      return '#4C5564';
    }
    if (result.type === 'data') return '#D37709';
    if (result.type === 'constraint') return '#D91A45';
    if (result.type === 'touchpoint') return '#3090B5';
    return '#6B7280';
  };

  const getResultBgColor = (result: UnifiedSearchResult) => {
    if (result.type === 'task') {
      if (result.taskType === 'ai') return '#F9F5FE';
      if (result.taskType === 'human') return '#F0F6FE';
      return '#F9FAFB';
    }
    if (result.type === 'data') return '#FEF9F3';
    if (result.type === 'constraint') return '#FEF2F5';
    if (result.type === 'touchpoint') return '#F0F9FB';
    return '#F9FAFB';
  };

  const getResultTypeLabel = (result: UnifiedSearchResult) => {
    if (result.type === 'task') {
      if (result.taskType === 'ai') return 'AI Task';
      if (result.taskType === 'human') return 'Human Task';
      return 'System Task';
    }
    if (result.type === 'data') return 'Data';
    if (result.type === 'constraint') return 'Constraint';
    if (result.type === 'touchpoint') return 'Touchpoint';
    return 'Unknown';
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-full">
      {/* Search Input */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search patterns..."
          value={searchQuery}
          onChange={(e) => {
            setIsUserTyping(true);
            setIsBackspacing(false);
            setSearchQuery(e.target.value);
          }}
          onFocus={() => {
            setIsUserTyping(true);
            setIsBackspacing(false);
            setSearchQuery('');
            setCurrentCharIndex(0);
          }}
          onBlur={() => {
            setTimeout(() => {
              if (searchQuery.trim().length === 0) {
                // Resume auto-typing after a delay if search is empty
                setTimeout(() => {
                  setIsUserTyping(false);
                }, 1000);
              }
            }, 200);
          }}
          className="w-full box-border bg-white border-2 border-black py-3.5 pl-12 pr-4 text-base font-mono focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        />
      </div>

      {/* Results Panel */}
      <div
        className="w-full box-border bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-[400px] overflow-y-scroll"
        style={{
          scrollbarWidth: 'auto',
          msOverflowStyle: 'scrollbar'
        }}
      >
        {searchQuery.trim().length === 0 ? (
          <div className="p-8 text-center">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-sm font-mono text-gray-600 mb-2">Start typing to explore patterns</p>
            <p className="text-xs text-gray-400">
              Search across tasks, data types, constraints, and touchpoints
            </p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="divide-y-2 divide-gray-200">
            {searchResults.map((result) => {
              const Icon = getResultIcon(result);
              const color = getResultColor(result);
              const bgColor = getResultBgColor(result);
              const typeLabel = getResultTypeLabel(result);

              return (
                <button
                  key={result.id}
                  onClick={() => onResultClick(result)}
                  className="w-full text-left p-4 hover:bg-gray-50 transition-colors group flex items-start gap-3"
                >
                  <div
                    className="p-2 border border-gray-300 flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: bgColor }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-sans font-medium text-black group-hover:text-blue-600 transition-colors">
                        {result.name}
                      </h3>
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wide">
                        {typeLabel}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                    </div>
                    {result.description && (
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {result.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500 font-mono">No patterns found</p>
            <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
};

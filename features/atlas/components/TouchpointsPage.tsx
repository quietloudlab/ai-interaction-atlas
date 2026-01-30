
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Smartphone,
  Layout,
  SquareCode,
  Monitor,
  Watch,
  MessageCircle,
  MessageSquare,
  Mail,
  Mic,
  AudioLines,
  Headphones,
  Scan,
  Glasses,
  ScanLine,
  Globe,
  Terminal,
  FileText,
  Tablet
} from 'lucide-react';
import { atlasService } from '../../../services/atlasService';
import { TouchpointCategory } from '../../../types';

const ICON_MAP: Record<string, any> = {
  smartphone: Smartphone,
  layout: Layout,
  'square-code': SquareCode,
  monitor: Monitor,
  watch: Watch,
  'message-circle': MessageCircle,
  'message-square': MessageSquare,
  mail: Mail,
  mic: Mic,
  'audio-lines': AudioLines,
  headphones: Headphones,
  scan: Scan,
  glasses: Glasses,
  'scan-line': ScanLine,
  globe: Globe,
  terminal: Terminal,
  'file-text': FileText,
  tablet: Tablet
};

export const TouchpointsPage = () => {
  const [activeFilter, setActiveFilter] = useState<TouchpointCategory | 'all'>('all');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const location = useLocation();
  const scrolledRef = useRef(false);
  const primary = '#3090B5';
  const secondaryLight = '#EFFEFF';
  const secondaryDark = '#0A2A2E';

  // Scroll to and highlight item from URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && !scrolledRef.current) {
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightedId(hash);
          scrolledRef.current = true;
          // Remove highlight after 3 seconds
          setTimeout(() => setHighlightedId(null), 3000);
        }
      }, 100);
    }
  }, [location.hash]);

  const categories: {id: TouchpointCategory | 'all', label: string}[] = [
      { id: 'all', label: 'All' },
      { id: 'screen_interface', label: 'Screen UI' },
      { id: 'conversational', label: 'Conversational' },
      { id: 'voice_audio', label: 'Voice & Audio' },
      { id: 'spatial_computing', label: 'Spatial / AR / VR' },
      { id: 'technical', label: 'Technical / API' },
      { id: 'physical_devices', label: 'Physical' },
  ];

  const filteredTouchpoints = atlasService.getTouchpoints(activeFilter);

  return (
    <div className="pb-20">
      <header className="pt-8 pb-12 mb-16 border-b border-[var(--border)]">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-6 flex items-center gap-2">
          <span>Atlas</span>
          <span>/</span>
          <span>Touchpoints</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-medium tracking-tighter text-[var(--text-main)] mb-8">Touchpoints</h1>
        <p className="text-xl md:text-2xl font-sans font-light text-[var(--text-muted)] leading-snug max-w-3xl mb-12">
          The surfaces and channels where humans interact with the AI system.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all border ${
                        activeFilter === cat.id
                        ? 'bg-[var(--text-main)] text-[var(--bg)] border-[var(--text-main)]'
                        : 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--text-main)] hover:text-[var(--text-main)]'
                    }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTouchpoints.map(touchpoint => {
          const Icon = ICON_MAP[touchpoint.icon] || Smartphone;
          const isDark = document.documentElement.classList.contains('dark');
          const secondary = isDark ? secondaryDark : secondaryLight;

          return (
            <div
              key={touchpoint.id}
              id={touchpoint.id}
              className={`bg-[var(--surface)] border p-6 transition-all hover:bg-[var(--bg)] group flex flex-col h-full ${
                highlightedId === touchpoint.id
                  ? 'border-[#3090B5] ring-2 ring-[#3090B5] ring-offset-2 ring-offset-[var(--bg)]'
                  : 'border-[var(--border)]'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-3 border group-hover:scale-105 transition-transform"
                  style={{
                    backgroundColor: secondary,
                    borderColor: primary + '40'
                  }}
                >
                   <Icon className="w-6 h-6" style={{ color: primary }} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#999] dark:text-[#888] bg-[var(--bg)] px-2 py-1 border border-[var(--border)]">
                   {touchpoint.category.replace('_', ' ')}
                </span>
              </div>

              <div className="mb-6 flex-1">
                 <h3 className="text-lg font-sans font-medium text-[var(--text-main)] mb-2">{touchpoint.name}</h3>
                 <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-3">{touchpoint.description}</p>
              </div>

              {/* Examples */}
              {touchpoint.examples && touchpoint.examples.length > 0 && (
                 <div className="mt-auto pt-4 border-t border-[var(--border)]">
                    <div className="text-[10px] font-mono uppercase text-[var(--text-muted)] mb-2">Examples</div>
                    <div className="flex flex-wrap gap-1.5">
                       {touchpoint.examples.map((ex, i) => (
                          <span key={i} className="text-xs font-mono bg-[var(--bg)] text-[var(--text-muted)] px-2 py-1 border border-[var(--border)]">
                             {ex}
                          </span>
                       ))}
                    </div>
                 </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

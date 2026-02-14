
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu, ExternalLink } from 'lucide-react';
import { AtlasFooter } from '../../../components/AtlasFooter';
import { trackEvent, EVENTS } from '../../../lib/fathom';

interface AtlasLayoutProps {
  children?: React.ReactNode;
  activeTaskId: string | null;
  onSelectTask: (id: string) => void;
  activeView: string;
  onSelectView: (view: any) => void;
  activeAtlasPage?: 'dashboard' | 'data' | 'constraints' | 'touchpoints' | 'reference' | 'ai' | 'human' | 'system';
  onNavigateAtlas?: (page: 'dashboard' | 'data' | 'constraints' | 'touchpoints' | 'reference' | 'ai' | 'human' | 'system') => void;
  onSelectLayer?: (id: string) => void;
  activeLayerId?: string | null;
}

export const AtlasLayout = ({
  children,
  activeTaskId,
  onSelectTask,
  activeView,
  onSelectView,
  activeAtlasPage,
  onNavigateAtlas,
  onSelectLayer,
  activeLayerId
}: AtlasLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef<Map<string, number>>(new Map());

  // Manage scroll position based on navigation type
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Save current scroll position before navigation
    const currentPath = location.pathname;

    if (navigationType === 'POP') {
      // Browser back/forward - restore saved scroll position
      const savedPosition = scrollPositions.current.get(currentPath);
      if (savedPosition !== undefined) {
        // Use setTimeout to ensure content is rendered first
        setTimeout(() => {
          scrollContainer.scrollTo({ top: savedPosition, behavior: 'instant' });
        }, 0);
      } else {
        scrollContainer.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      // Normal navigation (PUSH/REPLACE) - scroll to top
      scrollContainer.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Save scroll position on scroll
    const handleScroll = () => {
      scrollPositions.current.set(currentPath, scrollContainer.scrollTop);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, navigationType]);

  return (
    <div className="flex h-screen bg-[var(--surface)] overflow-hidden">
      {/* Skip Navigation Link for Keyboard Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--text-main)] focus:text-[var(--bg)] focus:font-mono focus:text-sm"
      >
        Skip to main content
      </a>

      {/* Desktop Sidebar (Fixed) */}
      <div className="hidden lg:block w-[280px] h-full flex-shrink-0 border-r border-[var(--text-main)] z-20">
        <Sidebar
          activeTaskId={activeTaskId}
          onSelectTask={onSelectTask}
          activeView={activeView}
          onSelectView={onSelectView}
          activeAtlasPage={activeAtlasPage}
          onNavigateAtlas={onNavigateAtlas}
          onSelectLayer={onSelectLayer}
          activeLayerId={activeLayerId}
          variant="static"
        />
      </div>

      {/* Mobile Sidebar (Overlay) */}
      <Sidebar
        activeTaskId={activeTaskId}
        onSelectTask={(id) => {
            onSelectTask(id);
            setMobileMenuOpen(false);
        }}
        activeView={activeView}
        onSelectView={(view) => {
            onSelectView(view);
            setMobileMenuOpen(false);
        }}
        activeAtlasPage={activeAtlasPage}
        onNavigateAtlas={onNavigateAtlas}
        onSelectLayer={onSelectLayer}
        activeLayerId={activeLayerId}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        variant="overlay"
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <a
          href="https://studio.ai-interaction.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent(EVENTS.STUDIO_PREVIEW_ATLAS_CLICKED)}
          className="absolute top-16 lg:top-4 right-4 z-10 inline-flex items-center justify-center gap-1.5 py-2 px-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md transition-colors shadow-sm"
        >
          Map your AI
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>

        {/* Mobile Header Trigger */}
        <div className="lg:hidden h-14 bg-[var(--surface)] border-b border-[var(--text-main)] flex items-center justify-between px-4 flex-shrink-0 z-10">
           <div className="flex items-center gap-2 font-sans font-medium text-[var(--text-main)]">
              <div className="w-6 h-6 bg-[var(--text-main)] text-[var(--bg)] flex items-center justify-center text-xs font-mono">A</div>
              Atlas
           </div>
           <button onClick={() => setMobileMenuOpen(true)} className="cursor-pointer p-2 text-[var(--text-main)]">
              <Menu className="w-5 h-5" />
           </button>
        </div>

        {/* Scrollable Content */}
        <main id="main-content" ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 lg:p-0">
           <div className="max-w-6xl mx-auto min-h-full flex flex-col">
              <div className="flex-1">
                {children}
              </div>
              <AtlasFooter />
           </div>
        </main>
      </div>
    </div>
  );
};
    

import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';
import { AtlasFooter } from '../../../components/AtlasFooter';

interface AtlasLayoutProps {
  children?: React.ReactNode;
  activeTaskId: string | null;
  onSelectTask: (id: string) => void;
  activeView: string;
  onSelectView: (view: any) => void;
  activeAtlasPage?: 'dashboard' | 'data' | 'constraints' | 'touchpoints' | 'reference' | 'ai' | 'human' | 'system';
  onNavigateAtlas?: (page: 'dashboard' | 'data' | 'constraints' | 'touchpoints' | 'reference' | 'ai' | 'human' | 'system') => void;
}

export const AtlasLayout = ({
  children,
  activeTaskId,
  onSelectTask,
  activeView,
  onSelectView,
  activeAtlasPage,
  onNavigateAtlas
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
    <div className="flex h-screen bg-[#F9F9F7] overflow-hidden">
      {/* Desktop Sidebar (Fixed) */}
      <div className="hidden lg:block w-[280px] h-full flex-shrink-0 shadow-[1px_0_0_0_#E6E6E6] z-20">
        <Sidebar 
          activeTaskId={activeTaskId}
          onSelectTask={onSelectTask}
          activeView={activeView}
          onSelectView={onSelectView}
          activeAtlasPage={activeAtlasPage}
          onNavigateAtlas={onNavigateAtlas}
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
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        variant="overlay"
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Desktop Top Right Button - Removed for now */}

        {/* Mobile Header Trigger */}
        <div className="lg:hidden h-14 bg-white border-b border-[#E6E6E6] flex items-center justify-between px-4 flex-shrink-0 z-10">
           <div className="flex items-center gap-2 font-bold text-[#111111]">
              <div className="w-6 h-6 bg-black text-white rounded flex items-center justify-center text-xs">A</div>
              Atlas
           </div>
           <button onClick={() => setMobileMenuOpen(true)} className="cursor-pointer p-2 text-gray-600">
              <Menu className="w-5 h-5" />
           </button>
        </div>

        {/* Scrollable Content */}
        <main ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 lg:p-0">
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
    

import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Globe, Linkedin, ChevronDown } from 'lucide-react';
import { atlasService } from '../../../services/atlasService';
import { DarkModeToggle } from '../../../components/DarkModeToggle';
import { trackEvent, EVENTS } from '../../../lib/fathom';

const SiteHeader = ({ onNavigate, mobileMenuOpen, setMobileMenuOpen }: any) => {
  const meta = atlasService.getMeta();
  const [dimensionsOpen, setDimensionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDimensionsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDimensionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <button
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('landing')}
          aria-label="Go to homepage"
        >
          <div className="w-8 h-8 bg-[var(--text-main)] text-[var(--bg)] rounded-lg flex items-center justify-center font-bold text-lg">A</div>
          <span className="font-bold text-lg tracking-tight text-[var(--text-main)]">{meta.title}</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 text-sm h-full">
          <button onClick={() => { trackEvent(EVENTS.EXPLORE_ATLAS_CLICKED); onNavigate('atlas'); }} className="cursor-pointer font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors px-3 py-4">Explore the Atlas</button>
          <button onClick={() => { trackEvent(EVENTS.QUICK_REFERENCE_CLICKED); onNavigate('atlas/reference'); }} className="cursor-pointer font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors px-3 py-4">Quick Reference</button>
          {/* Dimensions Dropdown */}
          <div className="relative h-full flex items-center" ref={dropdownRef}>
            <button
              onClick={() => setDimensionsOpen(!dimensionsOpen)}
              className={`cursor-pointer font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors flex items-center gap-1 px-3 h-full border-x ${dimensionsOpen ? 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-main)]' : 'border-transparent'}`}
              aria-expanded={dimensionsOpen}
              aria-haspopup="menu"
              aria-controls="dimensions-menu"
            >
              Dimensions
              <ChevronDown className={`w-4 h-4 transition-transform ${dimensionsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            {dimensionsOpen && (
              <div
                id="dimensions-menu"
                role="menu"
                aria-label="Dimensions navigation"
                className="absolute top-full left-0 w-52 bg-[var(--surface)] border border-[var(--border)] py-3"
              >
                <div className="pl-6 pr-4 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]" role="presentation">Patterns</div>
                <button role="menuitem" onClick={() => { trackEvent(EVENTS.DIMENSION_VIEW_AI); onNavigate('atlas/ai'); setDimensionsOpen(false); }} className="cursor-pointer w-full text-left pl-6 pr-4 py-2 text-sm text-[var(--text-main)] hover:bg-[var(--bg)] transition-colors">AI Patterns</button>
                <button role="menuitem" onClick={() => { trackEvent(EVENTS.DIMENSION_VIEW_HUMAN); onNavigate('atlas/human'); setDimensionsOpen(false); }} className="cursor-pointer w-full text-left pl-6 pr-4 py-2 text-sm text-[var(--text-main)] hover:bg-[var(--bg)] transition-colors">Human Actions</button>
                <button role="menuitem" onClick={() => { trackEvent(EVENTS.DIMENSION_VIEW_SYSTEM); onNavigate('atlas/system'); setDimensionsOpen(false); }} className="cursor-pointer w-full text-left pl-6 pr-4 py-2 text-sm text-[var(--text-main)] hover:bg-[var(--bg)] transition-colors">System Ops</button>
                <div className="h-px bg-[var(--border)] my-2" role="separator"></div>
                <div className="pl-6 pr-4 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]" role="presentation">Artifacts</div>
                <button role="menuitem" onClick={() => { trackEvent(EVENTS.DIMENSION_VIEW_DATA); onNavigate('atlas/data'); setDimensionsOpen(false); }} className="cursor-pointer w-full text-left pl-6 pr-4 py-2 text-sm text-[var(--text-main)] hover:bg-[var(--bg)] transition-colors">Data Types</button>
                <button role="menuitem" onClick={() => { trackEvent(EVENTS.DIMENSION_VIEW_CONSTRAINTS); onNavigate('atlas/constraints'); setDimensionsOpen(false); }} className="cursor-pointer w-full text-left pl-6 pr-4 py-2 text-sm text-[var(--text-main)] hover:bg-[var(--bg)] transition-colors">Constraints</button>
                <button role="menuitem" onClick={() => { trackEvent(EVENTS.DIMENSION_VIEW_TOUCHPOINTS); onNavigate('atlas/touchpoints'); setDimensionsOpen(false); }} className="cursor-pointer w-full text-left pl-6 pr-4 py-2 text-sm text-[var(--text-main)] hover:bg-[var(--bg)] transition-colors">Touchpoints</button>
              </div>
            )}
          </div>
          <button
            onClick={() => { trackEvent(EVENTS.STUDIO_PREVIEW_CLICKED); onNavigate('studio'); }}
            className="cursor-pointer font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1.5 px-3 py-4"
          >
            Map your AI
            <span className="text-[9px] font-mono uppercase tracking-wide bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5">New</span>
          </button>
          <span className="text-[var(--border)]">|</span>
          <DarkModeToggle />
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <DarkModeToggle />
          <button
            className="cursor-pointer p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="text-[var(--text-main)]" aria-hidden="true" /> : <Menu className="text-[var(--text-main)]" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="md:hidden absolute top-16 left-0 w-full bg-[var(--bg)] border-b border-[var(--border)] p-4 flex flex-col gap-2 shadow-lg animate-in slide-in-from-top-2"
        >
          <button onClick={() => { trackEvent(EVENTS.EXPLORE_ATLAS_CLICKED); onNavigate('atlas'); setMobileMenuOpen(false); }} className="cursor-pointer text-left py-2 font-medium text-[var(--text-main)]">Explore the Atlas</button>
          <button onClick={() => { trackEvent(EVENTS.QUICK_REFERENCE_CLICKED); onNavigate('atlas/reference'); setMobileMenuOpen(false); }} className="cursor-pointer text-left py-2 font-medium text-[var(--text-main)]">Quick Reference</button>
          <button onClick={() => { trackEvent(EVENTS.STUDIO_PREVIEW_CLICKED); onNavigate('studio'); setMobileMenuOpen(false); }} className="cursor-pointer text-left py-2 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-2">
            Map your AI
            <span className="text-[9px] font-mono uppercase tracking-wide bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5">New</span>
          </button>
          <div className="h-px bg-[var(--border)] my-2" role="separator"></div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] py-1">Patterns</div>
          <button onClick={() => { trackEvent(EVENTS.DIMENSION_VIEW_AI); onNavigate('atlas/ai'); setMobileMenuOpen(false); }} className="cursor-pointer text-left py-2 text-sm text-[var(--text-muted)]">AI Patterns</button>
          <button onClick={() => { trackEvent(EVENTS.DIMENSION_VIEW_HUMAN); onNavigate('atlas/human'); setMobileMenuOpen(false); }} className="cursor-pointer text-left py-2 text-sm text-[var(--text-muted)]">Human Actions</button>
          <button onClick={() => { trackEvent(EVENTS.DIMENSION_VIEW_SYSTEM); onNavigate('atlas/system'); setMobileMenuOpen(false); }} className="cursor-pointer text-left py-2 text-sm text-[var(--text-muted)]">System Ops</button>
          <div className="h-px bg-[var(--border)] my-2" role="separator"></div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] py-1">Artifacts</div>
          <button onClick={() => { trackEvent(EVENTS.DIMENSION_VIEW_DATA); onNavigate('atlas/data'); setMobileMenuOpen(false); }} className="cursor-pointer text-left py-2 text-sm text-[var(--text-muted)]">Data Types</button>
          <button onClick={() => { trackEvent(EVENTS.DIMENSION_VIEW_CONSTRAINTS); onNavigate('atlas/constraints'); setMobileMenuOpen(false); }} className="cursor-pointer text-left py-2 text-sm text-[var(--text-muted)]">Constraints</button>
          <button onClick={() => { trackEvent(EVENTS.DIMENSION_VIEW_TOUCHPOINTS); onNavigate('atlas/touchpoints'); setMobileMenuOpen(false); }} className="cursor-pointer text-left py-2 text-sm text-[var(--text-muted)]">Touchpoints</button>
        </nav>
      )}
    </header>
  );
};

const SiteFooter = ({ onNavigate }: any) => (
  <footer className="bg-[var(--surface)] border-t border-[var(--border)] pt-16 pb-8">
    <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-[var(--text-main)] text-[var(--bg)] rounded flex items-center justify-center font-bold text-xs">A</div>
            <span className="font-bold text-[var(--text-main)]">AI Interaction Atlas</span>
          </div>
          <p className="text-[var(--text-muted)] leading-relaxed max-w-sm">
            A free tool by quietloudlab, a design and research studio specializing in human-centered AI.
          </p>
        <div className="flex gap-3 mt-4">
          <a href="https://quietloudlab.com" target="_blank" rel="noopener noreferrer" aria-label="quietloudlab Website" className="inline-block hover:opacity-70 transition">
            <Globe className="h-5 w-5 text-[var(--text-main)]" />
          </a>
          <a href="https://www.linkedin.com/company/quietloudlab" target="_blank" rel="noopener noreferrer" aria-label="quietloudlab on LinkedIn" className="inline-block hover:opacity-70 transition">
            <Linkedin className="h-5 w-5 text-[var(--text-main)]" />
          </a>
        </div>
        </div>
        <div>
          <h4 className="font-bold text-[var(--text-main)] mb-4">Atlas</h4>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li><button onClick={() => onNavigate('atlas')} className="cursor-pointer hover:text-[var(--text-main)]">Explore the Atlas</button></li>
            <li><button onClick={() => onNavigate('atlas/reference')} className="cursor-pointer hover:text-[var(--text-main)]">Quick Reference</button></li>
            <li><button onClick={() => onNavigate('atlas/ai')} className="cursor-pointer hover:text-[var(--text-main)]">AI Patterns</button></li>
            <li><button onClick={() => onNavigate('atlas/human')} className="cursor-pointer hover:text-[var(--text-main)]">Human Actions</button></li>
            <li><button onClick={() => onNavigate('atlas/system')} className="cursor-pointer hover:text-[var(--text-main)]">System Ops</button></li>
            <li><button onClick={() => onNavigate('atlas/data')} className="cursor-pointer hover:text-[var(--text-main)]">Data Types</button></li>
            <li><button onClick={() => onNavigate('atlas/constraints')} className="cursor-pointer hover:text-[var(--text-main)]">Constraints</button></li>
            <li><button onClick={() => onNavigate('atlas/touchpoints')} className="cursor-pointer hover:text-[var(--text-main)]">Touchpoints</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[var(--text-main)] mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li><a href="https://github.com/quietloudlab/ai-interaction-atlas" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-[var(--text-main)]">GitHub</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[var(--text-main)] mb-4">About</h4>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li><a href="https://quietloudlab.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-[var(--text-main)]">quietloudlab</a></li>
            <li><a href="https://www.linkedin.com/in/brandon-harwood/" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-[var(--text-main)]">LinkedIn</a></li>
            <li><a href="mailto:brandon@quietloudlab.com" className="cursor-pointer hover:text-[var(--text-main)]">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[var(--text-muted)]">
        <div>© 2025 quietloudlab. All rights reserved.</div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="/privacy" className="cursor-pointer hover:text-[var(--text-main)]">Privacy</a>
          <a href="/terms" className="cursor-pointer hover:text-[var(--text-main)]">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export const MarketingLayout = ({ children, onNavigate }: { children?: React.ReactNode, onNavigate: (page: string) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)]">
      {/* Skip Navigation Link for Keyboard Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--text-main)] focus:text-[var(--bg)] focus:font-mono focus:text-sm"
      >
        Skip to main content
      </a>

      <SiteHeader onNavigate={onNavigate} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
};

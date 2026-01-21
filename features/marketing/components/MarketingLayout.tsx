
import React from 'react';
import { Menu, X } from 'lucide-react';
import { atlasService } from '../../../services/atlasService';

const SiteHeader = ({ onNavigate, mobileMenuOpen, setMobileMenuOpen }: any) => {
  const meta = atlasService.getMeta();
  
  return (
    <header className="sticky top-0 z-50 bg-[#F9F9F7]/80 backdrop-blur-md border-b border-[#E6E6E6]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('landing')}
        >
          <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">A</div>
          <span className="font-bold text-lg tracking-tight text-[#111111]">{meta.title}</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => onNavigate('atlas')} className="cursor-pointer text-sm font-medium text-[#6E6E6E] hover:text-black transition-colors">Browse Atlas</button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="cursor-pointer md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#F9F9F7] border-b border-[#E6E6E6] p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2">
          <button onClick={() => { onNavigate('atlas'); setMobileMenuOpen(false); }} className="cursor-pointer text-left py-2 font-medium">Browse Atlas</button>
        </div>
      )}
    </header>
  );
};

const SiteFooter = ({ onNavigate }: any) => (
  <footer className="bg-white border-t border-[#E6E6E6] pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-black text-white rounded flex items-center justify-center font-bold text-xs">A</div>
            <span className="font-bold text-[#111111]">AI Interaction Atlas</span>
          </div>
          <p className="text-[#6E6E6E] leading-relaxed max-w-sm">
            A free tool by quietloudlab, a design and research studio specializing in human-centered AI.
          </p>
        <div className="flex gap-3 mt-4">
          <a href="https://quietloudlab.com" target="_blank" rel="noopener noreferrer" aria-label="Brandon's Website" className="inline-block hover:opacity-70 transition">
            <svg width="22" height="22" fill="none" viewBox="0 0 22 22" className="h-6 w-6 text-[#222]" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.5" y="1.5" width="19" height="19" rx="4.5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="2"/>
              <circle cx="16.2" cy="5.8" r="1.2" fill="currentColor"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/quietloudlab" target="_blank" rel="noopener noreferrer" aria-label="Brandon on LinkedIn" className="inline-block hover:opacity-70 transition">
            <svg width="22" height="22" fill="none" viewBox="0 0 22 22" className="h-6 w-6 text-[#222]" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
              <rect x="5.7" y="9.2" width="2.1" height="7.1" rx="1" fill="currentColor"/>
              <circle cx="6.8" cy="6.8" r="1.1" fill="currentColor"/>
              <rect x="10" y="9.2" width="2" height="7.1" rx="1" fill="currentColor"/>
              <path d="M12 12.4c0-1.1.9-2.2 2.4-2.2 1.2 0 2 1.1 2 2.7v3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </a>
        </div>
        </div>
        <div>
          <h4 className="font-bold text-[#111111] mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-[#6E6E6E]">
            <li><button onClick={() => onNavigate('atlas')} className="cursor-pointer hover:text-black">Browse Atlas</button></li>
            <li><a href="https://github.com/quietloudlab/ai-interaction-atlas" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-black">GitHub</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[#111111] mb-4">About</h4>
          <ul className="space-y-2 text-sm text-[#6E6E6E]">
            <li><a href="https://quietloudlab.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-black">quietloudlab</a></li>
            <li><a href="https://www.linkedin.com/in/brandon-harwood/" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-black">LinkedIn</a></li>
            <li><a href="mailto:brandon@quietloudlab.com" className="cursor-pointer hover:text-black">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#E6E6E6] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#999]">
        <div>© 2025 quietloudlab. All rights reserved.</div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="cursor-pointer hover:text-black">Privacy</a>
          <a href="#" className="cursor-pointer hover:text-black">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export const MarketingLayout = ({ children, onNavigate }: { children?: React.ReactNode, onNavigate: (page: string) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F7]">
      <SiteHeader onNavigate={onNavigate} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
};


import React, { useState } from 'react';
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
  const primary = '#3090B5';
  const secondary = '#EFFEFF';

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
      <header className="pt-8 pb-12 mb-16 border-b border-[#E6E6E6]">
        <div className="text-xs font-mono uppercase tracking-widest text-[#6E6E6E] mb-6 flex items-center gap-2">
          <span>Atlas</span>
          <span>/</span>
          <span>Touchpoints</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-medium tracking-tighter text-[#111111] mb-8">Touchpoints</h1>
        <p className="text-xl md:text-2xl font-sans font-light text-[#6E6E6E] leading-snug max-w-3xl mb-12">
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
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-white text-[#6E6E6E] border-[#E6E6E6] hover:border-[#111111] hover:text-[#111111]'
                    }`}
                >
                    {cat.label}
                </button>
            ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 group/list">
        {filteredTouchpoints.map(touchpoint => {
          const Icon = ICON_MAP[touchpoint.icon] || Smartphone;

          return (
            <div key={touchpoint.id} className="bg-white border border-[#E6E6E6] p-6 transition-all hover:bg-[#FAFAFA] group flex flex-col h-full opacity-100 group-hover/list:opacity-50 hover:!opacity-100">
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
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#999] bg-[#F9F9F7] px-2 py-1 border border-[#E6E6E6]">
                   {touchpoint.category.replace('_', ' ')}
                </span>
              </div>

              <div className="mb-6 flex-1">
                 <h3 className="text-lg font-sans font-medium text-[#111111] mb-2">{touchpoint.name}</h3>
                 <p className="text-[#6E6E6E] text-sm leading-relaxed mb-3">{touchpoint.description}</p>
              </div>

              {/* Examples */}
              {touchpoint.examples && touchpoint.examples.length > 0 && (
                 <div className="mt-auto pt-4 border-t border-[#E6E6E6]">
                    <div className="text-[10px] font-mono uppercase text-gray-400 mb-2">Examples</div>
                    <div className="flex flex-wrap gap-1.5">
                       {touchpoint.examples.map((ex, i) => (
                          <span key={i} className="text-xs font-mono bg-[#F9F9F7] text-gray-600 px-2 py-1 border border-[#E6E6E6]">
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


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
    <div className="animate-in fade-in duration-500 pb-20">
      <header className="mb-12 lg:mb-16 pt-4 lg:pt-10">
        <div className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-4 lg:mb-6 flex items-center gap-2">
          <span>Atlas</span>
          <span className="text-[#E6E6E6]">/</span>
          <span>Touchpoints</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter text-[#111111] mb-6 lg:mb-8">Interface Touchpoints</h1>
        <p className="text-xl md:text-2xl font-light text-[#111111] leading-relaxed max-w-3xl mb-8">
          The surfaces and channels where humans interaction with the AI system occurs.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all border ${
                        activeFilter === cat.id 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
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
          
          let colorClass = "bg-gray-100 text-gray-600 border-gray-200";
          const cat = touchpoint.category as TouchpointCategory;

          if (cat === 'screen_interface') colorClass = "bg-blue-50 text-blue-600 border-blue-200";
          if (cat === 'conversational') colorClass = "bg-purple-50 text-purple-600 border-purple-200";
          if (cat === 'voice_audio') colorClass = "bg-pink-50 text-pink-600 border-pink-200";
          if (cat === 'spatial_computing') colorClass = "bg-indigo-50 text-indigo-600 border-indigo-200";
          if (cat === 'technical') colorClass = "bg-slate-50 text-slate-600 border-slate-200";

          return (
            <div key={touchpoint.id} className="bg-white border border-[#E6E6E6] rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all group flex flex-col h-full animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg border ${colorClass} group-hover:scale-105 transition-transform`}>
                   <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#999] bg-[#F9F9F7] px-2 py-1 rounded">
                   {touchpoint.category.replace('_', ' ')}
                </span>
              </div>
              
              <div className="mb-6 flex-1">
                 <h3 className="text-lg font-bold text-[#111111] mb-2">{touchpoint.name}</h3>
                 <p className="text-[#6E6E6E] text-sm leading-relaxed mb-3">{touchpoint.description}</p>
              </div>

              {/* Examples */}
              {touchpoint.examples && touchpoint.examples.length > 0 && (
                 <div className="mt-auto pt-4 border-t border-[#F0F0EE]">
                    <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Examples</div>
                    <div className="flex flex-wrap gap-1.5">
                       {touchpoint.examples.map((ex, i) => (
                          <span key={i} className="text-xs bg-[#F9F9F7] text-gray-600 px-2 py-1 rounded border border-[#E6E6E6]">
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

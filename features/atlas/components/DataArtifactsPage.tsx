
import React, { useState } from 'react';
import { 
  Database, 
  Type, 
  Image, 
  Video, 
  Mic, 
  Code, 
  FileText, 
  MapPin, 
  Cpu, 
  BarChart, 
  Tag, 
  Terminal, 
  User, 
  Activity, 
  Fingerprint, 
  CreditCard, 
  MessageSquare, 
  Box, 
  Scan, 
  Music, 
  Table, 
  Network, 
  Layers, 
  Minimize, 
  Hash, 
  Zap, 
  Upload,
  FormInput, 
  MousePointer,
  PenTool,
  Server,
  Settings,
  Award,
  Gavel,
  Eye,
  Calendar,
  Quote,
  ThumbsUp,
  Compass,
  ShieldCheck,
  ShieldAlert,
  Shield,
  Scale,
  Maximize,
  Clock,
  Gauge,
  Thermometer,
  ListFilter,
  UserCheck,
  ArrowUp,
  DollarSign,
  FileCheck,
  CalendarClock,
  MinusCircle,
  PlusCircle,
  Globe,
  MessageCircle,
  Move,
  History,
  Film,
  TrendingUp,
  List,
  CheckSquare,
  Asterisk,
  File as FileIcon
} from 'lucide-react';
import { atlasService } from '../../../services/atlasService';
import { DataCategory } from '../../../types';

const ICON_MAP: Record<string, any> = {
  type: Type,
  image: Image,
  video: Video,
  mic: Mic,
  code: Code,
  'file-text': FileText,
  'map-pin': MapPin,
  cpu: Cpu,
  'bar-chart': BarChart,
  tag: Tag,
  terminal: Terminal,
  user: User,
  activity: Activity,
  fingerprint: Fingerprint,
  'credit-card': CreditCard,
  'message-square': MessageSquare,
  box: Box,
  scan: Scan,
  music: Music,
  table: Table,
  network: Network,
  layers: Layers,
  minimize: Minimize,
  hash: Hash,
  zap: Zap,
  upload: Upload,
  'form-input': FormInput,
  'mouse-pointer': MousePointer,
  'pen-tool': PenTool,
  server: Server,
  settings: Settings,
  award: Award,
  gavel: Gavel,
  eye: Eye,
  calendar: Calendar,
  quote: Quote,
  'thumbs-up': ThumbsUp,
  compass: Compass,
  'shield-check': ShieldCheck,
  'shield-alert': ShieldAlert,
  shield: Shield,
  scale: Scale,
  maximize: Maximize,
  clock: Clock,
  gauge: Gauge,
  thermometer: Thermometer,
  'list-filter': ListFilter,
  'user-check': UserCheck,
  'arrow-up': ArrowUp,
  'dollar-sign': DollarSign,
  'file-check': FileCheck,
  'calendar-clock': CalendarClock,
  'minus-circle': MinusCircle,
  'plus-circle': PlusCircle,
  globe: Globe,
  'message-circle': MessageCircle,
  move: Move,
  history: History,
  film: Film,
  'trending-up': TrendingUp,
  list: List,
  'check-square': CheckSquare,
  asterisk: Asterisk,
  file: FileIcon
};

export const DataArtifactsPage = () => {
  const [activeFilter, setActiveFilter] = useState<DataCategory | 'all'>('all');

  const categories: {id: DataCategory | 'all', label: string}[] = [
      { id: 'all', label: 'All' },
      { id: 'text', label: 'Text' },
      { id: 'visual', label: 'Visual' },
      { id: 'audio', label: 'Audio' },
      { id: 'structured', label: 'Structured' },
      { id: 'system', label: 'System' },
      { id: 'generic', label: 'Generic' },
  ];

  const filteredArtifacts = atlasService.getDataArtifacts(activeFilter);

  const primary = '#D37709';
  const secondary = '#FFFBEC';

  return (
    <div className="pb-20">
      <header className="pt-8 pb-12 mb-16 border-b border-[#E6E6E6]">
        <div className="text-xs font-mono uppercase tracking-widest text-[#6E6E6E] mb-6 flex items-center gap-2">
          <span>Atlas</span>
          <span>/</span>
          <span>Data Artifacts</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-medium tracking-tighter text-[#111111] mb-8">Data Modalities</h1>
        <p className="text-xl md:text-2xl font-sans font-light text-[#6E6E6E] leading-snug max-w-3xl mb-12">
          A standardized library of data types to validate connections and ensure system compatibility.
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
        {filteredArtifacts.map(artifact => {
          const Icon = ICON_MAP[artifact.icon] || Database;
          const cat = artifact.category as DataCategory;

          return (
            <div key={artifact.id} className="bg-white border border-[#E6E6E6] p-6 transition-all hover:bg-[#FAFAFA] group flex flex-col h-full opacity-100 group-hover/list:opacity-50 hover:!opacity-100">
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
                   {artifact.category.replace('_', ' ')}
                </span>
              </div>

              <div className="mb-6 flex-1">
                 <h3 className="text-lg font-sans font-medium text-[#111111] mb-2">{artifact.name}</h3>
                 <p className="text-[#6E6E6E] text-sm leading-relaxed mb-3">{artifact.description}</p>
                 {artifact.format_notes && (
                    <div className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 border border-[#E6E6E6] inline-block">
                       {artifact.format_notes}
                    </div>
                 )}
              </div>

              {/* Examples */}
              {artifact.examples && artifact.examples.length > 0 && (
                 <div className="mb-4">
                    <div className="text-[10px] font-mono uppercase text-gray-400 mb-2">Examples</div>
                    <div className="flex flex-wrap gap-1.5">
                       {artifact.examples.map((ex, i) => (
                          <span key={i} className="text-xs font-mono bg-[#F9F9F7] text-gray-600 px-2 py-1 border border-[#E6E6E6]">
                             {ex}
                          </span>
                       ))}
                    </div>
                 </div>
              )}

              {/* Compatible */}
              {artifact.compatible_with && artifact.compatible_with.length > 0 && (
                 <div className="mt-auto pt-4 border-t border-[#E6E6E6]">
                    <div className="text-[10px] font-mono uppercase text-gray-400 mb-2">Compatible Tasks</div>
                    <div className="text-xs text-gray-600 leading-relaxed">
                       {artifact.compatible_with.join(", ")}
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

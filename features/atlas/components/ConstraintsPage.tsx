
import React, { useState } from 'react';
import { 
  Sliders,
  ShieldCheck,
  ShieldAlert,
  Shield,
  Scale,
  Maximize,
  Clock,
  Layers,
  Database,
  Gauge,
  Thermometer,
  ListFilter,
  Cpu,
  Hash,
  UserCheck,
  ArrowUp,
  DollarSign,
  FileCheck,
  CalendarClock,
  MinusCircle,
  PlusCircle,
  Globe,
  MessageCircle,
  Zap,
  Award,
  Gavel,
  Eye,
  User,
  Calendar,
  Quote,
  ThumbsUp,
  Compass,
  BarChart
} from 'lucide-react';
import { atlasService } from '../../../services/atlasService';
import { ConstraintCategory } from '../../../types';

const ICON_MAP: Record<string, any> = {
  'shield-check': ShieldCheck,
  'shield-alert': ShieldAlert,
  shield: Shield,
  scale: Scale,
  maximize: Maximize,
  clock: Clock,
  layers: Layers,
  database: Database,
  gauge: Gauge,
  thermometer: Thermometer,
  'list-filter': ListFilter,
  cpu: Cpu,
  hash: Hash,
  'user-check': UserCheck,
  'arrow-up': ArrowUp,
  'dollar-sign': DollarSign,
  'file-check': FileCheck,
  'calendar-clock': CalendarClock,
  'minus-circle': MinusCircle,
  'plus-circle': PlusCircle,
  globe: Globe,
  'message-circle': MessageCircle,
  zap: Zap,
  award: Award,
  gavel: Gavel,
  eye: Eye,
  user: User,
  calendar: Calendar,
  quote: Quote,
  'thumbs-up': ThumbsUp,
  compass: Compass,
  'bar-chart': BarChart
};

export const ConstraintsPage = () => {
  const [activeFilter, setActiveFilter] = useState<ConstraintCategory | 'all'>('all');

  const categories: {id: ConstraintCategory | 'all', label: string}[] = [
      { id: 'all', label: 'All' },
      { id: 'quality_safety', label: 'Quality & Safety' },
      { id: 'performance_resource', label: 'Performance' },
      { id: 'model_technical', label: 'Model Tech' },
      { id: 'ux_interaction', label: 'UX & Interaction' },
      { id: 'data_context', label: 'Data & Context' },
      { id: 'execution_behavior', label: 'Execution' },
      { id: 'code_philosophy', label: 'Code Philosophy' },
      { id: 'attribution', label: 'Attribution' },
  ];

  const filteredConstraints = atlasService.getConstraints(activeFilter);

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <header className="mb-12 lg:mb-16 pt-4 lg:pt-10">
        <div className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-4 lg:mb-6 flex items-center gap-2">
          <span>Atlas</span>
          <span className="text-[#E6E6E6]">/</span>
          <span>Constraints</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter text-[#111111] mb-6 lg:mb-8">Constraint Library</h1>
        <p className="text-xl md:text-2xl font-light text-[#111111] leading-relaxed max-w-3xl mb-8">
          Guardrails and non-functional requirements that shape system behavior, safety, and business logic.
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredConstraints.map(constraint => {
          const Icon = ICON_MAP[constraint.icon] || Sliders;
          const cat = constraint.category as ConstraintCategory;
          
          let accentColor = "border-gray-200";
          let iconBg = "bg-gray-50 text-gray-600";

          if (cat === 'quality_safety') { accentColor = "border-red-200 hover:border-red-400"; iconBg = "bg-red-50 text-red-600"; }
          if (cat === 'performance_resource') { accentColor = "border-orange-200 hover:border-orange-400"; iconBg = "bg-orange-50 text-orange-600"; }
          if (cat === 'model_technical') { accentColor = "border-blue-200 hover:border-blue-400"; iconBg = "bg-blue-50 text-blue-600"; }
          if (cat === 'ux_interaction') { accentColor = "border-purple-200 hover:border-purple-400"; iconBg = "bg-purple-50 text-purple-600"; }
          if (cat === 'data_context') { accentColor = "border-cyan-200 hover:border-cyan-400"; iconBg = "bg-cyan-50 text-cyan-600"; }
          if (cat === 'execution_behavior') { accentColor = "border-green-200 hover:border-green-400"; iconBg = "bg-green-50 text-green-600"; }
          if (cat === 'code_philosophy') { accentColor = "border-indigo-200 hover:border-indigo-400"; iconBg = "bg-indigo-50 text-indigo-600"; }
          if (cat === 'attribution') { accentColor = "border-teal-200 hover:border-teal-400"; iconBg = "bg-teal-50 text-teal-600"; }

          return (
            <div key={constraint.id} className={`bg-white border-l-4 ${accentColor} shadow-sm rounded-r-xl p-6 hover:shadow-md transition-all flex flex-col h-full animate-in fade-in zoom-in-95 duration-300`}>
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-2 rounded-lg ${iconBg}`}>
                   <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                   <div className="flex items-center justify-between">
                     <h3 className="text-lg font-bold text-[#111111] mb-1">{constraint.name}</h3>
                     <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{constraint.type}</span>
                   </div>
                   <div className="text-xs font-medium uppercase tracking-wider text-[#999] mb-2">{constraint.category.replace('_', ' ')}</div>
                   <p className="text-[#6E6E6E] text-sm leading-relaxed">{constraint.description}</p>
                </div>
              </div>

              <div className="mt-auto space-y-3 pt-4 border-t border-[#F9F9F7]">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Applies To</div>
                       <div className="text-xs text-gray-600 font-medium">
                          {constraint.applies_to ? constraint.applies_to.join(", ") : "All"}
                       </div>
                    </div>
                    <div>
                       <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">Example Values</div>
                       <div className="text-xs text-gray-600 font-mono bg-gray-50 inline-block px-1 rounded">
                          {constraint.example_values}
                       </div>
                    </div>
                 </div>
                 
                 {constraint.ux_note && (
                    <div className="bg-[#F9F9F7] p-2 rounded text-xs text-[#6E6E6E] flex gap-2">
                       <span className="font-bold">UX:</span> {constraint.ux_note}
                    </div>
                 )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

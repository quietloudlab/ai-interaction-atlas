
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
  const primary = '#D91A45';
  const secondaryLight = '#FDF2F2';
  const secondaryDark = '#2A1414';

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
    <div className="pb-20">
      <header className="pt-8 pb-12 mb-16 border-b border-[var(--border)]">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-6 flex items-center gap-2">
          <span>Atlas</span>
          <span>/</span>
          <span>Constraints</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-medium tracking-tighter text-[var(--text-main)] mb-8">Constraint Library</h1>
        <p className="text-xl md:text-2xl font-sans font-light text-[var(--text-muted)] leading-snug max-w-3xl mb-12">
          Guardrails and non-functional requirements that shape system behavior, safety, and business logic.
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 group/list">
        {filteredConstraints.map(constraint => {
          const Icon = ICON_MAP[constraint.icon] || Sliders;
          const isDark = document.documentElement.classList.contains('dark');
          const secondary = isDark ? secondaryDark : secondaryLight;

          return (
            <div key={constraint.id} className="relative bg-[var(--surface)] border border-[var(--border)] p-6 transition-all hover:bg-[var(--bg)] flex flex-col h-full opacity-100 group-hover/list:opacity-50 hover:!opacity-100 group">
              {/* Accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 group-hover:w-2 transition-all" style={{ backgroundColor: primary }}></div>

              <div className="flex items-start gap-4 mb-4">
                <div
                  className="p-2 border group-hover:scale-105 transition-transform"
                  style={{
                    backgroundColor: secondary,
                    borderColor: primary + '40'
                  }}
                >
                   <Icon className="w-5 h-5" style={{ color: primary }} />
                </div>
                <div className="flex-1">
                   <div className="flex items-center justify-between">
                     <h3 className="text-lg font-sans font-medium text-[var(--text-main)] mb-1">{constraint.name}</h3>
                     <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] tracking-wider">{constraint.type}</span>
                   </div>
                   <div className="text-xs font-mono uppercase tracking-wider text-[#999] dark:text-[#888] mb-2">{constraint.category.replace('_', ' ')}</div>
                   <p className="text-[var(--text-muted)] text-sm leading-relaxed">{constraint.description}</p>
                </div>
              </div>

              <div className="mt-auto space-y-3 pt-4 border-t border-[var(--border)]">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <div className="text-[10px] font-mono uppercase text-[var(--text-muted)] mb-1">Applies To</div>
                       <div className="text-xs text-[var(--text-muted)]">
                          {constraint.applies_to ? constraint.applies_to.join(", ") : "All"}
                       </div>
                    </div>
                    <div>
                       <div className="text-[10px] font-mono uppercase text-[var(--text-muted)] mb-1">Example Values</div>
                       <div className="text-xs text-[var(--text-muted)] font-mono bg-[var(--bg)] inline-block px-1 border border-[var(--border)]">
                          {constraint.example_values}
                       </div>
                    </div>
                 </div>

                 {constraint.ux_note && (
                    <div className="bg-[var(--bg)] p-2 border border-[var(--border)] text-xs text-[var(--text-muted)] flex gap-2">
                       <span className="font-mono font-bold">UX:</span> {constraint.ux_note}
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

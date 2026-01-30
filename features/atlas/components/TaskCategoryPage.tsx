
import React, { useState } from 'react';
import { BrainCircuit, UserCircle, Settings } from 'lucide-react';
import { atlasService } from '../../../services/atlasService';

interface TaskCategoryPageProps {
  type: 'ai' | 'human' | 'system';
  onTaskClick: (id: string) => void;
}

export const TaskCategoryPage = ({ type, onTaskClick }: TaskCategoryPageProps) => {
  const [activeLayer, setActiveLayer] = useState<string | 'all'>('all');

  const config = {
    ai: {
      title: 'AI Patterns',
      description: 'Cognitive capabilities and machine learning tasks performed by the system.',
      icon: BrainCircuit,
      primary: '#8B22F1',
      secondaryLight: '#F9F5FE',
      secondaryDark: '#2A1A3E'
    },
    human: {
      title: 'Human Actions',
      description: 'Inputs, decisions, and interventions performed by users.',
      icon: UserCircle,
      primary: '#2B5CF3',
      secondaryLight: '#F0F6FE',
      secondaryDark: '#1A2A3E'
    },
    system: {
      title: 'System Ops',
      description: 'Traditional software operations, integrations, and logic.',
      icon: Settings,
      primary: '#4C5564',
      secondaryLight: '#F9FAFB',
      secondaryDark: '#1F2226'
    }
  }[type];

  const tasks = atlasService.getTasks(type);
  const layers = atlasService.getLayers();

  const filteredTasks = tasks.filter(t => activeLayer === 'all' || t.layer_id === activeLayer);

  return (
    <div className="pb-20">
      <header className="pt-8 pb-12 mb-16 border-b border-[var(--border)]">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] mb-6 flex items-center gap-2">
          <span>Atlas</span>
          <span>/</span>
          <span>{config.title}</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-medium tracking-tighter text-[var(--text-main)] mb-8">{config.title}</h1>
        <p className="text-xl md:text-2xl font-sans font-light text-[var(--text-muted)] leading-snug max-w-3xl mb-12">
          {config.description}
        </p>

        {/* Layer Filters */}
        <div className="flex flex-wrap gap-2">
           <button
              onClick={() => setActiveLayer('all')}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all border ${
                  activeLayer === 'all'
                  ? 'bg-[var(--text-main)] text-[var(--bg)] border-[var(--text-main)]'
                  : 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--text-main)] hover:text-[var(--text-main)]'
              }`}
           >
              All Layers
           </button>
           {layers.map(layer => (
              <button
                 key={layer.id}
                 onClick={() => setActiveLayer(layer.id)}
                 className={`px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all border ${
                     activeLayer === layer.id
                     ? 'bg-[var(--text-main)] text-[var(--bg)] border-[var(--text-main)]'
                     : 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--text-main)] hover:text-[var(--text-main)]'
                 }`}
              >
                 {layer.name}
              </button>
           ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map(task => {
           const layer = atlasService.getLayerById(task.layer_id);
           const isDark = document.documentElement.classList.contains('dark');
           const secondary = isDark ? config.secondaryDark : config.secondaryLight;

           return (
             <button
               key={task.id}
               onClick={() => onTaskClick(task.id)}
               className="text-left group bg-[var(--surface)] border border-[var(--border)] p-6 transition-all hover:bg-[var(--bg)] flex flex-col h-full"
             >
                <div className="flex items-center justify-between mb-4">
                   <div
                     className="p-3 border group-hover:scale-105 transition-transform"
                     style={{
                       backgroundColor: secondary,
                       borderColor: config.primary + '40'
                     }}
                   >
                      <config.icon className="w-6 h-6" style={{ color: config.primary }} />
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layer?.color }}></div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#999] dark:text-[#888]">{layer?.name}</span>
                   </div>
                </div>

                <div className="mb-6 flex-1">
                   <h3 className="text-lg font-sans font-medium text-[var(--text-main)] mb-2 group-hover:underline transition-all">{task.name}</h3>
                   <p className="text-[var(--text-muted)] text-sm leading-relaxed">{task.elevator_pitch}</p>
                </div>

                {/* Footer Tags */}
                <div className="pt-4 border-t border-[var(--border)] w-full">
                   {task.task_type === 'ai' && (
                      <div className="flex flex-wrap gap-1.5">
                         {task.capabilities.slice(0, 3).map((cap, i) => (
                            <span key={i} className="text-[10px] font-mono bg-[var(--bg)] text-[var(--text-muted)] px-2 py-1 border border-[var(--border)]">
                               {cap.name}
                            </span>
                         ))}
                         {task.capabilities.length > 3 && (
                            <span className="text-[10px] font-mono text-[var(--text-muted)] py-1">+ {task.capabilities.length - 3}</span>
                         )}
                      </div>
                   )}
                   {(task.task_type === 'human' || task.task_type === 'system') && (
                      <div className="flex flex-wrap gap-1.5">
                         {task.common_variants.slice(0, 3).map((v, i) => (
                            <span key={i} className="text-[10px] font-mono bg-[var(--bg)] text-[var(--text-muted)] px-2 py-1 border border-[var(--border)]">
                               {v.replace(/_/g, ' ')}
                            </span>
                         ))}
                         {task.common_variants.length > 3 && (
                            <span className="text-[10px] font-mono text-[var(--text-muted)] py-1">+ {task.common_variants.length - 3}</span>
                         )}
                      </div>
                   )}
                </div>
             </button>
           );
        })}
      </div>
    </div>
  );
};

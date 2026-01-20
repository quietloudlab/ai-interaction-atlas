
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
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    human: {
      title: 'Human Actions',
      description: 'Inputs, decisions, and interventions performed by users.',
      icon: UserCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    system: {
      title: 'System Ops',
      description: 'Traditional software operations, integrations, and logic.',
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  }[type];

  const tasks = atlasService.getTasks(type);
  const layers = atlasService.getLayers();

  const filteredTasks = tasks.filter(t => activeLayer === 'all' || t.layer_id === activeLayer);

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <header className="mb-12 lg:mb-16 pt-4 lg:pt-10">
        <div className="text-xs uppercase tracking-wider text-[#6E6E6E] mb-4 lg:mb-6 flex items-center gap-2">
          <span>Atlas</span>
          <span className="text-[#E6E6E6]">/</span>
          <span>{config.title}</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter text-[#111111] mb-6 lg:mb-8">{config.title}</h1>
        <p className="text-xl md:text-2xl font-light text-[#111111] leading-relaxed max-w-3xl mb-12">
          {config.description}
        </p>

        {/* Layer Filters */}
        <div className="flex flex-wrap gap-2">
           <button
              onClick={() => setActiveLayer('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all border ${
                  activeLayer === 'all' 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
              }`}
           >
              All Layers
           </button>
           {layers.map(layer => (
              <button
                 key={layer.id}
                 onClick={() => setActiveLayer(layer.id)}
                 className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all border ${
                     activeLayer === layer.id 
                     ? 'bg-black text-white border-black' 
                     : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
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
           
           return (
             <button 
               key={task.id}
               onClick={() => onTaskClick(task.id)}
               className="text-left group bg-white border border-[#E6E6E6] rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col h-full"
             >
                <div className="flex items-center justify-between mb-4">
                   <div className={`p-3 rounded-lg border ${config.bgColor} ${config.color} ${config.borderColor} group-hover:scale-105 transition-transform`}>
                      <config.icon className="w-6 h-6" />
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layer?.color }}></div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#999]">{layer?.name}</span>
                   </div>
                </div>
                
                <div className="mb-6 flex-1">
                   <h3 className="text-lg font-bold text-[#111111] mb-2 group-hover:text-blue-600 transition-colors">{task.name}</h3>
                   <p className="text-[#6E6E6E] text-sm leading-relaxed">{task.elevator_pitch}</p>
                </div>

                {/* Footer Tags */}
                <div className="pt-4 border-t border-[#F9F9F7] w-full">
                   {task.task_type === 'ai' && (
                      <div className="flex flex-wrap gap-1.5">
                         {task.capabilities.slice(0, 3).map((cap, i) => (
                            <span key={i} className="text-[10px] bg-[#F9F9F7] text-gray-600 px-2 py-1 rounded border border-[#E6E6E6]">
                               {cap.name}
                            </span>
                         ))}
                         {task.capabilities.length > 3 && (
                            <span className="text-[10px] text-gray-400 py-1">+ {task.capabilities.length - 3}</span>
                         )}
                      </div>
                   )}
                   {(task.task_type === 'human' || task.task_type === 'system') && (
                      <div className="flex flex-wrap gap-1.5">
                         {task.common_variants.slice(0, 3).map((v, i) => (
                            <span key={i} className="text-[10px] bg-[#F9F9F7] text-gray-600 px-2 py-1 rounded border border-[#E6E6E6]">
                               {v.replace(/_/g, ' ')}
                            </span>
                         ))}
                         {task.common_variants.length > 3 && (
                            <span className="text-[10px] text-gray-400 py-1">+ {task.common_variants.length - 3}</span>
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

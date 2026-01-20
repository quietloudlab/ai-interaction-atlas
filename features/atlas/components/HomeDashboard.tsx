
import React from 'react';
import {
  BrainCircuit,
  Settings,
  UserCircle,
  Database,
  Sliders,
  ArrowRight,
  Layers,
  Activity,
  MessageSquare,
  Zap,
  Smartphone
} from 'lucide-react';
import { atlasService } from '../../../services/atlasService';

interface HomeDashboardProps {
   onNavigate: (type: 'task' | 'layer' | 'data' | 'constraints' | 'touchpoints' | 'ai' | 'human' | 'system', id?: string) => void;
}

export const HomeDashboard = ({ onNavigate }: HomeDashboardProps) => {
  const meta = atlasService.getMeta();
  const tasks = atlasService.getTasks();
  const dataArtifacts = atlasService.getDataArtifacts();
  const constraints = atlasService.getConstraints();
  const touchpoints = atlasService.getTouchpoints();
  const layers = atlasService.getLayers();

  const stats = [
    { id: 'ai', label: 'AI Patterns', count: tasks.filter(t => t.task_type === 'ai').length, icon: BrainCircuit, color: 'text-purple-600', bg: 'bg-purple-50', border: 'hover:border-purple-200' },
    { id: 'human', label: 'Human Actions', count: tasks.filter(t => t.task_type === 'human').length, icon: UserCircle, color: 'text-blue-600', bg: 'bg-blue-50', border: 'hover:border-blue-200' },
    { id: 'system', label: 'System Ops', count: tasks.filter(t => t.task_type === 'system').length, icon: Settings, color: 'text-gray-600', bg: 'bg-gray-50', border: 'hover:border-gray-200' },
    { id: 'data', label: 'Data Types', count: dataArtifacts.length, icon: Database, color: 'text-amber-600', bg: 'bg-amber-50', border: 'hover:border-amber-200' },
    { id: 'constraints', label: 'Constraints', count: constraints.length, icon: Sliders, color: 'text-rose-600', bg: 'bg-rose-50', border: 'hover:border-rose-200' },
    { id: 'touchpoints', label: 'Touchpoints', count: touchpoints.length, icon: Smartphone, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'hover:border-cyan-200' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-16 pb-20">
      
      {/* Hero Section */}
      <header className="relative">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-[#111111] mb-6 leading-[0.9]">
            AI Interaction <br/> <span className="text-[#6E6E6E]">Atlas</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-[#6E6E6E] leading-relaxed max-w-2xl">
            {meta.description}
          </p>

          {/* CTA */}
          <div className="mt-8">
            <button
              onClick={() => onNavigate('ai')}
              className="cursor-pointer px-6 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
            >
              Explore the Atlas
            </button>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <button 
            key={stat.id}
            onClick={() => onNavigate(stat.id as any)}
            className={`group flex flex-col p-5 bg-white border border-[#E6E6E6] rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${stat.border}`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-3xl font-light text-[#111111] mb-1">{stat.count}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#6E6E6E]">{stat.label}</div>
          </button>
        ))}
      </div>

      {/* Architecture Flow */}
      <section>
        <div className="max-w-4xl">
           <h2 className="text-2xl font-light text-[#111111] pb-4">The 4-Layer Architecture</h2>
          <p className="font-light text-[#6E6E6E] leading-relaxed max-w-xl pb-8">A mental model for AI experiences as a composed system. <br/> Layers describe what kind of work the system is doing, and are not strictly ordered. Many systems loop through and across layers. </p>
        </div>

        <div className="relative space-y-8">
          {/* Connector Line */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-gray-200 via-gray-200 to-transparent hidden md:block"></div>

          {layers.map((layer, index) => {
            const layerTasks = tasks.filter(t => t.layer_id === layer.id);
            const isLast = index === layers.length - 1;
            
            // Layer specific icons
            const LayerIcon = 
               layer.id === 'layer_inbound' ? Layers :
               layer.id === 'layer_internal' ? BrainCircuit :
               layer.id === 'layer_outbound' ? MessageSquare :
               Activity;

            return (
              <div 
                key={layer.id}
                className="relative md:pl-24 group"
              >
                {/* Node on line */}
                <div 
                  className="absolute left-[23px] top-8 w-5 h-5 rounded-full border-4 border-white shadow-sm z-10 hidden md:block transition-transform duration-500 group-hover:scale-125"
                  style={{ backgroundColor: layer.color }}
                ></div>

                <div 
                   onClick={() => onNavigate('layer', layer.id)}
                   className="bg-white border border-[#E6E6E6] rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 cursor-pointer group/card relative overflow-hidden"
                >
                   {/* Color Accent Bar */}
                   <div className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 group-hover/card:w-2" style={{ backgroundColor: layer.color }}></div>

                   <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
                      <div className="flex-1">
                         <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg bg-gray-50 text-gray-900`}>
                               <LayerIcon className="w-5 h-5" />
                            </div>
                            <div>
                               <h3 className="text-xl font-bold text-[#111111]">{layer.name}</h3>
                               <div className="text-[10px] font-bold uppercase tracking-widest text-[#6E6E6E]">{layer.role}</div>
                            </div>
                         </div>
                         <p className="text-[#6E6E6E] leading-relaxed mb-6 font-light">{layer.description}</p>
                         
                         <div className="flex items-center gap-4 text-xs font-medium">
                            <span className="bg-[#F9F9F7] px-3 py-1.5 rounded-full border border-[#E6E6E6] text-[#111111]">
                               {layerTasks.length} Patterns
                            </span>
                            <span className="text-blue-600 group-hover/card:translate-x-1 transition-transform flex items-center gap-1">
                               Explore Layer <ArrowRight className="w-3 h-3" />
                            </span>
                         </div>
                      </div>

                      {/* Mini Grid of Tasks */}
                      <div className="flex-1 bg-[#F9F9F7]/50 rounded-xl p-4 border border-[#F0F0EE]">
                         <div className="text-[10px] font-bold uppercase tracking-wider text-[#999] mb-3">Common Capabilities</div>
                         <div className="flex flex-wrap gap-2">
                            {layerTasks.slice(0, 6).map(task => (
                               <button
                                  key={task.id}
                                  onClick={(e) => {
                                     e.stopPropagation();
                                     onNavigate('task', task.id);
                                  }}
                                  className="px-2.5 py-1.5 bg-white border border-[#E6E6E6] rounded text-[11px] font-medium text-gray-600 hover:text-black hover:border-gray-400 transition-colors shadow-sm"
                               >
                                  {task.name}
                               </button>
                            ))}
                            {layerTasks.length > 6 && (
                               <span className="px-2 py-1.5 text-[10px] text-gray-400 font-medium">+{layerTasks.length - 6} more</span>
                            )}
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

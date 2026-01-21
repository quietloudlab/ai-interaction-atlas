
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
    { id: 'ai', label: 'AI Patterns', count: tasks.filter(t => t.task_type === 'ai').length, icon: BrainCircuit, primary: '#8B22F1', secondary: '#F9F5FE' },
    { id: 'human', label: 'Human Actions', count: tasks.filter(t => t.task_type === 'human').length, icon: UserCircle, primary: '#2B5CF3', secondary: '#F0F6FE' },
    { id: 'system', label: 'System Ops', count: tasks.filter(t => t.task_type === 'system').length, icon: Settings, primary: '#4C5564', secondary: '#F9FAFB' },
    { id: 'data', label: 'Data Types', count: dataArtifacts.length, icon: Database, primary: '#D37709', secondary: '#FFFBEC' },
    { id: 'constraints', label: 'Constraints', count: constraints.length, icon: Sliders, primary: '#D91A45', secondary: '#FDF2F2' },
    { id: 'touchpoints', label: 'Touchpoints', count: touchpoints.length, icon: Smartphone, primary: '#3090B5', secondary: '#EFFEFF' },
  ];

  return (
    <div className="space-y-20 pb-20">

      {/* Hero Section */}
      <header className="pt-8 border-b border-[#E6E6E6] pb-12">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-tighter text-[#111111] mb-8 leading-[0.95] font-medium">
            AI Interaction<br/>Atlas
          </h1>
          <p className="text-xl md:text-2xl font-sans font-light text-[#6E6E6E] leading-snug max-w-2xl">
            {meta.description}
          </p>
        </div>
      </header>

      {/* Stats Grid - Group hover */}
      <section>
        <div className="mb-8">
          <span className="font-mono text-sm text-gray-500">(01)</span>
          <h2 className="text-2xl md:text-3xl font-sans tracking-tight font-medium mt-2 text-[#111111]">Browse by Dimension</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-l border-[#E6E6E6] group/list">
          {stats.map((stat) => (
            <button
              key={stat.id}
              onClick={() => onNavigate(stat.id as any)}
              className="group text-left border-r border-t border-b border-[#E6E6E6] p-6 min-h-[160px] flex flex-col justify-between transition-all opacity-100 group-hover/list:opacity-40 hover:!opacity-100"
              style={{
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = stat.secondary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <stat.icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" style={{ color: stat.primary }} />
              <div>
                <div className="text-3xl font-sans font-light mb-2 text-[#111111]">{stat.count}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-[#6E6E6E]">{stat.label}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Architecture Flow */}
      <section>
        <div className="mb-8">
          <span className="font-mono text-sm text-gray-500">(02)</span>
          <h2 className="text-2xl md:text-3xl font-sans tracking-tight font-medium mt-2 mb-4 text-[#111111]">The 4-Layer Architecture</h2>
          <p className="text-base text-[#6E6E6E] leading-relaxed max-w-2xl">
            A mental model for AI experiences as a composed system. Layers describe what kind of work
            the system is doing, and are not strictly ordered. Many systems loop through and across layers.
          </p>
        </div>

        <div className="border-t border-[#E6E6E6] pt-12 space-y-0 group/layers">
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
              <button
                key={layer.id}
                onClick={() => onNavigate('layer', layer.id)}
                className="relative w-full text-left border-b border-[#E6E6E6] p-8 transition-all duration-300 hover:bg-[#F9F9F7] group opacity-100 group-hover/layers:opacity-50 hover:!opacity-100"
              >
                {/* Accent Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 transition-all group-hover:w-2" style={{ backgroundColor: layer.color }}></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Identity */}
                  <div className="lg:col-span-4">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 border border-[#E6E6E6] group-hover:border-gray-300 transition-colors">
                        <LayerIcon className="w-6 h-6" style={{ color: layer.color }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-sans font-medium mb-1 text-[#111111]">{layer.name}</h3>
                        <div className="text-xs font-mono uppercase tracking-widest text-[#6E6E6E]">{layer.role}</div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-[#6E6E6E]">
                      {layer.description}
                    </p>
                  </div>

                  {/* Right: Capabilities Preview */}
                  <div className="lg:col-span-8 border-l border-[#E6E6E6] pl-8">
                    <div className="text-xs font-mono uppercase tracking-widest text-[#999] mb-4">
                      {layerTasks.length} Patterns
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {layerTasks.slice(0, 8).map(task => (
                        <span
                          key={task.id}
                          className="px-3 py-1.5 border border-[#E6E6E6] text-xs font-mono text-[#6E6E6E] bg-white"
                        >
                          {task.name}
                        </span>
                      ))}
                      {layerTasks.length > 8 && (
                        <span className="px-3 py-1.5 text-xs font-mono text-[#999]">
                          +{layerTasks.length - 8} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

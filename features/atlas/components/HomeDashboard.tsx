
import React from 'react';
import {
  BrainCircuit,
  Settings,
  UserCircle,
  Database,
  Sliders,
  Layers,
  Activity,
  MessageSquare,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { atlasService } from '../../../services/atlasService';
import { trackEvent, EVENTS } from '../../../lib/fathom';

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
    { id: 'ai', label: 'AI Patterns', count: tasks.filter(t => t.task_type === 'ai').length, icon: BrainCircuit, primary: '#8B22F1', secondaryLight: '#F9F5FE', secondaryDark: '#2A1A3E' },
    { id: 'human', label: 'Human Actions', count: tasks.filter(t => t.task_type === 'human').length, icon: UserCircle, primary: '#2B5CF3', secondaryLight: '#F0F6FE', secondaryDark: '#1A2A3E' },
    { id: 'system', label: 'System Ops', count: tasks.filter(t => t.task_type === 'system').length, icon: Settings, primary: '#4C5564', secondaryLight: '#F9FAFB', secondaryDark: '#1F2226' },
    { id: 'data', label: 'Data Types', count: dataArtifacts.length, icon: Database, primary: '#D37709', secondaryLight: '#FFFBEC', secondaryDark: '#2A2000' },
    { id: 'constraints', label: 'Constraints', count: constraints.length, icon: Sliders, primary: '#D91A45', secondaryLight: '#FDF2F2', secondaryDark: '#2A1414' },
    { id: 'touchpoints', label: 'Touchpoints', count: touchpoints.length, icon: Smartphone, primary: '#3090B5', secondaryLight: '#EFFEFF', secondaryDark: '#0A2A2E' },
  ];

  return (
    <div className="space-y-20 pb-20">

      {/* Hero Section */}
      <header className="pt-8 border-b border-[var(--border)] pb-12 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-tighter text-[var(--text-main)] mb-8 leading-[0.95] font-medium">
            AI Interaction<br/>Atlas
          </h1>
          <p className="text-xl md:text-2xl font-sans font-light text-[var(--text-muted)] leading-snug max-w-2xl">
            {meta.description}
          </p>
        </div>
        <a
          href="https://studio.ai-interaction.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent(EVENTS.STUDIO_PREVIEW_ATLAS_CLICKED)}
          className="inline-flex items-center justify-center gap-1.5 py-2 px-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md transition-colors shadow-sm flex-shrink-0"
        >
          Map your AI
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </header>

      {/* Stats Grid - Group hover */}
      <section>
        <div className="mb-8">
          <span className="font-mono text-sm text-[var(--text-muted)]">(01)</span>
          <h2 className="text-2xl md:text-3xl font-sans tracking-tight font-medium mt-2 text-[var(--text-main)]">Browse by Dimension</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-l border-[var(--border)] group/list">
          {stats.map((stat) => {
            const isDarkMode = document.documentElement.classList.contains('dark');
            return (
              <button
                key={stat.id}
                onClick={() => onNavigate(stat.id as any)}
                className="group text-left border-r border-t border-b border-[var(--border)] p-6 min-h-[160px] flex flex-col justify-between transition-all opacity-100 group-hover/list:opacity-40 hover:!opacity-100"
                style={{
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  const isDark = document.documentElement.classList.contains('dark');
                  e.currentTarget.style.backgroundColor = isDark ? stat.secondaryDark : stat.secondaryLight;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <stat.icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" style={{ color: stat.primary }} />
                <div>
                  <div className="text-3xl font-sans font-light mb-2 text-[var(--text-main)]">{stat.count}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">{stat.label}</div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Architecture Flow */}
      <section>
        <div className="mb-8">
          <span className="font-mono text-sm text-[var(--text-muted)]">(02)</span>
          <h2 className="text-2xl md:text-3xl font-sans tracking-tight font-medium mt-2 mb-4 text-[var(--text-main)]">The 4-Layer Architecture</h2>
          <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-2xl">
            A mental model for AI experiences as a composed system. Layers describe what kind of work
            the system is doing, and are not strictly ordered. Many systems loop through and across layers.
          </p>
        </div>

        <div className="border-t border-[var(--border)] pt-12 space-y-0 group/layers">
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
                className="relative w-full text-left border-b border-[var(--border)] p-8 transition-all duration-300 hover:bg-[var(--bg)] group opacity-100 group-hover/layers:opacity-50 hover:!opacity-100"
              >
                {/* Accent Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 transition-all group-hover:w-2" style={{ backgroundColor: layer.color }}></div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Identity */}
                  <div className="lg:col-span-4">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 border border-[var(--border)] group-hover:border-[var(--text-muted)] transition-colors">
                        <LayerIcon className="w-6 h-6" style={{ color: layer.color }} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-sans font-medium mb-1 text-[var(--text-main)]">{layer.name}</h3>
                        <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">{layer.role}</div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                      {layer.description}
                    </p>
                  </div>

                  {/* Right: Capabilities Preview */}
                  <div className="lg:col-span-8 border-l border-[var(--border)] pl-8">
                    <div className="text-xs font-mono uppercase tracking-widest text-[#999] dark:text-[#888] mb-4">
                      {layerTasks.length} Patterns
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {layerTasks.slice(0, 8).map(task => (
                        <span
                          key={task.id}
                          className="px-3 py-1.5 border border-[var(--border)] text-xs font-mono text-[var(--text-muted)] bg-[var(--surface)]"
                        >
                          {task.name}
                        </span>
                      ))}
                      {layerTasks.length > 8 && (
                        <span className="px-3 py-1.5 text-xs font-mono text-[#999] dark:text-[#888]">
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

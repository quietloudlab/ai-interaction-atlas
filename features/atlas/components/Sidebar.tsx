
import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  BookOpen,
  Search,
  BrainCircuit,
  UserCircle,
  Settings,
  LayoutDashboard,
  Database,
  Sliders,
  Smartphone,
  FileText,
  ChevronDown,
  ChevronRight,
  Layers,
  MessageSquare,
  Activity,
  Minus,
  Plus
} from 'lucide-react';
import { atlasService } from '../../../services/atlasService';
import { trackEvent, EVENTS } from '../../../lib/fathom';
import { DarkModeToggle } from '../../../components/DarkModeToggle';

interface SidebarProps {
  activeTaskId: string | null;
  onSelectTask: (id: string) => void;
  activeView: string;
  onSelectView: (view: any) => void;
  activeAtlasPage?: 'dashboard' | 'data' | 'constraints' | 'touchpoints' | 'reference' | 'ai' | 'human' | 'system';
  onNavigateAtlas?: (page: 'dashboard' | 'data' | 'constraints' | 'touchpoints' | 'reference' | 'ai' | 'human' | 'system') => void;
  onSelectLayer?: (id: string) => void;
  activeLayerId?: string | null;
  isOpen?: boolean;
  onClose?: () => void;
  variant?: 'overlay' | 'static';
}

export const Sidebar = ({
  activeTaskId,
  onSelectTask,
  activeView,
  onSelectView,
  activeAtlasPage = 'dashboard',
  onNavigateAtlas,
  onSelectLayer,
  activeLayerId,
  isOpen,
  onClose,
  variant = 'overlay'
}: SidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'ai' | 'human' | 'system'>('all');
  const [isNavCollapsed, setIsNavCollapsed] = useState(() => {
    const saved = localStorage.getItem('atlas-sidebar-nav-collapsed');
    return saved === 'true';
  });

  const meta = atlasService.getMeta();
  const layers = atlasService.getLayers();

  // Save nav collapsed state to localStorage
  useEffect(() => {
    localStorage.setItem('atlas-sidebar-nav-collapsed', String(isNavCollapsed));
  }, [isNavCollapsed]);

  // Track search usage
  useEffect(() => {
    if (searchTerm.trim().length >= 2) {
      const timer = setTimeout(() => {
        trackEvent(EVENTS.SEARCH_PERFORMED);
      }, 500); // Debounce to avoid tracking every keystroke
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  // Filter tasks based on search and type
  const filteredTasks = useMemo(() => {
    return atlasService.searchTasks(searchTerm, filterType === 'all' ? undefined : filterType);
  }, [searchTerm, filterType]);

  const handleAtlasNav = (page: 'dashboard' | 'data' | 'constraints' | 'touchpoints' | 'reference' | 'ai' | 'human' | 'system') => {
     if (onNavigateAtlas) {
        // Track dimension navigation
        if (page === 'ai') trackEvent(EVENTS.DIMENSION_VIEW_AI);
        else if (page === 'human') trackEvent(EVENTS.DIMENSION_VIEW_HUMAN);
        else if (page === 'system') trackEvent(EVENTS.DIMENSION_VIEW_SYSTEM);
        else if (page === 'data') trackEvent(EVENTS.DIMENSION_VIEW_DATA);
        else if (page === 'constraints') trackEvent(EVENTS.DIMENSION_VIEW_CONSTRAINTS);
        else if (page === 'touchpoints') trackEvent(EVENTS.DIMENSION_VIEW_TOUCHPOINTS);

        onNavigateAtlas(page);
        // If we are in overlay mode (mobile), close the sidebar
        if (variant === 'overlay' && onClose) onClose();
     }
  };

  const containerClasses = variant === 'overlay'
    ? `fixed top-0 left-0 h-full w-[300px] bg-[var(--bg)] border-r border-[var(--border)] flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
    : `w-full h-full bg-[var(--bg)] border-r border-[var(--border)] flex flex-col`; 

  return (
    <>
      {/* Mobile Backdrop (Only for overlay mode) */}
      {variant === 'overlay' && (
        <div
          className={`fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={containerClasses}
        role="navigation"
        aria-label="Atlas navigation sidebar"
      >
        {/* Header Area */}
        <div className="p-5 border-b border-[var(--border)] bg-[var(--surface)] flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onSelectView('landing')}
              className="cursor-pointer flex items-center gap-2 text-[var(--text-main)] hover:opacity-70 transition-opacity group"
            >
              <div className="w-8 h-8 bg-[var(--text-main)] text-[var(--bg)] flex items-center justify-center font-sans font-medium text-lg group-hover:bg-blue-600 transition-colors">A</div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-medium tracking-tight leading-none">Atlas</span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono mt-0.5">v{meta.version}</span>
              </div>
            </button>
            <div className="flex items-center gap-1">
              <DarkModeToggle />
              {variant === 'overlay' && (
                <button
                  onClick={onClose}
                  className="cursor-pointer lg:hidden p-1 hover:bg-[var(--bg)] text-[var(--text-muted)]"
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation & Search Area */}
        <div className="flex flex-col flex-shrink-0 bg-[var(--surface)] border-b border-[var(--border)]">
           {/* Navigation Toggle */}
           <button
             onClick={() => setIsNavCollapsed(!isNavCollapsed)}
             className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] hover:bg-[var(--bg)] transition-colors border-b border-[var(--border)]"
             aria-expanded={!isNavCollapsed}
             aria-controls="navigation-menu"
             aria-label={isNavCollapsed ? "Expand navigation menu" : "Collapse navigation menu"}
           >
             <span>{isNavCollapsed ? 'Expand Navigation' : 'Collapse Navigation'}</span>
             {isNavCollapsed ? (
               <Plus className="w-3 h-3" aria-hidden="true" />
             ) : (
               <Minus className="w-3 h-3" aria-hidden="true" />
             )}
           </button>

           {/* Primary Links */}
           <div
             id="navigation-menu"
             className={`overflow-hidden transition-all duration-300 ease-in-out ${isNavCollapsed ? 'max-h-0' : 'max-h-[2000px]'}`}
           >
             <div className="p-3 space-y-0.5 pb-3">
              {/* Overview & Reference */}
              <button
                onClick={() => handleAtlasNav('dashboard')}
                className={`
                  cursor-pointer group flex items-center w-full text-left px-2 py-2 text-sm transition-all gap-2.5 border border-transparent
                  ${activeAtlasPage === 'dashboard' && !activeTaskId && !activeLayerId
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium border-blue-200 dark:border-blue-800'
                    : 'text-[var(--text-main)] font-medium hover:bg-[var(--bg)]'}
                `}
                aria-current={activeAtlasPage === 'dashboard' && !activeTaskId && !activeLayerId ? 'page' : undefined}
                title="View Atlas dashboard and templates"
              >
                <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => handleAtlasNav('reference')}
                className={`
                  cursor-pointer group flex items-center w-full text-left px-2 py-2 text-sm transition-all gap-2.5 border border-transparent
                  ${activeAtlasPage === 'reference'
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium border-indigo-200 dark:border-indigo-800'
                    : 'text-[var(--text-main)] font-medium hover:bg-[var(--bg)]'}
                `}
                aria-current={activeAtlasPage === 'reference' ? 'page' : undefined}
                title="One-page overview of all patterns and dimensions"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span>Quick Reference</span>
              </button>

              <div className="h-px bg-[var(--border)] my-2 mx-2"></div>

              {/* Layer Links */}
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] px-2 py-1.5">
                Layers
              </div>
              {layers.map(layer => {
                // Map layer IDs to appropriate icons
                const getLayerIcon = (layerId: string) => {
                  if (layerId.includes('inbound')) return MessageSquare;
                  if (layerId.includes('internal')) return BrainCircuit;
                  if (layerId.includes('outbound')) return Activity;
                  if (layerId.includes('execution')) return Settings;
                  return Layers;
                };

                const Icon = getLayerIcon(layer.id);
                const isActive = activeLayerId === layer.id;

                return (
                  <button
                    key={layer.id}
                    onClick={() => {
                      if (onSelectLayer) {
                        onSelectLayer(layer.id);
                        if (variant === 'overlay' && onClose) onClose();
                      }
                    }}
                    className={`
                      cursor-pointer group flex items-center w-full text-left px-2 py-2 text-sm transition-all gap-2.5 border
                      ${isActive
                        ? 'bg-[var(--surface)] border-[var(--border)] font-medium'
                        : 'border-transparent text-[var(--text-main)] font-medium hover:bg-[var(--bg)]'}
                    `}
                    style={isActive ? {
                      backgroundColor: `${layer.color}10`,
                      borderColor: `${layer.color}40`,
                      color: layer.color
                    } : undefined}
                  >
                    <div className="relative">
                      <Icon className="w-4 h-4" />
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full border border-[var(--bg)]"
                        style={{ backgroundColor: layer.color }}
                      />
                    </div>
                    <span>{layer.name}</span>
                  </button>
                );
              })}

              <div className="h-px bg-[var(--border)] my-2 mx-2"></div>

              {/* Task Types */}
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] px-2 py-1.5">
                Patterns
              </div>

              <button
                onClick={() => handleAtlasNav('ai')}
                className={`
                  cursor-pointer group flex items-center w-full text-left px-2 py-2 text-sm transition-all gap-2.5 border border-transparent
                  ${activeAtlasPage === 'ai'
                    ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium border-purple-200 dark:border-purple-800'
                    : 'text-[var(--text-main)] font-medium hover:bg-[var(--bg)]'}
                `}
                aria-current={activeAtlasPage === 'ai' ? 'page' : undefined}
                title="AI tasks: Generate, Classify, Retrieve, Transform"
              >
                <BrainCircuit className="w-4 h-4" aria-hidden="true" />
                <span>AI Patterns</span>
              </button>

              <button
                onClick={() => handleAtlasNav('human')}
                className={`
                  cursor-pointer group flex items-center w-full text-left px-2 py-2 text-sm transition-all gap-2.5 border border-transparent
                  ${activeAtlasPage === 'human'
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium border-blue-200 dark:border-blue-800'
                    : 'text-[var(--text-main)] font-medium hover:bg-[var(--bg)]'}
                `}
                aria-current={activeAtlasPage === 'human' ? 'page' : undefined}
                title="Human actions: Review, Edit, Approve, Configure"
              >
                <UserCircle className="w-4 h-4" aria-hidden="true" />
                <span>Human Actions</span>
              </button>

              <button
                onClick={() => handleAtlasNav('system')}
                className={`
                  cursor-pointer group flex items-center w-full text-left px-2 py-2 text-sm transition-all gap-2.5 border border-transparent
                  ${activeAtlasPage === 'system'
                    ? 'bg-gray-100 dark:bg-gray-800/40 text-gray-800 dark:text-gray-200 font-medium border-gray-200 dark:border-gray-700'
                    : 'text-[var(--text-main)] font-medium hover:bg-[var(--bg)]'}
                `}
                aria-current={activeAtlasPage === 'system' ? 'page' : undefined}
                title="System operations: Store, Route, Validate, Process"
              >
                <Settings className="w-4 h-4" aria-hidden="true" />
                <span>System Ops</span>
              </button>

              <div className="h-px bg-[var(--border)] my-2 mx-2"></div>

              {/* Artifacts */}
              <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] px-2 py-1.5">
                Artifacts
              </div>

              <button
                onClick={() => handleAtlasNav('data')}
                className={`
                  cursor-pointer group flex items-center w-full text-left px-2 py-2 text-sm transition-all gap-2.5 border border-transparent
                  ${activeAtlasPage === 'data'
                    ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium border-amber-200 dark:border-amber-800'
                    : 'text-[var(--text-main)] font-medium hover:bg-[var(--bg)]'}
                `}
                aria-current={activeAtlasPage === 'data' ? 'page' : undefined}
                title="Data artifacts: Text, Image, Audio, Vector, etc."
              >
                <Database className="w-4 h-4" aria-hidden="true" />
                <span>Data Types</span>
              </button>

              <button
                onClick={() => handleAtlasNav('constraints')}
                className={`
                  cursor-pointer group flex items-center w-full text-left px-2 py-2 text-sm transition-all gap-2.5 border border-transparent
                  ${activeAtlasPage === 'constraints'
                    ? 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 font-medium border-rose-200 dark:border-rose-800'
                    : 'text-[var(--text-main)] font-medium hover:bg-[var(--bg)]'}
                `}
                aria-current={activeAtlasPage === 'constraints' ? 'page' : undefined}
                title="System constraints: Latency, Privacy, Cost, Accuracy"
              >
                <Sliders className="w-4 h-4" aria-hidden="true" />
                <span>Constraints</span>
              </button>

              <button
                onClick={() => handleAtlasNav('touchpoints')}
                className={`
                  cursor-pointer group flex items-center w-full text-left px-2 py-2 text-sm transition-all gap-2.5 border border-transparent
                  ${activeAtlasPage === 'touchpoints'
                    ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-medium border-cyan-200 dark:border-cyan-800'
                    : 'text-[var(--text-main)] font-medium hover:bg-[var(--bg)]'}
                `}
                aria-current={activeAtlasPage === 'touchpoints' ? 'page' : undefined}
                title="User touchpoints: Input, Display, Notification, Control"
              >
                <Smartphone className="w-4 h-4" aria-hidden="true" />
                <span>Touchpoints</span>
              </button>
           </div>
           </div>

           {/* Search Bar */}
           <div className="p-3">
             <div className="relative mb-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)]" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search patterns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search Atlas patterns and tasks"
                  title="Search by pattern name, description, or keywords"
                  className="w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text-main)] py-1.5 pl-8 pr-3 text-sm focus:ring-1 focus:ring-[var(--text-main)] placeholder:text-[var(--text-muted)]"
                />
             </div>


             <div>
               <div className="flex items-center justify-between mb-1">
                 <label className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                   Filter Patterns
                 </label>
                 {filterType !== 'all' && (
                   <button
                     onClick={() => setFilterType('all')}
                     className="text-[9px] font-mono text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                     title="Clear pattern filter"
                   >
                     Clear
                   </button>
                 )}
               </div>
               <div className="flex p-1 bg-[var(--bg)] border border-[var(--border)]" role="group" aria-label="Filter patterns by type">
                  {(['all', 'ai', 'human', 'system'] as const).map(type => (
                     <button
                        key={type}
                        onClick={() => setFilterType(type)}
                        className={`
                           cursor-pointer flex-1 capitalize text-[10px] font-mono font-medium py-1 transition-all border border-transparent
                           ${filterType === type ? 'bg-[var(--surface)] text-[var(--text-main)] border-[var(--border)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}
                        `}
                        aria-pressed={filterType === type}
                        aria-label={`Filter by ${type} patterns`}
                        title={type === 'all' ? 'Show all patterns' : `Show only ${type} patterns`}
                     >
                        {type}
                     </button>
                  ))}
               </div>
             </div>
           </div>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
          {layers.map(layer => {
            const layerTasks = filteredTasks.filter(t => t.layer_id === layer.id);
            if (layerTasks.length === 0) return null;

            return (
              <div key={layer.id}>
                <button
                  onClick={() => {
                    if (onSelectLayer) {
                      onSelectLayer(layer.id);
                      if (variant === 'overlay' && onClose) onClose();
                    }
                  }}
                  className={`w-full flex items-center gap-2 mb-3 sticky top-0 bg-[var(--bg)]/95 backdrop-blur-sm py-1 z-10 ${
                    onSelectLayer ? 'cursor-pointer hover:opacity-70 transition-opacity' : ''
                  }`}
                  disabled={!onSelectLayer}
                  aria-label={`View ${layer.name} layer`}
                >
                  <span className="w-2.5 h-2.5 shadow-sm" style={{ backgroundColor: layer.color }} aria-hidden="true"></span>
                  <span className="text-[10px] uppercase tracking-widest font-mono font-medium text-[var(--text-muted)]" style={{ color: layer.color }}>{layer.name}</span>
                  <div className="h-px bg-[var(--border)] flex-1" aria-hidden="true"></div>
                </button>
                <div className="space-y-0.5">
                  {layerTasks.map(task => {
                     let Icon = BrainCircuit;
                     let typeColor = 'text-gray-400 dark:text-gray-500';
                     if (task.task_type === 'human') { Icon = UserCircle; typeColor = 'text-blue-500 dark:text-blue-400'; }
                     if (task.task_type === 'system') { Icon = Settings; typeColor = 'text-gray-500 dark:text-gray-400'; }
                     if (task.task_type === 'ai') { typeColor = 'text-purple-500 dark:text-purple-400'; }

                     const isActive = activeTaskId === task.id;

                     return (
                      <button
                        key={task.id}
                        onClick={() => {
                          trackEvent(EVENTS.PATTERN_VIEW);
                          onSelectTask(task.id);
                          if (variant === 'overlay' && onClose) onClose();
                        }}
                        className={`
                          group flex items-center w-full text-left px-2 py-1.5 text-sm transition-all gap-2.5 border border-transparent cursor-pointer
                          ${isActive
                            ? 'bg-[var(--surface)] text-[var(--text-main)] shadow-sm font-medium border-[var(--border)]'
                            : 'text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text-main)] hover:border-[var(--border)] hover:shadow-sm'}
                        `}
                        aria-current={isActive ? 'page' : undefined}
                        title={`View ${task.name} pattern`}
                      >
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'opacity-100' : 'opacity-70'} ${typeColor}`} aria-hidden="true" />
                        <span className="truncate">{task.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          
          {filteredTasks.length === 0 && (
             <div className="text-center py-10">
                <p className="text-sm text-[var(--text-muted)]">No tasks found.</p>
                <button onClick={() => { setSearchTerm(''); setFilterType('all'); }} className="cursor-pointer text-xs text-blue-600 dark:text-blue-400 mt-2 hover:underline">Clear filters</button>
             </div>
          )}
        </div>
      </aside>
    </>
  );
};

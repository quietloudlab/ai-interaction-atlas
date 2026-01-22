
import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  BookOpen,
  Search,
  BrainCircuit,
  UserCircle,
  Settings,
  Move,
  LayoutDashboard,
  Database,
  Sliders,
  Smartphone,
  Sparkles,
  Loader2,
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
import { semanticSearch, isSemanticSearchAvailable, type SearchResult } from '../../../lib/semanticSearch';
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
  const [isSemanticSearchEnabled, setIsSemanticSearchEnabled] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [semanticResults, setSemanticResults] = useState<SearchResult[]>([]);
  const [searchTypeFilter, setSearchTypeFilter] = useState<Set<string>>(new Set());
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

  // Check if semantic search is available on mount
  useEffect(() => {
    isSemanticSearchAvailable().then(available => {
      setIsSemanticSearchEnabled(available);
    });
  }, []);

  // Perform semantic search when search term changes (debounced)
  useEffect(() => {
    if (!isSemanticSearchEnabled || searchTerm.trim().length < 2) {
      setSemanticResults([]);
      setIsSearching(false);
      return;
    }

    // Show "Searching..." immediately
    setIsSearching(true);

    const timer = setTimeout(async () => {
      try {
        // Track semantic search usage
        trackEvent(EVENTS.SEMANTIC_SEARCH_USED);

        // Use lower threshold when filters are active (more forgiving)
        const threshold = searchTypeFilter.size > 0 ? 0.2 : 0.3;
        const results = await semanticSearch(searchTerm.trim(), 20, threshold);
        setSemanticResults(results);
      } catch (error) {
        console.error('Semantic search error:', error);
        setSemanticResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300); // Debounce 300ms

    return () => clearTimeout(timer);
  }, [searchTerm, isSemanticSearchEnabled, searchTypeFilter.size]);

  // Track regular search usage
  useEffect(() => {
    if (!isSemanticSearchEnabled && searchTerm.trim().length >= 2) {
      const timer = setTimeout(() => {
        trackEvent(EVENTS.SEARCH_PERFORMED);
      }, 500); // Debounce to avoid tracking every keystroke
      return () => clearTimeout(timer);
    }
  }, [searchTerm, isSemanticSearchEnabled]);

  // Toggle search type filter
  const toggleSearchTypeFilter = (type: string) => {
    const newFilter = new Set(searchTypeFilter);
    if (newFilter.has(type)) {
      newFilter.delete(type);
    } else {
      newFilter.add(type);
    }
    setSearchTypeFilter(newFilter);
  };

  // Filter results by selected types (show all if no filters selected)
  const filteredSemanticResults = useMemo(() => {
    if (searchTypeFilter.size === 0) {
      return semanticResults;
    }
    return semanticResults.filter(result => searchTypeFilter.has(result.type));
  }, [semanticResults, searchTypeFilter]);

  // Create a map of task ID to match reason for displaying in tooltips
  const matchReasonMap = useMemo(() => {
    const map = new Map<string, string>();
    filteredSemanticResults.forEach(result => {
      if (result.matchReason) {
        map.set(result.id, result.matchReason);
      }
    });
    return map;
  }, [filteredSemanticResults]);

  // Filter tasks based on search and type
  const filteredTasks = useMemo(() => {
    // If semantic search is active and we have results, use those
    if (isSemanticSearchEnabled && searchTerm.trim().length >= 2 && filteredSemanticResults.length > 0) {
      const allTasks = atlasService.getTasks();

      // Map semantic results to actual tasks, filtered by type
      const taskIds = new Set(
        filteredSemanticResults
          .filter(result => result.type.includes('task')) // Only show tasks, not data/constraints/touchpoints
          .map(result => result.id)
      );

      const tasks = allTasks.filter(task => {
        if (!taskIds.has(task.id)) return false;
        if (filterType === 'all') return true;
        return task.task_type === filterType;
      });

      // Sort by semantic search order
      return tasks.sort((a, b) => {
        const aIndex = filteredSemanticResults.findIndex(r => r.id === a.id);
        const bIndex = filteredSemanticResults.findIndex(r => r.id === b.id);
        return aIndex - bIndex;
      });
    }

    // Otherwise use traditional search
    return atlasService.searchTasks(searchTerm, filterType === 'all' ? undefined : filterType);
  }, [searchTerm, filterType, filteredSemanticResults, isSemanticSearchEnabled]);


  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.effectAllowed = 'copy';
  };

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
        />
      )}

      {/* Sidebar Container */}
      <aside className={containerClasses}>
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
                <button onClick={onClose} className="cursor-pointer lg:hidden p-1 hover:bg-[var(--bg)] text-[var(--text-muted)]">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile CTA - Removed for now */}
        </div>

        {/* Navigation & Search Area */}
        <div className="flex flex-col flex-shrink-0 bg-[var(--surface)] border-b border-[var(--border)]">
           {/* Navigation Toggle */}
           <button
             onClick={() => setIsNavCollapsed(!isNavCollapsed)}
             className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] hover:bg-[var(--bg)] transition-colors border-b border-[var(--border)]"
           >
             <span>Navigation</span>
             {isNavCollapsed ? (
               <Plus className="w-3 h-3" />
             ) : (
               <Minus className="w-3 h-3" />
             )}
           </button>

           {/* Primary Links */}
           <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isNavCollapsed ? 'max-h-0' : 'max-h-[2000px]'}`}>
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
              >
                <LayoutDashboard className="w-4 h-4" />
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
              >
                <FileText className="w-4 h-4" />
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
              >
                <BrainCircuit className="w-4 h-4" />
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
              >
                <UserCircle className="w-4 h-4" />
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
              >
                <Settings className="w-4 h-4" />
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
              >
                <Database className="w-4 h-4" />
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
              >
                <Sliders className="w-4 h-4" />
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
              >
                <Smartphone className="w-4 h-4" />
                <span>Touchpoints</span>
              </button>
           </div>
           </div>

           {/* Search Bar */}
           <div className="p-3">
             <div className="relative mb-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder={isSemanticSearchEnabled ? "Search across patterns..." : "Find a task..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search Atlas patterns and tasks"
                  className="w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--text-main)] py-1.5 pl-8 pr-9 text-sm focus:ring-1 focus:ring-[var(--text-main)] placeholder:text-[var(--text-muted)]"
                />
                {isSearching ? (
                  <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-500 dark:text-purple-400 animate-spin" />
                ) : isSemanticSearchEnabled && searchTerm.trim().length >= 2 && (
                  <Sparkles className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                )}
             </div>


             <div className="flex p-1 bg-[var(--bg)] border border-[var(--border)]">
                {(['all', 'ai', 'human', 'system'] as const).map(type => (
                   <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`
                         cursor-pointer flex-1 capitalize text-[10px] font-mono font-medium py-1 transition-all border border-transparent
                         ${filterType === type ? 'bg-[var(--surface)] text-[var(--text-main)] border-[var(--border)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}
                      `}
                   >
                      {type}
                   </button>
                ))}
             </div>
           </div>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
          {/* Type Filters - Show at top when searching */}
          {searchTerm.length >= 2 && (
            <div className="sticky top-0 bg-[var(--bg)]/95 backdrop-blur-sm border-b border-[var(--border)] pb-3 mb-4 z-20">
              <div className="flex flex-wrap gap-1 mb-2">
                <button
                  onClick={() => toggleSearchTypeFilter('ai_task')}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                    searchTypeFilter.has('ai_task')
                      ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700'
                      : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:bg-[var(--bg)]'}
                  }`}
                >
                  AI
                </button>
                <button
                  onClick={() => toggleSearchTypeFilter('human_task')}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                    searchTypeFilter.has('human_task')
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700'
                      : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:bg-[var(--bg)]'
                  }`}
                >
                  Human
                </button>
                <button
                  onClick={() => toggleSearchTypeFilter('system_task')}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                    searchTypeFilter.has('system_task')
                      ? 'bg-gray-100 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                      : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:bg-[var(--bg)]'
                  }`}
                >
                  System
                </button>
                <button
                  onClick={() => toggleSearchTypeFilter('data')}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                    searchTypeFilter.has('data')
                      ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                      : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:bg-[var(--bg)]'
                  }`}
                >
                  Data
                </button>
                <button
                  onClick={() => toggleSearchTypeFilter('constraint')}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                    searchTypeFilter.has('constraint')
                      ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
                      : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:bg-[var(--bg)]'
                  }`}
                >
                  Constraint
                </button>
                <button
                  onClick={() => toggleSearchTypeFilter('touchpoint')}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                    searchTypeFilter.has('touchpoint')
                      ? 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-700'
                      : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:bg-[var(--bg)]'
                  }`}
                >
                  Touchpoint
                </button>
              </div>
              {searchTypeFilter.size > 0 && (
                <button
                  onClick={() => setSearchTypeFilter(new Set())}
                  className="w-full py-1 px-2 text-[10px] font-mono font-medium text-[var(--text-muted)] bg-[var(--surface)] hover:bg-[var(--bg)] transition-colors cursor-pointer border border-[var(--border)]"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

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
                >
                  <span className="w-2.5 h-2.5 shadow-sm" style={{ backgroundColor: layer.color }}></span>
                  <span className="text-[10px] uppercase tracking-widest font-mono font-medium text-[var(--text-muted)]" style={{ color: layer.color }}>{layer.name}</span>
                  <div className="h-px bg-[var(--border)] flex-1"></div>
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
                      <div
                        key={task.id}
                        draggable={activeView === 'builder'}
                        onDragStart={activeView === 'builder' ? (e) => handleDragStart(e, task.id) : undefined}
                        onClick={() => {
                          trackEvent(EVENTS.PATTERN_VIEW);
                          onSelectTask(task.id);
                        }}
                        title={matchReasonMap.get(task.id) || undefined}
                        className={`
                          group flex items-center w-full text-left px-2 py-1.5 text-sm transition-all gap-2.5 border border-transparent
                          ${activeView === 'builder' ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
                          ${isActive
                            ? 'bg-[var(--surface)] text-[var(--text-main)] shadow-sm font-medium border-[var(--border)]'
                            : 'text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text-main)] hover:border-[var(--border)] hover:shadow-sm'}
                        `}
                      >
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'opacity-100' : 'opacity-70'} ${typeColor}`} />
                        <span className="truncate">{task.name}</span>
                        {activeView === 'builder' && <Move className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-30" />}
                      </div>
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

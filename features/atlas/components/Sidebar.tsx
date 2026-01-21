
import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  LayoutGrid,
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
  FileText
} from 'lucide-react';
import { atlasService } from '../../../services/atlasService';
import { trackAtlasSearchPerformed, trackSemanticSearchUsed } from '../../../lib/posthog';
import { semanticSearch, isSemanticSearchAvailable, type SearchResult } from '../../../lib/semanticSearch';

interface SidebarProps {
  activeTaskId: string | null;
  onSelectTask: (id: string) => void;
  activeView: string;
  onSelectView: (view: any) => void;
  activeAtlasPage?: 'dashboard' | 'data' | 'constraints' | 'touchpoints' | 'reference' | 'ai' | 'human' | 'system';
  onNavigateAtlas?: (page: 'dashboard' | 'data' | 'constraints' | 'touchpoints' | 'reference' | 'ai' | 'human' | 'system') => void;
  onSelectLayer?: (id: string) => void;
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

  const meta = atlasService.getMeta();
  const layers = atlasService.getLayers();

  // Check if semantic search is available on mount
  useEffect(() => {
    isSemanticSearchAvailable().then(available => {
      setIsSemanticSearchEnabled(available);
      if (available) {
        console.log('✨ Semantic search is enabled');
      }
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

  // Track search events (debounced)
  useEffect(() => {
    if (searchTerm.trim().length >= 2) {
      const timer = setTimeout(() => {
        const isSemanticActive = isSemanticSearchEnabled && semanticResults.length > 0;
        trackAtlasSearchPerformed(searchTerm, filteredTasks.length, isSemanticActive);

        // Track semantic search separately for analytics
        if (isSemanticActive) {
          trackSemanticSearchUsed('atlas', searchTerm, semanticResults.length);
        }
      }, 500); // Wait 500ms after user stops typing
      return () => clearTimeout(timer);
    }
  }, [searchTerm, filteredTasks.length, isSemanticSearchEnabled, semanticResults.length]);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleAtlasNav = (page: 'dashboard' | 'data' | 'constraints' | 'touchpoints' | 'reference' | 'ai' | 'human' | 'system') => {
     if (onNavigateAtlas) {
        onNavigateAtlas(page);
        // If we are in overlay mode (mobile), close the sidebar
        if (variant === 'overlay' && onClose) onClose();
     }
  };

  const containerClasses = variant === 'overlay' 
    ? `fixed top-0 left-0 h-full w-[300px] bg-[#FAFAFA] border-r border-[#E6E6E6] flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
    : `w-full h-full bg-[#FAFAFA] border-r border-[#E6E6E6] flex flex-col`; 

  return (
    <>
      {/* Mobile Backdrop (Only for overlay mode) */}
      {variant === 'overlay' && (
        <div 
          className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={containerClasses}>
        {/* Header Area */}
        <div className="p-5 border-b border-[#E6E6E6] bg-white flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onSelectView('landing')}
              className="cursor-pointer flex items-center gap-2 text-[#111111] hover:opacity-70 transition-opacity group"
            >
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-sans font-medium text-lg group-hover:bg-blue-600 transition-colors">A</div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-medium tracking-tight leading-none">Atlas</span>
                <span className="text-[10px] text-[#6E6E6E] font-mono mt-0.5">v{meta.version}</span>
              </div>
            </button>
            {variant === 'overlay' && (
              <button onClick={onClose} className="cursor-pointer lg:hidden p-1 hover:bg-gray-100 text-gray-500">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Mobile CTA - Removed for now */}
        </div>

        {/* Navigation & Search Area */}
        <div className="flex flex-col flex-shrink-0 bg-white border-b border-[#E6E6E6]">
           {/* Primary Links */}
           <div className="p-3 space-y-0.5 pb-3">
              <button
                onClick={() => handleAtlasNav('dashboard')}
                className={`
                  cursor-pointer group flex items-center w-full text-left px-2 py-2 text-sm transition-all gap-2.5 border border-transparent
                  ${activeAtlasPage === 'dashboard' && !activeTaskId
                    ? 'bg-blue-50 text-blue-700 font-medium border-blue-200'
                    : 'text-[#111111] font-medium hover:bg-gray-100'}
                `}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => handleAtlasNav('ai')}
                className={`
                  cursor-pointer group flex items-center w-full text-left px-2 py-2 text-sm transition-all gap-2.5 border border-transparent
                  ${activeAtlasPage === 'ai'
                    ? 'bg-purple-50 text-purple-700 font-medium border-purple-200'
                    : 'text-[#111111] font-medium hover:bg-gray-100'}
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
                    ? 'bg-blue-50 text-blue-700 font-medium border-blue-200'
                    : 'text-[#111111] font-medium hover:bg-gray-100'}
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
                    ? 'bg-gray-100 text-gray-800 font-medium border-gray-200'
                    : 'text-[#111111] font-medium hover:bg-gray-100'}
                `}
              >
                <Settings className="w-4 h-4" />
                <span>System Ops</span>
              </button>

              <div className="h-px bg-gray-100 my-2 mx-2"></div>

              <button
                onClick={() => handleAtlasNav('data')}
                className={`
                  cursor-pointer group flex items-center w-full text-left px-2 py-2 text-sm transition-all gap-2.5 border border-transparent
                  ${activeAtlasPage === 'data'
                    ? 'bg-amber-50 text-amber-700 font-medium border-amber-200'
                    : 'text-[#111111] font-medium hover:bg-gray-100'}
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
                    ? 'bg-rose-50 text-rose-700 font-medium border-rose-200'
                    : 'text-[#111111] font-medium hover:bg-gray-100'}
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
                    ? 'bg-cyan-50 text-cyan-700 font-medium border-cyan-200'
                    : 'text-[#111111] font-medium hover:bg-gray-100'}
                `}
              >
                <Smartphone className="w-4 h-4" />
                <span>Touchpoints</span>
              </button>

              <div className="h-px bg-gray-100 my-2 mx-2"></div>

              <button
                onClick={() => window.location.href = '/examples'}
                className="cursor-pointer group flex items-center w-full text-left px-2 py-2 text-sm transition-all gap-2.5 text-[#111111] font-medium hover:bg-gray-100 border border-transparent"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Examples</span>
              </button>

              <button
                onClick={() => handleAtlasNav('reference')}
                className={`
                  cursor-pointer group flex items-center w-full text-left px-2 py-2 text-sm transition-all gap-2.5 border border-transparent
                  ${activeAtlasPage === 'reference'
                    ? 'bg-indigo-50 text-indigo-700 font-medium border-indigo-200'
                    : 'text-[#111111] font-medium hover:bg-gray-100'}
                `}
              >
                <FileText className="w-4 h-4" />
                <span>Quick Reference</span>
              </button>
           </div>
           
           {/* Search Bar */}
           <div className="px-3 pb-3">
             <div className="relative mb-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder={isSemanticSearchEnabled ? "Search with AI..." : "Find a task..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#F4F4F5] border border-gray-200 py-1.5 pl-8 pr-9 text-sm focus:ring-1 focus:ring-black placeholder:text-gray-400"
                />
                {isSearching ? (
                  <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-500 animate-spin" />
                ) : isSemanticSearchEnabled && searchTerm.trim().length >= 2 && (
                  <Sparkles className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-purple-500" />
                )}
             </div>


             <div className="flex p-1 bg-[#F4F4F5] border border-gray-200">
                {(['all', 'ai', 'human', 'system'] as const).map(type => (
                   <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`
                         cursor-pointer flex-1 capitalize text-[10px] font-mono font-medium py-1 transition-all border border-transparent
                         ${filterType === type ? 'bg-white text-black border-gray-300' : 'text-gray-500 hover:text-gray-700'}
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
            <div className="sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-gray-200 pb-3 mb-4 z-20">
              <div className="flex flex-wrap gap-1 mb-2">
                <button
                  onClick={() => toggleSearchTypeFilter('ai_task')}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                    searchTypeFilter.has('ai_task')
                      ? 'bg-purple-100 text-purple-700 border border-purple-300'
                      : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  AI
                </button>
                <button
                  onClick={() => toggleSearchTypeFilter('human_task')}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                    searchTypeFilter.has('human_task')
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  Human
                </button>
                <button
                  onClick={() => toggleSearchTypeFilter('system_task')}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                    searchTypeFilter.has('system_task')
                      ? 'bg-gray-100 text-gray-700 border border-gray-300'
                      : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  System
                </button>
                <button
                  onClick={() => toggleSearchTypeFilter('data')}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                    searchTypeFilter.has('data')
                      ? 'bg-amber-100 text-amber-700 border border-amber-300'
                      : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  Data
                </button>
                <button
                  onClick={() => toggleSearchTypeFilter('constraint')}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                    searchTypeFilter.has('constraint')
                      ? 'bg-rose-100 text-rose-700 border border-rose-300'
                      : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  Constraint
                </button>
                <button
                  onClick={() => toggleSearchTypeFilter('touchpoint')}
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                    searchTypeFilter.has('touchpoint')
                      ? 'bg-cyan-100 text-cyan-700 border border-cyan-300'
                      : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  Touchpoint
                </button>
              </div>
              {searchTypeFilter.size > 0 && (
                <button
                  onClick={() => setSearchTypeFilter(new Set())}
                  className="w-full py-1 px-2 text-[10px] font-mono font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
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
                  className={`w-full flex items-center gap-2 mb-3 sticky top-0 bg-[#FAFAFA]/95 backdrop-blur-sm py-1 z-10 ${
                    onSelectLayer ? 'cursor-pointer hover:opacity-70 transition-opacity' : ''
                  }`}
                  disabled={!onSelectLayer}
                >
                  <span className="w-2.5 h-2.5 shadow-sm" style={{ backgroundColor: layer.color }}></span>
                  <span className="text-[10px] uppercase tracking-widest font-mono font-medium text-[#6E6E6E]" style={{ color: layer.color }}>{layer.name}</span>
                  <div className="h-px bg-[#E6E6E6] flex-1"></div>
                </button>
                <div className="space-y-0.5">
                  {layerTasks.map(task => {
                     let Icon = BrainCircuit;
                     let typeColor = 'text-gray-400';
                     if (task.task_type === 'human') { Icon = UserCircle; typeColor = 'text-blue-500'; }
                     if (task.task_type === 'system') { Icon = Settings; typeColor = 'text-gray-500'; }
                     if (task.task_type === 'ai') { typeColor = 'text-purple-500'; }

                     const isActive = activeTaskId === task.id;

                     return (
                      <div
                        key={task.id}
                        draggable={activeView === 'builder'}
                        onDragStart={activeView === 'builder' ? (e) => handleDragStart(e, task.id) : undefined}
                        onClick={() => {
                          onSelectTask(task.id);
                        }}
                        title={matchReasonMap.get(task.id) || undefined}
                        className={`
                          group flex items-center w-full text-left px-2 py-1.5 text-sm transition-all gap-2.5 border border-transparent
                          ${activeView === 'builder' ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
                          ${isActive
                            ? 'bg-white text-[#111111] shadow-sm font-medium border-gray-200'
                            : 'text-[#6E6E6E] hover:bg-white hover:text-[#111111] hover:border-gray-200 hover:shadow-sm'}
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
                <p className="text-sm text-gray-500">No tasks found.</p>
                <button onClick={() => { setSearchTerm(''); setFilterType('all'); }} className="cursor-pointer text-xs text-blue-600 mt-2 hover:underline">Clear filters</button>
             </div>
          )}
        </div>
      </aside>
    </>
  );
};

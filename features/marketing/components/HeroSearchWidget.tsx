import React, { useState, useEffect, useMemo } from 'react';
import { Search, ArrowRight, BrainCircuit, UserCircle, Settings } from 'lucide-react';
import { atlasService } from '../../../services/atlasService';
import type { Task } from '../../../types';

interface HeroSearchWidgetProps {
  onTaskClick: (taskId: string) => void;
}

export const HeroSearchWidget: React.FC<HeroSearchWidgetProps> = ({ onTaskClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Get search results
  const searchResults = useMemo(() => {
    if (searchQuery.trim().length < 2) {
      // Show popular/featured tasks when no query
      const allTasks = atlasService.getTasks();
      return allTasks.slice(0, 6); // Top 6 tasks
    }
    return atlasService.searchTasks(searchQuery).slice(0, 8); // Top 8 results
  }, [searchQuery]);

  const getTaskIcon = (task: Task) => {
    if (task.task_type === 'ai') return BrainCircuit;
    if (task.task_type === 'human') return UserCircle;
    return Settings;
  };

  const getTaskColor = (task: Task) => {
    if (task.task_type === 'ai') return '#8B22F1';
    if (task.task_type === 'human') return '#2B5CF3';
    return '#4C5564';
  };

  const getTaskBgColor = (task: Task) => {
    if (task.task_type === 'ai') return '#F9F5FE';
    if (task.task_type === 'human') return '#F0F6FE';
    return '#F9FAFB';
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search patterns..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          className="w-full bg-white border-2 border-black py-3.5 pl-12 pr-4 text-base font-mono focus:ring-2 focus:ring-black focus:border-black placeholder:text-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        />
      </div>

      {/* Results Panel */}
      <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-h-[400px] overflow-y-auto">
        {searchQuery.trim().length === 0 && (
          <div className="p-4 border-b-2 border-black bg-gray-50">
            <p className="text-xs font-mono uppercase tracking-wider text-gray-500">Featured Patterns</p>
          </div>
        )}

        {searchResults.length > 0 ? (
          <div className="divide-y-2 divide-gray-200">
            {searchResults.map((task) => {
              const Icon = getTaskIcon(task);
              const color = getTaskColor(task);
              const bgColor = getTaskBgColor(task);

              return (
                <button
                  key={task.id}
                  onClick={() => onTaskClick(task.id)}
                  className="w-full text-left p-4 hover:bg-gray-50 transition-colors group flex items-start gap-3"
                >
                  <div
                    className="p-2 border border-gray-300 flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: bgColor }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-sans font-medium text-black group-hover:text-blue-600 transition-colors">
                        {task.name}
                      </h3>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {task.elevator_pitch}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500 font-mono">No patterns found</p>
            <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
};

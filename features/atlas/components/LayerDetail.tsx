
import React from 'react';
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2, BrainCircuit, UserCircle, Settings } from 'lucide-react';
import { atlasService } from '../../../services/atlasService';

export const LayerDetail = ({
  layerId,
  onBack,
  onTaskClick,
  onLayerClick
}: {
  layerId: string,
  onBack: () => void,
  onTaskClick: (id: string) => void,
  onLayerClick?: (id: string) => void
}) => {
  const layer = atlasService.getLayerById(layerId);
  if (!layer) return null;

  const layerTasks = atlasService.getTasks().filter(t => t.layer_id === layer.id);
  const aiTasks = layerTasks.filter(t => t.task_type === 'ai');
  const humanTasks = layerTasks.filter(t => t.task_type === 'human');
  const systemTasks = layerTasks.filter(t => t.task_type === 'system');

  // Get all layers for prev/next navigation
  const allLayers = atlasService.getLayers();
  const currentIndex = allLayers.findIndex(l => l.id === layerId);
  const prevLayer = currentIndex > 0 ? allLayers[currentIndex - 1] : null;
  const nextLayer = currentIndex < allLayers.length - 1 ? allLayers[currentIndex + 1] : null;

  return (
    <div className="pb-20">
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-mono group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {onLayerClick && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => prevLayer && onLayerClick(prevLayer.id)}
              disabled={!prevLayer}
              title={prevLayer ? prevLayer.name : undefined}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-mono border border-[var(--border)] transition-colors ${
                prevLayer
                  ? 'text-[var(--text-main)] hover:bg-[var(--bg)] cursor-pointer'
                  : 'text-[var(--border)] cursor-not-allowed'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button
              onClick={() => nextLayer && onLayerClick(nextLayer.id)}
              disabled={!nextLayer}
              title={nextLayer ? nextLayer.name : undefined}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-mono border border-[var(--border)] transition-colors ${
                nextLayer
                  ? 'text-[var(--text-main)] hover:bg-[var(--bg)] cursor-pointer'
                  : 'text-[var(--border)] cursor-not-allowed'
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <header className="mb-16 pb-12 border-b border-[var(--border)]">
        <div className="flex items-center gap-3 mb-6">
           <div className="w-3 h-3" style={{ backgroundColor: layer.color }}></div>
           <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">{layer.name} Layer</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-sans font-medium tracking-tighter text-[var(--text-main)] mb-8">{layer.role}</h1>
        <p className="text-xl md:text-2xl font-sans font-light text-[var(--text-main)] leading-snug max-w-4xl border-l-2 pl-8 py-2" style={{ borderColor: layer.color }}>
          {layer.description}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
         <div className="lg:col-span-2 space-y-16">
            {/* Guidance */}
            <section>
               <div className="mb-6">
                 <span className="font-mono text-sm text-[var(--text-muted)]">(01)</span>
                 <h2 className="text-xl font-sans font-medium tracking-tight mt-2 text-[var(--text-main)]">Layer Guidelines</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[var(--bg)] p-6 border border-[var(--border)]">
                     <h3 className="font-sans font-medium text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-500" /> When to Use
                     </h3>
                     <p className="text-[var(--text-muted)] leading-relaxed">{layer.guidance?.when_to_use}</p>
                     <div className="mt-4 pt-4 border-t border-[var(--border)]">
                        <div className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">Typical Position</div>
                        <p className="text-sm text-[var(--text-main)]">{layer.guidance?.typical_position}</p>
                     </div>
                  </div>

                  <div className="bg-[#FDF2F2] dark:bg-[#2A1414] p-6 border border-[#FADEDE] dark:border-[#4A2020]">
                     <h3 className="font-sans font-medium text-[var(--text-main)] mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-500" /> Red Flags
                     </h3>
                     <ul className="space-y-3">
                        {layer.guidance?.red_flags.map((flag, i) => (
                           <li key={i} className="text-sm text-[var(--text-muted)] flex items-start gap-2">
                              <span className="text-red-400 dark:text-red-500 font-bold">•</span> {flag}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </section>

            {/* Tasks */}
            <section>
               <div className="mb-6">
                 <span className="font-mono text-sm text-[var(--text-muted)]">(02)</span>
                 <h2 className="text-xl font-sans font-medium tracking-tight mt-2 text-[var(--text-main)]">Available Patterns</h2>
               </div>

               <div className="space-y-12">
                  {/* AI Tasks */}
                  {aiTasks.length > 0 && (
                     <div>
                        <div className="flex items-center gap-2 mb-6">
                           <BrainCircuit className="w-5 h-5" style={{ color: '#8B22F1' }} />
                           <h3 className="font-sans font-medium text-lg text-[var(--text-main)]">AI Capabilities</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {aiTasks.map(task => (
                              <button
                                 key={task.id}
                                 onClick={() => onTaskClick(task.id)}
                                 className="text-left p-4 border border-[var(--border)] hover:bg-[#F9F5FE] dark:hover:bg-[#2A1A3E] transition-all group bg-[var(--surface)]"
                              >
                                 <div className="font-sans font-medium text-[var(--text-main)] mb-1">{task.name}</div>
                                 <div className="text-xs text-[var(--text-muted)] line-clamp-2">{task.elevator_pitch}</div>
                              </button>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Human Tasks */}
                  {humanTasks.length > 0 && (
                     <div>
                        <div className="flex items-center gap-2 mb-6">
                           <UserCircle className="w-5 h-5" style={{ color: '#2B5CF3' }} />
                           <h3 className="font-sans font-medium text-lg text-[var(--text-main)]">Human Actions</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {humanTasks.map(task => (
                              <button
                                 key={task.id}
                                 onClick={() => onTaskClick(task.id)}
                                 className="text-left p-4 border border-[var(--border)] hover:bg-[#F0F6FE] dark:hover:bg-[#1A2A3E] transition-all group bg-[var(--surface)]"
                              >
                                 <div className="font-sans font-medium text-[var(--text-main)] mb-1">{task.name}</div>
                                 <div className="text-xs text-[var(--text-muted)] line-clamp-2">{task.elevator_pitch}</div>
                              </button>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* System Tasks */}
                  {systemTasks.length > 0 && (
                     <div>
                        <div className="flex items-center gap-2 mb-6">
                           <Settings className="w-5 h-5 text-[#4C5564] dark:text-[#8A91A0]" />
                           <h3 className="font-sans font-medium text-lg text-[var(--text-main)]">System Operations</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {systemTasks.map(task => (
                              <button
                                 key={task.id}
                                 onClick={() => onTaskClick(task.id)}
                                 className="text-left p-4 border border-[var(--border)] hover:bg-[#F9FAFB] dark:hover:bg-[#1A1A1A] transition-all group bg-[var(--surface)]"
                              >
                                 <div className="font-sans font-medium text-[var(--text-main)] mb-1">{task.name}</div>
                                 <div className="text-xs text-[var(--text-muted)] line-clamp-2">{task.elevator_pitch}</div>
                              </button>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            </section>
         </div>

         <div className="hidden lg:block">
            <div className="sticky top-24">
               <div className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--text-muted)] mb-4">Structure</div>
               <div className="relative pl-4 border-l border-[var(--border)] space-y-4">
                  {atlasService.getLayers().map(l => (
                     <div key={l.id} className={`transition-opacity ${l.id === layerId ? 'opacity-100 font-medium text-[var(--text-main)]' : 'opacity-40 text-[var(--text-muted)]'}`}>
                        <div className="text-sm">{l.name}</div>
                        {l.id === layerId && (
                           <div className="absolute left-[-1px] top-0 bottom-0 w-[2px]" style={{ backgroundColor: layer.color, height: '100%' }}></div>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

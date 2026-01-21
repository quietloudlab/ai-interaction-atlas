
import React from 'react';
import { ArrowLeft, AlertTriangle, CheckCircle2, BrainCircuit, UserCircle, Settings } from 'lucide-react';
import { atlasService } from '../../../services/atlasService';

export const LayerDetail = ({ 
  layerId, 
  onBack,
  onTaskClick 
}: { 
  layerId: string, 
  onBack: () => void,
  onTaskClick: (id: string) => void
}) => {
  const layer = atlasService.getLayerById(layerId);
  if (!layer) return null;

  const layerTasks = atlasService.getTasks().filter(t => t.layer_id === layer.id);
  const aiTasks = layerTasks.filter(t => t.task_type === 'ai');
  const humanTasks = layerTasks.filter(t => t.task_type === 'human');
  const systemTasks = layerTasks.filter(t => t.task_type === 'system');

  return (
    <div className="pb-20">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-sm text-[#6E6E6E] hover:text-[#111111] transition-colors font-mono group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <header className="mb-16 pb-12 border-b border-[#E6E6E6]">
        <div className="flex items-center gap-3 mb-6">
           <div className="w-3 h-3 rounded-full" style={{ backgroundColor: layer.color }}></div>
           <span className="text-xs font-mono uppercase tracking-widest text-[#6E6E6E]">{layer.name} Layer</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-sans font-medium tracking-tighter text-[#111111] mb-8">{layer.role}</h1>
        <p className="text-xl md:text-2xl font-sans font-light text-[#111111] leading-snug max-w-4xl border-l-2 pl-8 py-2" style={{ borderColor: layer.color }}>
          {layer.description}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
         <div className="lg:col-span-2 space-y-16">
            {/* Guidance */}
            <section>
               <div className="mb-6">
                 <span className="font-mono text-sm text-gray-500">(01)</span>
                 <h2 className="text-xl font-sans font-medium tracking-tight mt-2 text-[#111111]">Layer Guidelines</h2>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#F9F9F7] p-6 rounded-xl border border-[#F0F0EE]">
                     <h3 className="font-bold text-[#111111] mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" /> When to Use
                     </h3>
                     <p className="text-[#6E6E6E] leading-relaxed">{layer.guidance?.when_to_use}</p>
                     <div className="mt-4 pt-4 border-t border-[#E6E6E6]">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#6E6E6E] mb-1">Typical Position</div>
                        <p className="text-sm text-[#111111]">{layer.guidance?.typical_position}</p>
                     </div>
                  </div>

                  <div className="bg-red-50/50 p-6 rounded-xl border border-red-100">
                     <h3 className="font-bold text-[#111111] mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" /> Red Flags
                     </h3>
                     <ul className="space-y-3">
                        {layer.guidance?.red_flags.map((flag, i) => (
                           <li key={i} className="text-sm text-[#6E6E6E] flex items-start gap-2">
                              <span className="text-red-400 font-bold">•</span> {flag}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </section>

            {/* Tasks */}
            <section>
               <div className="mb-6">
                 <span className="font-mono text-sm text-gray-500">(02)</span>
                 <h2 className="text-xl font-sans font-medium tracking-tight mt-2 text-[#111111]">Available Patterns</h2>
               </div>
               
               <div className="space-y-12">
                  {/* AI Tasks */}
                  {aiTasks.length > 0 && (
                     <div>
                        <div className="flex items-center gap-2 mb-6">
                           <BrainCircuit className="w-5 h-5 text-purple-600" />
                           <h3 className="font-bold text-lg">AI Capabilities</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {aiTasks.map(task => (
                              <button 
                                 key={task.id} 
                                 onClick={() => onTaskClick(task.id)}
                                 className="text-left p-4 rounded-lg border border-[#E6E6E6] hover:border-purple-300 hover:shadow-md transition-all group bg-white"
                              >
                                 <div className="font-bold text-[#111111] group-hover:text-purple-700 mb-1">{task.name}</div>
                                 <div className="text-xs text-[#6E6E6E] line-clamp-2">{task.elevator_pitch}</div>
                              </button>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Human Tasks */}
                  {humanTasks.length > 0 && (
                     <div>
                        <div className="flex items-center gap-2 mb-6">
                           <UserCircle className="w-5 h-5 text-blue-600" />
                           <h3 className="font-bold text-lg">Human Actions</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {humanTasks.map(task => (
                              <button 
                                 key={task.id} 
                                 onClick={() => onTaskClick(task.id)}
                                 className="text-left p-4 rounded-lg border border-[#E6E6E6] hover:border-blue-300 hover:shadow-md transition-all group bg-white"
                              >
                                 <div className="font-bold text-[#111111] group-hover:text-blue-700 mb-1">{task.name}</div>
                                 <div className="text-xs text-[#6E6E6E] line-clamp-2">{task.elevator_pitch}</div>
                              </button>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* System Tasks */}
                  {systemTasks.length > 0 && (
                     <div>
                        <div className="flex items-center gap-2 mb-6">
                           <Settings className="w-5 h-5 text-gray-600" />
                           <h3 className="font-bold text-lg">System Operations</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {systemTasks.map(task => (
                              <button 
                                 key={task.id} 
                                 onClick={() => onTaskClick(task.id)}
                                 className="text-left p-4 rounded-lg border border-[#E6E6E6] hover:border-gray-400 hover:shadow-md transition-all group bg-white"
                              >
                                 <div className="font-bold text-[#111111] group-hover:text-black mb-1">{task.name}</div>
                                 <div className="text-xs text-[#6E6E6E] line-clamp-2">{task.elevator_pitch}</div>
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
               <div className="text-xs font-bold uppercase tracking-wider text-[#6E6E6E] mb-4">Structure</div>
               <div className="relative pl-4 border-l border-[#E6E6E6] space-y-4">
                  {atlasService.getLayers().map(l => (
                     <div key={l.id} className={`transition-opacity ${l.id === layerId ? 'opacity-100 font-bold text-[#111111]' : 'opacity-40 text-[#6E6E6E]'}`}>
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

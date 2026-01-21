
import React from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  ArrowUpRight, 
  BrainCircuit, 
  Settings, 
  UserCircle, 
  TrendingUp, 
  Database, 
  User, 
  Clock, 
  AlertTriangle, 
  Lightbulb, 
  GitCommit,
  XCircle,
  // Data Icons
  Type, Image, Video, Mic, Code, FileText, MapPin, Cpu, BarChart, Tag, Terminal, Activity, Fingerprint, CreditCard, MessageSquare, Box, Scan, Music, Table, Network, Layers, Minimize, Hash, Zap, Upload, FormInput, MousePointer, PenTool, Server, ShieldCheck, ShieldAlert, Shield, Scale, Maximize, Gauge, Thermometer, ListFilter, UserCheck, ArrowUp, DollarSign, FileCheck, CalendarClock, MinusCircle, PlusCircle, Globe, MessageCircle, Award, Gavel, Eye, Calendar, Quote, ThumbsUp, Compass, Move, History, Film, TrendingUp as TrendingUpIcon, List, CheckSquare, Asterisk, File as FileIcon
} from 'lucide-react';
import { atlasService } from '../../../services/atlasService';
import { IOItem } from '../../../types';
import { HighlightedText } from '../../../components/HighlightedText';

// Map of icon strings from DB to Lucide components
const ICON_MAP: Record<string, any> = {
  type: Type,
  image: Image,
  video: Video,
  mic: Mic,
  code: Code,
  'file-text': FileText,
  'map-pin': MapPin,
  cpu: Cpu,
  'bar-chart': BarChart,
  tag: Tag,
  terminal: Terminal,
  user: User,
  activity: Activity,
  fingerprint: Fingerprint,
  'credit-card': CreditCard,
  'message-square': MessageSquare,
  box: Box,
  scan: Scan,
  music: Music,
  table: Table,
  network: Network,
  layers: Layers,
  minimize: Minimize,
  hash: Hash,
  zap: Zap,
  upload: Upload,
  'form-input': FormInput,
  'mouse-pointer': MousePointer,
  'pen-tool': PenTool,
  server: Server,
  settings: Settings,
  'shield-check': ShieldCheck,
  'shield-alert': ShieldAlert,
  shield: Shield,
  scale: Scale,
  maximize: Maximize,
  clock: Clock,
  gauge: Gauge,
  thermometer: Thermometer,
  'list-filter': ListFilter,
  'user-check': UserCheck,
  'arrow-up': ArrowUp,
  'dollar-sign': DollarSign,
  'file-check': FileCheck,
  'calendar-clock': CalendarClock,
  'minus-circle': MinusCircle,
  'plus-circle': PlusCircle,
  globe: Globe,
  'message-circle': MessageCircle,
  award: Award,
  gavel: Gavel,
  eye: Eye,
  calendar: Calendar,
  quote: Quote,
  'thumbs-up': ThumbsUp,
  compass: Compass,
  move: Move,
  history: History,
  film: Film,
  'trending-up': TrendingUpIcon,
  list: List,
  'check-square': CheckSquare,
  asterisk: Asterisk,
  file: FileIcon
};

interface DataArtifactCardProps {
   item: IOItem;
   type?: 'required' | 'optional' | 'output';
}

const DataArtifactCard: React.FC<DataArtifactCardProps> = ({ item, type = 'required' }) => {
  const id = typeof item === 'string' ? item : item.id;
  const label = typeof item === 'string' ? item : item.label;
  const isArray = typeof item === 'string' ? false : item.isArray;
  
  const artifact = atlasService.getDataArtifactById(id);
  const Icon = artifact && ICON_MAP[artifact.icon] ? ICON_MAP[artifact.icon] : Database;

  return (
    <div className={`
      flex items-start gap-3 p-3 rounded-lg border transition-all
      ${type === 'output' ? 'bg-purple-50/30 border-purple-100 hover:border-purple-200' : 'bg-white border-[#E6E6E6] hover:border-gray-300 shadow-sm'}
    `}>
      <div className={`p-2 rounded-md ${type === 'output' ? 'bg-purple-100 text-purple-600' : 'bg-gray-50 text-gray-600'}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="flex items-center gap-2">
           <span className="text-xs font-bold text-[#111111]">{artifact ? artifact.name : id}</span>
           {isArray && <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">List</span>}
           {type === 'optional' && <span className="text-[9px] border border-gray-200 text-gray-400 px-1.5 py-0.5 rounded">Optional</span>}
        </div>
        <div className="text-[11px] text-gray-500 leading-tight mt-0.5">{label}</div>
        {artifact && (
           <div className="text-[9px] text-gray-400 mt-1.5 font-mono">{artifact.format_notes}</div>
        )}
      </div>
    </div>
  );
};

export const TaskDetail = ({ 
  taskId, 
  onTaskClick,
  onBack
}: { 
  taskId: string, 
  onTaskClick: (id: string) => void,
  onBack: () => void 
}) => {
  const task = atlasService.getTaskById(taskId);
  if (!task) return null;

  const layer = atlasService.getLayerById(task.layer_id);
  const relations = atlasService.getTaskRelationships(task.id);

  // Helper for status colors
  const getStatusColor = (val: string) => {
    switch (val) {
      case 'commoditized': case 'none': case 'realtime': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'established': case 'small': case 'optional': case 'interactive': case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'emerging': case 'large': case 'recommended': case 'batch': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'continuous': case 'required': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="pb-20">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-sm text-[#6E6E6E] hover:text-[#111111] transition-colors font-mono group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      {/* Header */}
      <header className="mb-16 pb-12 border-b border-[#E6E6E6]">
        <div className="text-xs uppercase tracking-widest text-[#6E6E6E] mb-6 flex items-center gap-3 font-mono">
          <span className="flex items-center gap-2" style={{ color: layer?.color }}>
             <span className="w-2 h-2 rounded-full" style={{backgroundColor: layer?.color}}></span>
             {layer?.name} Layer
          </span>
          <span className="text-[#E6E6E6]">/</span>
          <span className={`px-2 py-0.5 text-[10px] font-bold border flex items-center gap-1.5 ${
             task.task_type === 'ai' ? 'bg-[#F9F9F7] text-[#111111] border-[#E6E6E6]' :
             task.task_type === 'human' ? 'bg-[#F9F9F7] text-[#111111] border-[#E6E6E6]' :
             'bg-[#F9F9F7] text-[#111111] border-[#E6E6E6]'
          }`}>
             {task.task_type === 'ai' && <BrainCircuit className="w-3 h-3" />}
             {task.task_type === 'human' && <UserCircle className="w-3 h-3" />}
             {task.task_type === 'system' && <Settings className="w-3 h-3" />}
             {task.task_type.toUpperCase()}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-medium tracking-tighter text-[#111111] mb-8">{task.name}</h1>

        <div className="max-w-4xl border-l-2 pl-6 lg:pl-8 py-2" style={{ borderColor: layer?.color }}>
           <p className="text-xl md:text-2xl font-sans font-light text-[#111111] leading-snug mb-6">
             <HighlightedText text={task.elevator_pitch} />
           </p>
           {task.example_usage && (
             <div className="flex items-start gap-3 text-base text-[#6E6E6E]">
                <span className="font-mono text-[10px] uppercase tracking-wider mt-1 text-[#999]">Example</span>
                <span className="font-light"><HighlightedText text={task.example_usage} /></span>
             </div>
           )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-32">
        
        {/* Left Col */}
        <div className="space-y-12 lg:space-y-20">
          
          {/* AI Specific: Implementation Notes */}
          {task.task_type === 'ai' && (
            <section>
              <div className="mb-6">
                <span className="font-mono text-sm text-gray-500">(01)</span>
                <h2 className="text-xl font-sans font-medium tracking-tight mt-2 text-[#111111]">
                  Implementation Constraints
                </h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-white border border-[#E6E6E6]">
                  <div className="flex items-center gap-2 mb-2 text-[#6E6E6E]">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Maturity</span>
                  </div>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide border ${getStatusColor(task.implementation_notes.maturity)}`}>
                    {task.implementation_notes.maturity}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white border border-[#E6E6E6]">
                  <div className="flex items-center gap-2 mb-2 text-[#6E6E6E]">
                    <Database className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Data Req</span>
                  </div>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide border ${getStatusColor(task.implementation_notes.data_requirements)}`}>
                    {task.implementation_notes.data_requirements}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white border border-[#E6E6E6]">
                  <div className="flex items-center gap-2 mb-2 text-[#6E6E6E]">
                    <User className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Oversight</span>
                  </div>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide border ${getStatusColor(task.implementation_notes.human_oversight)}`}>
                    {task.implementation_notes.human_oversight}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white border border-[#E6E6E6]">
                  <div className="flex items-center gap-2 mb-2 text-[#6E6E6E]">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Latency</span>
                  </div>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide border ${getStatusColor(task.implementation_notes.typical_latency)}`}>
                    {task.implementation_notes.typical_latency}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* AI Specific: Capabilities */}
          {task.task_type === 'ai' && (
            <section>
              <div className="mb-6">
                <span className="font-mono text-sm text-gray-500">(02)</span>
                <h2 className="text-xl font-sans font-medium tracking-tight mt-2 text-[#111111]">
                  Technical Capabilities
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {task.capabilities.map((cap, i) => (
                  <div 
                    key={i} 
                    className="px-3 py-2 lg:px-4 bg-white border border-[#E6E6E6] shadow-xs rounded-md text-sm text-[#111111] hover:border-gray-400 transition-colors flex items-center gap-2 cursor-default"
                  >
                    <span>{cap.name}</span>
                    <span className="text-[10px] text-[#999] font-mono bg-[#F9F9F7] px-1.5 py-0.5 rounded hidden sm:inline-block">{cap.tag}</span>
                    <a 
                      href={`https://huggingface.co/models?pipeline_tag=${cap.tag}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 flex items-center gap-1 px-1.5 py-0.5 rounded bg-gray-50 hover:bg-[#FFF8E0] border border-gray-200 hover:border-[#FFD21E] transition-colors group/hf"
                      title="View models on Hugging Face"
                    >
                       <span className="text-xs filter grayscale opacity-60 group-hover/hf:grayscale-0 group-hover/hf:opacity-100 transition-all">🤗</span>
                       <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover/hf:text-gray-700" />
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* AI Specific: UX Guardrails */}
          {task.task_type === 'ai' && (
            <section>
              <div className="mb-6">
                <span className="font-mono text-sm text-gray-500">(03)</span>
                <h2 className="text-xl font-sans font-medium tracking-tight mt-2 text-[#111111]">
                  UX Guardrails
                </h2>
              </div>
              <div className="bg-[#F0F0EE] p-6 lg:p-8 rounded-xl shadow-sm inset-shadow-sm" >
                <div className="mb-6 lg:mb-8">
                  <div className="text-[11px] uppercase tracking-wider text-[#6E6E6E] mb-2">Primary Risk</div>
                  <div className="font-medium text-[#111111] flex items-start gap-3 text-base lg:text-lg">
                    <AlertTriangle className="w-5 h-5 mt-1 text-orange-600 flex-shrink-0" />
                    {task.ux_notes.risk}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#6E6E6E] mb-2">Designer Tip</div>
                  <div className="font-medium text-[#111111] flex items-start gap-3 text-base lg:text-lg">
                    <Lightbulb className="w-5 h-5 mt-1 text-blue-600 flex-shrink-0" />
                    {task.ux_notes.tip}
                  </div>
                </div>
              </div>
              {task.ux_notes.anti_patterns.length > 0 && (
                <div className="mt-8">
                  <div className="text-[11px] uppercase text-[#6E6E6E] mb-4 tracking-wider">Avoid Usage When:</div>
                  <ul className="space-y-3">
                    {task.ux_notes.anti_patterns.map((pat, i) => (
                      <li key={i} className="text-sm text-[#6E6E6E] flex items-start gap-3 bg-white p-3 rounded border border-[#E6E6E6]">
                        <span className="text-red-400 font-bold">•</span>
                        {pat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Human/System Specific: Variants */}
          {(task.task_type === 'human' || task.task_type === 'system') && (
            <section>
              <div className="mb-6">
                <span className="font-mono text-sm text-gray-500">(01)</span>
                <h2 className="text-xl font-sans font-medium tracking-tight mt-2 text-[#111111]">
                  Common Variants
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                 {task.common_variants.map((variant, i) => (
                    <div key={i} className="px-4 py-3 bg-white border border-[#E6E6E6] rounded-lg text-sm text-[#111111] font-medium shadow-sm">
                       {variant.replace(/_/g, ' ')}
                    </div>
                 ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Col */}
        <div className="space-y-12 lg:space-y-20">

          <section>
            <div className="mb-6">
              <span className="font-mono text-sm text-gray-500">Data Flow</span>
              <h2 className="text-lg font-sans font-medium tracking-tight mt-2 text-[#111111]">
                Inputs & Outputs
              </h2>
            </div>
            <div className="space-y-8">
              
              {/* Inputs */}
              <div>
                <div className="flex items-center justify-between mb-3">
                   <span className="text-[10px] uppercase tracking-wider text-[#6E6E6E] font-bold">Typical Inputs</span>
                   <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 rounded-full">{task.io_spec.inputs.required.length + task.io_spec.inputs.optional.length}</span>
                </div>
                <div className="flex flex-col gap-2">
                   {task.io_spec.inputs.required.length === 0 && task.io_spec.inputs.optional.length === 0 && (
                      <span className="text-sm text-gray-400 italic">No explicit data inputs</span>
                   )}
                   {task.io_spec.inputs.required.map((item, i) => (
                      <DataArtifactCard key={`req-${i}`} item={item} type="required" />
                   ))}
                   {task.io_spec.inputs.optional.map((item, i) => (
                      <DataArtifactCard key={`opt-${i}`} item={item} type="optional" />
                   ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center text-[#E6E6E6]">
                 <ArrowRight className="w-5 h-5 rotate-90" />
              </div>

              {/* Outputs */}
              <div>
                <div className="flex items-center justify-between mb-3">
                   <span className="text-[10px] uppercase tracking-wider text-[#6E6E6E] font-bold">Typical Outputs</span>
                </div>
                <div className="flex flex-col gap-2">
                   <DataArtifactCard item={task.io_spec.outputs.primary} type="output" />
                   {task.io_spec.outputs.metadata.map((item, i) => (
                      <DataArtifactCard key={`meta-${i}`} item={item} type="optional" />
                   ))}
                </div>
              </div>

            </div>
          </section>

          {relations.length > 0 && (
            <section>
              <div className="mb-6">
                <span className="font-mono text-sm text-gray-500">Relations</span>
                <h2 className="text-lg font-sans font-medium tracking-tight mt-2 text-[#111111]">
                  System Map
                </h2>
              </div>
              <div className="bg-white border border-[#E6E6E6] p-6 lg:p-8">
                <div className="space-y-8">
                  {/* Upstream */}
                  {relations.filter(r => r.category === 'upstream').length > 0 && (
                    <div className="space-y-4">
                       <div className="text-[10px] uppercase text-[#6E6E6E] flex items-center gap-1.5 font-bold tracking-wider">
                          <ArrowLeft className="w-3 h-3" /> Upstream Dependencies
                       </div>
                       {relations.filter(r => r.category === 'upstream').map((rel, i) => (
                         <div key={i} onClick={() => onTaskClick(rel.targetId)} className="group cursor-pointer flex flex-col">
                            <span className="text-base font-medium text-[#111111] group-hover:text-blue-600 transition-colors">{rel.targetName}</span>
                            <span className="text-xs text-[#999]">{rel.reason}</span>
                         </div>
                       ))}
                    </div>
                  )}

                  {relations.filter(r => r.category === 'upstream').length > 0 && relations.filter(r => r.category === 'downstream').length > 0 && (
                    <div className="h-px bg-[#F0F0EE] w-full"></div>
                  )}

                  {/* Downstream */}
                  {relations.filter(r => r.category === 'downstream').length > 0 && (
                     <div className="space-y-4">
                        <div className="text-[10px] uppercase text-[#6E6E6E] flex items-center gap-1.5 font-bold tracking-wider">
                           <ArrowRight className="w-3 h-3" /> Enables Downstream
                        </div>
                        {relations.filter(r => r.category === 'downstream').map((rel, i) => (
                          <div key={i} onClick={() => onTaskClick(rel.targetId)} className="group cursor-pointer flex flex-col">
                             <span className="text-base font-medium text-[#111111] group-hover:text-blue-600 transition-colors">{rel.targetName}</span>
                             <span className="text-xs text-[#999]">{rel.reason}</span>
                          </div>
                        ))}
                     </div>
                  )}
                  
                  {relations.filter(r => r.category === 'lateral').length > 0 && (
                    <>
                      <div className="h-px bg-[#F0F0EE] w-full"></div>
                      <div className="space-y-4">
                          <div className="text-[10px] uppercase text-[#6E6E6E] flex items-center gap-1.5 font-bold tracking-wider">
                            <GitCommit className="w-3 h-3" /> Related Patterns
                          </div>
                          {relations.filter(r => r.category === 'lateral').map((rel, i) => (
                            <div key={i} onClick={() => onTaskClick(rel.targetId)} className="group cursor-pointer flex flex-col">
                                <span className="text-base font-medium text-[#111111] group-hover:text-blue-600 transition-colors">{rel.targetName}</span>
                                <span className="text-xs text-[#999]">{rel.reason}</span>
                            </div>
                          ))}
                      </div>
                    </>
                  )}

                  {relations.filter(r => r.category === 'conflict').length > 0 && (
                    <>
                      <div className="h-px bg-[#F0F0EE] w-full"></div>
                      <div className="space-y-4">
                          <div className="text-[10px] uppercase text-red-600 flex items-center gap-1.5 font-bold tracking-wider">
                            <XCircle className="w-3 h-3" /> Anti-Patterns
                          </div>
                          {relations.filter(r => r.category === 'conflict').map((rel, i) => (
                            <div key={i} onClick={() => onTaskClick(rel.targetId)} className="group cursor-pointer flex flex-col">
                                <span className="text-base font-medium text-red-700 group-hover:text-red-800 transition-colors line-through decoration-red-300">{rel.targetName}</span>
                                <span className="text-xs text-red-500">{rel.reason}</span>
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

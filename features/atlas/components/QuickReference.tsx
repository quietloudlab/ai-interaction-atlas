
import React, { useState } from 'react';
import {
  Layers,
  BrainCircuit,
  UserCircle,
  Settings,
  Database,
  Shield,
  Users,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { atlasService } from '../../../services/atlasService';
import type { AiTask, HumanTask, SystemTask } from '../../../types';

const CollapsibleSection = ({
  title,
  icon: Icon,
  color,
  children,
  defaultOpen = false
}: {
  title: string;
  icon: any;
  color: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-[#E6E6E6] rounded-lg overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md" style={{ backgroundColor: `${color}15` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <h2 className="text-lg font-bold text-[#111111]">{title}</h2>
        </div>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-6 pt-2 border-t border-[#E6E6E6] bg-[#F9F9F7]">
          {children}
        </div>
      )}
    </div>
  );
};

export const QuickReference = () => {
  const layers = atlasService.getLayers();
  const aiTasks = atlasService.getTasks('ai');
  const humanTasks = atlasService.getTasks('human');
  const systemTasks = atlasService.getTasks('system');
  const dataArtifacts = atlasService.getDataArtifacts();
  const constraints = atlasService.getConstraints();
  const touchpoints = atlasService.getTouchpoints();

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter text-[#111111] mb-4">
          Quick Reference
        </h1>
        <p className="text-lg text-[#6E6E6E] max-w-3xl">
          A comprehensive reference of all Atlas components, patterns, and definitions.
        </p>
      </header>

      <div className="space-y-6">

        {/* Layers */}
        <CollapsibleSection
          title={`Layers (${layers.length})`}
          icon={Layers}
          color="#6366F1"
          defaultOpen={true}
        >
          <div className="space-y-6">
            {layers.map((layer, idx) => (
              <div key={layer.id} className="bg-white p-4 rounded-lg border border-[#E6E6E6]">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />
                  <h3 className="font-bold text-[#111111]">{layer.name}</h3>
                  <span className="text-xs text-gray-400 font-mono">Layer {idx + 1}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Role:</span>{' '}
                    <span className="text-gray-600">{layer.role}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Description:</span>{' '}
                    <span className="text-gray-600">{layer.description}</span>
                  </div>
                  {layer.guidance && (
                    <>
                      <div>
                        <span className="font-semibold text-gray-700">When to Use:</span>{' '}
                        <span className="text-gray-600">{layer.guidance.when_to_use}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Typical Position:</span>{' '}
                        <span className="text-gray-600">{layer.guidance.typical_position}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* AI Tasks */}
        <CollapsibleSection
          title={`AI Tasks (${aiTasks.length})`}
          icon={BrainCircuit}
          color="#8B5CF6"
          defaultOpen={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiTasks.map((task) => {
              const aiTask = task as AiTask;
              return (
                <div key={task.id} className="bg-white p-4 rounded-lg border border-[#E6E6E6]">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-[#111111]">{task.name}</h3>
                    <span className="text-[9px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      {task.slug}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{task.elevator_pitch}</p>

                  {aiTask.capabilities && aiTask.capabilities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {aiTask.capabilities.slice(0, 3).map((cap: any, i: number) => (
                        <span
                          key={i}
                          className="text-[9px] px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded font-medium"
                        >
                          {cap.name}
                        </span>
                      ))}
                      {aiTask.capabilities.length > 3 && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                          +{aiTask.capabilities.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="text-[10px] text-gray-500 space-y-1">
                    <div>
                      <span className="font-semibold">Maturity:</span> {aiTask.implementation_notes.maturity}
                    </div>
                    <div>
                      <span className="font-semibold">Latency:</span> {aiTask.implementation_notes.typical_latency}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CollapsibleSection>

        {/* Human Tasks */}
        <CollapsibleSection
          title={`Human Tasks (${humanTasks.length})`}
          icon={UserCircle}
          color="#3B82F6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {humanTasks.map((task) => {
              const humanTask = task as HumanTask;
              return (
                <div key={task.id} className="bg-white p-4 rounded-lg border border-[#E6E6E6]">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-[#111111]">{task.name}</h3>
                    <span className="text-[9px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      {task.slug}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{task.elevator_pitch}</p>

                  {humanTask.common_variants && humanTask.common_variants.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {humanTask.common_variants.slice(0, 3).map((variant: string, i: number) => (
                        <span
                          key={i}
                          className="text-[9px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded font-medium"
                        >
                          {variant.replace(/_/g, ' ')}
                        </span>
                      ))}
                      {humanTask.common_variants.length > 3 && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                          +{humanTask.common_variants.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CollapsibleSection>

        {/* System Tasks */}
        <CollapsibleSection
          title={`System Tasks (${systemTasks.length})`}
          icon={Settings}
          color="#6B7280"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemTasks.map((task) => {
              const systemTask = task as SystemTask;
              return (
                <div key={task.id} className="bg-white p-4 rounded-lg border border-[#E6E6E6]">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-[#111111]">{task.name}</h3>
                    <span className="text-[9px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      {task.slug}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{task.elevator_pitch}</p>

                  {systemTask.common_variants && systemTask.common_variants.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {systemTask.common_variants.slice(0, 3).map((variant: string, i: number) => (
                        <span
                          key={i}
                          className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded font-medium"
                        >
                          {variant.replace(/_/g, ' ')}
                        </span>
                      ))}
                      {systemTask.common_variants.length > 3 && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">
                          +{systemTask.common_variants.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CollapsibleSection>

        {/* Data Artifacts */}
        <CollapsibleSection
          title={`Data Artifacts (${dataArtifacts.length})`}
          icon={Database}
          color="#10B981"
        >
          <div className="space-y-3">
            {dataArtifacts.map((artifact) => (
              <div key={artifact.id} className="bg-white p-3 rounded-lg border border-[#E6E6E6]">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-sm text-[#111111]">{artifact.name}</h3>
                  <span className="text-[9px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                    {artifact.id}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{artifact.description}</p>

                <div className="text-[10px]">
                  <span className="font-semibold text-gray-700">Category:</span>{' '}
                  <span className="text-gray-600">{artifact.category}</span>
                </div>

                {artifact.format_notes && (
                  <div className="mt-2 text-[10px] text-gray-500 font-mono bg-gray-50 p-2 rounded">
                    {artifact.format_notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Constraints */}
        <CollapsibleSection
          title={`Constraints (${constraints.length})`}
          icon={Shield}
          color="#EF4444"
        >
          <div className="space-y-3">
            {constraints.map((constraint) => (
              <div key={constraint.id} className="bg-white p-3 rounded-lg border border-[#E6E6E6]">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-sm text-[#111111]">{constraint.name}</h3>
                  <span className="text-[9px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                    {constraint.id}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{constraint.description}</p>

                <div className="text-[10px]">
                  <span className="font-semibold text-gray-700">Category:</span>{' '}
                  <span className="text-gray-600">{constraint.category}</span>
                </div>

                {constraint.applies_to && constraint.applies_to.length > 0 && (
                  <div className="mt-2">
                    <span className="text-[10px] font-semibold text-gray-700">Applies to:</span>{' '}
                    <span className="text-[10px] text-gray-600">
                      {constraint.applies_to.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Touchpoints */}
        <CollapsibleSection
          title={`Touchpoints (${touchpoints.length})`}
          icon={Users}
          color="#F59E0B"
        >
          <div className="space-y-3">
            {touchpoints.map((touchpoint) => (
              <div key={touchpoint.id} className="bg-white p-3 rounded-lg border border-[#E6E6E6]">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-sm text-[#111111]">{touchpoint.name}</h3>
                  <span className="text-[9px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                    {touchpoint.id}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{touchpoint.description}</p>

                <div className="text-[10px]">
                  <span className="font-semibold text-gray-700">Category:</span>{' '}
                  <span className="text-gray-600">{touchpoint.category}</span>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

      </div>

      {/* Footer Stats */}
      <div className="mt-12 p-6 bg-[#F9F9F7] rounded-lg border border-[#E6E6E6]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[#111111]">{layers.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Layers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{aiTasks.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">AI Tasks</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{humanTasks.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Human Tasks</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-600">{systemTasks.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">System Tasks</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{dataArtifacts.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Data Types</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{constraints.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Constraints</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-600">{touchpoints.length}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Touchpoints</div>
          </div>
        </div>
      </div>
    </div>
  );
};

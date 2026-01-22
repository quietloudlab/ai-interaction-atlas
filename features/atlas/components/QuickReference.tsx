
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
    <div className="border border-[var(--border)] bg-[var(--surface)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-[var(--bg)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 border border-[var(--border)]" style={{ backgroundColor: color + '15' }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <h2 className="text-lg font-sans font-medium text-[var(--text-main)]">{title}</h2>
        </div>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
        ) : (
          <ChevronRight className="w-5 h-5 text-[var(--text-muted)]" />
        )}
      </button>

      {isOpen && (
        <div className="p-6 pt-4 border-t border-[var(--border)] bg-[var(--surface)]">
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
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter text-[var(--text-main)] mb-4">
          Quick Reference
        </h1>
        <p className="text-lg text-[var(--text-muted)] max-w-3xl">
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
              <div key={layer.id} className="bg-[var(--surface)] p-4 border border-[var(--border)]">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-3 h-3"
                    style={{ backgroundColor: layer.color }}
                  />
                  <h3 className="font-sans font-medium text-[var(--text-main)]">{layer.name}</h3>
                  <span className="text-xs text-[var(--text-muted)] font-mono">Layer {idx + 1}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-[var(--text-main)]">Role:</span>{' '}
                    <span className="text-[var(--text-muted)]">{layer.role}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[var(--text-main)]">Description:</span>{' '}
                    <span className="text-[var(--text-muted)]">{layer.description}</span>
                  </div>
                  {layer.guidance && (
                    <>
                      <div>
                        <span className="font-semibold text-[var(--text-main)]">When to Use:</span>{' '}
                        <span className="text-[var(--text-muted)]">{layer.guidance.when_to_use}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--text-main)]">Typical Position:</span>{' '}
                        <span className="text-[var(--text-muted)]">{layer.guidance.typical_position}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* AI Patterns */}
        <CollapsibleSection
          title={`AI Patterns (${aiTasks.length})`}
          icon={BrainCircuit}
          color="#8B22F1"
          defaultOpen={true}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiTasks.map((task) => {
              const aiTask = task as AiTask;
              return (
                <div key={task.id} className="bg-[var(--surface)] p-4 border border-[var(--border)]">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-sans font-medium text-[var(--text-main)]">{task.name}</h3>
                    <span className="text-[9px] font-mono text-[var(--text-muted)] bg-[var(--bg)] px-1.5 py-0.5 rounded">
                      {task.slug}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mb-3">{task.elevator_pitch}</p>

                  {aiTask.capabilities && aiTask.capabilities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {aiTask.capabilities.slice(0, 3).map((cap: any, i: number) => (
                        <span
                          key={i}
                          className="text-[9px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded font-medium"
                        >
                          {cap.name}
                        </span>
                      ))}
                      {aiTask.capabilities.length > 3 && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-[var(--bg)] text-[var(--text-muted)] rounded">
                          +{aiTask.capabilities.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="text-[10px] text-[var(--text-muted)] space-y-1">
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

        {/* Human Actions */}
        <CollapsibleSection
          title={`Human Actions (${humanTasks.length})`}
          icon={UserCircle}
          color="#2B5CF3"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {humanTasks.map((task) => {
              const humanTask = task as HumanTask;
              return (
                <div key={task.id} className="bg-[var(--surface)] p-4 border border-[var(--border)]">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-sans font-medium text-[var(--text-main)]">{task.name}</h3>
                    <span className="text-[9px] font-mono text-[var(--text-muted)] bg-[var(--bg)] px-1.5 py-0.5 rounded">
                      {task.slug}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mb-3">{task.elevator_pitch}</p>

                  {humanTask.common_variants && humanTask.common_variants.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {humanTask.common_variants.slice(0, 3).map((variant: string, i: number) => (
                        <span
                          key={i}
                          className="text-[9px] px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded font-medium"
                        >
                          {variant.replace(/_/g, ' ')}
                        </span>
                      ))}
                      {humanTask.common_variants.length > 3 && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-[var(--bg)] text-[var(--text-muted)] rounded">
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

        {/* System Operations */}
        <CollapsibleSection
          title={`System Operations (${systemTasks.length})`}
          icon={Settings}
          color="#4C5564"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemTasks.map((task) => {
              const systemTask = task as SystemTask;
              return (
                <div key={task.id} className="bg-[var(--surface)] p-4 border border-[var(--border)]">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-sans font-medium text-[var(--text-main)]">{task.name}</h3>
                    <span className="text-[9px] font-mono text-[var(--text-muted)] bg-[var(--bg)] px-1.5 py-0.5 rounded">
                      {task.slug}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mb-3">{task.elevator_pitch}</p>

                  {systemTask.common_variants && systemTask.common_variants.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {systemTask.common_variants.slice(0, 3).map((variant: string, i: number) => (
                        <span
                          key={i}
                          className="text-[9px] px-1.5 py-0.5 bg-[var(--bg)] text-[var(--text-main)] rounded font-medium"
                        >
                          {variant.replace(/_/g, ' ')}
                        </span>
                      ))}
                      {systemTask.common_variants.length > 3 && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-[var(--bg)] text-[var(--text-muted)] rounded">
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

        {/* Data Modalities */}
        <CollapsibleSection
          title={`Data Modalities (${dataArtifacts.length})`}
          icon={Database}
          color="#D37709"
        >
          <div className="space-y-3">
            {dataArtifacts.map((artifact) => (
              <div key={artifact.id} className="bg-[var(--surface)] p-3 border border-[var(--border)]">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-sans font-medium text-sm text-[var(--text-main)]">{artifact.name}</h3>
                  <span className="text-[9px] font-mono text-[var(--text-muted)] bg-[var(--bg)] px-1.5 py-0.5 rounded">
                    {artifact.id}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mb-2">{artifact.description}</p>

                <div className="text-[10px]">
                  <span className="font-semibold text-[var(--text-main)]">Category:</span>{' '}
                  <span className="text-[var(--text-muted)]">{artifact.category}</span>
                </div>

                {artifact.format_notes && (
                  <div className="mt-2 text-[10px] text-[var(--text-muted)] font-mono bg-[var(--bg)] p-2 rounded">
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
          color="#D91A45"
        >
          <div className="space-y-3">
            {constraints.map((constraint) => (
              <div key={constraint.id} className="bg-[var(--surface)] p-3 border border-[var(--border)]">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-sans font-medium text-sm text-[var(--text-main)]">{constraint.name}</h3>
                  <span className="text-[9px] font-mono text-[var(--text-muted)] bg-[var(--bg)] px-1.5 py-0.5 rounded">
                    {constraint.id}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mb-2">{constraint.description}</p>

                <div className="text-[10px]">
                  <span className="font-semibold text-[var(--text-main)]">Category:</span>{' '}
                  <span className="text-[var(--text-muted)]">{constraint.category}</span>
                </div>

                {constraint.applies_to && constraint.applies_to.length > 0 && (
                  <div className="mt-2">
                    <span className="text-[10px] font-semibold text-[var(--text-main)]">Applies to:</span>{' '}
                    <span className="text-[10px] text-[var(--text-muted)]">
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
          color="#3090B5"
        >
          <div className="space-y-3">
            {touchpoints.map((touchpoint) => (
              <div key={touchpoint.id} className="bg-[var(--surface)] p-3 border border-[var(--border)]">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-sans font-medium text-sm text-[var(--text-main)]">{touchpoint.name}</h3>
                  <span className="text-[9px] font-mono text-[var(--text-muted)] bg-[var(--bg)] px-1.5 py-0.5 rounded">
                    {touchpoint.id}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mb-2">{touchpoint.description}</p>

                <div className="text-[10px]">
                  <span className="font-semibold text-[var(--text-main)]">Category:</span>{' '}
                  <span className="text-[var(--text-muted)]">{touchpoint.category}</span>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

      </div>

      {/* Footer Stats */}
      <div className="mt-12 p-6 bg-[var(--bg)] border border-[var(--border)]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--text-main)]">{layers.length}</div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Layers</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#8B22F1' }}>{aiTasks.length}</div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">AI Patterns</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#2B5CF3' }}>{humanTasks.length}</div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Human Actions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#4C5564] dark:text-[#8A91A0]">{systemTasks.length}</div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">System Operations</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#D37709' }}>{dataArtifacts.length}</div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Data Modalities</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#D91A45' }}>{constraints.length}</div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Constraints</div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: '#3090B5' }}>{touchpoints.length}</div>
            <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Touchpoints</div>
          </div>
        </div>
      </div>
    </div>
  );
};

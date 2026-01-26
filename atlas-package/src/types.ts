/**
 * Copyright 2025 quietloudlab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export interface Meta {
  title: string;
  description: string;
  version: string;
  schema_version: string;
}

export interface LayerGuidance {
  when_to_use: string;
  typical_position: string;
  red_flags: string[];
}

export interface Layer {
  id: string;
  name: string;
  slug: string;
  label: string;
  role: string;
  description: string;
  color: string;
  guidance?: LayerGuidance;
}

// Updated IO Spec to allow for rich objects (optional backward compatibility with strings)
export type IOItem = string | { id: string; label: string; isArray?: boolean };

export interface IOSpec {
  inputs: {
    required: IOItem[];
    optional: IOItem[];
  };
  constraints?: {
    optional: IOItem[];
  };
  outputs: {
    primary: IOItem;
    metadata: IOItem[];
  };
}

// --- AI Task Specifics ---

export interface ImplementationNotes {
  maturity: 'emerging' | 'established' | 'commoditized';
  typical_latency: 'realtime' | 'interactive' | 'batch';
  data_requirements: 'none' | 'small' | 'medium' | 'large' | 'continuous';
  human_oversight: 'none' | 'optional' | 'recommended' | 'required';
}

export interface UxNotes {
  risk: string;
  tip: string;
  anti_patterns: string[];
}

export interface Capability {
  name: string;
  tag: string;
  example: string;
}

export interface Relation {
  target_id: string;
  type: string;
  strength: string;
  reason: string;
}

export interface BaseTask {
  id: string;
  layer_id: string;
  name: string;
  slug: string;
  elevator_pitch: string;
  example_usage: string;
  io_spec: IOSpec;
}

export interface AiTask extends BaseTask {
  task_type: 'ai';
  implementation_notes: ImplementationNotes;
  ux_notes: UxNotes;
  capabilities: Capability[];
  relations: Relation[];
}

export interface HumanTask extends BaseTask {
  task_type: 'human';
  common_variants: string[];
  relations: Relation[];
}

export interface SystemTask extends BaseTask {
  task_type: 'system';
  common_variants: string[];
  relations: Relation[];
}

export type Task = AiTask | HumanTask | SystemTask;

// --- New Node Entities ---

export type DataCategory = 
  | 'text' 
  | 'visual' 
  | 'audio' 
  | 'structured' 
  | 'compound' 
  | 'user_input' 
  | 'system'
  | 'generic';

export interface DataArtifactDefinition {
  id: string;
  name: string;
  category: DataCategory;
  icon: string; // lucide icon name
  description?: string;
  examples?: string[];
  compatible_with?: string[];
  format_notes?: string;
}

export type ConstraintCategory =
  | 'quality_safety'
  | 'performance_resource'
  | 'model_technical'
  | 'ux_interaction'
  | 'data_context'
  | 'execution_behavior'
  | 'code_philosophy'
  | 'attribution';

export interface ConstraintDefinition {
  id: string;
  name: string;
  category: ConstraintCategory;
  icon: string; // lucide icon name
  description?: string;
  type?: string; // e.g. "Integer", "Boolean"
  applies_to?: string[];
  ux_note?: string;
  example_values?: string;
}

// --- Touchpoints (Interfaces) ---

export type TouchpointCategory =
  | 'screen_interface'
  | 'conversational'
  | 'voice_audio'
  | 'spatial_computing'
  | 'technical'
  | 'physical_devices';

export interface TouchpointDefinition {
  id: string;
  name: string;
  category: TouchpointCategory;
  icon: string;
  description: string;
  examples: string[];
}

// --- Workflows & Examples ---

export interface TemplateAttachment {
  id: string; // Unique ID within the template
  referenceId: string; // Reference ID of the data/constraint
  type: 'data' | 'constraint';
  direction?: 'input' | 'output';
  notes?: string;
}

export interface WorkflowTaskStep {
  task_id: string; // Acts as reference_id for Data/Constraint/Annotation
  position: number;
  label: string;
  optional?: boolean;
  conditional?: string;
  notes?: string; // Specific implementation notes for this step
  // Layout & Graph properties
  id?: string; // Unique ID within the template (e.g. "step_1")
  node_type?: 'task' | 'data' | 'constraint' | 'annotation' | 'touchpoint' | 'actor'; // Defaults to 'task' if undefined
  row?: number; // Visual row index (0 is center, negative is up, positive is down)
  col?: number; // Visual column index (overrides position for layout if present)
  width?: number; // For annotations (zones)
  height?: number; // For annotations (zones)
  attachments?: TemplateAttachment[]; // Docked items
  personaId?: string; // Link to a Persona for multi-role workflows
  subType?: 'note' | 'zone'; // For annotations
  customLabel?: string; // Override display label
  capability?: string; // Specific AI capability for task nodes
  color?: string; // Custom node coloring
  customDefinition?: { // For user-created custom nodes
    name: string;
    description?: string;
    icon?: string;
    task_type?: 'ai' | 'human' | 'system';
    layer_id?: string;
  };
}

export interface WorkflowTemplateEdge {
  source: string; // references step.id
  target: string; // references step.id
  label?: string;
  attachments?: TemplateAttachment[]; // Data/constraints attached to edge
  customX?: number; // Manual vertical segment adjustment (forward connections)
  customY?: number; // Manual horizontal segment adjustment (backward connections)
  sourceX?: number; // Manual source vertical segment (backward connections)
  targetX?: number; // Manual target vertical segment (backward connections)
  sourceHandle?: 'left' | 'right' | 'top' | 'bottom'; // Source port
  targetHandle?: 'left' | 'right' | 'top' | 'bottom'; // Target port
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  primary_use_case: string;
  // Map format: BuilderNode with absolute x/y positioning (exported from canvas)
  nodes: BuilderNode[];
  // Edges connect nodes by ID
  edges: BuilderEdge[];
  common_variations: string[];
  complexity?: string;
  tags?: string[];
  personas?: Persona[]; // Optional personas for multi-user/multi-role workflows
}

export interface Node {
  task_id: string;
  x: number;
  y: number;
  label: string;
}

export interface Example {
  id: string;
  primary_task_id: string;
  title: string;
  description: string;
  industry: string;
  complexity: 'Low' | 'Medium' | 'High';
  tags: string[];
  image_url: string;
  nodes: Node[];
}

export interface AtlasData {
  meta: Meta;
  layers: Layer[];
  ai_tasks: AiTask[];
  human_tasks: HumanTask[];
  system_tasks: SystemTask[];
  data_artifacts: DataArtifactDefinition[];
  constraints: ConstraintDefinition[];
  touchpoints: TouchpointDefinition[];
  workflow_templates: WorkflowTemplate[];
  examples: Example[];
}

// --- Builder Mode Types ---

export type NodeType = 'task' | 'data' | 'constraint' | 'annotation' | 'touchpoint' | 'actor';

export type ActorCategory = 'human' | 'ai' | 'system' | 'other';

export interface Persona {
  id: string;
  name: string;
  role?: string;
  color: string; // Hex code
  initials: string;
  category: ActorCategory;
}

export interface NodeAttachment {
  id: string; // Unique instance ID
  referenceId: string; // ID from DB (e.g. 'const_privacy')
  type: 'data' | 'constraint';
  direction?: 'input' | 'output'; // Differentiate I/O
  notes?: string; // General context notes
  examples?: string; // Data-specific examples, schema, or modifiers
}

export interface BuilderNode {
  id: string;
  type: NodeType;
  referenceId: string; // ID of the task, data, constraint, OR actor ID, OR 'sticky_note'/'zone' for annotation
  x: number;
  y: number;

  // Visual styling for annotations
  width?: number;
  height?: number;

  // Auto-calculated dimensions for accurate edge connecting
  measuredW?: number;
  measuredH?: number;

  color?: string; // hex or tailwind class reference
  subType?: 'note' | 'zone'; // For annotations
  semanticType?: 'data' | 'constraint' | 'touchpoint' | 'task'; // Semantic type for zones (makes them connectable)

  customLabel?: string;
  notes?: string;
  designerDescription?: string; // Custom UX-focused description for experiential view
  personaId?: string; // Link to a Persona (legacy assignment to task)
  capability?: string; // Specific capability selection for AI tasks
  attachments?: NodeAttachment[]; // Nested constraints/data
  // Support for custom user-created nodes that don't exist in the DB
  customDefinition?: {
    name: string;
    description?: string;
    icon?: string;
    task_type?: 'ai' | 'human' | 'system'; // For tasks
    layer_id?: string; // For tasks
  };
}

export interface BuilderEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  attachments?: NodeAttachment[];
  sourceHandle?: 'left' | 'right' | 'top' | 'bottom'; // Which port the edge connects to on source node
  targetHandle?: 'left' | 'right' | 'top' | 'bottom'; // Which port the edge connects to on target node
  customX?: number; // Manual override for vertical segment X (Forward connections)
  customY?: number; // Manual override for horizontal segment Y (Backward connections)
  sourceX?: number; // Manual override for vertical segment near source (Backward connections)
  targetX?: number; // Manual override for vertical segment near target (Backward connections)
}

export interface BuilderState {
  nodes: BuilderNode[];
  edges: BuilderEdge[];
  personas: Persona[];
}

// --- Project Management ---

export interface Project {
  id: string;
  name: string;
  description: string;
  lastModified: number;
  data: BuilderState;
  tags?: string[];
}

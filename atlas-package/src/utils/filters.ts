import type { AiTask, HumanTask, SystemTask, DataArtifactDefinition, ConstraintDefinition, TouchpointDefinition, Layer } from '../types';
import { AI_TASKS } from '../data/ai_tasks';
import { HUMAN_TASKS } from '../data/human_tasks';
import { SYSTEM_TASKS } from '../data/system_tasks';
import { DATA_ARTIFACTS } from '../data/artifacts';
import { CONSTRAINTS } from '../data/constraints';
import { TOUCHPOINTS } from '../data/touchpoints';
import { LAYERS } from '../data/layers';

/**
 * Filter AI/Human/System tasks by layer
 *
 * @param tasks - Array of tasks to filter
 * @param layerId - Layer ID to filter by
 * @returns Filtered tasks
 *
 * @example
 * ```typescript
 * import { AI_TASKS, filterByLayer } from '@quietloudlab/ai-interaction-atlas';
 *
 * const inboundTasks = filterByLayer(AI_TASKS, 'layer_inbound');
 * ```
 */
export function filterByLayer<T extends AiTask | HumanTask | SystemTask>(
  tasks: T[],
  layerId: string
): T[] {
  return tasks.filter((task) => task.layer_id === layerId);
}

/**
 * Get all tasks in a specific layer
 *
 * @param layerId - Layer ID
 * @returns Object containing ai, human, and system tasks in that layer
 *
 * @example
 * ```typescript
 * const inbound = getTasksByLayer('layer_inbound');
 * console.log(inbound.ai); // All AI tasks in inbound layer
 * ```
 */
export function getTasksByLayer(layerId: string) {
  return {
    ai: filterByLayer(AI_TASKS, layerId),
    human: filterByLayer(HUMAN_TASKS, layerId),
    system: filterByLayer(SYSTEM_TASKS, layerId),
  };
}

/**
 * Get a layer definition by ID
 *
 * @param layerId - Layer ID
 * @returns Layer definition or undefined
 *
 * @example
 * ```typescript
 * const layer = getLayer('layer_inbound');
 * console.log(layer?.name); // "Inbound (Sensing & Structuring)"
 * ```
 */
export function getLayer(layerId: string): Layer | undefined {
  return LAYERS.find((layer) => layer.id === layerId);
}

/**
 * Filter data artifacts by category
 *
 * @param category - Category to filter by (e.g., 'text', 'visual', 'audio')
 * @returns Filtered artifacts
 *
 * @example
 * ```typescript
 * const textArtifacts = filterArtifactsByCategory('text');
 * const visualArtifacts = filterArtifactsByCategory('visual');
 * ```
 */
export function filterArtifactsByCategory(category: string): DataArtifactDefinition[] {
  return DATA_ARTIFACTS.filter((artifact) => artifact.category === category);
}

/**
 * Filter constraints by category
 *
 * @param category - Category to filter by
 * @returns Filtered constraints
 *
 * @example
 * ```typescript
 * const qualityConstraints = filterConstraintsByCategory('Quality & Safety');
 * const performanceConstraints = filterConstraintsByCategory('Performance & Resource');
 * ```
 */
export function filterConstraintsByCategory(category: string): ConstraintDefinition[] {
  return CONSTRAINTS.filter((constraint) => constraint.category === category);
}

/**
 * Filter touchpoints by category
 *
 * @param category - Category to filter by
 * @returns Filtered touchpoints
 *
 * @example
 * ```typescript
 * const screenTouchpoints = filterTouchpointsByCategory('Screen Interface');
 * const voiceTouchpoints = filterTouchpointsByCategory('Voice/Audio');
 * ```
 */
export function filterTouchpointsByCategory(category: string): TouchpointDefinition[] {
  return TOUCHPOINTS.filter((touchpoint) => touchpoint.category === category);
}

/**
 * Get all unique categories for a dimension
 *
 * @param dimension - Dimension to get categories from
 * @returns Array of unique category names
 *
 * @example
 * ```typescript
 * const artifactCategories = getCategories('data');
 * // ['text', 'visual', 'audio', 'structured', 'system']
 * ```
 */
export function getCategories(
  dimension: 'data' | 'constraints' | 'touchpoints'
): string[] {
  let items: Array<{ category?: string }> = [];

  switch (dimension) {
    case 'data':
      items = DATA_ARTIFACTS;
      break;
    case 'constraints':
      items = CONSTRAINTS;
      break;
    case 'touchpoints':
      items = TOUCHPOINTS;
      break;
  }

  const categories = items
    .map((item) => item.category)
    .filter((cat): cat is string => cat !== undefined);

  return Array.from(new Set(categories));
}

/**
 * Get statistics about the Atlas
 *
 * @returns Object with counts for each dimension
 *
 * @example
 * ```typescript
 * const stats = getAtlasStats();
 * console.log(stats);
 * // {
 * //   ai: 45,
 * //   human: 28,
 * //   system: 31,
 * //   data: 52,
 * //   constraints: 42,
 * //   touchpoints: 18,
 * //   total: 216
 * // }
 * ```
 */
export function getAtlasStats() {
  return {
    ai: AI_TASKS.length,
    human: HUMAN_TASKS.length,
    system: SYSTEM_TASKS.length,
    data: DATA_ARTIFACTS.length,
    constraints: CONSTRAINTS.length,
    touchpoints: TOUCHPOINTS.length,
    layers: LAYERS.length,
    total:
      AI_TASKS.length +
      HUMAN_TASKS.length +
      SYSTEM_TASKS.length +
      DATA_ARTIFACTS.length +
      CONSTRAINTS.length +
      TOUCHPOINTS.length,
  };
}

/**
 * @quietloudlab/ai-interaction-atlas
 *
 * A shared language for designing AI experiences across human actions, AI tasks,
 * system operations, data, constraints, and touchpoints.
 *
 * @see https://ai-interaction.com
 * @license Apache-2.0
 */

// Re-export all data
export * from './data/meta';
export * from './data/layers';
export * from './data/ai_tasks';
export * from './data/human_tasks';
export * from './data/system_tasks';
export * from './data/artifacts';
export * from './data/constraints';
export * from './data/touchpoints';
export * from './data/templates';
export * from './data/examples';

// Re-export types
export * from './types';

// Re-export aggregated data
export * from './data';

// Re-export utilities
export * from './utils/search';
export * from './utils/filters';
export * from './utils/validation';

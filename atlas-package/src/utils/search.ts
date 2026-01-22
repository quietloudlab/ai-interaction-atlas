import type { AiTask, HumanTask, SystemTask, DataArtifactDefinition, ConstraintDefinition, TouchpointDefinition } from '../types';
import { AI_TASKS } from '../data/ai_tasks';
import { HUMAN_TASKS } from '../data/human_tasks';
import { SYSTEM_TASKS } from '../data/system_tasks';
import { DATA_ARTIFACTS } from '../data/artifacts';
import { CONSTRAINTS } from '../data/constraints';
import { TOUCHPOINTS } from '../data/touchpoints';

export type SearchableItem =
  | AiTask
  | HumanTask
  | SystemTask
  | DataArtifactDefinition
  | ConstraintDefinition
  | TouchpointDefinition;

export interface SearchOptions {
  /** Dimensions to search within (default: all) */
  dimensions?: Array<'ai' | 'human' | 'system' | 'data' | 'constraints' | 'touchpoints'>;
  /** Case sensitive search (default: false) */
  caseSensitive?: boolean;
  /** Search in description field (default: true) */
  searchDescription?: boolean;
  /** Limit number of results (default: no limit) */
  limit?: number;
}

/**
 * Search across all Atlas patterns by keyword
 *
 * @param query - Search query string
 * @param options - Search options
 * @returns Array of matching patterns
 *
 * @example
 * ```typescript
 * // Search all dimensions
 * const results = searchPatterns('review');
 *
 * // Search only human tasks
 * const humanResults = searchPatterns('review', { dimensions: ['human'] });
 *
 * // Case sensitive search
 * const exact = searchPatterns('API', { caseSensitive: true });
 * ```
 */
export function searchPatterns(
  query: string,
  options: SearchOptions = {}
): SearchableItem[] {
  const {
    dimensions = ['ai', 'human', 'system', 'data', 'constraints', 'touchpoints'],
    caseSensitive = false,
    searchDescription = true,
    limit,
  } = options;

  const searchQuery = caseSensitive ? query : query.toLowerCase();
  const results: SearchableItem[] = [];

  const matchesQuery = (text: string | undefined): boolean => {
    if (!text) return false;
    const searchText = caseSensitive ? text : text.toLowerCase();
    return searchText.includes(searchQuery);
  };

  // Search AI tasks
  if (dimensions.includes('ai')) {
    results.push(
      ...AI_TASKS.filter((task) => {
        return (
          matchesQuery(task.name) ||
          matchesQuery(task.slug) ||
          (searchDescription && matchesQuery(task.elevator_pitch))
        );
      })
    );
  }

  // Search Human tasks
  if (dimensions.includes('human')) {
    results.push(
      ...HUMAN_TASKS.filter((task) => {
        return (
          matchesQuery(task.name) ||
          matchesQuery(task.slug) ||
          (searchDescription && matchesQuery(task.elevator_pitch))
        );
      })
    );
  }

  // Search System tasks
  if (dimensions.includes('system')) {
    results.push(
      ...SYSTEM_TASKS.filter((task) => {
        return (
          matchesQuery(task.name) ||
          matchesQuery(task.slug) ||
          (searchDescription && matchesQuery(task.elevator_pitch))
        );
      })
    );
  }

  // Search Data artifacts
  if (dimensions.includes('data')) {
    results.push(
      ...DATA_ARTIFACTS.filter((artifact) => {
        return (
          matchesQuery(artifact.name) ||
          matchesQuery(artifact.id) ||
          (searchDescription && matchesQuery(artifact.description))
        );
      })
    );
  }

  // Search Constraints
  if (dimensions.includes('constraints')) {
    results.push(
      ...CONSTRAINTS.filter((constraint) => {
        return (
          matchesQuery(constraint.name) ||
          matchesQuery(constraint.id) ||
          (searchDescription && matchesQuery(constraint.description))
        );
      })
    );
  }

  // Search Touchpoints
  if (dimensions.includes('touchpoints')) {
    results.push(
      ...TOUCHPOINTS.filter((touchpoint) => {
        return (
          matchesQuery(touchpoint.name) ||
          matchesQuery(touchpoint.id) ||
          (searchDescription && matchesQuery(touchpoint.description))
        );
      })
    );
  }

  return limit ? results.slice(0, limit) : results;
}

/**
 * Get a specific pattern by ID (slug or target_id)
 *
 * @param id - Pattern ID (slug or target_id)
 * @returns The pattern if found, undefined otherwise
 *
 * @example
 * ```typescript
 * const task = getPattern('classify-intent');
 * const artifact = getPattern('embedding');
 * ```
 */
export function getPattern(id: string): SearchableItem | undefined {
  const allItems: SearchableItem[] = [
    ...AI_TASKS,
    ...HUMAN_TASKS,
    ...SYSTEM_TASKS,
    ...DATA_ARTIFACTS,
    ...CONSTRAINTS,
    ...TOUCHPOINTS,
  ];

  return allItems.find((item) => {
    // Check slug for tasks
    if ('slug' in item && item.slug === id) return true;
    // Check id for artifacts, constraints, touchpoints
    if ('id' in item && item.id === id) return true;
    return false;
  });
}

/**
 * Get all patterns from a specific dimension
 *
 * @param dimension - Dimension name
 * @returns Array of patterns in that dimension
 *
 * @example
 * ```typescript
 * const aiTasks = getPatternsByDimension('ai');
 * const constraints = getPatternsByDimension('constraints');
 * ```
 */
export function getPatternsByDimension(
  dimension: 'ai' | 'human' | 'system' | 'data' | 'constraints' | 'touchpoints'
): SearchableItem[] {
  switch (dimension) {
    case 'ai':
      return AI_TASKS;
    case 'human':
      return HUMAN_TASKS;
    case 'system':
      return SYSTEM_TASKS;
    case 'data':
      return DATA_ARTIFACTS;
    case 'constraints':
      return CONSTRAINTS;
    case 'touchpoints':
      return TOUCHPOINTS;
  }
}

import type { AiTask, HumanTask, SystemTask } from '../types';
import { AI_TASKS } from '../data/ai_tasks';
import { HUMAN_TASKS } from '../data/human_tasks';
import { SYSTEM_TASKS } from '../data/system_tasks';
import { DATA_ARTIFACTS } from '../data/artifacts';
import { CONSTRAINTS } from '../data/constraints';
import { TOUCHPOINTS } from '../data/touchpoints';

/**
 * Type guards for runtime type checking
 */

export function isAiTask(task: any): task is AiTask {
  return (
    task &&
    typeof task === 'object' &&
    'task_type' in task &&
    task.task_type === 'ai'
  );
}

export function isHumanTask(task: any): task is HumanTask {
  return (
    task &&
    typeof task === 'object' &&
    'task_type' in task &&
    task.task_type === 'human'
  );
}

export function isSystemTask(task: any): task is SystemTask {
  return (
    task &&
    typeof task === 'object' &&
    'task_type' in task &&
    task.task_type === 'system'
  );
}

/**
 * Validation helpers
 */

/**
 * Check if a task ID exists in the Atlas
 *
 * @param taskId - Task ID to check
 * @returns true if the task exists
 *
 * @example
 * ```typescript
 * if (isValidTaskId('ai_classify_intent')) {
 *   console.log('Valid task!');
 * }
 * ```
 */
export function isValidTaskId(taskId: string): boolean {
  const allTasks = [...AI_TASKS, ...HUMAN_TASKS, ...SYSTEM_TASKS];
  return allTasks.some((task) => task.id === taskId || task.slug === taskId);
}

/**
 * Check if an artifact ID exists in the Atlas
 *
 * @param artifactId - Artifact ID to check
 * @returns true if the artifact exists
 */
export function isValidArtifactId(artifactId: string): boolean {
  return DATA_ARTIFACTS.some((artifact) => artifact.id === artifactId);
}

/**
 * Check if a constraint ID exists in the Atlas
 *
 * @param constraintId - Constraint ID to check
 * @returns true if the constraint exists
 */
export function isValidConstraintId(constraintId: string): boolean {
  return CONSTRAINTS.some((constraint) => constraint.id === constraintId);
}

/**
 * Check if a touchpoint ID exists in the Atlas
 *
 * @param touchpointId - Touchpoint ID to check
 * @returns true if the touchpoint exists
 */
export function isValidTouchpointId(touchpointId: string): boolean {
  return TOUCHPOINTS.some((touchpoint) => touchpoint.id === touchpointId);
}

/**
 * Validate a workflow/canvas design
 *
 * @param nodeIds - Array of node IDs used in the workflow
 * @returns Validation result with invalid IDs if any
 *
 * @example
 * ```typescript
 * const result = validateWorkflow([
 *   'ai_classify_intent',
 *   'human_review_output',
 *   'system_log_event'
 * ]);
 *
 * if (!result.valid) {
 *   console.error('Invalid IDs:', result.invalidIds);
 * }
 * ```
 */
export function validateWorkflow(nodeIds: string[]): {
  valid: boolean;
  invalidIds: string[];
} {
  const invalidIds = nodeIds.filter((id) => !isValidTaskId(id));

  return {
    valid: invalidIds.length === 0,
    invalidIds,
  };
}

/**
 * Get all valid task IDs
 *
 * @returns Array of all task IDs in the Atlas
 *
 * @example
 * ```typescript
 * const allTaskIds = getAllTaskIds();
 * console.log(allTaskIds.length); // e.g., 104
 * ```
 */
export function getAllTaskIds(): string[] {
  const allTasks = [...AI_TASKS, ...HUMAN_TASKS, ...SYSTEM_TASKS];
  return allTasks.map((task) => task.id);
}

/**
 * Get all valid artifact IDs
 *
 * @returns Array of all artifact IDs in the Atlas
 */
export function getAllArtifactIds(): string[] {
  return DATA_ARTIFACTS.map((artifact) => artifact.id);
}

/**
 * Get all valid constraint IDs
 *
 * @returns Array of all constraint IDs in the Atlas
 */
export function getAllConstraintIds(): string[] {
  return CONSTRAINTS.map((constraint) => constraint.id);
}

/**
 * Get all valid touchpoint IDs
 *
 * @returns Array of all touchpoint IDs in the Atlas
 */
export function getAllTouchpointIds(): string[] {
  return TOUCHPOINTS.map((touchpoint) => touchpoint.id);
}

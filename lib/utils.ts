
import { atlasService, EnrichedRelation, RelationshipType } from '../services/atlasService';
import { Task } from '../types';

// Re-exporting from service to maintain compatibility with existing imports
// while we incrementally refactor the codebase.

export const ALL_TASKS: Task[] = atlasService.getTasks();

export const getTaskById = (id: string): Task | undefined => {
  return atlasService.getTaskById(id);
};

export { type RelationshipType, type EnrichedRelation };

export const getTaskRelationships = (currentTaskId: string): EnrichedRelation[] => {
  return atlasService.getTaskRelationships(currentTaskId);
};

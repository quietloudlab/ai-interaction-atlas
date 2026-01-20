
import { loadAtlasData, getCachedAtlasData } from '../lib/dataLoader';
import {
  Task,
  AiTask,
  HumanTask,
  SystemTask,
  Layer,
  DataArtifactDefinition,
  ConstraintDefinition,
  TouchpointDefinition,
  WorkflowTemplate,
  Example,
  NodeType,
  AtlasData
} from '../types';

export type RelationshipType = 'upstream' | 'downstream' | 'lateral' | 'conflict';

export interface EnrichedRelation {
  targetId: string;
  targetName: string;
  type: string;
  category: RelationshipType;
  reason: string;
}

class AtlasService {
  private _allTasks: Task[] = [];
  private _data: AtlasData | null = null;
  private _initPromise: Promise<void> | null = null;
  private _suspensePromise: Promise<AtlasData> | null = null;

  /**
   * Initialize the service with ATLAS_DATA (lazy loaded)
   * This is called automatically on first access
   */
  private async _ensureInitialized(): Promise<void> {
    if (this._data) return; // Already initialized

    if (this._initPromise) {
      await this._initPromise;
      return;
    }

    this._initPromise = (async () => {
      this._data = await loadAtlasData();

      // Flatten tasks into a single lookup array for easier searching
      this._allTasks = [
        ...this._data.ai_tasks,
        ...this._data.human_tasks,
        ...this._data.system_tasks
      ];
    })();

    await this._initPromise;
  }

  /**
   * Get data synchronously (for components with Suspense)
   * Throws a promise if data is not loaded (Suspense will catch it)
   */
  private _getData(): AtlasData {
    const cached = getCachedAtlasData();
    if (cached) {
      if (!this._data) {
        this._data = cached;
        this._allTasks = [
          ...cached.ai_tasks,
          ...cached.human_tasks,
          ...cached.system_tasks
        ];
      }
      // Clear the suspense promise since we have data now
      this._suspensePromise = null;
      return cached;
    }

    // If we already threw a promise, throw the same one (critical for Suspense)
    if (this._suspensePromise) {
      throw this._suspensePromise;
    }

    // Create and cache the promise we'll throw
    this._suspensePromise = loadAtlasData();
    throw this._suspensePromise;
  }

  // --- Meta & Core ---
  getMeta() {
    const data = this._getData();
    return data.meta;
  }

  // --- Layers ---
  getLayers(): Layer[] {
    const data = this._getData();
    return data.layers;
  }

  getLayerById(id: string): Layer | undefined {
    const data = this._getData();
    return data.layers.find(l => l.id === id);
  }

  // --- Tasks ---
  getTasks(typeFilter?: 'ai' | 'human' | 'system'): Task[] {
    this._getData(); // Ensure data is loaded
    if (typeFilter) {
      return this._allTasks.filter(t => t.task_type === typeFilter);
    }
    return this._allTasks;
  }

  getTaskById(id: string): Task | undefined {
    this._getData(); // Ensure data is loaded
    return this._allTasks.find(t => t.id === id);
  }

  // --- Artifacts (Data, Constraints, Touchpoints) ---
  getDataArtifacts(categoryFilter?: string): DataArtifactDefinition[] {
    const data = this._getData();
    if (categoryFilter && categoryFilter !== 'all') {
      return data.data_artifacts.filter(d => d.category === categoryFilter);
    }
    return data.data_artifacts;
  }

  getDataArtifactById(id: string): DataArtifactDefinition | undefined {
    const data = this._getData();
    return data.data_artifacts.find(d => d.id === id);
  }

  getConstraints(categoryFilter?: string): ConstraintDefinition[] {
    const data = this._getData();
    if (categoryFilter && categoryFilter !== 'all') {
      return data.constraints.filter(c => c.category === categoryFilter);
    }
    return data.constraints;
  }

  getConstraintById(id: string): ConstraintDefinition | undefined {
    const data = this._getData();
    return data.constraints.find(c => c.id === id);
  }

  getTouchpoints(categoryFilter?: string): TouchpointDefinition[] {
    const data = this._getData();
    if (categoryFilter && categoryFilter !== 'all') {
      return data.touchpoints.filter(t => t.category === categoryFilter);
    }
    return data.touchpoints;
  }

  getTouchpointById(id: string): TouchpointDefinition | undefined {
    const data = this._getData();
    return data.touchpoints.find(t => t.id === id);
  }

  // --- Templates & Examples ---
  getTemplates(): WorkflowTemplate[] {
    const data = this._getData();
    return data.workflow_templates;
  }

  getExamples(industryFilter?: string): Example[] {
    const data = this._getData();
    if (industryFilter && industryFilter !== 'All') {
      return data.examples.filter(ex => ex.industry === industryFilter);
    }
    return data.examples;
  }

  // --- Logic & Search ---

  searchTasks(query: string, typeFilter?: 'ai' | 'human' | 'system'): Task[] {
    this._getData(); // Ensure data is loaded
    const lowerQuery = query.toLowerCase();
    return this._allTasks.filter(task => {
      const matchesType = typeFilter ? task.task_type === typeFilter : true;
      // Search name, slug, pitch, and description
      const matchesSearch = task.name.toLowerCase().includes(lowerQuery) ||
                            task.slug.toLowerCase().includes(lowerQuery) ||
                            (task.elevator_pitch && task.elevator_pitch.toLowerCase().includes(lowerQuery));
      return matchesType && matchesSearch;
    });
  }

  /**
   * analyzes relationships between tasks to determine upstream/downstream dependencies
   */
  getTaskRelationships(currentTaskId: string): EnrichedRelation[] {
    this._getData(); // Ensure data is loaded
    const currentTask = this.getTaskById(currentTaskId);
    if (!currentTask) return [];

    const rels: EnrichedRelation[] = [];

    // 1. Outgoing relations (Current -> Target)
    currentTask.relations?.forEach(r => {
      const target = this.getTaskById(r.target_id);
      if (!target) return;

      let category: RelationshipType = 'lateral';
      
      // Downstream: Current affects Target
      if (['commonly_followed_by', 'enables', 'triggers', 'orchestrates', 'updates'].includes(r.type)) category = 'downstream';
      
      // Upstream: Current depends on Target
      if (['commonly_preceded_by', 'downstream_of', 'requires_input_from', 'enabled_by', 'updated_by'].includes(r.type)) category = 'upstream';
      
      // Conflict
      if (['incompatible_with', 'conflicts_with', 'anti_pattern'].includes(r.type)) category = 'conflict';
      
      rels.push({
        targetId: r.target_id,
        targetName: target.name,
        type: r.type.replace(/_/g, ' '),
        category,
        reason: r.reason
      });
    });

    // 2. Incoming relations from other tasks (Other -> Current)
    this._allTasks.forEach(otherTask => {
      if (otherTask.id === currentTaskId) return;
      otherTask.relations?.forEach(r => {
        if (r.target_id === currentTaskId) {
          let category: RelationshipType = 'lateral';
          
          // If Other -> Current (Other is Upstream relative to Current)
          if (['commonly_followed_by', 'enables', 'triggers', 'orchestrates', 'updates'].includes(r.type)) category = 'upstream';
          
          // If Other -> Current (Other is Downstream relative to Current)
          if (['commonly_preceded_by', 'downstream_of', 'requires_input_from', 'enabled_by', 'updated_by'].includes(r.type)) category = 'downstream';
          
          // Conflicts are mutual
          if (['incompatible_with', 'conflicts_with', 'anti_pattern'].includes(r.type)) category = 'conflict';

          rels.push({
            targetId: otherTask.id,
            targetName: otherTask.name,
            type: `(via ${r.type.replace(/_/g, ' ')})`,
            category,
            reason: r.reason
          });
        }
      });
    });

    return rels;
  }
}

export const atlasService = new AtlasService();

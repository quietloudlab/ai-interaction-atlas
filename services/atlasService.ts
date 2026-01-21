
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

export type ArtifactType = 'task' | 'data' | 'constraint' | 'touchpoint';

export interface UnifiedSearchResult {
  id: string;
  name: string;
  type: ArtifactType;
  taskType?: 'ai' | 'human' | 'system'; // For tasks
  category?: string; // Category for the artifact
  description?: string;
  icon?: string;
  score: number;
  artifact: Task | DataArtifactDefinition | ConstraintDefinition | TouchpointDefinition;
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

    if (!query || query.trim().length === 0) {
      // Return all tasks if no query
      return typeFilter
        ? this._allTasks.filter(t => t.task_type === typeFilter)
        : this._allTasks;
    }

    // Stop words to filter out (common words that don't add search value)
    const stopWords = new Set(['and', 'or', 'the', 'a', 'an', 'of', 'to', 'in', 'for', 'with', 'on', 'at', 'by', 'from', 'as', 'is', 'are', 'was', 'were']);

    // Split query into terms and normalize, filtering out stop words
    const terms = query.toLowerCase()
      .split(/\s+/)
      .filter(term => term.length > 0 && !stopWords.has(term));

    // Score and filter tasks
    const scoredTasks = this._allTasks
      .map(task => {
        // Apply type filter first
        if (typeFilter && task.task_type !== typeFilter) {
          return null;
        }

        const score = this._scoreTask(task, terms);
        return score > 0 ? { task, score } : null;
      })
      .filter(item => item !== null) as Array<{ task: Task; score: number }>;

    // Sort by score (highest first)
    scoredTasks.sort((a, b) => b.score - a.score);

    return scoredTasks.map(item => item.task);
  }

  /**
   * Score a task based on how well it matches search terms
   * Higher score = better match
   */
  private _scoreTask(task: Task, terms: string[]): number {
    let score = 0;
    const lowerName = task.name.toLowerCase();
    const lowerSlug = task.slug.toLowerCase();
    const lowerPitch = task.elevator_pitch?.toLowerCase() || '';
    const lowerExample = task.example_usage?.toLowerCase() || '';

    // Check if ALL terms match somewhere in the task
    const allTermsMatch = terms.every(term => {
      return lowerName.includes(term) ||
             lowerSlug.includes(term) ||
             lowerPitch.includes(term) ||
             lowerExample.includes(term) ||
             this._matchesInExtendedFields(task, term);
    });

    if (!allTermsMatch) {
      return 0; // Must match all terms
    }

    // Score based on where matches occur (higher weight = more relevant field)
    for (const term of terms) {
      // Exact name match = highest priority
      if (lowerName === term) {
        score += 100;
      }
      // Name starts with term = very high priority
      else if (lowerName.startsWith(term)) {
        score += 50;
      }
      // Name contains term = high priority
      else if (lowerName.includes(term)) {
        score += 30;
      }

      // Slug match = high priority (often exact technical term)
      if (lowerSlug.includes(term)) {
        score += 25;
      }

      // Elevator pitch = medium-high priority
      if (lowerPitch.includes(term)) {
        score += 15;
      }

      // Example usage = medium priority
      if (lowerExample.includes(term)) {
        score += 10;
      }

      // Extended fields (capabilities, variants, etc.) = lower priority
      score += this._scoreExtendedFields(task, term);
    }

    return score;
  }

  /**
   * Check if term matches in task-specific extended fields
   */
  private _matchesInExtendedFields(task: Task, term: string): boolean {
    if (task.task_type === 'ai') {
      const aiTask = task as AiTask;

      // Search capabilities
      if (aiTask.capabilities?.some(cap =>
        cap.name.toLowerCase().includes(term) ||
        cap.tag.toLowerCase().includes(term) ||
        cap.example.toLowerCase().includes(term)
      )) {
        return true;
      }

      // Search UX notes
      if (aiTask.ux_notes?.risk.toLowerCase().includes(term) ||
          aiTask.ux_notes?.tip.toLowerCase().includes(term) ||
          aiTask.ux_notes?.anti_patterns.some(ap => ap.toLowerCase().includes(term))) {
        return true;
      }
    } else if (task.task_type === 'human' || task.task_type === 'system') {
      const variantTask = task as HumanTask | SystemTask;

      // Search variants
      if (variantTask.common_variants?.some(v => v.toLowerCase().includes(term))) {
        return true;
      }
    }

    // Search IO spec
    const ioSpec = task.io_spec;
    const searchIO = (item: any) => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(term);
      }
      return item.id.toLowerCase().includes(term) || item.label.toLowerCase().includes(term);
    };

    if (ioSpec.inputs.required.some(searchIO) ||
        ioSpec.inputs.optional.some(searchIO) ||
        searchIO(ioSpec.outputs.primary) ||
        ioSpec.outputs.metadata.some(searchIO)) {
      return true;
    }

    return false;
  }

  /**
   * Score matches in extended fields
   */
  private _scoreExtendedFields(task: Task, term: string): number {
    let score = 0;

    if (task.task_type === 'ai') {
      const aiTask = task as AiTask;

      // Capabilities
      aiTask.capabilities?.forEach(cap => {
        if (cap.name.toLowerCase().includes(term)) score += 8;
        if (cap.tag.toLowerCase().includes(term)) score += 6;
        if (cap.example.toLowerCase().includes(term)) score += 4;
      });

      // UX notes
      if (aiTask.ux_notes?.risk.toLowerCase().includes(term)) score += 5;
      if (aiTask.ux_notes?.tip.toLowerCase().includes(term)) score += 5;
      aiTask.ux_notes?.anti_patterns.forEach(ap => {
        if (ap.toLowerCase().includes(term)) score += 5;
      });
    } else if (task.task_type === 'human' || task.task_type === 'system') {
      const variantTask = task as HumanTask | SystemTask;

      // Variants
      variantTask.common_variants?.forEach(v => {
        if (v.toLowerCase().includes(term)) score += 7;
      });
    }

    // IO spec (lower priority)
    const ioSpec = task.io_spec;
    const scoreIO = (item: any) => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(term) ? 3 : 0;
      }
      return (item.id.toLowerCase().includes(term) || item.label.toLowerCase().includes(term)) ? 3 : 0;
    };

    ioSpec.inputs.required.forEach(item => score += scoreIO(item));
    ioSpec.inputs.optional.forEach(item => score += scoreIO(item));
    score += scoreIO(ioSpec.outputs.primary);
    ioSpec.outputs.metadata.forEach(item => score += scoreIO(item));

    return score;
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

  /**
   * Comprehensive search across all artifact types (tasks, data, constraints, touchpoints)
   * Returns unified results sorted by relevance
   */
  searchAll(query: string): UnifiedSearchResult[] {
    this._getData(); // Ensure data is loaded

    if (!query || query.trim().length === 0) {
      return [];
    }

    // Stop words to filter out (common words that don't add search value)
    const stopWords = new Set(['and', 'or', 'the', 'a', 'an', 'of', 'to', 'in', 'for', 'with', 'on', 'at', 'by', 'from', 'as', 'is', 'are', 'was', 'were']);

    // Split query into terms and normalize, filtering out stop words
    const terms = query.toLowerCase()
      .split(/\s+/)
      .filter(term => term.length > 0 && !stopWords.has(term));

    const results: UnifiedSearchResult[] = [];

    // Search tasks
    this._allTasks.forEach(task => {
      const score = this._scoreTask(task, terms);
      if (score > 0) {
        results.push({
          id: task.id,
          name: task.name,
          type: 'task',
          taskType: task.task_type,
          description: task.elevator_pitch,
          score,
          artifact: task
        });
      }
    });

    // Search data artifacts
    const data = this._getData();
    data.data_artifacts.forEach(artifact => {
      const score = this._scoreDataArtifact(artifact, terms);
      if (score > 0) {
        results.push({
          id: artifact.id,
          name: artifact.name,
          type: 'data',
          category: artifact.category,
          description: artifact.description,
          icon: artifact.icon,
          score,
          artifact
        });
      }
    });

    // Search constraints
    data.constraints.forEach(constraint => {
      const score = this._scoreConstraint(constraint, terms);
      if (score > 0) {
        results.push({
          id: constraint.id,
          name: constraint.name,
          type: 'constraint',
          category: constraint.category,
          description: constraint.description,
          icon: constraint.icon,
          score,
          artifact: constraint
        });
      }
    });

    // Search touchpoints
    data.touchpoints.forEach(touchpoint => {
      const score = this._scoreTouchpoint(touchpoint, terms);
      if (score > 0) {
        results.push({
          id: touchpoint.id,
          name: touchpoint.name,
          type: 'touchpoint',
          category: touchpoint.category,
          description: touchpoint.description,
          icon: touchpoint.icon,
          score,
          artifact: touchpoint
        });
      }
    });

    // Sort by score (highest first)
    results.sort((a, b) => b.score - a.score);

    return results;
  }

  /**
   * Score a data artifact based on search terms
   */
  private _scoreDataArtifact(artifact: DataArtifactDefinition, terms: string[]): number {
    let score = 0;
    const lowerName = artifact.name.toLowerCase();
    const lowerDesc = artifact.description?.toLowerCase() || '';
    const lowerExamples = artifact.examples?.join(' ').toLowerCase() || '';
    const lowerFormatNotes = artifact.format_notes?.toLowerCase() || '';

    // Check if ALL terms match
    const allTermsMatch = terms.every(term => {
      return lowerName.includes(term) ||
             lowerDesc.includes(term) ||
             lowerExamples.includes(term) ||
             lowerFormatNotes.includes(term);
    });

    if (!allTermsMatch) return 0;

    // Score based on match location
    for (const term of terms) {
      if (lowerName === term) score += 100;
      else if (lowerName.startsWith(term)) score += 50;
      else if (lowerName.includes(term)) score += 30;

      if (lowerDesc.includes(term)) score += 15;
      if (lowerExamples.includes(term)) score += 10;
      if (lowerFormatNotes.includes(term)) score += 8;
    }

    return score;
  }

  /**
   * Score a constraint based on search terms
   */
  private _scoreConstraint(constraint: ConstraintDefinition, terms: string[]): number {
    let score = 0;
    const lowerName = constraint.name.toLowerCase();
    const lowerDesc = constraint.description?.toLowerCase() || '';
    const lowerUxNote = constraint.ux_note?.toLowerCase() || '';
    const lowerExamples = constraint.example_values?.toLowerCase() || '';

    // Check if ALL terms match
    const allTermsMatch = terms.every(term => {
      return lowerName.includes(term) ||
             lowerDesc.includes(term) ||
             lowerUxNote.includes(term) ||
             lowerExamples.includes(term);
    });

    if (!allTermsMatch) return 0;

    // Score based on match location
    for (const term of terms) {
      if (lowerName === term) score += 100;
      else if (lowerName.startsWith(term)) score += 50;
      else if (lowerName.includes(term)) score += 30;

      if (lowerDesc.includes(term)) score += 15;
      if (lowerUxNote.includes(term)) score += 10;
      if (lowerExamples.includes(term)) score += 8;
    }

    return score;
  }

  /**
   * Score a touchpoint based on search terms
   */
  private _scoreTouchpoint(touchpoint: TouchpointDefinition, terms: string[]): number {
    let score = 0;
    const lowerName = touchpoint.name.toLowerCase();
    const lowerDesc = touchpoint.description.toLowerCase();
    const lowerExamples = touchpoint.examples.join(' ').toLowerCase();

    // Check if ALL terms match
    const allTermsMatch = terms.every(term => {
      return lowerName.includes(term) ||
             lowerDesc.includes(term) ||
             lowerExamples.includes(term);
    });

    if (!allTermsMatch) return 0;

    // Score based on match location
    for (const term of terms) {
      if (lowerName === term) score += 100;
      else if (lowerName.startsWith(term)) score += 50;
      else if (lowerName.includes(term)) score += 30;

      if (lowerDesc.includes(term)) score += 15;
      if (lowerExamples.includes(term)) score += 10;
    }

    return score;
  }
}

export const atlasService = new AtlasService();

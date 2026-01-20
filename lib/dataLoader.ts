import { AtlasData } from '../types';

/**
 * Lazy data loader for ATLAS_DATA
 *
 * This module provides lazy loading for the large ATLAS_DATA object,
 * which includes tasks, templates, artifacts, constraints, and touchpoints.
 *
 * Data is loaded on-demand and cached for subsequent accesses.
 */

let cachedData: AtlasData | null = null;
let loadingPromise: Promise<AtlasData> | null = null;

/**
 * Loads ATLAS_DATA dynamically and caches it
 * Subsequent calls return the cached data
 */
export async function loadAtlasData(): Promise<AtlasData> {
  // Return cached data if available
  if (cachedData) {
    return cachedData;
  }

  // Return in-flight loading promise if loading
  if (loadingPromise) {
    return loadingPromise;
  }

  // Start loading data
  loadingPromise = (async () => {
    try {
      const [
        { META },
        { LAYERS },
        { AI_TASKS },
        { HUMAN_TASKS },
        { SYSTEM_TASKS },
        { DATA_ARTIFACTS },
        { CONSTRAINTS },
        { TOUCHPOINTS },
        { WORKFLOW_TEMPLATES },
        { EXAMPLES }
      ] = await Promise.all([
        import('../data/meta'),
        import('../data/layers'),
        import('../data/ai_tasks'),
        import('../data/human_tasks'),
        import('../data/system_tasks'),
        import('../data/artifacts'),
        import('../data/constraints'),
        import('../data/touchpoints'),
        import('../data/templates'),
        import('../data/examples')
      ]);

      const data: AtlasData = {
        meta: META,
        layers: LAYERS,
        ai_tasks: AI_TASKS,
        human_tasks: HUMAN_TASKS,
        system_tasks: SYSTEM_TASKS,
        data_artifacts: DATA_ARTIFACTS,
        constraints: CONSTRAINTS,
        touchpoints: TOUCHPOINTS,
        workflow_templates: WORKFLOW_TEMPLATES,
        examples: EXAMPLES
      };

      cachedData = data;
      loadingPromise = null;
      return data;
    } catch (error) {
      console.error('Failed to load ATLAS_DATA:', error);
      loadingPromise = null;
      throw error;
    }
  })();

  return loadingPromise;
}

/**
 * Preload ATLAS_DATA in the background
 * Useful for routes that will likely need the data
 */
export function preloadAtlasData() {
  if (!cachedData && !loadingPromise) {
    loadAtlasData();
  }
}

/**
 * Get cached data synchronously (returns null if not loaded)
 * Use this for components that can handle undefined data
 */
export function getCachedAtlasData(): AtlasData | null {
  return cachedData;
}

/**
 * Check if data is loaded
 */
export function isAtlasDataLoaded(): boolean {
  return cachedData !== null;
}

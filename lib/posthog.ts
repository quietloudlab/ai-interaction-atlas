import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

let isInitialized = false;

export function initPostHog() {
  // Skip PostHog entirely in development to avoid polluting analytics
  if (import.meta.env.MODE === 'development') {
    console.log('PostHog disabled in development environment');
    return;
  }

  // Only initialize if API key is provided
  if (!POSTHOG_KEY) {
    console.log('PostHog API key not provided, skipping analytics setup');
    return;
  }

  if (isInitialized) {
    console.log('PostHog already initialized');
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,

    // Privacy-friendly defaults
    persistence: 'localStorage',
    autocapture: false, // We'll manually track what matters
    capture_pageview: true, // Auto-track page views
    capture_pageleave: true, // Track when users leave pages

    // Session recording (optional - set to false if you don't want it)
    disable_session_recording: true, // Keep this true for alpha to respect privacy
  });

  isInitialized = true;
  console.log('✅ PostHog initialized');
}

// Helper to check if PostHog is available
function isPostHogAvailable(): boolean {
  return isInitialized && !!POSTHOG_KEY;
}

// ============================================
// CANVAS TOOL EVENTS
// ============================================

export function trackCanvasProjectCreated(isFirstProject?: boolean) {
  if (!isPostHogAvailable()) return;
  posthog.capture('canvas_project_created', {
    is_first_project: isFirstProject || false
  });
}

export function trackCanvasNodeAdded(nodeType: string, isFirstNode?: boolean) {
  if (!isPostHogAvailable()) return;
  posthog.capture('canvas_node_added', {
    node_type: nodeType,
    is_first_node: isFirstNode || false,
  });
}

export function trackCanvasEdgeCreated(sourceType: string, targetType: string) {
  if (!isPostHogAvailable()) return;
  posthog.capture('canvas_edge_created', {
    source_type: sourceType,
    target_type: targetType,
  });
}

export function trackCanvasNodeDeleted(nodeType: string) {
  if (!isPostHogAvailable()) return;
  posthog.capture('canvas_node_deleted', {
    node_type: nodeType,
  });
}

export function trackCanvasStickyNoteAdded() {
  if (!isPostHogAvailable()) return;
  posthog.capture('canvas_sticky_note_added');
}

export function trackCanvasZoneAdded() {
  if (!isPostHogAvailable()) return;
  posthog.capture('canvas_zone_added');
}

export function trackCanvasProjectExported(nodeCount: number, edgeCount: number) {
  if (!isPostHogAvailable()) return;
  posthog.capture('canvas_project_exported', {
    node_count: nodeCount,
    edge_count: edgeCount,
  });
}

export function trackCanvasProjectImported(nodeCount: number, edgeCount: number) {
  if (!isPostHogAvailable()) return;
  posthog.capture('canvas_project_imported', {
    node_count: nodeCount,
    edge_count: edgeCount,
  });
}

export function trackCanvasSessionSummary(data: {
  nodesCreated: number;
  edgesCreated: number;
  stickyNotesCreated: number;
  zonesCreated: number;
  timeSpent: number; // in seconds
}) {
  if (!isPostHogAvailable()) return;
  posthog.capture('canvas_session_summary', data);
}

export function trackCanvasProjectSaved(projectSize: { nodeCount: number; edgeCount: number }) {
  if (!isPostHogAvailable()) return;
  posthog.capture('canvas_project_saved', projectSize);
}

export function trackCanvasProjectLoaded(projectSize: { nodeCount: number; edgeCount: number }) {
  if (!isPostHogAvailable()) return;
  posthog.capture('canvas_project_loaded', projectSize);
}

export function trackTemplateLoaded(templateId: string, templateName: string) {
  if (!isPostHogAvailable()) return;
  posthog.capture('template_loaded', {
    template_id: templateId,
    template_name: templateName,
  });
}

export function trackFirstEdgeCreated() {
  if (!isPostHogAvailable()) return;
  posthog.capture('milestone_first_edge_created');
}

export function trackFirstProjectCompleted(nodeCount: number, edgeCount: number) {
  if (!isPostHogAvailable()) return;
  posthog.capture('milestone_first_project_completed', {
    node_count: nodeCount,
    edge_count: edgeCount,
  });
}

// ============================================
// ATLAS LIBRARY EVENTS
// ============================================

export function trackAtlasPatternViewed(patternId: string, patternName: string, category: string) {
  if (!isPostHogAvailable()) return;
  posthog.capture('atlas_pattern_viewed', {
    pattern_id: patternId,
    pattern_name: patternName,
    category: category,
  });
}

export function trackAtlasCategoryBrowsed(category: string, patternCount: number) {
  if (!isPostHogAvailable()) return;
  posthog.capture('atlas_category_browsed', {
    category: category,
    pattern_count: patternCount,
  });
}

export function trackAtlasSearchPerformed(query: string, resultCount: number, isSemanticSearch?: boolean) {
  if (!isPostHogAvailable()) return;
  posthog.capture('atlas_search_performed', {
    query: query.toLowerCase().trim(),
    result_count: resultCount,
    is_semantic: isSemanticSearch || false,
  });
}

export function trackSemanticSearchUsed(location: 'atlas' | 'canvas', query: string, resultCount: number) {
  if (!isPostHogAvailable()) return;
  posthog.capture('semantic_search_performed', {
    location: location,
    query: query.toLowerCase().trim(),
    result_count: resultCount,
  });
}

export function trackSemanticSearchPatternDragged(patternId: string, patternName: string, patternType: string) {
  if (!isPostHogAvailable()) return;
  posthog.capture('semantic_search_pattern_dragged', {
    pattern_id: patternId,
    pattern_name: patternName,
    pattern_type: patternType,
  });
}

export function trackAtlasPatternCopiedToCanvas(patternId: string, patternName: string) {
  if (!isPostHogAvailable()) return;
  posthog.capture('atlas_pattern_copied_to_canvas', {
    pattern_id: patternId,
    pattern_name: patternName,
  });
}

// ============================================
// FRICTION & ERROR EVENTS
// ============================================

export function trackSearchNoResults(query: string, searchType: 'basic' | 'semantic') {
  if (!isPostHogAvailable()) return;
  posthog.capture('search_no_results', {
    query: query.toLowerCase().trim(),
    search_type: searchType,
  });
}

export function trackErrorOccurred(errorType: string, errorMessage: string, context?: string) {
  if (!isPostHogAvailable()) return;
  posthog.capture('error_occurred', {
    error_type: errorType,
    error_message: errorMessage,
    context: context,
  });
}

export function trackFeatureDiscovered(featureName: string, discoveryMethod: 'click' | 'tooltip' | 'search') {
  if (!isPostHogAvailable()) return;
  posthog.capture('feature_discovered', {
    feature_name: featureName,
    discovery_method: discoveryMethod,
  });
}

// ============================================
// GENERAL APP EVENTS
// ============================================

export function trackPageView(pageName: string) {
  if (!isPostHogAvailable()) return;
  posthog.capture('$pageview', {
    page_name: pageName,
  });
}

export function trackUserAction(actionName: string, properties?: Record<string, any>) {
  if (!isPostHogAvailable()) return;
  posthog.capture(actionName, properties);
}

// Helper to identify users (optional - only use if you have user accounts)
export function identifyUser(userId: string, traits?: Record<string, any>) {
  if (!isPostHogAvailable()) return;
  posthog.identify(userId, traits);
}

// Helper to reset user identity (on logout)
export function resetUser() {
  if (!isPostHogAvailable()) return;
  posthog.reset();
}

// ============================================
// USER PROPERTIES HELPER
// ============================================

/**
 * Update user properties for segmentation and cohorts
 * Call this periodically or on significant milestones
 */
export function updateUserProperties(properties: {
  projects_created?: number;
  total_nodes_created?: number;
  total_edges_created?: number;
  uses_semantic_search?: boolean;
  favorite_node_type?: string;
  canvas_power_user?: boolean;
  first_activation_date?: string;
  days_active?: number;
}) {
  if (!isPostHogAvailable()) return;
  posthog.setPersonProperties(properties);
}

/* ============================================
   POSTHOG SETUP GUIDE
   ============================================

   ## 1. KEY DASHBOARDS TO CREATE

   ### Activation Dashboard
   - Insight: "New users" (unique users, first seen today)
   - Funnel: Visit → canvas_node_added (is_first_node=true) → milestone_first_edge_created → canvas_project_saved
   - Insight: "Time to first export" (avg time between first pageview and canvas_project_saved)
   - Insight: "Activation rate" (% of new users who complete funnel within 7 days)

   ### Engagement Dashboard
   - Insight: DAU/WAU/MAU trend
   - Insight: "Most used node types" (canvas_node_added grouped by node_type)
   - Insight: "Average nodes per project" (avg node_count from canvas_project_saved)
   - Insight: "Session duration distribution" (timeSpent from canvas_session_summary)
   - Insight: "Power users" (users with canvas_power_user=true property)

   ### Retention Dashboard
   - Retention Insight: Day 1, Day 7, Day 30 retention
   - Insight: "Projects reopened" (canvas_project_loaded count)
   - Insight: "Churn signals" (users who created nodes but never saved)

   ### Feature Adoption Dashboard
   - Insight: "% using semantic search" (users who triggered semantic_search_performed)
   - Insight: "% using zones" (users who triggered canvas_zone_added)
   - Insight: "% loading templates" (users who triggered template_loaded)
   - Insight: "Atlas engagement" (atlas_pattern_viewed, atlas_pattern_copied_to_canvas)

   ## 2. CRITICAL FUNNELS

   ### Primary Activation Funnel
   $pageview → canvas_node_added → milestone_first_edge_created → canvas_project_saved
   Goal: Optimize for users completing this within first session

   ### Atlas-to-Canvas Funnel
   atlas_pattern_viewed → atlas_pattern_copied_to_canvas → canvas_edge_created → canvas_project_saved
   Goal: Measure if Atlas library drives canvas usage

   ### Template Funnel
   template_loaded → canvas_node_added → canvas_project_saved
   Goal: See if templates help users get started faster

   ## 3. USER SEGMENTATION (COHORTS)

   ### Power Users
   - Filter: canvas_power_user = true
   - OR: projects_created >= 5
   - OR: total_nodes_created >= 50

   ### Semantic Search Users
   - Filter: uses_semantic_search = true

   ### At-Risk Users
   - Filter: Last active > 7 days ago
   - AND: projects_created >= 1
   - AND: canvas_project_saved in last 14 days

   ### Activated Users
   - Filter: milestone_first_edge_created exists
   - AND: First seen < 7 days ago

   ## 4. KEY METRICS TO MONITOR WEEKLY

   1. **Activation Rate**: % of new users who create first edge within 7 days
   2. **D7 Retention**: % of activated users who return within 7 days
   3. **Avg Nodes Per Project**: Quality signal for engagement depth
   4. **Search Success Rate**: (searches - search_no_results) / searches
   5. **Template Adoption**: % of users who load at least 1 template
   6. **Atlas → Canvas Conversion**: % who view pattern and copy to canvas

   ## 5. ALERTS TO SET UP

   - Alert: If activation rate drops below 30% (weekly)
   - Alert: If search_no_results > 40% of searches (daily)
   - Alert: If error_occurred spikes (daily)
   - Alert: If D7 retention drops below 20% (weekly)

   ## 6. SESSION RECORDINGS (When Enabled)

   Watch recordings for:
   - Users who abandon after first node (no edge created)
   - Users with high search_no_results
   - Users with error_occurred events
   - Power users (to see what workflows they build)

   ## 7. IMPLEMENTATION CHECKLIST

   Current tracking:
   ✅ Canvas events (nodes, edges, zones, sticky notes)
   ✅ Atlas library events
   ✅ Semantic search
   ✅ Import/export
   ✅ Session summaries

   New tracking added:
   ✅ Milestone events (first edge, first project)
   ✅ Project save/load
   ✅ Template loading
   ✅ Search failures
   ✅ Error tracking
   ✅ Feature discovery
   ✅ User properties for segmentation

   Still needed:
   ⚠️  Call trackFirstEdgeCreated() when first edge is created
   ⚠️  Call trackFirstProjectCompleted() when first project saved
   ⚠️  Call trackTemplateLoaded() when template loaded
   ⚠️  Call trackSearchNoResults() when searches return 0 results
   ⚠️  Call updateUserProperties() periodically (on session end, milestone events)
   ⚠️  Add is_first_project and is_first_node flags to existing calls

============================================ */

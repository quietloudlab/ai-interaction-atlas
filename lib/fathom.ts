/**
 * Fathom Analytics Tracking Utility
 *
 * Provides type-safe event tracking for Fathom Analytics.
 * Events must be defined in the Fathom dashboard before tracking.
 */

declare global {
  interface Window {
    fathom?: {
      trackEvent: (eventName: string, value?: number) => void;
    };
  }
}

/**
 * Track a custom event in Fathom Analytics
 * @param eventName - The name of the event to track (must be defined in Fathom dashboard)
 * @param value - Optional monetary value associated with the event
 */
export function trackEvent(eventName: string, value?: number): void {
  if (typeof window !== 'undefined' && window.fathom) {
    try {
      window.fathom.trackEvent(eventName, value);
    } catch (error) {
      console.error('Fathom tracking error:', error);
    }
  }
}

// Event name constants for type safety and consistency
export const EVENTS = {
  // Dimension Navigation
  DIMENSION_VIEW_AI: 'dimension_view_ai',
  DIMENSION_VIEW_HUMAN: 'dimension_view_human',
  DIMENSION_VIEW_SYSTEM: 'dimension_view_system',
  DIMENSION_VIEW_DATA: 'dimension_view_data',
  DIMENSION_VIEW_CONSTRAINTS: 'dimension_view_constraints',
  DIMENSION_VIEW_TOUCHPOINTS: 'dimension_view_touchpoints',

  // Pattern Views
  PATTERN_VIEW: 'pattern_view',

  // Search
  SEARCH_PERFORMED: 'search_performed',
  SEMANTIC_SEARCH_USED: 'semantic_search_used',

  // Builder
  BUILDER_OPENED: 'builder_opened',
  TEMPLATE_LOADED: 'template_loaded',

  // External Links
  GITHUB_CLICKED: 'github_clicked',

  // Contact
  CONTACT_FORM_SUBMITTED: 'contact_form_submitted',
} as const;

/**
 * Fathom Analytics Tracking Utility
 *
 * Provides type-safe event and pageview tracking for Fathom Analytics.
 */

declare global {
  interface Window {
    fathom?: {
      trackPageview: (opts?: { url?: string; referrer?: string }) => void;
      trackEvent: (eventName: string, opts?: { _value?: number }) => void;
    };
  }
}

/**
 * Track a pageview in Fathom Analytics
 * Call this on client-side route changes in SPAs
 * @param url - Optional URL to track (defaults to current page)
 */
export function trackPageview(url?: string): void {
  if (typeof window !== 'undefined' && window.fathom) {
    try {
      window.fathom.trackPageview(url ? { url } : undefined);
    } catch (error) {
      console.error('Fathom pageview tracking error:', error);
    }
  }
}

/**
 * Track a custom event in Fathom Analytics
 * @param eventName - The name of the event to track
 * @param value - Optional monetary value in cents
 */
export function trackEvent(eventName: string, value?: number): void {
  if (typeof window !== 'undefined' && window.fathom) {
    try {
      window.fathom.trackEvent(eventName, value ? { _value: value } : undefined);
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
  HERO_SEARCH_ENGAGED: 'hero_search_engaged',
  HERO_SEARCH_RESULT_CLICKED: 'hero_search_result_clicked',

  // Builder
  BUILDER_OPENED: 'builder_opened',
  TEMPLATE_LOADED: 'template_loaded',

  // Newsletter
  NEWSLETTER_HERO_SUBMITTED: 'newsletter_hero_submitted',
  NEWSLETTER_LEARN_SUBMITTED: 'newsletter_learn_submitted',

  // NPM
  NPM_COPIED: 'npm_copied',
  NPM_SCROLL_CLICKED: 'npm_scroll_clicked',

  // CTAs
  EXPLORE_ATLAS_CLICKED: 'explore_atlas_clicked',
  QUICK_REFERENCE_CLICKED: 'quick_reference_clicked',
  STUDIO_PREVIEW_CLICKED: 'studio_preview_clicked', // Map your AI from main nav (desktop + mobile)
  STUDIO_PREVIEW_ATLAS_CLICKED: 'studio_preview_atlas_clicked', // Map your AI from Atlas page floating button
  QUIETLOUDLAB_CLICKED: 'quietloudlab_clicked',

  // Contributions
  SUGGEST_PATTERN_CLICKED: 'suggest_pattern_clicked',
  CONTRIBUTE_PATTERN_CLICKED: 'contribute_pattern_clicked',
  SHARE_FEEDBACK_CLICKED: 'share_feedback_clicked',

  // External Links
  GITHUB_CLICKED: 'github_clicked',

  // Contact
  CONTACT_FORM_SUBMITTED: 'contact_form_submitted',

  // Feedback Widget
  FEEDBACK_OPENED: 'feedback_opened',
  FEEDBACK_SUBMITTED: 'feedback_submitted',

  // Studio Waitlist
  STUDIO_WAITLIST_SUBMITTED: 'studio_waitlist_submitted',
  STUDIO_SUCCESS_ATLAS_CLICKED: 'studio_success_atlas_clicked',
  STUDIO_CTA_CLICKED: 'studio_cta_clicked',
  STUDIO_FAQ_OPENED: 'studio_faq_opened',
} as const;

import type { Context } from "https://edge.netlify.com";

// Meta data is inlined at build time for reliability
// Generated from scripts/generate-meta-data.js
const META_DATA: {
  tasks: Record<string, { title: string; description: string }>;
  layers: Record<string, { title: string; description: string }>;
  pages: Record<string, { title: string; description: string }>;
} = JSON.parse(`{"tasks":{"task_detect":{"title":"Detect - AI Interaction Atlas","description":"Locate and identify objects in image, video, audio, or other data."},"task_extract":{"title":"Extract - AI Interaction Atlas","description":"Pull specific data fields from documents they already have."},"task_estimate":{"title":"Estimate - AI Interaction Atlas","description":"Measure distances, depths, and dimensions from images or sensors."},"task_explain":{"title":"Explain / Interpret - AI Interaction Atlas","description":"Reveals the contributing factors behind a model"},"task_forecast":{"title":"Forecast - AI Interaction Atlas","description":"Predicts future values in a sequence based on historical trends."},"task_monitor":{"title":"Monitor - AI Interaction Atlas","description":"Identifies specific events or objects detected in continuous data streams."},"task_retrieve":{"title":"Retrieve - AI Interaction Atlas","description":"Find relevant documents or items from large collections using semantic search."},"task_segment":{"title":"Segment - AI Interaction Atlas","description":"Cut out and separate specific chunks of image or other data."},"task_classify":{"title":"Classify - AI Interaction Atlas","description":"Categorize items into predefined groups."},"task_match":{"title":"Match - AI Interaction Atlas","description":"Determine how similar two items are."},"task_rank":{"title":"Rank - AI Interaction Atlas","description":"Sort items by relevance, quality, or importance."},"task_regress":{"title":"Regress - AI Interaction Atlas","description":"Predict numerical values (price, score, rating) from structured data."},"task_synthesize":{"title":"Synthesize - AI Interaction Atlas","description":"Get the key points from multiple sources combined into one."},"task_verify":{"title":"Verify - AI Interaction Atlas","description":"Evaluate content/claims against evidence to determine accuracy, consistency, or compliance."},"task_simulate":{"title":"Simulate - AI Interaction Atlas","description":"Roll forward a world state under hypothetical conditions to predict outcomes and compare scenarios."},"task_represent":{"title":"Represent - AI Interaction Atlas","description":"Converts content into searchable format for semantic operations (usually automatic)."},"task_cluster":{"title":"Cluster - AI Interaction Atlas","description":"Find common patterns and group similar items automatically."},"task_generate":{"title":"Generate - AI Interaction Atlas","description":"Create new content from scratch based on input."},"task_transform":{"title":"Transform - AI Interaction Atlas","description":"Modify style or format of existing content."},"task_translate":{"title":"Translate - AI Interaction Atlas","description":"Convert content from one language or format to another."},"task_adapt":{"title":"Adapt - AI Interaction Atlas","description":"Updates system behavior based on implicit or explicit feedback."},"task_act":{"title":"Act - AI Interaction Atlas","description":"Performs physical or digital actions in an environment."},"task_explore":{"title":"Explore - AI Interaction Atlas","description":"Tries new actions to discover optimal strategies."},"task_plan":{"title":"Plan - AI Interaction Atlas","description":"Optimizes or generates a sequence of future actions to achieve a goal."},"human_authenticate":{"title":"Authenticate / Identify - AI Interaction Atlas","description":"User proves identity or establishes an account/session."},"human_grant_consent":{"title":"Grant / Revoke Consent - AI Interaction Atlas","description":"User explicitly permits or denies data collection/processing and feature access."},"human_connect_integration":{"title":"Connect Integration - AI Interaction Atlas","description":"User links an external account, data source, or device to the system."},"human_upload_file":{"title":"Upload File - AI Interaction Atlas","description":"User provides digital assets to the system."},"human_type_input":{"title":"Type Input - AI Interaction Atlas","description":"User enters text data manually."},"human_voice_command":{"title":"Voice Command - AI Interaction Atlas","description":"User speaks a verbal command or query to the system."},"human_gesture":{"title":"Gesture Input - AI Interaction Atlas","description":"User performs physical gestures, hand tracking, or body movements as input."},"human_navigate_space":{"title":"Navigate Space - AI Interaction Atlas","description":"User moves through a physical or virtual 3D environment."},"human_adjust_control":{"title":"Adjust Control - AI Interaction Atlas","description":"User continuously adjusts a control (slider, knob, dial) to steer system behavior."},"human_configure":{"title":"Configure System - AI Interaction Atlas","description":"User defines system parameters, preferences, and operational settings."},"human_select_option":{"title":"Select Option - AI Interaction Atlas","description":"User chooses from predefined choices without strong commitment."},"human_choose":{"title":"Choose Winner - AI Interaction Atlas","description":"User picks one option as the final choice with commitment."},"human_start_process":{"title":"Start Process - AI Interaction Atlas","description":"User initiates a workflow."},"human_stop_process":{"title":"Stop Process - AI Interaction Atlas","description":"User interrupts a running workflow."},"human_compare":{"title":"Compare Options - AI Interaction Atlas","description":"User evaluates multiple items side-by-side to understand differences."},"human_organize":{"title":"Organize & Label - AI Interaction Atlas","description":"User arranges items into groups, hierarchies, or applies semantic tags."},"human_annotate":{"title":"Annotate & Mark Up - AI Interaction Atlas","description":"User adds visual or spatial annotations to content (draw, highlight, comment)."},"human_review":{"title":"Review & Approve - AI Interaction Atlas","description":"User validates accuracy and acceptability of system output."},"human_validate":{"title":"Validate Data - AI Interaction Atlas","description":"User checks data quality, completeness, and correctness against requirements."},"human_provide_feedback":{"title":"Provide Feedback - AI Interaction Atlas","description":"User provides explicit signal of quality, preference, or satisfaction."},"human_flag":{"title":"Flag Content - AI Interaction Atlas","description":"User reports problematic content, errors, or policy violations."},"human_edit":{"title":"Edit Content - AI Interaction Atlas","description":"User modifies system-generated or system-provided content."},"human_export":{"title":"Export / Download - AI Interaction Atlas","description":"User takes an artifact out of the system into another context."},"system_read_db":{"title":"Read Record - AI Interaction Atlas","description":"Retrieves existing data from persistent storage."},"system_cache":{"title":"Semantic Cache - AI Interaction Atlas","description":"Short-circuits processing by retrieving previously generated results for similar inputs."},"system_webhook":{"title":"Webhook Listener - AI Interaction Atlas","description":"Waits for external service triggers."},"system_timer":{"title":"Scheduled Timer - AI Interaction Atlas","description":"Triggers actions based on time schedules."},"system_rules":{"title":"Logic Gate - AI Interaction Atlas","description":"Deterministic branching logic based on conditions."},"system_format":{"title":"Format Conversion - AI Interaction Atlas","description":"Transforms data structure without changing meaning."},"system_api":{"title":"API Call - AI Interaction Atlas","description":"Executes an action in an external service."},"system_create_db":{"title":"Create Record - AI Interaction Atlas","description":"Inserts new data into persistent storage."},"system_update_db":{"title":"Update Record - AI Interaction Atlas","description":"Modifies existing data in persistent storage."},"system_delete_db":{"title":"Delete Record - AI Interaction Atlas","description":"Removes data from persistent storage."},"system_notification":{"title":"Send Notification - AI Interaction Atlas","description":"Sends an alert to a user channel."},"system_log":{"title":"Log Event - AI Interaction Atlas","description":"Records system state for audit trails."},"system_git":{"title":"Git Action - AI Interaction Atlas","description":"Executes version control operations in a Git repository."},"system_analytics":{"title":"Analytics Collection - AI Interaction Atlas","description":"Captures behavioral data across all user interactions for adaptation and analysis."},"system_experiment":{"title":"A/B Test Manager - AI Interaction Atlas","description":"Manages experimentation infrastructure for controlled testing of variants."},"system_monitor_model":{"title":"Model Monitor - AI Interaction Atlas","description":"Detects drift, performance degradation, and anomalies in production AI systems."},"system_state":{"title":"State Manager - AI Interaction Atlas","description":"Persists and retrieves adaptive system state across sessions."},"system_reward":{"title":"Reward Calculator - AI Interaction Atlas","description":"Converts user behavior into quantitative feedback signals for learning."},"system_session":{"title":"Session Manager - AI Interaction Atlas","description":"Maintains conversational and interactive context across turns."}},"layers":{"layer_inbound":{"title":"Inbound Layer - AI Interaction Atlas","description":"How the system perceives inputs from people and the environment, and converts them into usable signals and structured artifacts."},"layer_internal":{"title":"Internal Layer - AI Interaction Atlas","description":"Model reasoning, scoring, and deterministic business logic that decides what happens next."},"layer_outbound":{"title":"Outbound Layer - AI Interaction Atlas","description":"How the system produces outputs—content, recommendations, summaries, transformations—and communicates them to people or other systems."},"layer_interactive":{"title":"Interactive Layer - AI Interaction Atlas","description":"Closed-loop behavior over time: actions, feedback, adaptation, monitoring, and state updates (simulate → plan → act → observe → update)."}},"pages":{"/":{"title":"AI Interaction Atlas - Open Source AI UX Reference","description":"Comprehensive reference for designing AI experiences. 100+ patterns, visual examples, and reusable components for AI UX designers and product teams."},"/atlas":{"title":"Atlas Overview - AI Interaction Atlas","description":"Explore the complete taxonomy of AI interaction patterns. Browse by task type, layer, or capability."},"/atlas/ai":{"title":"AI Tasks - AI Interaction Atlas","description":"AI-driven tasks including detection, generation, classification, and more. Explore patterns for machine learning capabilities."},"/atlas/human":{"title":"Human Actions - AI Interaction Atlas","description":"Human-initiated actions in AI systems. Patterns for input, review, feedback, and human-in-the-loop workflows."},"/atlas/system":{"title":"System Operations - AI Interaction Atlas","description":"System-level operations including data management, APIs, notifications, and infrastructure patterns."},"/atlas/data":{"title":"Data Types - AI Interaction Atlas","description":"Data artifacts that flow through AI systems. Understand inputs, outputs, and intermediate data structures."},"/atlas/constraints":{"title":"Constraints - AI Interaction Atlas","description":"Design constraints that shape AI interactions. Privacy, latency, accuracy, and other considerations."},"/atlas/touchpoints":{"title":"Touchpoints - AI Interaction Atlas","description":"Interface touchpoints where humans and AI systems interact. Screens, voice, APIs, and more."},"/atlas/reference":{"title":"Quick Reference - AI Interaction Atlas","description":"Quick reference guide for AI interaction patterns. At-a-glance summaries and navigation."},"/privacy":{"title":"Privacy Policy - AI Interaction Atlas","description":"Privacy policy for the AI Interaction Atlas website."},"/terms":{"title":"Terms of Service - AI Interaction Atlas","description":"Terms of service for the AI Interaction Atlas website."}}}`);

const DEFAULT_META = {
  title: "AI Interaction Atlas - Open Source AI UX Reference",
  description: "Comprehensive reference for designing AI experiences. 100+ patterns, visual examples, and reusable components for AI UX designers and product teams.",
  url: "https://ai-interaction.com"
};

function getMetaForPath(pathname: string): { title: string; description: string } {
  // Check static pages first
  if (META_DATA.pages[pathname]) {
    return META_DATA.pages[pathname];
  }

  // Check for task pages: /atlas/task/{taskId}
  const taskMatch = pathname.match(/^\/atlas\/task\/(.+)$/);
  if (taskMatch) {
    const taskId = taskMatch[1];
    if (META_DATA.tasks[taskId]) {
      return META_DATA.tasks[taskId];
    }
  }

  // Check for layer pages: /atlas/layer/{layerId}
  const layerMatch = pathname.match(/^\/atlas\/layer\/(.+)$/);
  if (layerMatch) {
    const layerId = layerMatch[1];
    if (META_DATA.layers[layerId]) {
      return META_DATA.layers[layerId];
    }
  }

  // Default fallback
  return {
    title: DEFAULT_META.title,
    description: DEFAULT_META.description
  };
}

export default async function handler(request: Request, context: Context) {
  // Bail out early for paths we know don't need meta injection
  const url = new URL(request.url);
  const meta = getMetaForPath(url.pathname);
  if (meta.title === DEFAULT_META.title) {
    return context.next();
  }

  let response: Response;
  try {
    response = await context.next();
  } catch {
    // Origin failed — nothing we can do, return a bare 502
    return new Response("Bad Gateway", { status: 502 });
  }

  // Only process HTML responses
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  try {
    // Get the HTML
    let html = await response.text();

    // Escape special characters for safe replacement
    const safeTitle = meta.title.replace(/[&<>"']/g, (c) => {
      const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
      return entities[c] || c;
    });
    const safeDesc = meta.description.replace(/[&<>"']/g, (c) => {
      const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
      return entities[c] || c;
    });
    const canonicalUrl = `${DEFAULT_META.url}${url.pathname}`;

    // Replace meta tags in the <head>
    html = html
      .replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`)
      .replace(/<meta name="title" content="[^"]*">/, `<meta name="title" content="${safeTitle}">`)
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${safeDesc}">`)
      .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${safeTitle}">`)
      .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${safeDesc}">`)
      .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonicalUrl}">`)
      .replace(/<meta property="twitter:title" content="[^"]*">/, `<meta property="twitter:title" content="${safeTitle}">`)
      .replace(/<meta property="twitter:description" content="[^"]*">/, `<meta property="twitter:description" content="${safeDesc}">`)
      .replace(/<meta property="twitter:url" content="[^"]*">/, `<meta property="twitter:url" content="${canonicalUrl}">`)
      .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonicalUrl}">`);

    // Build new headers without stale Content-Length
    const headers = new Headers(response.headers);
    headers.delete("content-length");

    return new Response(html, {
      status: response.status,
      headers
    });
  } catch (error) {
    // HTML processing failed — return the original unmodified response
    console.error("Edge function error:", error);
    return response;
  }
}

// Disabled while investigating 500 errors
// export const config = {
//   path: "/*",
//   excludedPath: ["/assets/*", "/*.js", "/*.css", "/*.svg", "/*.png", "/*.jpg", "/*.ico", "/*.json"]
// };

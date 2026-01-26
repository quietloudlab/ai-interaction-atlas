// src/data/layers.ts
import { Layer } from "../types";

export const LAYERS: Layer[] = [
  {
    id: "layer_inbound",
    name: "Inbound",
    slug: "inbound",
    label: "Sensing",
    role: "Sensing & Structuring",
    description:
      "How the system perceives inputs from people and the environment, and converts them into usable signals and structured artifacts.",
    color: "#4A8A3F",
    guidance: {
      when_to_use:
        "When handling raw inputs (text, files, audio, images, sensors) or converting unstructured content into structured forms.",
      typical_position: "Start of flow (or any time new input enters the system).",
      red_flags: [
        "Assuming input is already clean or structured",
        "Ignoring noise, ambiguity, or missing context",
        "No provenance (unclear sources / missing grounding)"
      ]
    }
  },
  {
    id: "layer_internal",
    name: "Internal",
    slug: "internal",
    label: "Reasoning",
    role: "Reasoning & Deciding",
    description:
      "Model reasoning, scoring, and deterministic business logic that decides what happens next.",
    color: "#3D6B8F",
    guidance: {
      when_to_use:
        "When the system must interpret signals, compare options, apply rules, verify constraints, or make decisions under uncertainty.",
      typical_position: "Middle of flow (can repeat multiple times).",
      red_flags: [
        "Black-box decisions without an explanation path",
        "Undefined thresholds (confidence, risk, cost, eligibility)",
        "Unclear decision ownership (AI vs rules vs human)"
      ]
    }
  },
  {
    id: "layer_outbound",
    name: "Outbound",
    slug: "outbound",
    label: "Expressing",
    role: "Expressing & Creating",
    description:
      "How the system produces outputs—content, recommendations, summaries, transformations—and communicates them to people or other systems.",
    color: "#8F3D3D",
    guidance: {
      when_to_use:
        "When presenting results, generating or transforming content, creating artifacts, or preparing outputs for downstream systems.",
      typical_position: "End of a loop or step (often followed by user response).",
      red_flags: [
        "Ungrounded outputs (no citations, weak linkage to evidence)",
        "Overwhelming detail with no controllable level-of-detail",
        "No affordance for correction, editing, or safe fallback"
      ]
    }
  },
  {
    id: "layer_interactive",
    name: "Interactive",
    slug: "interactive",
    label: "Acting",
    role: "Acting & Learning",
    description:
      "Closed-loop behavior over time: actions, feedback, adaptation, monitoring, and state updates (simulate → plan → act → observe → update).",
    color: "#8F6E3D",
    guidance: {
      when_to_use:
        "When the system acts in an environment, adapts from feedback, runs experiments, maintains state across sessions, or monitors drift/performance.",
      typical_position: "Continuous loop or background lifecycle.",
      red_flags: [
        "Ignoring feedback signals (explicit or implicit)",
        "No rollback/stop mechanism or rate limits (runaway loops)",
        "Model drift without monitoring + triggers",
        "Unsafe actions without human control points"
      ]
    }
  }
];

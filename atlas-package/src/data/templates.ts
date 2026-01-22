import { WorkflowTemplate } from '../types';

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = 
[
  {
    "id": "tmpl_copilot",
    "name": "Passive Copilot / Sidecar",
    "description": "Monitors user activity in a primary application and offers context-aware suggestions without blocking the workflow.",
    "primary_use_case": "Code Completion, Writing Assistants, Form Helpers",
    "complexity": "High",
    "tags": [
      "UX",
      "Real-time",
      "Assistant"
    ],
    "common_variations": [
      "Ghost Text",
      "Autocomplete",
      "Smart Paste"
    ],
    "nodes": [
    {
      "id": "a37bd95f-d4f7-40ec-8544-fac7af758151",
      "referenceId": "tp_web",
      "type": "touchpoint",
      "x": 398.5,
      "y": 629.5,
      "customLabel": "Primary App (Work Surface)",
      "notes": "The main application the user is actively using.",
      "measuredW": 140,
      "measuredH": 40,
      "personaId": "persona-user"
    },
    {
      "id": "b9097e5a-8c29-4761-a21c-93c8ef3fcc07",
      "referenceId": "tp_overlay_hud",
      "type": "touchpoint",
      "x": 608.1310679611651,
      "y": 855.9563106796116,
      "customLabel": "Sidecar (Non-blocking Panel)",
      "notes": "A passive copilot surface that never interrupts; shows suggestions when useful.",
      "measuredW": 140,
      "measuredH": 40,
      "personaId": "persona-user"
    },
    {
      "id": "8a623624-a58b-4d36-96b9-ef44c63263b5",
      "referenceId": "human_navigate_space",
      "type": "task",
      "x": 622.5,
      "y": 625.5,
      "customLabel": "Work Normally",
      "notes": "User edits/navigates without being blocked by AI.",
      "attachments": [
        {
          "id": "pc-3-a",
          "referenceId": "data_signal",
          "type": "data",
          "direction": "output",
          "notes": "Activity signals: UI events, selections, focus, recent actions"
        },
        {
          "id": "pc-3-b",
          "referenceId": "const_user_consent",
          "type": "constraint",
          "notes": "User opts in to passive monitoring"
        }
      ],
      "measuredW": 220,
      "measuredH": 173,
      "personaId": "persona-user"
    },
    {
      "id": "1f360012-451b-4e73-98d3-db27bb297590",
      "referenceId": "system_session",
      "type": "task",
      "x": 909.5,
      "y": 662.5,
      "customLabel": "Capture Session Context",
      "notes": "Collect lightweight, privacy-scoped context from the active session.",
      "attachments": [
        {
          "id": "pc-4-a",
          "referenceId": "data_session_history",
          "type": "data",
          "direction": "output",
          "notes": "Recent action trail (bounded window)"
        },
        {
          "id": "pc-4-b",
          "referenceId": "data_state_vector",
          "type": "data",
          "direction": "output",
          "notes": "Current app state summary (what/where user is working)"
        },
        {
          "id": "pc-4-c",
          "referenceId": "const_privacy",
          "type": "constraint",
          "notes": "Minimize captured content; prefer metadata over raw text when possible"
        }
      ],
      "measuredW": 220,
      "measuredH": 173
    },
    {
      "id": "4a485f9f-2190-4e3e-8647-e43fe4d4cd51",
      "referenceId": "task_monitor",
      "type": "task",
      "x": 1174.5,
      "y": 662.5,
      "customLabel": "Monitor for Triggers",
      "notes": "Detect moments where a suggestion could help (e.g., repeated errors, long pause, complex state).",
      "attachments": [
        {
          "id": "pc-5-a",
          "referenceId": "data_signal",
          "type": "data",
          "direction": "output",
          "notes": "Trigger signal + type (pause, loop, error, ambiguity, opportunity)"
        },
        {
          "id": "pc-5-b",
          "referenceId": "const_latency",
          "type": "constraint",
          "notes": "Do not slow the primary app; async and low overhead"
        }
      ],
      "measuredW": 220,
      "measuredH": 173
    },
    {
      "id": "16a68b1d-533d-4f93-a142-e2431e886011",
      "referenceId": "task_represent",
      "type": "task",
      "x": 1196.5,
      "y": 884.5,
      "customLabel": "Represent Context (Compact)",
      "notes": "Create a compact representation of what matters now (summary + embeddings).",
      "attachments": [
        {
          "id": "pc-6-a",
          "referenceId": "data_structured_text",
          "type": "data",
          "direction": "output",
          "notes": "Short context summary (bounded tokens)"
        },
        {
          "id": "pc-6-b",
          "referenceId": "data_embedding",
          "type": "data",
          "direction": "output",
          "notes": "Context embedding for retrieval/matching"
        },
        {
          "id": "pc-6-c",
          "referenceId": "const_context_window",
          "type": "constraint",
          "notes": "Hard cap on context size; prioritize recency + user intent"
        }
      ],
      "measuredW": 220,
      "measuredH": 173
    },
    {
      "id": "71d40374-3d20-41ba-8cf4-28e1876dec7d",
      "referenceId": "task_match",
      "type": "task",
      "x": 1491.5,
      "y": 731.5,
      "customLabel": "Match to Helpful Patterns",
      "notes": "Match current context to known tips, templates, commands, or next steps.",
      "attachments": [
        {
          "id": "pc-7-a",
          "referenceId": "data_list",
          "type": "data",
          "direction": "output",
          "notes": "Candidate suggestions (pattern IDs + metadata)"
        },
        {
          "id": "pc-7-b",
          "referenceId": "const_quality_threshold",
          "type": "constraint",
          "notes": "Only suggest when likely helpful; otherwise stay quiet"
        }
      ],
      "measuredW": 220,
      "measuredH": 173
    },
    {
      "id": "058b3087-8885-482e-b546-97d586ae2a1d",
      "referenceId": "task_rank",
      "type": "task",
      "x": 1882.5,
      "y": 699.5,
      "customLabel": "Rank + Select",
      "notes": "Rank candidates by relevance, timing, and intrusiveness; pick top suggestion(s).",
      "attachments": [
        {
          "id": "pc-8-a",
          "referenceId": "data_score",
          "type": "data",
          "direction": "output",
          "notes": "Suggestion scores (relevance, confidence, interruption cost)"
        },
        {
          "id": "pc-8-b",
          "referenceId": "data_selection",
          "type": "data",
          "direction": "output",
          "notes": "Chosen suggestion payload"
        },
        {
          "id": "pc-8-c",
          "referenceId": "const_confidence",
          "type": "constraint",
          "notes": "If confidence is low, offer a question or do nothing"
        }
      ],
      "measuredW": 220,
      "measuredH": 173
    },
    {
      "id": "3366f4e2-637b-438b-bb3a-6a9247619b9f",
      "referenceId": "system_notification",
      "type": "task",
      "x": 1886.5,
      "y": 921.5,
      "customLabel": "Present Suggestion (Non-blocking)",
      "notes": "Render suggestion in sidecar panel; no modal, no forced decision.",
      "attachments": [
        {
          "id": "pc-9-a",
          "referenceId": "data_markup",
          "type": "data",
          "direction": "output",
          "notes": "Suggestion card UI content (title, rationale, action)"
        },
        {
          "id": "pc-9-b",
          "referenceId": "const_tone",
          "type": "constraint",
          "notes": "Helpful, optional language; avoid alarms or urgency"
        }
      ],
      "measuredW": 220,
      "measuredH": 173
    },
    {
      "id": "c87fdce6-a140-4165-b4a2-32ad7bd0be07",
      "referenceId": "human_choose",
      "type": "task",
      "x": 620.7718446601941,
      "y": 994.4126213592233,
      "customLabel": "Ignore / Open / Apply",
      "notes": "User can ignore, expand, or apply the suggestion without leaving flow.",
      "attachments": [
        {
          "id": "pc-10-a",
          "referenceId": "data_preference_profile",
          "type": "data",
          "direction": "output",
          "notes": "User preference updates (what they find useful)"
        },
        {
          "id": "pc-10-b",
          "referenceId": "data_signal",
          "type": "data",
          "direction": "output",
          "notes": "Feedback signal (accepted, dismissed, modified)"
        },
        {
          "id": "pc-10-c",
          "referenceId": "const_human_loop",
          "type": "constraint",
          "notes": "User remains in control; AI never takes action unprompted"
        }
      ],
      "measuredW": 220,
      "measuredH": 173,
      "personaId": "persona-user"
    },
    {
      "id": "83a1cbdf-ffa1-4e7c-adb9-8df40dbb00c1",
      "referenceId": "system_analytics",
      "type": "task",
      "x": 954.8786407766988,
      "y": 1000.4417475728155,
      "customLabel": "Learn What Helps",
      "notes": "Aggregate feedback to improve ranking and reduce noise.",
      "attachments": [
        {
          "id": "pc-11-a",
          "referenceId": "data_log",
          "type": "data",
          "direction": "output",
          "notes": "Anonymized interaction log (opt-in)"
        },
        {
          "id": "pc-11-b",
          "referenceId": "const_audit_log",
          "type": "constraint",
          "notes": "Traceability for suggestions shown + user actions"
        },
        {
          "id": "pc-11-c",
          "referenceId": "const_data_retention",
          "type": "constraint",
          "notes": "Short retention window; respect org policy"
        }
      ],
      "measuredW": 220,
      "measuredH": 173
    },
    {
      "id": "0d16c756-be19-4e4c-afb4-f3f5e0b072ef",
      "referenceId": "zone_group",
      "type": "annotation",
      "subType": "zone",
      "x": 865.5,
      "y": 621.5,
      "width": 1293,
      "height": 573,
      "customLabel": "Passive Copilot Core Pipeline",
      "notes": "Capture → Monitor → Represent → Match → Rank → Present → Learn",
      "measuredW": 1293,
      "measuredH": 573
    },
    {
      "id": "d19f1a18-05ed-43b2-a8a8-45e43b7df540",
      "referenceId": "zone_group",
      "type": "annotation",
      "subType": "note",
      "x": 874.5,
      "y": 463.5,
      "width": 620,
      "height": 110,
      "customLabel": "Pattern: Passive Copilot / Sidecar",
      "notes": "Non-blocking: observes activity, offers suggestions only when useful, user always chooses.",
      "measuredW": 620,
      "measuredH": 110
    },
    {
      "id": "406523c1-08ea-450a-a1c6-cf28b46571ab",
      "referenceId": "176f2018-c87a-4efe-8cc9-6c878c594c8f",
      "type": "actor",
      "x": 213.36547751765167,
      "y": 572.1666666666667,
      "measuredW": 140,
      "measuredH": 48
    }
  ],
  "edges": [
    {
      "id": "14b939c1-33db-442e-828b-d3bf682bcec5",
      "source": "a37bd95f-d4f7-40ec-8544-fac7af758151",
      "target": "8a623624-a58b-4d36-96b9-ef44c63263b5"
    },
    {
      "id": "ce86ba22-f0a1-400c-a22a-5264117318b1",
      "source": "8a623624-a58b-4d36-96b9-ef44c63263b5",
      "target": "1f360012-451b-4e73-98d3-db27bb297590"
    },
    {
      "id": "b8a13dd4-6f7d-4d06-9561-b70200aa811d",
      "source": "1f360012-451b-4e73-98d3-db27bb297590",
      "target": "4a485f9f-2190-4e3e-8647-e43fe4d4cd51"
    },
    {
      "id": "2613d8c3-dd69-46f0-a8ed-3bef837b417b",
      "source": "1f360012-451b-4e73-98d3-db27bb297590",
      "target": "16a68b1d-533d-4f93-a142-e2431e886011",
      "label": "When trigger candidate",
      "customX": 1153.5
    },
    {
      "id": "472ab590-8acc-4d04-b85b-573e60df126d",
      "source": "4a485f9f-2190-4e3e-8647-e43fe4d4cd51",
      "target": "71d40374-3d20-41ba-8cf4-28e1876dec7d",
      "label": "Trigger signal"
    },
    {
      "id": "62301e91-0569-4dc7-be96-b905ad539d13",
      "source": "16a68b1d-533d-4f93-a142-e2431e886011",
      "target": "71d40374-3d20-41ba-8cf4-28e1876dec7d"
    },
    {
      "id": "1873686d-fa65-4076-b7f0-09471ca5b7f6",
      "source": "71d40374-3d20-41ba-8cf4-28e1876dec7d",
      "target": "058b3087-8885-482e-b546-97d586ae2a1d",
      "customX": 1772
    },
    {
      "id": "f5d002c9-0e87-46d6-b833-3f59c1a07520",
      "source": "058b3087-8885-482e-b546-97d586ae2a1d",
      "target": "3366f4e2-637b-438b-bb3a-6a9247619b9f",
      "customY": 901,
      "targetX": 1859.5,
      "sourceX": 2122.5
    },
    {
      "id": "a0efb901-0e14-456b-ad9a-f9c100ac2cc3",
      "source": "3366f4e2-637b-438b-bb3a-6a9247619b9f",
      "target": "b9097e5a-8c29-4761-a21c-93c8ef3fcc07",
      "label": "Show suggestion card",
      "customY": 1219,
      "sourceX": 2250.5,
      "targetX": 566.1310679611651
    },
    {
      "id": "2c74f627-e096-4d99-acd0-cb6e6082e9a6",
      "source": "b9097e5a-8c29-4761-a21c-93c8ef3fcc07",
      "target": "c87fdce6-a140-4165-b4a2-32ad7bd0be07",
      "customY": 934.6019417475728,
      "targetX": 591.3543689320388
    },
    {
      "id": "51c9ea76-1e62-4e67-b30d-cfc7a2598dc0",
      "source": "c87fdce6-a140-4165-b4a2-32ad7bd0be07",
      "target": "83a1cbdf-ffa1-4e7c-adb9-8df40dbb00c1",
      "label": "Feedback",
      "customX": 904.9271844660194
    },
    {
      "id": "788a9673-3010-4a21-b004-11f343566cbe",
      "source": "83a1cbdf-ffa1-4e7c-adb9-8df40dbb00c1",
      "target": "058b3087-8885-482e-b546-97d586ae2a1d",
      "label": "Improve ranking",
      "customY": 933,
      "sourceX": 1209.8786407766988,
      "customX": 1790.8252427184466
    },
    {
      "id": "6c70b0e1-33a1-414b-9154-3b59a6f84a80",
      "source": "406523c1-08ea-450a-a1c6-cf28b46571ab",
      "target": "a37bd95f-d4f7-40ec-8544-fac7af758151"
    }
  ],
  "personas": [
    {
      "id": "176f2018-c87a-4efe-8cc9-6c878c594c8f",
      "name": "Primary App User",
      "role": "Works in the main app; optionally engages with sidecar suggestions.",
      "color": "#3B82F6",
      "initials": "PA",
      "category": "human"
    }
  ]
  },
  {
    "id": "tmpl_chat",
    "name": "Generative Chat Assistant",
    "description": "The core architecture of modern LLM chatbots like ChatGPT and Claude. Features session history management, safety guardrails, and streaming response generation.",
    "primary_use_case": "General Purpose Assistant",
    "complexity": "Medium",
    "tags": [
      "Chat",
      "LLM",
      "Consumer",
      "GenAI"
    ],
    "common_variations": [
      "RAG Chatbot",
      "Persona Bot"
    ],
    "nodes": [
    {
      "id": "570f1af1-1175-4b9c-b467-0aeef1daa8bb",
      "referenceId": "tp_chat",
      "type": "touchpoint",
      "x": 646,
      "y": 779.5,
      "customLabel": "Chat UI",
      "notes": "Primary conversational interface (web/mobile).",
      "measuredW": 140,
      "measuredH": 40,
      "personaId": "persona-user"
    },
    {
      "id": "634edb47-1d8d-40b7-8304-ad12ab709329",
      "referenceId": "human_type_input",
      "type": "task",
      "x": 829,
      "y": 764.5,
      "customLabel": "Send Message",
      "notes": "User submits a message/prompt.",
      "attachments": [
        {
          "id": "chat-2-a",
          "referenceId": "data_text",
          "type": "data",
          "direction": "output",
          "notes": "User message"
        },
        {
          "id": "chat-2-b",
          "referenceId": "const_user_consent",
          "type": "constraint",
          "notes": "User consent for processing message"
        }
      ],
      "measuredW": 220,
      "measuredH": 173,
      "personaId": "persona-user"
    },
    {
      "id": "04aa0730-9cc4-4f6e-b4ba-0e3e25f791dc",
      "referenceId": "system_session",
      "type": "task",
      "x": 1139,
      "y": 644.5,
      "customLabel": "Load Session",
      "notes": "Identify session + user context (account, settings).",
      "attachments": [
        {
          "id": "chat-3-a",
          "referenceId": "data_state_vector",
          "type": "data",
          "direction": "output",
          "notes": "Session state (IDs, preferences, feature flags)"
        },
        {
          "id": "chat-3-b",
          "referenceId": "const_authentication",
          "type": "constraint",
          "notes": "User must be authenticated for saved sessions"
        }
      ],
      "measuredW": 220,
      "measuredH": 173
    },
    {
      "id": "405e564c-b660-445b-9474-c0429abc6f92",
      "referenceId": "system_load_db",
      "type": "task",
      "x": 1149,
      "y": 853.5,
      "customLabel": "Load Conversation History",
      "notes": "Fetch recent messages and relevant memory for context.",
      "attachments": [
        {
          "id": "chat-4-a",
          "referenceId": "data_session_history",
          "type": "data",
          "direction": "output",
          "notes": "Prior turns (trimmed or summarized)"
        },
        {
          "id": "chat-4-b",
          "referenceId": "const_data_retention",
          "type": "constraint",
          "notes": "Only retain history per policy / user settings"
        },
        {
          "id": "chat-4-c",
          "referenceId": "const_privacy",
          "type": "constraint",
          "notes": "PII handling and privacy controls"
        }
      ],
      "measuredW": 220,
      "measuredH": 196
    },
    {
      "id": "f90f6b09-5e5f-4068-8210-ef8cef3b0bd3",
      "referenceId": "system_format",
      "type": "task",
      "x": 1422,
      "y": 774.5,
      "customLabel": "Assemble Prompt",
      "notes": "Compose system instruction + history + user message into model input.",
      "attachments": [
        {
          "id": "chat-5-a",
          "referenceId": "data_conversation",
          "type": "data",
          "direction": "output",
          "notes": "Model-ready conversation payload"
        },
        {
          "id": "chat-5-b",
          "referenceId": "const_system_instruction",
          "type": "constraint",
          "notes": "System policies + assistant behavior"
        },
        {
          "id": "chat-5-c",
          "referenceId": "const_context_window",
          "type": "constraint",
          "notes": "Summarize/trim to fit context window"
        }
      ],
      "measuredW": 220,
      "measuredH": 196
    },
    {
      "id": "6311111a-28c6-4ece-ba29-ed2ff781c93a",
      "referenceId": "system_rules",
      "type": "task",
      "x": 1760,
      "y": 659.5,
      "customLabel": "Safety Guardrails",
      "notes": "Policy checks + refusal/redirect logic (pre-gen).",
      "attachments": [
        {
          "id": "chat-6-a",
          "referenceId": "const_content_safety",
          "type": "constraint",
          "notes": "Refuse disallowed requests; apply safe completion rules"
        },
        {
          "id": "chat-6-b",
          "referenceId": "const_audit_log",
          "type": "constraint",
          "notes": "Record moderation outcome + request class"
        }
      ],
      "measuredW": 220,
      "measuredH": 130
    },
    {
      "id": "ee3e6f96-802a-48da-baa5-671dfb86a88a",
      "referenceId": "task_generate",
      "type": "task",
      "x": 1755,
      "y": 869.5,
      "customLabel": "Generate Response (Streaming)",
      "notes": "LLM generates tokens; stream partial output as it’s produced.",
      "attachments": [
        {
          "id": "chat-7-a",
          "referenceId": "data_text",
          "type": "data",
          "direction": "output",
          "notes": "Assistant response text"
        },
        {
          "id": "chat-7-b",
          "referenceId": "const_streaming",
          "type": "constraint",
          "notes": "Stream tokens to UI with partial renders"
        },
        {
          "id": "chat-7-c",
          "referenceId": "const_latency",
          "type": "constraint",
          "notes": "Time-to-first-token targets"
        }
      ],
      "measuredW": 220,
      "measuredH": 196
    },
    {
      "id": "bf31689a-d5e3-41fc-a532-4ca4ebdbc04b",
      "referenceId": "system_log",
      "type": "task",
      "x": 2169,
      "y": 865.5,
      "customLabel": "Persist Turn",
      "notes": "Store user message + assistant output; update summaries/memory as needed.",
      "attachments": [
        {
          "id": "chat-8-a",
          "referenceId": "data_log",
          "type": "data",
          "direction": "output",
          "notes": "Conversation record + timestamps"
        },
        {
          "id": "chat-8-b",
          "referenceId": "const_encryption",
          "type": "constraint",
          "notes": "Encrypt stored conversation data"
        },
        {
          "id": "chat-8-c",
          "referenceId": "const_data_retention",
          "type": "constraint",
          "notes": "Retention window + deletion rules"
        }
      ],
      "measuredW": 220,
      "measuredH": 196
    },
    {
      "id": "cd6c3a5f-ea46-48eb-b5ca-50845802160c",
      "referenceId": "tp_chat",
      "type": "touchpoint",
      "x": 2318,
      "y": 661.5,
      "customLabel": "Stream to UI",
      "notes": "Render partial tokens; finalize response on completion.",
      "measuredW": 140,
      "measuredH": 40,
      "personaId": "persona-user"
    },
    {
      "id": "6a75c01d-008e-4da1-88a8-049be25f3f53",
      "referenceId": "zone_group",
      "type": "annotation",
      "subType": "zone",
      "x": 1074,
      "y": 609.5,
      "width": 1420,
      "height": 477,
      "customLabel": "Core Chat Assistant Pipeline",
      "notes": "Session → History → Prompt → Guardrails → Streaming generation → Persist",
      "measuredW": 1421,
      "measuredH": 479
    },
    {
      "id": "418c8f5b-db64-45b7-9ba3-41dfb11f7a94",
      "referenceId": "zone_group",
      "type": "annotation",
      "subType": "note",
      "x": 1082,
      "y": 458.5,
      "width": 560,
      "height": 110,
      "customLabel": "Minimal Pattern: Generative Chat Assistant",
      "notes": "Smallest useful architecture for modern LLM chat: session/history management, safety checks, streaming generation, and persistence.",
      "measuredW": 560,
      "measuredH": 110
    }
  ],
  "edges": [
    {
      "id": "c9c2023e-4162-4bee-8c4c-e6f0214d49ea",
      "source": "570f1af1-1175-4b9c-b467-0aeef1daa8bb",
      "target": "634edb47-1d8d-40b7-8304-ad12ab709329"
    },
    {
      "id": "623c91ab-42e8-453f-817b-10edf1eb9445",
      "source": "634edb47-1d8d-40b7-8304-ad12ab709329",
      "target": "04aa0730-9cc4-4f6e-b4ba-0e3e25f791dc"
    },
    {
      "id": "fa36e0b0-1993-4d4c-b91c-5d09fb9187be",
      "source": "04aa0730-9cc4-4f6e-b4ba-0e3e25f791dc",
      "target": "405e564c-b660-445b-9474-c0429abc6f92",
      "customY": 839.5,
      "targetX": 1127
    },
    {
      "id": "5ba45d82-23b9-426b-b209-d9c5a2f6cbb1",
      "source": "405e564c-b660-445b-9474-c0429abc6f92",
      "target": "f90f6b09-5e5f-4068-8210-ef8cef3b0bd3"
    },
    {
      "id": "38623f8a-007a-4147-a568-5f2a27e20183",
      "source": "f90f6b09-5e5f-4068-8210-ef8cef3b0bd3",
      "target": "6311111a-28c6-4ece-ba29-ed2ff781c93a",
      "label": "Policy pre-check",
      "customX": 1699
    },
    {
      "id": "ae0ca267-f7e6-484e-a3f4-02ac6ceb545b",
      "source": "6311111a-28c6-4ece-ba29-ed2ff781c93a",
      "target": "ee3e6f96-802a-48da-baa5-671dfb86a88a",
      "label": "Allowed",
      "customY": 827.5,
      "targetX": 1713
    },
    {
      "id": "9ba153fa-719f-48d8-8ba4-ac038ee0cde9",
      "source": "ee3e6f96-802a-48da-baa5-671dfb86a88a",
      "target": "cd6c3a5f-ea46-48eb-b5ca-50845802160c",
      "label": "Stream tokens",
      "customX": 2022
    },
    {
      "id": "831939b2-9766-4904-b6ef-49a9cae89edb",
      "source": "ee3e6f96-802a-48da-baa5-671dfb86a88a",
      "target": "bf31689a-d5e3-41fc-a532-4ca4ebdbc04b",
      "label": "Finalize + store",
      "customX": 2078.5
    },
    {
      "id": "e107cc22-50e7-46fb-9ca9-f567d823be55",
      "source": "bf31689a-d5e3-41fc-a532-4ca4ebdbc04b",
      "target": "405e564c-b660-445b-9474-c0429abc6f92",
      "label": "Next turn uses updated history",
      "customX": 1249,
      "customY": 1127.5,
      "targetX": 1124,
      "sourceX": 2418
    },
    {
      "id": "85a0ef3b-4edb-42cf-8285-ae374d9d90e3",
      "source": "cd6c3a5f-ea46-48eb-b5ca-50845802160c",
      "target": "570f1af1-1175-4b9c-b467-0aeef1daa8bb",
      "customY": 582.5,
      "targetX": 603
    }
  ],
  "personas": [
    {
      "id": "persona-user",
      "name": "Chat User",
      "role": "Converses with assistant, receives streamed responses",
      "color": "#3B82F6",
      "initials": "CU",
      "category": "human"
    }
  ]
  },
  {
    "id": "tmpl_rag_basic",
    "name": "RAG Knowledge Base",
    "description": "The standard Retrieval-Augmented Generation pattern. It retrieves relevant context from a database before generating an answer, reducing hallucinations.",
    "primary_use_case": "Customer Support Chatbot, Internal Wiki Search",
    "complexity": "Medium",
    "tags": [
      "Search",
      "Text",
      "Chat"
    ],
    "common_variations": [
      "Hybrid Search (Keyword + Vector)",
      "Multi-Query RAG"
    ],
    "nodes": [
    {
      "id": "39898c6d-7f48-4883-be9f-a00f9474fa1f",
      "referenceId": "tp_chat",
      "type": "touchpoint",
      "x": 578.555944055944,
      "y": 603.6293706293706,
      "customLabel": "Chat / Help UI",
      "notes": "Where the user asks questions and receives answers.",
      "measuredW": 140,
      "measuredH": 40,
      "personaId": "persona-user"
    },
    {
      "id": "46e87893-74a4-4c3d-b388-f3193987de8e",
      "referenceId": "human_type_input",
      "type": "task",
      "x": 775.8286713286712,
      "y": 612.3006993006993,
      "customLabel": "Ask a Question",
      "notes": "User submits a question to the knowledge base.",
      "attachments": [
        {
          "id": "rag-2-a",
          "referenceId": "data_text",
          "type": "data",
          "direction": "output",
          "notes": "User question"
        },
        {
          "id": "rag-2-b",
          "referenceId": "const_user_consent",
          "type": "constraint",
          "notes": "User agrees to send query to retrieval + generation system"
        }
      ],
      "measuredW": 220,
      "measuredH": 173,
      "personaId": "persona-user"
    },
    {
      "id": "9cbd1109-3afb-41b5-9ecb-83711eae43db",
      "referenceId": "task_represent",
      "type": "task",
      "x": 1070.0944055944055,
      "y": 606.006993006993,
      "customLabel": "Represent Query (Embed)",
      "notes": "Convert question into an embedding for semantic retrieval.",
      "attachments": [
        {
          "id": "rag-3-a",
          "referenceId": "data_embedding",
          "type": "data",
          "direction": "output",
          "notes": "Query embedding vector"
        },
        {
          "id": "rag-3-b",
          "referenceId": "const_latency",
          "type": "constraint",
          "notes": "Keep retrieval prep fast (e.g., < 300ms target)"
        }
      ],
      "measuredW": 220,
      "measuredH": 173
    },
    {
      "id": "b843c4d0-0cdc-42be-a757-848d8ce0dc61",
      "referenceId": "system_load_db",
      "type": "task",
      "x": 1069.3951048951049,
      "y": 797.6853146853147,
      "customLabel": "Load Knowledge Index",
      "notes": "Load vector index + document store metadata (scoped to user/org).",
      "attachments": [
        {
          "id": "rag-4-a",
          "referenceId": "data_knowledge_graph",
          "type": "data",
          "direction": "output",
          "notes": "KB structure (docs/collections/links) or retrieval index metadata"
        },
        {
          "id": "rag-4-b",
          "referenceId": "const_authorization",
          "type": "constraint",
          "notes": "Only retrieve documents user is allowed to access"
        },
        {
          "id": "rag-4-c",
          "referenceId": "const_data_residency",
          "type": "constraint",
          "notes": "Respect org data residency requirements"
        }
      ],
      "measuredW": 220,
      "measuredH": 196
    },
    {
      "id": "cff0ce6e-ac95-4d6d-9ae0-d77426612c06",
      "referenceId": "task_retrieve",
      "type": "task",
      "x": 1368.9755244755245,
      "y": 687.1958041958042,
      "customLabel": "Retrieve Relevant Context",
      "notes": "Top-k semantic retrieval (optionally hybrid with keywords).",
      "attachments": [
        {
          "id": "rag-5-a",
          "referenceId": "data_list",
          "type": "data",
          "direction": "output",
          "notes": "Top retrieved chunks/doc IDs"
        },
        {
          "id": "rag-5-b",
          "referenceId": "data_document",
          "type": "data",
          "direction": "output",
          "notes": "Retrieved text chunks with citations/metadata"
        },
        {
          "id": "rag-5-c",
          "referenceId": "const_context_window",
          "type": "constraint",
          "notes": "Limit retrieved context to fit model context window"
        }
      ],
      "measuredW": 220,
      "measuredH": 173
    },
    {
      "id": "de1d774f-3113-497e-994a-8fa11ab09f32",
      "referenceId": "task_generate",
      "type": "task",
      "x": 1637.7867132867134,
      "y": 685.0979020979021,
      "customLabel": "Generate Answer (Grounded)",
      "notes": "Answer using retrieved context; avoid inventing unsupported facts.",
      "attachments": [
        {
          "id": "rag-6-a",
          "referenceId": "data_text",
          "type": "data",
          "direction": "output",
          "notes": "Draft answer"
        },
        {
          "id": "rag-6-b",
          "referenceId": "const_system_instruction",
          "type": "constraint",
          "notes": "Use provided context; if missing, say what’s missing"
        },
        {
          "id": "rag-6-c",
          "referenceId": "const_tone",
          "type": "constraint",
          "notes": "Match product tone (helpful, concise)"
        }
      ],
      "measuredW": 220,
      "measuredH": 196
    },
    {
      "id": "b2838650-0545-4e65-a69f-f6baafe10509",
      "referenceId": "system_rules",
      "type": "task",
      "x": 1901.0034965034965,
      "y": 671.8111888111888,
      "customLabel": "Grounding + Confidence Gate",
      "notes": "Decide whether to answer, ask a clarifying question, or cite limits.",
      "attachments": [
        {
          "id": "rag-7-a",
          "referenceId": "const_confidence",
          "type": "constraint",
          "notes": "If low confidence, respond with uncertainty + what to retrieve next"
        },
        {
          "id": "rag-7-b",
          "referenceId": "const_audit_log",
          "type": "constraint",
          "notes": "Log retrieval doc IDs + model version for traceability"
        },
        {
          "id": "rag-7-c",
          "referenceId": "const_content_safety",
          "type": "constraint",
          "notes": "Apply safety policies to generated output"
        }
      ],
      "measuredW": 220,
      "measuredH": 153
    },
    {
      "id": "096d815c-4267-4d87-8e0c-b287ac7acf8a",
      "referenceId": "tp_chat",
      "type": "touchpoint",
      "x": 2305.3997882851095,
      "y": 728.0439468788094,
      "customLabel": "Answer in UI",
      "notes": "Show answer with optional citations to retrieved sources.",
      "measuredW": 140,
      "measuredH": 40,
      "personaId": "persona-user"
    },
    {
      "id": "0978e7c7-a2aa-4fc3-a8d2-f374191b62b8",
      "referenceId": "zone_group",
      "type": "annotation",
      "subType": "zone",
      "x": 1039.5,
      "y": 578,
      "width": 1110,
      "height": 430,
      "customLabel": "RAG Core Pipeline",
      "notes": "Represent → Retrieve → Generate → Gate",
      "measuredW": 1110,
      "measuredH": 430
    },
    {
      "id": "f1bf3b0e-4807-478b-8f20-67af0aad3814",
      "referenceId": "zone_group",
      "type": "annotation",
      "subType": "note",
      "x": 1050.8486238532116,
      "y": 433.53211009174316,
      "width": 520,
      "height": 110,
      "customLabel": "Core Pattern: RAG Knowledge Base",
      "notes": "Minimal template: user question → embed → retrieve context → grounded generation → gate → answer.",
      "measuredW": 520,
      "measuredH": 110
    }
  ],
  "edges": [
    {
      "id": "e594669d-5e02-4f6f-bda4-9b2592eb07a7",
      "source": "39898c6d-7f48-4883-be9f-a00f9474fa1f",
      "target": "46e87893-74a4-4c3d-b388-f3193987de8e"
    },
    {
      "id": "a34f69b0-2b95-47da-970d-dc2924b9d758",
      "source": "46e87893-74a4-4c3d-b388-f3193987de8e",
      "target": "9cbd1109-3afb-41b5-9ecb-83711eae43db"
    },
    {
      "id": "2905e94e-5124-44dd-bba3-c8069394dcb0",
      "source": "9cbd1109-3afb-41b5-9ecb-83711eae43db",
      "target": "cff0ce6e-ac95-4d6d-9ae0-d77426612c06"
    },
    {
      "id": "4d35b0e5-87d7-4573-852b-1788749a0e46",
      "source": "b843c4d0-0cdc-42be-a757-848d8ce0dc61",
      "target": "cff0ce6e-ac95-4d6d-9ae0-d77426612c06",
      "customX": 1330.9685314685314
    },
    {
      "id": "1915f257-7da0-4748-8c96-082e1baa7ede",
      "source": "cff0ce6e-ac95-4d6d-9ae0-d77426612c06",
      "target": "de1d774f-3113-497e-994a-8fa11ab09f32"
    },
    {
      "id": "3cdd31c8-28a6-46eb-aabf-f4ff97b0e471",
      "source": "de1d774f-3113-497e-994a-8fa11ab09f32",
      "target": "b2838650-0545-4e65-a69f-f6baafe10509"
    },
    {
      "id": "c81d7a32-60bd-4005-8df7-24fbf63acc3d",
      "source": "b2838650-0545-4e65-a69f-f6baafe10509",
      "target": "096d815c-4267-4d87-8e0c-b287ac7acf8a",
      "label": "If answerable"
    }
  ],
  "personas": [
    {
      "id": "persona-user",
      "name": "Knowledge Base User",
      "role": "Asks questions, consumes grounded answers",
      "color": "#3B82F6",
      "initials": "KU",
      "category": "human"
    }
  ]
  },
  {
    "id": "tmpl_doc_extract",
    "name": "Document Extraction Pipeline",
    "description": "Automates the processing of uploaded files (PDFs, Images) into structured database records with a human-in-the-loop verification step.",
    "primary_use_case": "Invoice Processing, KYC, Application Forms",
    "complexity": "High",
    "tags": [
      "Vision",
      "Automation",
      "Operations"
    ],
    "common_variations": [
      "Batch Processing",
      "Auto-Reject Low Confidence"
    ],
    "nodes": [
    {
      "id": "5fffb47b-712c-4283-a08c-1e013e3d5ce5",
      "referenceId": "tp_web",
      "type": "touchpoint",
      "x": 434.99303749685447,
      "y": 674.2861756564047,
      "customLabel": "Upload UI (Web)",
      "notes": "User uploads PDFs or images for extraction.",
      "measuredW": 140,
      "measuredH": 40,
      "personaId": "persona-ops"
    },
    {
      "id": "53bd73ce-af90-4d46-89b8-a0c5f80eee9f",
      "referenceId": "human_upload_file",
      "type": "task",
      "x": 617.4768895226912,
      "y": 670.434149819646,
      "customLabel": "Upload Document",
      "notes": "Upload PDF(s) / image(s) to be processed.",
      "attachments": [
        {
          "id": "dex-2-a",
          "referenceId": "data_file",
          "type": "data",
          "direction": "output",
          "notes": "Uploaded file(s)"
        },
        {
          "id": "dex-2-b",
          "referenceId": "const_user_consent",
          "type": "constraint",
          "notes": "User consents to processing + storage"
        },
        {
          "id": "dex-2-c",
          "referenceId": "const_privacy",
          "type": "constraint",
          "notes": "Sensitive docs handled under privacy policy"
        }
      ],
      "measuredW": 220,
      "measuredH": 196,
      "personaId": "persona-ops"
    },
    {
      "id": "72d070a6-3f57-4448-956e-d012ec200b0a",
      "referenceId": "data_file",
      "type": "data",
      "x": 787.2009059642647,
      "y": 960.6616195509326,
      "customLabel": "Source File(s)",
      "notes": "PDFs / images to be extracted.",
      "measuredW": 160,
      "measuredH": 48
    },
    {
      "id": "6893d17d-acaf-4de2-bb22-6a9ce27b6da1",
      "referenceId": "system_orchestrate",
      "type": "task",
      "x": 907.9220570510245,
      "y": 670.184612294094,
      "customLabel": "Create Processing Job",
      "notes": "Open a session/job for extraction pipeline; route by file type.",
      "attachments": [
        {
          "id": "dex-3-a",
          "referenceId": "data_session_history",
          "type": "data",
          "direction": "output",
          "notes": "Job/session record"
        },
        {
          "id": "dex-3-b",
          "referenceId": "const_error_handling",
          "type": "constraint",
          "notes": "Retry + failure states for corrupt/unsupported files"
        },
        {
          "id": "dex-3-c",
          "referenceId": "const_audit_log",
          "type": "constraint",
          "notes": "Log file IDs, user, timestamps, model versions"
        }
      ],
      "measuredW": 220,
      "measuredH": 196
    },
    {
      "id": "90102aa0-7cd4-42e5-9223-7211f2eb6285",
      "referenceId": "task_extract",
      "type": "task",
      "x": 1176.2105263157894,
      "y": 669.7105263157895,
      "customLabel": "Extract Text / Layout",
      "notes": "Parse PDF text or OCR images; preserve structure when possible.",
      "attachments": [
        {
          "id": "dex-4-a",
          "referenceId": "data_document",
          "type": "data",
          "direction": "output",
          "notes": "Extracted document text + layout metadata"
        },
        {
          "id": "dex-4-b",
          "referenceId": "const_quality_threshold",
          "type": "constraint",
          "notes": "Minimum extraction quality; else flag for review"
        },
        {
          "id": "dex-4-c",
          "referenceId": "const_latency",
          "type": "constraint",
          "notes": "Batch/async allowed; keep UI responsive"
        }
      ],
      "measuredW": 220,
      "measuredH": 196
    },
    {
      "id": "a565c745-83b5-41cf-932e-755445dd562d",
      "referenceId": "data_document",
      "type": "data",
      "x": 1364,
      "y": 966.5,
      "customLabel": "Extracted Text",
      "notes": "Text + layout blocks (and/or OCR output).",
      "measuredW": 160,
      "measuredH": 48
    },
    {
      "id": "e08a0035-6cf6-4260-887f-c0492b722a24",
      "referenceId": "task_transform",
      "type": "task",
      "x": 1482,
      "y": 677.5,
      "customLabel": "Normalize to Schema",
      "notes": "Convert extracted content into structured fields that match a target record schema.",
      "attachments": [
        {
          "id": "dex-5-a",
          "referenceId": "data_structured_text",
          "type": "data",
          "direction": "output",
          "notes": "Field-value pairs with provenance"
        },
        {
          "id": "dex-5-b",
          "referenceId": "data_schema",
          "type": "data",
          "direction": "output",
          "notes": "Target schema definition (versioned)"
        },
        {
          "id": "dex-5-c",
          "referenceId": "const_format",
          "type": "constraint",
          "notes": "Strict output formatting (types, required fields)"
        }
      ],
      "measuredW": 220,
      "measuredH": 173
    },
    {
      "id": "5e1cf7b0-4b78-4b0d-8abf-1cd5d837306a",
      "referenceId": "data_structured_text",
      "type": "data",
      "x": 1656.6666666666665,
      "y": 964.1666666666665,
      "customLabel": "Proposed Fields",
      "notes": "Candidate structured fields extracted from the doc.",
      "measuredW": 160,
      "measuredH": 48
    },
    {
      "id": "c45591c9-fe1a-45ec-83f0-dba81e50175f",
      "referenceId": "task_verify",
      "type": "task",
      "x": 1770.6666666666667,
      "y": 665.5,
      "customLabel": "Auto-Verify + Confidence",
      "notes": "Assign confidence per field; decide if human review is required.",
      "attachments": [
        {
          "id": "dex-6-a",
          "referenceId": "data_score",
          "type": "data",
          "direction": "output",
          "notes": "Confidence scores per field"
        },
        {
          "id": "dex-6-b",
          "referenceId": "const_confidence",
          "type": "constraint",
          "notes": "Route to human review under threshold"
        },
        {
          "id": "dex-6-c",
          "referenceId": "const_human_loop",
          "type": "constraint",
          "notes": "Human-in-the-loop required for low confidence or sensitive fields"
        }
      ],
      "measuredW": 220,
      "measuredH": 196
    },
    {
      "id": "df3058c0-40da-417f-9cff-a1f81dc5115a",
      "referenceId": "data_score",
      "type": "data",
      "x": 1962.6666666666663,
      "y": 963.1666666666666,
      "customLabel": "Field Confidence",
      "notes": "Score(s) used to route the workflow.",
      "measuredW": 160,
      "measuredH": 48
    },
    {
      "id": "69957b03-c304-42aa-953e-5e8a60115fa6",
      "referenceId": "human_review",
      "type": "task",
      "x": 2067.3333333333335,
      "y": 670.8333333333333,
      "customLabel": "Human Verification",
      "notes": "Reviewer checks extracted fields against the source and corrects errors.",
      "attachments": [
        {
          "id": "dex-7-a",
          "referenceId": "data_selection",
          "type": "data",
          "direction": "output",
          "notes": "Approved/corrected values"
        },
        {
          "id": "dex-7-b",
          "referenceId": "const_audit_log",
          "type": "constraint",
          "notes": "Record who approved what and when"
        },
        {
          "id": "dex-7-c",
          "referenceId": "const_authorization",
          "type": "constraint",
          "notes": "Only authorized reviewers can approve"
        }
      ],
      "measuredW": 220,
      "measuredH": 196,
      "personaId": "persona-reviewer"
    },
    {
      "id": "f820d6a3-f3d7-4a00-9aeb-634cf405b3ca",
      "referenceId": "system_save_db",
      "type": "task",
      "x": 2410.6666666666665,
      "y": 796.1666666666667,
      "customLabel": "Write Record to DB",
      "notes": "Persist verified structured record.",
      "attachments": [
        {
          "id": "dex-8-a",
          "referenceId": "data_db_record",
          "type": "data",
          "direction": "output",
          "notes": "Structured database record"
        },
        {
          "id": "dex-8-b",
          "referenceId": "const_encryption",
          "type": "constraint",
          "notes": "Encrypt sensitive fields at rest"
        },
        {
          "id": "dex-8-c",
          "referenceId": "const_data_retention",
          "type": "constraint",
          "notes": "Retention policy for source files and extracted data"
        }
      ],
      "measuredW": 220,
      "measuredH": 196
    },
    {
      "id": "cdcade0f-2a53-477e-b526-9bf9c637c8e5",
      "referenceId": "data_db_record",
      "type": "data",
      "x": 2758.5860805860802,
      "y": 654.9688644688642,
      "customLabel": "DB Record",
      "notes": "Final structured record (verified).",
      "measuredW": 160,
      "measuredH": 48
    },
    {
      "id": "4a0fd7f4-7e78-4e63-a42b-0c4788071323",
      "referenceId": "system_notification",
      "type": "task",
      "x": 2739.8241758241757,
      "y": 759.2582417582416,
      "customLabel": "Notify Completion",
      "notes": "Notify uploader (and/or downstream system) that the record is ready.",
      "attachments": [
        {
          "id": "dex-9-a",
          "referenceId": "data_signal",
          "type": "data",
          "direction": "output",
          "notes": "Completion signal"
        }
      ],
      "measuredW": 220,
      "measuredH": 124
    },
    {
      "id": "af699453-0946-4797-b9fb-7b25811f0dc1",
      "referenceId": "zone_group",
      "type": "annotation",
      "subType": "zone",
      "x": 1149.8947368421054,
      "y": 621.1666666666666,
      "width": 1511.5460526315787,
      "height": 435.0822368421052,
      "customLabel": "Document Extraction Pipeline",
      "notes": "Upload → Extract → Normalize → Verify → Human review (if needed) → Save.",
      "measuredW": 1512,
      "measuredH": 435
    },
    {
      "id": "9c4e97d6-e0eb-4653-bff0-6aa79e174835",
      "referenceId": "zone_group",
      "type": "annotation",
      "subType": "note",
      "x": 630.1696166428992,
      "y": 517.8613790789362,
      "width": 450.9890109890109,
      "height": 111.0989010989011,
      "customLabel": "Core Pattern: Document Extraction",
      "notes": "Minimal template for turning PDFs/images into structured DB records with a human verification step.",
      "measuredW": 451,
      "measuredH": 111
    }
  ],
  "edges": [
    {
      "id": "6e55ef9b-ef0f-43e3-a907-d0d6c34db7d6",
      "source": "5fffb47b-712c-4283-a08c-1e013e3d5ce5",
      "target": "53bd73ce-af90-4d46-89b8-a0c5f80eee9f"
    },
    {
      "id": "42960d7c-93cf-488c-9d03-72906d9e587b",
      "source": "53bd73ce-af90-4d46-89b8-a0c5f80eee9f",
      "target": "72d070a6-3f57-4448-956e-d012ec200b0a",
      "customY": 939.1125884293825,
      "targetX": 759.6184883818471,
      "sourceX": 864.2707826524621
    },
    {
      "id": "701eb3f8-9eb7-4743-8d17-fc4908fdd726",
      "source": "72d070a6-3f57-4448-956e-d012ec200b0a",
      "target": "6893d17d-acaf-4de2-bb22-6a9ce27b6da1",
      "customX": 873.3630082252018,
      "customY": 939.699787489864,
      "sourceX": 976.2848754299135,
      "targetX": 881.8915226998794
    },
    {
      "id": "c3294070-0207-46f2-bb13-d6c0148a5459",
      "source": "6893d17d-acaf-4de2-bb22-6a9ce27b6da1",
      "target": "90102aa0-7cd4-42e5-9223-7211f2eb6285"
    },
    {
      "id": "5930b16f-199f-443d-b788-57013c3b48f6",
      "source": "90102aa0-7cd4-42e5-9223-7211f2eb6285",
      "target": "a565c745-83b5-41cf-932e-755445dd562d",
      "customY": 935.5,
      "targetX": 1340.3333333333333,
      "sourceX": 1420.2105263157894
    },
    {
      "id": "692ee9a9-2372-46a0-8f35-baf802536afd",
      "source": "a565c745-83b5-41cf-932e-755445dd562d",
      "target": "e08a0035-6cf6-4260-887f-c0492b722a24",
      "sourceX": 1540.3333333333333,
      "customY": 935.1666666666666,
      "targetX": 1456
    },
    {
      "id": "e9e1b1f6-6850-477d-ba85-be3bbac1587c",
      "source": "e08a0035-6cf6-4260-887f-c0492b722a24",
      "target": "5e1cf7b0-4b78-4b0d-8abf-1cd5d837306a",
      "customY": 934.1666666666666,
      "sourceX": 1729.3333333333333,
      "targetX": 1631.3333333333333
    },
    {
      "id": "eefbea39-5c64-4958-b326-0acbf57005ef",
      "source": "5e1cf7b0-4b78-4b0d-8abf-1cd5d837306a",
      "target": "c45591c9-fe1a-45ec-83f0-dba81e50175f",
      "customY": 934.8333333333334,
      "targetX": 1745.3333333333335,
      "sourceX": 1837.9999999999998
    },
    {
      "id": "b7ea84a2-d37f-4dd1-9037-06d43203d987",
      "source": "c45591c9-fe1a-45ec-83f0-dba81e50175f",
      "target": "df3058c0-40da-417f-9cff-a1f81dc5115a",
      "sourceX": 2021.3333333333335,
      "customY": 933.8333333333334,
      "targetX": 1933.9999999999998
    },
    {
      "id": "1a5dd310-f310-4bca-94c2-c69d121c13a0",
      "source": "df3058c0-40da-417f-9cff-a1f81dc5115a",
      "target": "69957b03-c304-42aa-953e-5e8a60115fa6",
      "label": "If below threshold",
      "targetX": 2045.3333333333333,
      "customY": 931.8333333333334,
      "sourceX": 2180.6666666666665
    },
    {
      "id": "f326afd9-fdbc-4705-8128-68c14b02e20b",
      "source": "69957b03-c304-42aa-953e-5e8a60115fa6",
      "target": "f820d6a3-f3d7-4a00-9aeb-634cf405b3ca",
      "label": "After approval",
      "customX": 2348.333333333333,
      "customY": 867.5,
      "targetX": 2386
    },
    {
      "id": "c0192320-fd7a-4b54-9951-bfe9e8a93daf",
      "source": "f820d6a3-f3d7-4a00-9aeb-634cf405b3ca",
      "target": "cdcade0f-2a53-477e-b526-9bf9c637c8e5",
      "customX": 2678.142857142857
    },
    {
      "id": "fbf60370-6e21-4c00-8531-25e56831b3cb",
      "source": "cdcade0f-2a53-477e-b526-9bf9c637c8e5",
      "target": "4a0fd7f4-7e78-4e63-a42b-0c4788071323",
      "customY": 735.653846153846,
      "targetX": 2719.934065934066,
      "sourceX": 2963.7509157509153
    },
    {
      "id": "4555b7d5-003a-4e3c-9b3c-f7fc9e327fcb",
      "source": "df3058c0-40da-417f-9cff-a1f81dc5115a",
      "target": "f820d6a3-f3d7-4a00-9aeb-634cf405b3ca",
      "customX": 2287,
      "label": "If above threshold"
    }
  ],
  "personas": [
    {
      "id": "persona-ops",
      "name": "Uploader",
      "role": "Submits documents for extraction",
      "color": "#3B82F6",
      "initials": "UP",
      "category": "human"
    },
    {
      "id": "persona-reviewer",
      "name": "Verifier",
      "role": "Checks and approves extracted fields",
      "color": "#10B981",
      "initials": "HV",
      "category": "human"
    }
  ]
  },
  {
    "id": "tmpl_agent_tool",
    "name": "Tool-Using Agent",
    "description": "An autonomous agent loop that can decide to call external APIs to fulfill a user request.",
    "primary_use_case": "Personal Assistant, Booking Bot, Data Analyst",
    "complexity": "High",
    "tags": [
      "Agentic",
      "Logic",
      "API"
    ],
    "common_variations": [
      "Multi-Agent Swarm",
      "Plan-and-Solve"
    ],
    "nodes": [
      {
        "id": "0a87740e-a0aa-44cf-bfba-ce02e6de8db8",
        "referenceId": "tp_chat",
        "type": "touchpoint",
        "x": 490,
        "y": 666,
        "customLabel": "Chat / Command UI",
        "notes": "User asks for something to be done; agent responds and may take actions via tools.",
        "measuredW": 140,
        "measuredH": 40,
        "personaId": "persona-user"
      },
      {
        "id": "7496cb2f-574c-429d-a3ce-f880d4ffb236",
        "referenceId": "human_type_input",
        "type": "task",
        "x": 679,
        "y": 657,
        "customLabel": "User Request",
        "notes": "User expresses a goal (not steps).",
        "attachments": [
          {
            "id": "agent-2-a",
            "referenceId": "data_text",
            "type": "data",
            "direction": "output",
            "notes": "Natural-language request"
          },
          {
            "id": "agent-2-b",
            "referenceId": "const_user_consent",
            "type": "constraint",
            "notes": "User consents to tool calls on their behalf (scope may be limited)"
          }
        ],
        "measuredW": 220,
        "measuredH": 173,
        "personaId": "persona-user"
      },
      {
        "id": "3542d41e-5868-41f9-ba39-ba5967c65728",
        "referenceId": "data_session_history",
        "type": "data",
        "x": 738,
        "y": 885,
        "customLabel": "Session Context",
        "notes": "Conversation history, user preferences, prior tool results.",
        "measuredW": 160,
        "measuredH": 48
      },
      {
        "id": "ce300402-0208-4fd0-ae95-06ac53b917b2",
        "referenceId": "task_plan",
        "type": "task",
        "x": 1024.655172413793,
        "y": 671,
        "customLabel": "Plan Next Step",
        "notes": "Decide whether to respond directly or call a tool; choose which tool + arguments.",
        "attachments": [
          {
            "id": "agent-4-a",
            "referenceId": "data_structured_text",
            "type": "data",
            "direction": "output",
            "notes": "Plan / intent / chosen tool"
          },
          {
            "id": "agent-4-b",
            "referenceId": "data_json",
            "type": "data",
            "direction": "output",
            "notes": "Tool call arguments (JSON)"
          },
          {
            "id": "agent-4-c",
            "referenceId": "const_system_instruction",
            "type": "constraint",
            "notes": "Tool-use policy: call tools only when needed, minimize access, be reversible when possible"
          },
          {
            "id": "agent-4-d",
            "referenceId": "const_cost_budget",
            "type": "constraint",
            "notes": "Limit tool calls / tokens / spend"
          }
        ],
        "measuredW": 220,
        "measuredH": 196
      },
      {
        "id": "bf3dd1c2-bf64-4684-bc35-68c33e8f4a74",
        "referenceId": "system_orchestrate",
        "type": "task",
        "x": 1283.2608695652175,
        "y": 692.7391304347826,
        "customLabel": "Orchestrate Loop",
        "notes": "Executes the plan: call tool, store results, decide whether to continue looping.",
        "attachments": [
          {
            "id": "agent-5-a",
            "referenceId": "const_rate_limit",
            "type": "constraint",
            "notes": "Respect API/tool rate limits and backoff"
          },
          {
            "id": "agent-5-b",
            "referenceId": "const_error_handling",
            "type": "constraint",
            "notes": "Handle tool errors; retry rules; graceful failure modes"
          },
          {
            "id": "agent-5-c",
            "referenceId": "const_audit_log",
            "type": "constraint",
            "notes": "Record tool calls + responses for traceability"
          }
        ],
        "measuredW": 220,
        "measuredH": 153
      },
      {
        "id": "834cb92d-0b28-43f3-b620-5881245bba85",
        "referenceId": "system_api",
        "type": "task",
        "x": 1615,
        "y": 657.9565217391304,
        "customLabel": "Call External API / Tool",
        "notes": "Agent invokes an external tool (search, calendar, CRM, payments, etc.).",
        "attachments": [
          {
            "id": "agent-6-a",
            "referenceId": "data_api_response",
            "type": "data",
            "direction": "output",
            "notes": "Raw tool response (may be partial / paginated)"
          },
          {
            "id": "agent-6-b",
            "referenceId": "const_authentication",
            "type": "constraint",
            "notes": "Use least-privilege auth / scoped tokens"
          },
          {
            "id": "agent-6-c",
            "referenceId": "const_authorization",
            "type": "constraint",
            "notes": "Only act within user-approved scopes"
          },
          {
            "id": "agent-6-d",
            "referenceId": "const_privacy",
            "type": "constraint",
            "notes": "Avoid sending sensitive data unless necessary"
          }
        ],
        "measuredW": 220,
        "measuredH": 220
      },
      {
        "id": "a78daadf-0632-43cf-b66f-ddd51d163577",
        "referenceId": "task_synthesize",
        "type": "task",
        "x": 1987.9835082458771,
        "y": 682.3343328335833,
        "customLabel": "Interpret + Update State",
        "notes": "Summarize tool results, update working memory/state, decide if more tool calls are needed.",
        "attachments": [
          {
            "id": "agent-7-a",
            "referenceId": "data_state_vector",
            "type": "data",
            "direction": "output",
            "notes": "Working memory / state update"
          },
          {
            "id": "agent-7-b",
            "referenceId": "data_structured_text",
            "type": "data",
            "direction": "output",
            "notes": "Intermediate synthesis / notes"
          },
          {
            "id": "agent-7-c",
            "referenceId": "const_context_window",
            "type": "constraint",
            "notes": "Summarize + compress to preserve important details in limited context"
          }
        ],
        "measuredW": 220,
        "measuredH": 173
      },
      {
        "id": "48d9fde3-32c4-42dd-9db3-521cd99c3b9d",
        "referenceId": "system_rules",
        "type": "task",
        "x": 2268.763118440779,
        "y": 693.128935532234,
        "customLabel": "Stop / Continue Gate",
        "notes": "Check completion, confidence, and safety; decide to stop, loop, or ask the user.",
        "attachments": [
          {
            "id": "agent-8-a",
            "referenceId": "const_confidence",
            "type": "constraint",
            "notes": "If uncertain, request clarification or propose options"
          },
          {
            "id": "agent-8-b",
            "referenceId": "const_human_loop",
            "type": "constraint",
            "notes": "Require confirmation before irreversible actions (e.g., purchases, sending messages)"
          },
          {
            "id": "agent-8-c",
            "referenceId": "const_content_safety",
            "type": "constraint",
            "notes": "Refuse disallowed requests; constrain tool usage appropriately"
          }
        ],
        "measuredW": 220,
        "measuredH": 153
      },
      {
        "id": "10c3b69f-8c82-427e-a6cd-d1935f996553",
        "referenceId": "task_generate",
        "type": "task",
        "x": 2720.2923538230884,
        "y": 685.2578710644677,
        "customLabel": "Respond / Present Result",
        "notes": "Produce final answer, action summary, and any next steps.",
        "attachments": [
          {
            "id": "agent-9-a",
            "referenceId": "data_text",
            "type": "data",
            "direction": "output",
            "notes": "User-facing response"
          },
          {
            "id": "agent-9-b",
            "referenceId": "const_format",
            "type": "constraint",
            "notes": "Structured output when useful (bullets, tables, citations, etc.)"
          },
          {
            "id": "agent-9-c",
            "referenceId": "const_tone",
            "type": "constraint",
            "notes": "Clear, concise, non-overconfident"
          }
        ],
        "measuredW": 220,
        "measuredH": 173,
        "personaId": "persona-user"
      },
      {
        "id": "ba8cbd8a-2159-421c-b99d-67bfb0f782ca",
        "referenceId": "data_log",
        "type": "data",
        "x": 1896.4842578710643,
        "y": 890.3178410794602,
        "customLabel": "Tool Trace / Logs",
        "notes": "Tool call history, timings, errors (for debugging + audit).",
        "measuredW": 160,
        "measuredH": 48
      },
      {
        "id": "d3735aca-ffdc-49ce-9171-2da84c5a13d1",
        "referenceId": "zone_group",
        "type": "annotation",
        "subType": "zone",
        "x": 975,
        "y": 626,
        "width": 1556.7541229385308,
        "height": 410.63718140929535,
        "customLabel": "Tool-Using Agent Loop",
        "notes": "Plan → Orchestrate → Tool → Synthesize → Gate → (Loop or Respond)",
        "measuredW": 1556,
        "measuredH": 410
      },
      {
        "id": "da64eeb6-4c02-4433-b5a1-93f47826de68",
        "referenceId": "zone_group",
        "type": "annotation",
        "subType": "note",
        "x": 438.4742268041237,
        "y": 447.8453608247423,
        "width": 610,
        "height": 110,
        "customLabel": "Core Pattern: Tool-Using Agent",
        "notes": "Minimal autonomous loop. Use a human-loop constraint for irreversible actions; keep state + logs; iterate until done.",
        "measuredW": 610,
        "measuredH": 110
      }
    ],
    "edges": [
      {
        "id": "af3acbdd-c734-4cd7-a9b8-f0dc28539232",
        "source": "0a87740e-a0aa-44cf-bfba-ce02e6de8db8",
        "target": "7496cb2f-574c-429d-a3ce-f880d4ffb236"
      },
      {
        "id": "c171ee35-e764-4396-9400-7c52ab973c3f",
        "source": "7496cb2f-574c-429d-a3ce-f880d4ffb236",
        "target": "ce300402-0208-4fd0-ae95-06ac53b917b2",
        "customX": 937
      },
      {
        "id": "2ae5d1f9-af3f-4dd3-8264-2cdb009ed6d8",
        "source": "3542d41e-5868-41f9-ba39-ba5967c65728",
        "target": "ce300402-0208-4fd0-ae95-06ac53b917b2",
        "label": "Context",
        "customX": 935.8103448275862
      },
      {
        "id": "33d00212-4037-4c12-a2c3-61793554f68b",
        "source": "ce300402-0208-4fd0-ae95-06ac53b917b2",
        "target": "bf3dd1c2-bf64-4684-bc35-68c33e8f4a74"
      },
      {
        "id": "ec92dfdd-7039-4e25-9aec-7c17ca3460f4",
        "source": "bf3dd1c2-bf64-4684-bc35-68c33e8f4a74",
        "target": "834cb92d-0b28-43f3-b620-5881245bba85",
        "label": "Tool call"
      },
      {
        "id": "ce1ba000-5831-4e0f-b0b4-efde4037c9b3",
        "source": "834cb92d-0b28-43f3-b620-5881245bba85",
        "target": "a78daadf-0632-43cf-b66f-ddd51d163577",
        "label": "Results"
      },
      {
        "id": "1078efb2-9e38-48e4-b4c9-b2f090e3faeb",
        "source": "a78daadf-0632-43cf-b66f-ddd51d163577",
        "target": "48d9fde3-32c4-42dd-9db3-521cd99c3b9d"
      },
      {
        "id": "e65ff1a1-2828-4b8d-9531-4797d7b70d0e",
        "source": "48d9fde3-32c4-42dd-9db3-521cd99c3b9d",
        "target": "ce300402-0208-4fd0-ae95-06ac53b917b2",
        "label": "Continue (loop)",
        "customY": 1007.9655172413793,
        "targetX": 999.4827586206895,
        "sourceX": 2508.545727136431
      },
      {
        "id": "e8b9d9c3-880d-4aa3-8090-f7a184fd2390",
        "source": "48d9fde3-32c4-42dd-9db3-521cd99c3b9d",
        "target": "10c3b69f-8c82-427e-a6cd-d1935f996553",
        "label": "Stop (done / ask user)"
      },
      {
        "id": "1a14febc-a1d7-42a9-9469-fd87744805ad",
        "source": "834cb92d-0b28-43f3-b620-5881245bba85",
        "target": "ba8cbd8a-2159-421c-b99d-67bfb0f782ca",
        "label": "Trace"
      },
      {
        "id": "2f28274c-aa71-4922-a5c2-50110d9ef0bd",
        "source": "10c3b69f-8c82-427e-a6cd-d1935f996553",
        "target": "0a87740e-a0aa-44cf-bfba-ce02e6de8db8",
        "customY": 588.9743659098285,
        "sourceX": 2984.3129723797892,
        "targetX": 434.63917525773195
      }
    ],
    "personas": [
      {
        "id": "persona-user",
        "name": "User",
        "role": "States goals, provides confirmations, consumes results",
        "color": "#3B82F6",
        "initials": "U",
        "category": "human"
      }
    ]
  },
  {
    "id": "tmpl_moderation",
    "name": "Content Moderation System",
    "description": "A safety-first pipeline for user-generated content, combining automated classification with human oversight.",
    "primary_use_case": "Social Media, Comment Sections, Forums",
    "complexity": "Low",
    "tags": [
      "Safety",
      "Classification",
      "Human-in-the-loop"
    ],
    "common_variations": [
      "Pre-moderation",
      "Post-moderation"
    ],
    "nodes": [
      {
        "id": "fe847a51-0333-4227-9a99-50b933f237b7",
        "referenceId": "tp_web",
        "type": "touchpoint",
        "x": 260.5,
        "y": 641.5,
        "customLabel": "User Content Surface (Web/App)",
        "notes": "Where UGC is created and submitted.",
        "measuredW": 140,
        "measuredH": 40,
        "personaId": "persona-creator"
      },
      {
        "id": "15b97802-e9e1-4984-939b-13e22f0dcc74",
        "referenceId": "human_upload_file",
        "type": "task",
        "x": 480.5,
        "y": 656.5,
        "customLabel": "Submit Content",
        "notes": "User posts text/image/video to the platform.",
        "attachments": [
          {
            "id": "cm-2-a",
            "referenceId": "data_multimodal",
            "type": "data",
            "direction": "output",
            "notes": "UGC payload (text/image/video + metadata)"
          },
          {
            "id": "cm-2-b",
            "referenceId": "const_user_consent",
            "type": "constraint",
            "notes": "User consents to moderation processing per TOS"
          }
        ],
        "measuredW": 220,
        "measuredH": 173,
        "personaId": "persona-creator"
      },
      {
        "id": "d28e1693-6c3e-4feb-ab5f-277e3fd26dad",
        "referenceId": "data_multimodal",
        "type": "data",
        "x": 785.5,
        "y": 672.5,
        "customLabel": "UGC Item",
        "notes": "The submitted content to be moderated (plus metadata).",
        "measuredW": 160,
        "measuredH": 48
      },
      {
        "id": "1aead687-39fb-4d24-b768-cf7d61827143",
        "referenceId": "const_content_safety",
        "type": "constraint",
        "x": 807.5,
        "y": 477.5,
        "customLabel": "Safety Policy Constraints",
        "notes": "Moderation must follow policy definitions (categories, thresholds, escalation).",
        "measuredW": 180,
        "measuredH": 40
      },
      {
        "id": "da7f35af-832f-4402-8fb0-8b67b5be6583",
        "referenceId": "data_policy",
        "type": "data",
        "x": 827.5,
        "y": 545.5,
        "customLabel": "Moderation Policy",
        "notes": "Rules, taxonomy, and enforcement definitions (source of truth).",
        "measuredW": 160,
        "measuredH": 48
      },
      {
        "id": "5805d2ae-e1f7-46ae-96ee-355f12cb87dc",
        "referenceId": "task_classify",
        "type": "task",
        "x": 776.5,
        "y": 760.5,
        "customLabel": "Automated Safety Classification",
        "notes": "Model assigns labels + risk scores (e.g., hate/harassment, sexual content, violence, self-harm, spam).",
        "attachments": [
          {
            "id": "cm-3-a",
            "referenceId": "data_classification",
            "type": "data",
            "direction": "output",
            "notes": "Labels (multi-label) + categories"
          },
          {
            "id": "cm-3-b",
            "referenceId": "data_score",
            "type": "data",
            "direction": "output",
            "notes": "Risk/confidence scores"
          },
          {
            "id": "cm-3-c",
            "referenceId": "const_latency",
            "type": "constraint",
            "notes": "Fast path for posting (e.g., < 1s target for non-escalations)"
          }
        ],
        "measuredW": 220,
        "measuredH": 173
      },
      {
        "id": "3b4e6233-aa81-4566-b25b-7c11a5a3e322",
        "referenceId": "system_rules",
        "type": "task",
        "x": 1149.5,
        "y": 725.5,
        "customLabel": "Policy Decision + Routing",
        "notes": "Apply thresholds: allow, remove, limit distribution, or escalate to human review.",
        "attachments": [
          {
            "id": "cm-4-a",
            "referenceId": "data_action",
            "type": "data",
            "direction": "output",
            "notes": "Decision action: allow / limit / remove / escalate"
          },
          {
            "id": "cm-4-b",
            "referenceId": "const_quality_threshold",
            "type": "constraint",
            "notes": "Escalate if score in uncertain band or category requires review"
          },
          {
            "id": "cm-4-c",
            "referenceId": "const_human_loop",
            "type": "constraint",
            "notes": "Certain classes require human oversight"
          }
        ],
        "measuredW": 220,
        "measuredH": 196
      },
      {
        "id": "f67b2d8b-0cfa-4f8f-ad45-c30d52520cf6",
        "referenceId": "tp_web",
        "type": "touchpoint",
        "x": 1249.5,
        "y": 548.5,
        "customLabel": "Moderator Console",
        "notes": "Queue view for escalated items; shows content, policy, model rationale/signals, and decision tools.",
        "measuredW": 140,
        "measuredH": 40,
        "personaId": "persona-moderator"
      },
      {
        "id": "84cdab5c-d5ed-4099-aae1-243bef5851cf",
        "referenceId": "human_review",
        "type": "task",
        "x": 1563.5,
        "y": 641.5,
        "customLabel": "Human Review + Decision",
        "notes": "Moderator confirms or overrides; adds rationale and selects enforcement action.",
        "attachments": [
          {
            "id": "cm-6-a",
            "referenceId": "data_action",
            "type": "data",
            "direction": "output",
            "notes": "Final action: approve / restrict / remove / ban / escalate"
          },
          {
            "id": "cm-6-b",
            "referenceId": "data_text",
            "type": "data",
            "direction": "output",
            "notes": "Moderator rationale / notes"
          },
          {
            "id": "cm-6-c",
            "referenceId": "const_audit_log",
            "type": "constraint",
            "notes": "Record who decided what, and why"
          }
        ],
        "measuredW": 220,
        "measuredH": 173,
        "personaId": "persona-moderator"
      },
      {
        "id": "0bd2fcd3-1e09-4385-9ed3-8c92e28c5d58",
        "referenceId": "system_save_db",
        "type": "task",
        "x": 1561.5,
        "y": 844.5,
        "customLabel": "Persist Moderation Record",
        "notes": "Store decision, policy version, model version, and any human notes.",
        "attachments": [
          {
            "id": "cm-7-a",
            "referenceId": "data_db_record",
            "type": "data",
            "direction": "output",
            "notes": "Moderation decision record"
          },
          {
            "id": "cm-7-b",
            "referenceId": "const_data_retention",
            "type": "constraint",
            "notes": "Retention rules for logs and evidence"
          },
          {
            "id": "cm-7-c",
            "referenceId": "const_privacy",
            "type": "constraint",
            "notes": "Minimize stored personal data; redact where needed"
          }
        ],
        "measuredW": 220,
        "measuredH": 196
      },
      {
        "id": "5c08d693-5937-4e1f-9a1c-384fcac1adf2",
        "referenceId": "data_db_record",
        "type": "data",
        "x": 2044.5,
        "y": 793.5,
        "customLabel": "Moderation DB",
        "notes": "System-of-record for decisions + evidence pointers.",
        "measuredW": 160,
        "measuredH": 48
      },
      {
        "id": "296879cd-e9ff-4dbc-a371-a0a9c0b439e8",
        "referenceId": "system_notification",
        "type": "task",
        "x": 2013.5,
        "y": 877.5,
        "customLabel": "Notify + Enforce Outcome",
        "notes": "Apply enforcement (remove/limit) and notify user (and optionally appeal link).",
        "attachments": [
          {
            "id": "cm-8-b",
            "referenceId": "const_localization",
            "type": "constraint",
            "notes": "Localize user-facing explanations"
          },
          {
            "id": "cm-8-c",
            "referenceId": "const_error_handling",
            "type": "constraint",
            "notes": "Fallback if notification/enforcement fails"
          }
        ],
        "measuredW": 220,
        "measuredH": 130
      },
      {
        "id": "fcd2e968-83a5-4707-beaf-22e8d6d51ff7",
        "referenceId": "tp_web",
        "type": "touchpoint",
        "x": 2301.5,
        "y": 870.5,
        "customLabel": "User Sees Result",
        "notes": "Content is posted, limited, removed, or actioned; user can be shown a reason + appeal path.",
        "measuredW": 140,
        "measuredH": 40,
        "personaId": "persona-creator"
      },
      {
        "id": "4f7303a1-deec-4781-ae69-eca1e8915750",
        "referenceId": "zone_group",
        "type": "annotation",
        "subType": "zone",
        "x": 735.5,
        "y": 628.5,
        "width": 1210,
        "height": 430,
        "customLabel": "Content Moderation Core Pipeline",
        "notes": "Classify → Policy decision/routing → Human review (if needed) → Persist → Notify/enforce",
        "measuredW": 1210,
        "measuredH": 430
      },
      {
        "id": "0ea0bbdd-c669-466d-9d06-a2aadaac8111",
        "referenceId": "zone_group",
        "type": "annotation",
        "subType": "note",
        "x": 226.51754385964912,
        "y": 473.0263157894737,
        "width": 520.8771929824561,
        "height": 100,
        "customLabel": "Minimal Template: Content Moderation System",
        "notes": "Safety-first pipeline that combines automated classification with policy routing and human oversight.",
        "measuredW": 520,
        "measuredH": 99
      }
    ],
    "edges": [
      {
        "id": "5688df3d-d571-4ff7-b05d-d89a289dde75",
        "source": "fe847a51-0333-4227-9a99-50b933f237b7",
        "target": "15b97802-e9e1-4984-939b-13e22f0dcc74"
      },
      {
        "id": "68df6431-902d-481f-b673-6616c6958f21",
        "source": "15b97802-e9e1-4984-939b-13e22f0dcc74",
        "target": "d28e1693-6c3e-4feb-ab5f-277e3fd26dad"
      },
      {
        "id": "8547382c-7ca9-4098-a9c7-df3de00885a4",
        "source": "d28e1693-6c3e-4feb-ab5f-277e3fd26dad",
        "target": "5805d2ae-e1f7-46ae-96ee-355f12cb87dc",
        "customY": 741,
        "targetX": 756.5
      },
      {
        "id": "376e3fe7-71df-42e3-b9bc-109db2d38e89",
        "source": "da7f35af-832f-4402-8fb0-8b67b5be6583",
        "target": "3b4e6233-aa81-4566-b25b-7c11a5a3e322",
        "label": "Policy definitions",
        "customX": 1040.8316831683169
      },
      {
        "id": "b103d7f5-4eec-45ed-a57e-3162ea09e077",
        "source": "1aead687-39fb-4d24-b768-cf7d61827143",
        "target": "3b4e6233-aa81-4566-b25b-7c11a5a3e322",
        "label": "Safety constraints",
        "customY": 579.5,
        "targetX": 1116.5,
        "customX": 1112.5
      },
      {
        "id": "e7a0955d-a31c-4aa7-aa80-e8c45f52e27b",
        "source": "5805d2ae-e1f7-46ae-96ee-355f12cb87dc",
        "target": "3b4e6233-aa81-4566-b25b-7c11a5a3e322"
      },
      {
        "id": "13e738f5-4fc7-49f5-9f87-a12caf638723",
        "source": "3b4e6233-aa81-4566-b25b-7c11a5a3e322",
        "target": "84cdab5c-d5ed-4099-aae1-243bef5851cf",
        "label": "Escalate if uncertain/high-risk"
      },
      {
        "id": "cd7843c0-eaac-4ca3-844f-e2d8c2723604",
        "source": "3b4e6233-aa81-4566-b25b-7c11a5a3e322",
        "target": "0bd2fcd3-1e09-4385-9ed3-8c92e28c5d58",
        "label": "Allow/limit/remove"
      },
      {
        "id": "31d1eb8f-3fd6-48bb-981e-74c9b7897c70",
        "source": "f67b2d8b-0cfa-4f8f-ad45-c30d52520cf6",
        "target": "84cdab5c-d5ed-4099-aae1-243bef5851cf"
      },
      {
        "id": "d088fccb-527e-4fb3-929c-a30ff24e9e4d",
        "source": "84cdab5c-d5ed-4099-aae1-243bef5851cf",
        "target": "0bd2fcd3-1e09-4385-9ed3-8c92e28c5d58",
        "customY": 828.5,
        "targetX": 1533.5,
        "sourceX": 1813.5
      },
      {
        "id": "36493fdc-d29a-4290-902b-3547d14a4549",
        "source": "0bd2fcd3-1e09-4385-9ed3-8c92e28c5d58",
        "target": "5c08d693-5937-4e1f-9a1c-384fcac1adf2"
      },
      {
        "id": "3d921270-d93b-4722-ad8c-a87879d98b00",
        "source": "0bd2fcd3-1e09-4385-9ed3-8c92e28c5d58",
        "target": "296879cd-e9ff-4dbc-a371-a0a9c0b439e8"
      },
      {
        "id": "1ea4fb96-9394-4b28-88d3-e9427d455141",
        "source": "296879cd-e9ff-4dbc-a371-a0a9c0b439e8",
        "target": "fcd2e968-83a5-4707-beaf-22e8d6d51ff7"
      }
    ],
    "personas": [
      {
        "id": "persona-creator",
        "name": "Content Creator",
        "role": "Submits user-generated content and receives moderation outcomes",
        "color": "#3B82F6",
        "initials": "CC",
        "category": "human"
      },
      {
        "id": "persona-moderator",
        "name": "Moderator",
        "role": "Reviews escalated content and makes final enforcement decisions",
        "color": "#F59E0B",
        "initials": "MO",
        "category": "human"
      }
    ]
  },
  {
    "id": "tmpl_game_enemy_ai",
    "name": "Video Game Enemy AI",
    "description": "Real-time enemy behavior system using perception, decision-making, and action execution for responsive game AI.",
    "primary_use_case": "Action games, strategy games, NPC behavior, combat AI, patrol/chase systems",
    "complexity": "Medium",
    "tags": [
      "Game AI",
      "Behavior Trees",
      "Real-time",
      "State Machines"
    ],
    "common_variations": [
      "Behavior trees vs. state machines",
      "Goal-oriented action planning (GOAP)",
      "Learning/adaptive AI",
      "Squad/group tactics"
    ],
    "nodes": [
    {
      "id": "3d3f0b43-26c8-44b8-8138-90e6c328b670",
      "referenceId": "tp_3d_space",
      "type": "touchpoint",
      "x": 581.9755244755246,
      "y": 620.2377622377622,
      "customLabel": "Game World (3D Space)",
      "notes": "Real-time simulation context where the enemy and player exist.",
      "measuredW": 140,
      "measuredH": 40
    },
    {
      "id": "52794680-bc68-47c2-94dd-92acd327f439",
      "referenceId": "human_gesture",
      "type": "task",
      "x": 829.6468531468531,
      "y": 615.020979020979,
      "customLabel": "Player Moves / Acts",
      "notes": "Player movement/inputs create observable signals in the world.",
      "attachments": [
        {
          "id": "enemy-2-a",
          "referenceId": "data_trajectory",
          "type": "data",
          "direction": "output",
          "notes": "Player movement path / pose changes"
        },
        {
          "id": "enemy-2-b",
          "referenceId": "data_action",
          "type": "data",
          "direction": "output",
          "notes": "Player actions (attack, sprint, interact)"
        }
      ],
      "measuredW": 220,
      "measuredH": 124,
      "personaId": "persona-player"
    },
    {
      "id": "24a01628-633f-4195-a6a3-317ec3a5ff38",
      "referenceId": "task_detect",
      "type": "task",
      "x": 1208.513986013986,
      "y": 658,
      "customLabel": "Perceive (Sight / Hearing)",
      "notes": "Detect player presence using line-of-sight + audio cues.",
      "attachments": [
        {
          "id": "enemy-3-a",
          "referenceId": "data_sensor_stream",
          "type": "data",
          "direction": "input",
          "notes": "World sensor signals (LOS checks, audio events)"
        },
        {
          "id": "enemy-3-b",
          "referenceId": "data_signal",
          "type": "data",
          "direction": "output",
          "notes": "Detections (seen/heard, last known position)"
        },
        {
          "id": "enemy-3-c",
          "referenceId": "const_latency",
          "type": "constraint",
          "notes": "Must run per-frame / within budget (e.g., < 2–5ms AI slice)"
        }
      ],
      "measuredW": 220,
      "measuredH": 222,
      "personaId": "persona-enemy"
    },
    {
      "id": "a0171215-4a4c-4c98-8da7-71342e35d50e",
      "referenceId": "task_estimate",
      "type": "task",
      "x": 1488.649256993007,
      "y": 653.9847027972028,
      "customLabel": "Estimate Threat / Distance",
      "notes": "Compute intent-relevant features (distance, visibility, risk).",
      "attachments": [
        {
          "id": "enemy-4-a",
          "referenceId": "data_state_vector",
          "type": "data",
          "direction": "output",
          "notes": "Feature vector (dist, cover, hp, cooldowns, alertness)"
        },
        {
          "id": "enemy-4-b",
          "referenceId": "data_score",
          "type": "data",
          "direction": "output",
          "notes": "Threat score / confidence"
        },
        {
          "id": "enemy-4-c",
          "referenceId": "const_compute_budget",
          "type": "constraint",
          "notes": "Keep estimation cheap and stable under load"
        }
      ],
      "measuredW": 220,
      "measuredH": 173,
      "personaId": "persona-enemy"
    },
    {
      "id": "39320932-ddd4-4e13-9912-f8b022224559",
      "referenceId": "task_plan",
      "type": "task",
      "x": 1786.5,
      "y": 654,
      "customLabel": "Decide Behavior",
      "notes": "Select an intent (patrol, investigate, chase, flank, attack, flee).",
      "attachments": [
        {
          "id": "enemy-5-a",
          "referenceId": "data_selection",
          "type": "data",
          "direction": "output",
          "notes": "Chosen behavior / state transition"
        },
        {
          "id": "enemy-5-b",
          "referenceId": "data_plan",
          "type": "data",
          "direction": "output",
          "notes": "Action plan (waypoints, target, timing)"
        },
        {
          "id": "enemy-5-c",
          "referenceId": "const_rules",
          "type": "constraint",
          "notes": "Design rules (difficulty tuning, fairness, avoid perfect aim)"
        },
        {
          "id": "enemy-5-d",
          "referenceId": "const_quality_threshold",
          "type": "constraint",
          "notes": "Avoid jitter: hysteresis / cooldown before switching states"
        }
      ],
      "measuredW": 220,
      "measuredH": 173,
      "personaId": "persona-enemy"
    },
    {
      "id": "bc687014-a8ae-4788-b719-93947fb9f346",
      "referenceId": "task_act",
      "type": "task",
      "x": 2051.5,
      "y": 659,
      "customLabel": "Execute Action",
      "notes": "Drive animation + navigation + attacks based on chosen behavior.",
      "attachments": [
        {
          "id": "enemy-6-a",
          "referenceId": "data_action",
          "type": "data",
          "direction": "output",
          "notes": "Enemy action commands (move/aim/attack/use ability)"
        },
        {
          "id": "enemy-6-b",
          "referenceId": "data_trajectory",
          "type": "data",
          "direction": "output",
          "notes": "Movement path / steering output"
        },
        {
          "id": "enemy-6-c",
          "referenceId": "const_error_handling",
          "type": "constraint",
          "notes": "Fallbacks if path blocked / target lost"
        }
      ],
      "measuredW": 220,
      "measuredH": 173,
      "personaId": "persona-enemy"
    },
    {
      "id": "125ce287-6419-4942-8cf8-6f0d11929d75",
      "referenceId": "task_adapt",
      "type": "task",
      "x": 1790.8706293706293,
      "y": 875.9930069930069,
      "customLabel": "Update Internal State",
      "notes": "Update memory + cooldowns + alertness based on outcomes.",
      "attachments": [
        {
          "id": "enemy-7-a",
          "referenceId": "data_session_history",
          "type": "data",
          "direction": "output",
          "notes": "Short-term memory (last seen pos, recent hits, failed actions)"
        },
        {
          "id": "enemy-7-b",
          "referenceId": "data_db_record",
          "type": "data",
          "direction": "output",
          "notes": "Optional persistence (AI director stats, heatmaps)"
        },
        {
          "id": "enemy-7-c",
          "referenceId": "const_caching",
          "type": "constraint",
          "notes": "Cache expensive queries (navmesh, LOS) to keep frame stable"
        }
      ],
      "measuredW": 220,
      "measuredH": 173,
      "personaId": "persona-enemy"
    },
    {
      "id": "1609e4a6-d546-41c0-9e6d-7aaa3f179e9d",
      "referenceId": "system_timer",
      "type": "task",
      "x": 822.472027972028,
      "y": 827.6993006993007,
      "customLabel": "Tick / Scheduling",
      "notes": "Run perception/decision at appropriate frequencies (per-frame, 10Hz, etc.).",
      "attachments": [
        {
          "id": "enemy-8-a",
          "referenceId": "data_signal",
          "type": "data",
          "direction": "output",
          "notes": "Update ticks (frame step, behavior tick, cooldown timers)"
        },
        {
          "id": "enemy-8-b",
          "referenceId": "const_rate_limit",
          "type": "constraint",
          "notes": "Throttle expensive checks under load"
        }
      ],
      "measuredW": 220,
      "measuredH": 173
    },
    {
      "id": "f7253e34-fdac-419f-be92-b599b49c2ed9",
      "referenceId": "zone_group",
      "type": "annotation",
      "subType": "zone",
      "x": 1156.5,
      "y": 619,
      "width": 1160,
      "height": 470,
      "customLabel": "Enemy AI Core Loop",
      "notes": "Perceive → Estimate → Decide → Act (+ State Update)",
      "measuredW": 1160,
      "measuredH": 470
    },
    {
      "id": "12539529-9ff8-41ae-a5a0-712b3824a387",
      "referenceId": "zone_group",
      "type": "annotation",
      "subType": "note",
      "x": 668.5,
      "y": 416,
      "width": 540,
      "height": 120,
      "customLabel": "Minimal Template: Real-Time Enemy AI",
      "notes": "This is the smallest useful behavior system: perception, feature estimation, decision selection, action execution, and state update on a tick schedule.",
      "measuredW": 540,
      "measuredH": 120
    }
  ],
  "edges": [
    {
      "id": "ea4fe155-cd7c-4f25-b52d-318c7bd4c030",
      "source": "3d3f0b43-26c8-44b8-8138-90e6c328b670",
      "target": "52794680-bc68-47c2-94dd-92acd327f439"
    },
    {
      "id": "9d0fbfa1-3c63-4e83-aa45-df11d4d0c133",
      "source": "52794680-bc68-47c2-94dd-92acd327f439",
      "target": "24a01628-633f-4195-a6a3-317ec3a5ff38",
      "customX": 1099.7097902097903
    },
    {
      "id": "42368daa-e31f-42c1-b2b9-8dae62977f23",
      "source": "1609e4a6-d546-41c0-9e6d-7aaa3f179e9d",
      "target": "24a01628-633f-4195-a6a3-317ec3a5ff38",
      "label": "Perception tick",
      "targetX": 1170.513986013986,
      "customY": 1065.5,
      "sourceX": 1071.472027972028,
      "customX": 1099.618881118881
    },
    {
      "id": "95f754d7-6d43-4235-a655-ae023deae237",
      "source": "24a01628-633f-4195-a6a3-317ec3a5ff38",
      "target": "a0171215-4a4c-4c98-8da7-71342e35d50e"
    },
    {
      "id": "c582ceb6-6926-4f3f-abd8-78c0b2980cb7",
      "source": "a0171215-4a4c-4c98-8da7-71342e35d50e",
      "target": "39320932-ddd4-4e13-9912-f8b022224559"
    },
    {
      "id": "3d1931c9-f9a2-4307-bb85-1bfa10cdd5b0",
      "source": "39320932-ddd4-4e13-9912-f8b022224559",
      "target": "bc687014-a8ae-4788-b719-93947fb9f346"
    },
    {
      "id": "79894f78-d27c-4d22-9c63-0f2aed5d7084",
      "source": "bc687014-a8ae-4788-b719-93947fb9f346",
      "target": "125ce287-6419-4942-8cf8-6f0d11929d75",
      "label": "Outcome",
      "customY": 1067.597902097902,
      "targetX": 1741.0104895104894
    },
    {
      "id": "4dd0bdb5-8383-4bbd-9466-c8bf968f4527",
      "source": "125ce287-6419-4942-8cf8-6f0d11929d75",
      "target": "39320932-ddd4-4e13-9912-f8b022224559",
      "label": "State informs next decision",
      "customY": 847.5,
      "targetX": 1756.5,
      "sourceX": 2051.63986013986
    },
    {
      "id": "28c4b73a-643f-42b9-a2f9-bcfda2ae7fa2",
      "source": "3d3f0b43-26c8-44b8-8138-90e6c328b670",
      "target": "1609e4a6-d546-41c0-9e6d-7aaa3f179e9d",
      "customX": 750.5454545454546
    }
  ],
  "personas": [
    {
      "id": "persona-player",
      "name": "Player",
      "role": "Creates actions/signals the enemy reacts to",
      "initials": "PL",
      "category": "human",
      "color": "#22C55E"
    },
    {
      "id": "persona-enemy",
      "name": "Enemy Agent",
      "role": "Perceives, decides, and acts in real-time",
      "initials": "EN",
      "category": "ai",
      "color": "#EF4444"
    }
  ]
  }
]
;

// src/data/human_tasks.ts
import { HumanTask } from '../types';

export const HUMAN_TASKS: HumanTask[] = [
  // =========================================================
  // Inbound — user provides inputs, identity, permissions
  // =========================================================

  {
    id: "human_authenticate",
    layer_id: "layer_inbound",
    name: "Authenticate / Identify",
    slug: "authenticate-identify",
    task_type: "human",
    elevator_pitch: "User proves identity or establishes an account/session.",
    example_usage: "Signing in with password, passkey, SSO, or biometrics.",
    io_spec: {
      inputs: {
        required: [],
        optional: [
          { id: "data_text", label: "Identifier (Email/Username)" },
          { id: "data_signal", label: "Auth Factor (OTP/Biometric)" }
        ]
      },
      outputs: {
        primary: { id: "data_token", label: "Session/Auth Token" },
        metadata: [
          { id: "data_json", label: "Identity Claims" },
          { id: "data_policy", label: "Permissions / Roles" }
        ]
      }
    },
    common_variants: ["password_login", "passkey", "sso_oauth", "magic_link", "biometric_unlock"],
    relations: [
      { target_id: "system_rules", type: "enables", strength: "strong", reason: "Identity gates access to features and data." },
      { target_id: "system_state", type: "enables", strength: "medium", reason: "Authenticated sessions enable persistent user state." }
    ]
  },

  {
    id: "human_grant_consent",
    layer_id: "layer_inbound",
    name: "Grant / Revoke Consent",
    slug: "grant-revoke-consent",
    task_type: "human",
    elevator_pitch: "User explicitly permits or denies data collection/processing and feature access.",
    example_usage: "Opting into microphone access, location tracking, or model-training consent.",
    io_spec: {
      inputs: {
        required: [{ id: "data_policy", label: "Consent Policy / Terms" }],
        optional: [{ id: "data_config", label: "Consent Options" }]
      },
      outputs: {
        primary: { id: "data_signal", label: "Consent Decision" },
        metadata: [
          { id: "data_policy", label: "Consent Receipt" },
          { id: "data_score", label: "Timestamp" }
        ]
      }
    },
    common_variants: ["accept_terms", "deny", "granular_permissions", "privacy_settings", "revoke_access"],
    relations: [
      { target_id: "system_rules", type: "enables", strength: "strong", reason: "Consent is enforced via deterministic gating rules." },
      { target_id: "system_log", type: "commonly_followed_by", strength: "strong", reason: "Consent decisions must be recorded for auditability." }
    ]
  },

  {
    id: "human_connect_integration",
    layer_id: "layer_inbound",
    name: "Connect Integration",
    slug: "connect-integration",
    task_type: "human",
    elevator_pitch: "User links an external account, data source, or device to the system.",
    example_usage: "Connecting Google Drive, Slack, calendar, or a wearable sensor.",
    io_spec: {
      inputs: {
        required: [],
        optional: [
          { id: "data_config", label: "Integration Provider" },
          { id: "data_text", label: "OAuth/Auth Code" }
        ]
      },
      outputs: {
        primary: { id: "data_token", label: "Integration Token / Credential" },
        metadata: [
          { id: "data_policy", label: "Granted Scopes" },
          { id: "data_log", label: "Connection Status" }
        ]
      }
    },
    common_variants: ["oauth_connect", "api_key", "device_pairing", "webhook_setup"],
    relations: [
      { target_id: "system_api", type: "enables", strength: "strong", reason: "Integrations require authenticated API calls." },
      { target_id: "system_webhook", type: "enables", strength: "medium", reason: "Some integrations rely on incoming events." }
    ]
  },

  {
    id: "human_upload_file",
    layer_id: "layer_inbound",
    name: "Upload File",
    slug: "upload-file",
    task_type: "human",
    elevator_pitch: "User provides digital assets to the system.",
    example_usage: "Uploading a CSV for analysis.",
    io_spec: {
      inputs: { required: [], optional: [] },
      outputs: { primary: { id: "data_file", label: "File Blob" }, metadata: [] }
    },
    common_variants: ["drag_and_drop", "camera_capture", "paste_from_clipboard", "url_import"],
    relations: [
      { target_id: "task_extract", type: "enables", strength: "strong", reason: "Uploaded files are the source for extraction workflows." }
    ]
  },

  {
    id: "human_type_input",
    layer_id: "layer_inbound",
    name: "Type Input",
    slug: "type-input",
    task_type: "human",
    elevator_pitch: "User enters text data manually.",
    example_usage: "Typing a search query or chat message.",
    io_spec: {
      inputs: { required: [], optional: [] },
      outputs: { primary: { id: "data_text", label: "Text String" }, metadata: [] }
    },
    common_variants: ["voice_dictation", "autocomplete_assisted", "template_fill"],
    relations: [
      { target_id: "task_represent", type: "enables", strength: "strong", reason: "Text input can be represented (embeddings) for semantic operations." },
      { target_id: "task_generate", type: "enables", strength: "strong", reason: "Text prompts can drive generation." }
    ]
  },

  {
    id: "human_voice_command",
    layer_id: "layer_inbound",
    name: "Voice Command",
    slug: "voice-command",
    task_type: "human",
    elevator_pitch: "User speaks a verbal command or query to the system.",
    example_usage: "Saying 'turn on the lights' or asking 'what's the weather?'",
    io_spec: {
      inputs: { required: [], optional: [] },
      outputs: {
        primary: { id: "data_speech", label: "Voice Input" },
        metadata: [{ id: "data_text", label: "Intent (Declared or Inferred)" }]
      }
    },
    common_variants: ["wake_word_activation", "continuous_listening", "push_to_talk", "voice_query"],
    relations: [
      { target_id: "task_translate", type: "enables", strength: "strong", reason: "Voice input must be transcribed (via ASR) for most downstream tasks." },
      { target_id: "task_classify", type: "enables", strength: "medium", reason: "Commands are often classified into intents." },
      { target_id: "task_generate", type: "enables", strength: "medium", reason: "Some voice queries trigger generation." }
    ]
  },

  {
    id: "human_gesture",
    layer_id: "layer_inbound",
    name: "Gesture Input",
    slug: "gesture-input",
    task_type: "human",
    elevator_pitch: "User performs physical gestures, hand tracking, or body movements as input.",
    example_usage: "Pinching to zoom in VR or nodding to confirm.",
    io_spec: {
      inputs: { required: [], optional: [] },
      outputs: {
        primary: { id: "data_signal", label: "Gesture" },
        metadata: [{ id: "data_pose", label: "Body Position" }, { id: "data_trajectory", label: "Movement Path" }]
      }
    },
    common_variants: ["hand_tracking", "head_nod", "body_pose", "controller_motion", "touchless_gesture"],
    relations: [
      { target_id: "task_estimate", type: "commonly_preceded_by", strength: "strong", reason: "Gesture recognition relies on pose estimation and keypoint detection." },
      { target_id: "task_classify", type: "enables", strength: "strong", reason: "Gestures are classified into meanings (swipe, pinch, etc.)." },
      { target_id: "task_act", type: "enables", strength: "medium", reason: "Gestures can control physical or digital actions." }
    ]
  },

  {
    id: "human_navigate_space",
    layer_id: "layer_inbound",
    name: "Navigate Space",
    slug: "navigate-space",
    task_type: "human",
    elevator_pitch: "User moves through a physical or virtual 3D environment.",
    example_usage: "Walking around in AR or moving through a VR scene.",
    io_spec: {
      inputs: { required: [], optional: [{ id: "data_point_cloud", label: "Environment Map" }] },
      outputs: {
        primary: { id: "data_trajectory", label: "Movement Path" },
        metadata: [{ id: "data_pose", label: "Current Position" }]
      }
    },
    common_variants: ["walk_in_vr", "teleport", "fly_navigation", "physical_movement", "gaze_navigation"],
    relations: [
      { target_id: "task_estimate", type: "commonly_preceded_by", strength: "strong", reason: "Navigation depends on pose estimation and spatial tracking over time." },
      { target_id: "task_detect", type: "enables", strength: "medium", reason: "Movement changes what objects and surfaces can be detected." },
      { target_id: "task_adapt", type: "enables", strength: "weak", reason: "Movement patterns can inform preference learning and personalization." }
    ]
  },

  {
    id: "human_adjust_control",
    layer_id: "layer_inbound",
    name: "Adjust Control",
    slug: "adjust-control",
    task_type: "human",
    elevator_pitch: "User continuously adjusts a control (slider, knob, dial) to steer system behavior.",
    example_usage: "Adjusting volume, thermostat, brush size, or model creativity.",
    io_spec: {
      inputs: { required: [], optional: [{ id: "data_config", label: "Current Value" }] },
      outputs: {
        primary: { id: "data_config", label: "Adjusted Value" },
        metadata: [{ id: "data_trajectory", label: "Adjustment Path" }]
      }
    },
    common_variants: ["slide_control", "rotate_knob", "drag_slider", "continuous_input", "fine_tuning"],
    relations: [
      { target_id: "task_act", type: "enables", strength: "medium", reason: "Control adjustments can directly drive actions in systems." },
      { target_id: "task_adapt", type: "enables", strength: "medium", reason: "Adjustment patterns can inform preference learning." },
      { target_id: "human_configure", type: "related_to", strength: "medium", reason: "Adjusting is continuous; configuring is discrete setup." }
    ]
  },

  {
    id: "human_configure",
    layer_id: "layer_inbound",
    name: "Configure System",
    slug: "configure-system",
    task_type: "human",
    elevator_pitch: "User defines system parameters, preferences, and operational settings.",
    example_usage: "Setting confidence thresholds, model selection, or output format preferences.",
    io_spec: {
      inputs: {
        required: [],
        optional: [{ id: "data_config", label: "Current Settings" }, { id: "data_schema", label: "Config Schema" }]
      },
      outputs: { primary: { id: "data_config", label: "Configuration" }, metadata: [] }
    },
    common_variants: ["set_preferences", "define_thresholds", "customize_behavior", "adjust_parameters"],
    relations: [
      { target_id: "task_adapt", type: "enables", strength: "strong", reason: "Configuration constrains how adaptation and generation behave." },
      { target_id: "task_classify", type: "enables", strength: "medium", reason: "Configuration settings (thresholds, categories) drive classification behavior." }
    ]
  },

  // =========================================================
  // Internal — user makes sense of options / structure
  // =========================================================

  {
    id: "human_select_option",
    layer_id: "layer_internal",
    name: "Select Option",
    slug: "select-option",
    task_type: "human",
    elevator_pitch: "User chooses from predefined choices without strong commitment.",
    example_usage: "Filtering results by category or selecting an item in a list.",
    io_spec: {
      inputs: { required: [{ id: "data_any", label: "Options", isArray: true }], optional: [] },
      outputs: { primary: { id: "data_selection", label: "Selection" }, metadata: [] }
    },
    common_variants: ["dropdown", "radio_button", "checkbox", "multi_select"],
    relations: [
      { target_id: "task_rank", type: "commonly_preceded_by", strength: "medium", reason: "Ranking often prepares a shortlist for selection." },
      { target_id: "system_rules", type: "enables", strength: "weak", reason: "Selections can drive deterministic branching." }
    ]
  },

  {
    id: "human_choose",
    layer_id: "layer_internal",
    name: "Choose Winner",
    slug: "choose-winner",
    task_type: "human",
    elevator_pitch: "User picks one option as the final choice with commitment.",
    example_usage: "Selecting the best AI-generated draft or deciding a design direction.",
    io_spec: {
      inputs: { required: [{ id: "data_any", label: "Options", isArray: true }], optional: [{ id: "data_text", label: "Comparison Notes" }] },
      outputs: { primary: { id: "data_any", label: "Chosen Option" }, metadata: [{ id: "data_text", label: "Selection Reason" }] }
    },
    common_variants: ["pick_winner", "select_best", "final_decision", "commit_choice"],
    relations: [
      { target_id: "human_compare", type: "commonly_preceded_by", strength: "strong", reason: "Users typically compare before choosing." },
      { target_id: "task_adapt", type: "enables", strength: "medium", reason: "Choice patterns can inform future recommendations." }
    ]
  },

  // =========================================================
  // Interactive — user collaborates, corrects, evaluates
  // =========================================================

  {
    id: "human_start_process",
    layer_id: "layer_interactive",
    name: "Start Process",
    slug: "start-process",
    task_type: "human",
    elevator_pitch: "User initiates a workflow.",
    example_usage: "Clicking 'Run' or starting a multi-step assistant.",
    io_spec: { inputs: { required: [], optional: [] }, outputs: { primary: { id: "data_signal", label: "Trigger" }, metadata: [] } },
    common_variants: ["button_click", "voice_command", "gesture", "scheduled_trigger"],
    relations: [
      { target_id: "system_orchestrate", type: "enables", strength: "medium", reason: "User initiation often begins orchestration." }
    ]
  },

  {
    id: "human_stop_process",
    layer_id: "layer_interactive",
    name: "Stop Process",
    slug: "stop-process",
    task_type: "human",
    elevator_pitch: "User interrupts a running workflow.",
    example_usage: "Canceling a generation or emergency-stopping a device action.",
    io_spec: { inputs: { required: [], optional: [] }, outputs: { primary: { id: "data_signal", label: "Interrupt" }, metadata: [] } },
    common_variants: ["emergency_stop", "pause", "cancel", "abort"],
    relations: [
      { target_id: "task_act", type: "enables", strength: "strong", reason: "Critical safety mechanism for physical and high-impact actions." },
      { target_id: "system_orchestrate", type: "related_to", strength: "medium", reason: "Stops typically cancel orchestration/execution paths." }
    ]
  },

  {
    id: "human_compare",
    layer_id: "layer_interactive",
    name: "Compare Options",
    slug: "compare-options",
    task_type: "human",
    elevator_pitch: "User evaluates multiple items side-by-side to understand differences.",
    example_usage: "Comparing multiple AI-generated designs or recommendations.",
    io_spec: {
      inputs: { required: [{ id: "data_any", label: "Options", isArray: true }], optional: [{ id: "data_list", label: "Comparison Criteria" }] },
      outputs: { primary: { id: "data_text", label: "Comparison Notes" }, metadata: [{ id: "data_json", label: "Comparison Matrix" }] }
    },
    common_variants: ["side_by_side_view", "diff_comparison", "a_b_testing", "variant_review"],
    relations: [
      { target_id: "task_rank", type: "commonly_preceded_by", strength: "medium", reason: "Ranking often provides an initial ordering." },
      { target_id: "human_choose", type: "enables", strength: "strong", reason: "Comparison informs commitment decisions." }
    ]
  },

  {
    id: "human_organize",
    layer_id: "layer_interactive",
    name: "Organize & Label",
    slug: "organize-label",
    task_type: "human",
    elevator_pitch: "User arranges items into groups, hierarchies, or applies semantic tags.",
    example_usage: "Dragging notes into clusters or tagging images.",
    io_spec: {
      inputs: {
        required: [{ id: "data_any", label: "Items", isArray: true }],
        optional: [{ id: "data_group", label: "Suggested Clusters", isArray: true }, { id: "data_list", label: "Existing Taxonomy" }]
      },
      outputs: {
        primary: { id: "data_classification", label: "Applied Labels", isArray: true },
        metadata: [{ id: "data_list", label: "New/Updated Taxonomy" }]
      }
    },
    common_variants: ["card_sorting", "tagging", "drag_and_drop_grouping", "folder_management", "taxonomy_editing"],
    relations: [
      { target_id: "task_cluster", type: "commonly_preceded_by", strength: "strong", reason: "Clustering provides a rough draft; humans refine the structure." },
      { target_id: "system_train", type: "enables", strength: "medium", reason: "Human labeling can produce training data for future automation." },
      { target_id: "task_classify", type: "enables", strength: "strong", reason: "Once categories exist, AI can help automate sorting." }
    ]
  },

  {
    id: "human_annotate",
    layer_id: "layer_interactive",
    name: "Annotate & Mark Up",
    slug: "annotate-markup",
    task_type: "human",
    elevator_pitch: "User adds visual or spatial annotations to content (draw, highlight, comment).",
    example_usage: "Drawing boxes for detection or highlighting text for extraction review.",
    io_spec: {
      inputs: { required: [{ id: "data_any", label: "Content" }], optional: [] },
      outputs: { primary: { id: "data_any", label: "Annotated Content" }, metadata: [{ id: "data_json", label: "Annotations", isArray: true }] }
    },
    common_variants: ["draw_bounding_boxes", "highlight_text", "add_markers", "spatial_markup", "redline"],
    relations: [
      { target_id: "task_detect", type: "enables", strength: "medium", reason: "Annotations can validate or create ground truth for detection." },
      { target_id: "task_segment", type: "enables", strength: "medium", reason: "Region annotations support segmentation workflows." },
      { target_id: "system_train", type: "enables", strength: "medium", reason: "Annotations can become training or evaluation datasets." }
    ]
  },

  {
    id: "human_review",
    layer_id: "layer_interactive",
    name: "Review & Approve",
    slug: "review-approve",
    task_type: "human",
    elevator_pitch: "User validates accuracy and acceptability of system output.",
    example_usage: "Moderator checking flagged content or editor reviewing a draft.",
    io_spec: {
      inputs: { required: [{ id: "data_any", label: "Content" }], optional: [] },
      outputs: { primary: { id: "data_signal", label: "Decision" }, metadata: [] }
    },
    common_variants: ["approve", "reject", "request_changes", "escalate"],
    relations: [
      { target_id: "task_verify", type: "commonly_preceded_by", strength: "strong", reason: "Automated verification often precedes human review." },
      { target_id: "task_adapt", type: "enables", strength: "medium", reason: "Review decisions can become training signals." }
    ]
  },

  {
    id: "human_validate",
    layer_id: "layer_interactive",
    name: "Validate Data",
    slug: "validate-data",
    task_type: "human",
    elevator_pitch: "User checks data quality, completeness, and correctness against requirements.",
    example_usage: "Verifying extraction fields or confirming record accuracy.",
    io_spec: {
      inputs: { required: [{ id: "data_any", label: "Data" }], optional: [{ id: "data_schema", label: "Validation Rules" }] },
      outputs: { primary: { id: "data_signal", label: "Valid/Invalid" }, metadata: [{ id: "data_text", label: "Issues Found", isArray: true }] }
    },
    common_variants: ["check_completeness", "verify_accuracy", "spot_check", "quality_audit"],
    relations: [
      { target_id: "task_extract", type: "commonly_preceded_by", strength: "strong", reason: "Extracted data often requires validation." },
      { target_id: "task_verify", type: "commonly_preceded_by", strength: "medium", reason: "Automated checks can precede human validation." },
      { target_id: "task_adapt", type: "enables", strength: "weak", reason: "Validation findings can improve future performance." }
    ]
  },

  {
    id: "human_provide_feedback",
    layer_id: "layer_interactive",
    name: "Provide Feedback",
    slug: "provide-feedback",
    task_type: "human",
    elevator_pitch: "User provides explicit signal of quality, preference, or satisfaction.",
    example_usage: "Thumbs up/down on a response or rating recommendations.",
    io_spec: {
      inputs: { required: [{ id: "data_any", label: "Target" }], optional: [] },
      outputs: { primary: { id: "data_signal", label: "Rating" }, metadata: [] }
    },
    common_variants: ["star_rating", "thumbs_up_down", "sentiment_select"],
    relations: [
      { target_id: "task_adapt", type: "triggers", strength: "strong", reason: "Feedback drives adaptation and tuning." },
      { target_id: "system_reward", type: "enables", strength: "medium", reason: "Feedback can be converted into reward signals." }
    ]
  },

  {
    id: "human_flag",
    layer_id: "layer_interactive",
    name: "Flag Content",
    slug: "flag-content",
    task_type: "human",
    elevator_pitch: "User reports problematic content, errors, or policy violations.",
    example_usage: "Reporting unsafe output or marking an incorrect classification.",
    io_spec: {
      inputs: { required: [{ id: "data_any", label: "Content" }], optional: [] },
      outputs: {
        primary: { id: "data_signal", label: "Flag" },
        metadata: [{ id: "data_text", label: "Reason" }, { id: "data_classification", label: "Issue Type" }]
      }
    },
    common_variants: ["report_issue", "mark_inappropriate", "escalate_problem", "submit_bug"],
    relations: [
      { target_id: "human_review", type: "triggers", strength: "strong", reason: "Flagged content requires review/escalation." },
      { target_id: "task_adapt", type: "enables", strength: "medium", reason: "Flags can become negative training signals." },
      { target_id: "task_verify", type: "commonly_preceded_by", strength: "weak", reason: "Automated verification may surface flaggable items." }
    ]
  },

  // =========================================================
  // Outbound — user finalizes, refines, exports
  // =========================================================

  {
    id: "human_edit",
    layer_id: "layer_outbound",
    name: "Edit Content",
    slug: "edit-content",
    task_type: "human",
    elevator_pitch: "User modifies system-generated or system-provided content.",
    example_usage: "Rewriting an AI email draft or editing generated copy.",
    io_spec: {
      inputs: { required: [{ id: "data_any", label: "Draft" }], optional: [] },
      outputs: { primary: { id: "data_any", label: "Final Content" }, metadata: [] }
    },
    common_variants: ["refine", "rewrite", "tweak", "format"],
    relations: [
      { target_id: "task_generate", type: "commonly_preceded_by", strength: "strong", reason: "Generated content is often refined by humans." },
      { target_id: "task_adapt", type: "enables", strength: "weak", reason: "Edit patterns can inform future improvements." },
      { target_id: "task_generate", type: "commonly_followed_by", strength: "weak", reason: "Edits may trigger regeneration or iteration." }
    ]
  },

  {
    id: "human_export",
    layer_id: "layer_outbound",
    name: "Export / Download",
    slug: "export-download",
    task_type: "human",
    elevator_pitch: "User takes an artifact out of the system into another context.",
    example_usage: "Downloading a report, exporting a dataset, or copying a prompt pack.",
    io_spec: {
      inputs: {
        required: [{ id: "data_any", label: "Artifact" }],
        optional: [{ id: "data_schema", label: "Export Format/Schema" }]
      },
      outputs: {
        primary: { id: "data_file", label: "Exported File / Payload" },
        metadata: [{ id: "data_log", label: "Export Event" }]
      }
    },
    common_variants: ["download_file", "export_csv", "export_json", "copy_to_clipboard", "share_link"],
    relations: [
      { target_id: "system_format", type: "commonly_preceded_by", strength: "strong", reason: "Exports often require format conversion." },
      { target_id: "system_log", type: "commonly_followed_by", strength: "medium", reason: "Exports should be logged for auditing and analytics." }
    ]
  }
];

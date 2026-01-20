
import { SystemTask } from '../types';

export const SYSTEM_TASKS: SystemTask[] = [
    // Inbound
    {
      id: "system_read_db",
      layer_id: "layer_inbound",
      name: "Read Record",
      slug: "read-record",
      task_type: "system",
      elevator_pitch: "Retrieves existing data from persistent storage.",
      example_usage: "Fetching user profile by ID on login.",
      io_spec: {
          inputs: {
            required: [{ id: "data_text", label: "Record ID" }],
            optional: [{ id: "data_json", label: "Query Parameters" }]
          },
          outputs: {
            primary: { id: "data_db_record", label: "Record" },
            metadata: []
          }
      },
      common_variants: ["get_by_id", "fetch", "query", "search", "list", "batch_read"],
      relations: [
        { target_id: "task_retrieve", type: "enables", strength: "medium", reason: "Database reads provide the corpus for retrieval systems." },
        { target_id: "system_create_db", type: "commonly_preceded_by", strength: "weak", reason: "Often check if record exists before creating." }
      ]
    },
    {
      id: "system_cache",
      layer_id: "layer_internal",
      name: "Semantic Cache",
      slug: "semantic-cache",
      task_type: "system",
      elevator_pitch: "Short-circuits processing by retrieving previously generated results for similar inputs.",
      example_usage: "Returning a cached SQL query for 'Show me sales' without calling the LLM again.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_embedding", label: "Input Vector" }], 
              optional: [{ id: "data_config", label: "Similarity Threshold" }] 
          }, 
          outputs: { 
              primary: { id: "data_any", label: "Cached Output" }, 
              metadata: [{ id: "data_score", label: "Hit Score" }] 
          } 
      },
      common_variants: ["redis_vector", "exact_match", "similarity_cache"],
      relations: [
        { target_id: "task_represent", type: "requires_input_from", strength: "strong", reason: "Caching relies on embeddings to find 'similar' previous requests." },
        { target_id: "task_generate", type: "precedes", strength: "strong", reason: "Cache lookup happens before generation; if hit, generation is skipped." }
      ]
    },
    {
      id: "system_webhook",
      layer_id: "layer_inbound",
      name: "Webhook Listener",
      slug: "webhook",
      task_type: "system",
      elevator_pitch: "Waits for external service triggers.",
      example_usage: "Listening for Stripe payment success.",
      io_spec: { 
          inputs: { required: [{ id: "data_config", label: "Endpoint" }], optional: [] }, 
          outputs: { primary: { id: "data_json", label: "Payload" }, metadata: [] } 
      },
      common_variants: ["api_callback", "integration_event", "third_party_trigger"],
      relations: []
    },
    {
      id: "system_timer",
      layer_id: "layer_inbound",
      name: "Scheduled Timer",
      slug: "timer",
      task_type: "system",
      elevator_pitch: "Triggers actions based on time schedules.",
      example_usage: "Nightly batch job.",
      io_spec: { 
          inputs: { required: [{ id: "data_config", label: "Schedule" }], optional: [] }, 
          outputs: { primary: { id: "data_signal", label: "Time Event" }, metadata: [] } 
      },
      common_variants: ["cron_job", "countdown", "recurring_schedule", "one_time_trigger"],
      relations: []
    },

    // Internal
    {
      id: "system_rules",
      layer_id: "layer_internal",
      name: "Logic Gate",
      slug: "logic-gate",
      task_type: "system",
      elevator_pitch: "Deterministic branching logic based on conditions.",
      example_usage: "If confidence score > 0.5, then approve.",
      io_spec: { 
        inputs: { required: [{ id: "data_any", label: "Input" }], optional: [{ id: "data_config", label: "Rules" }] }, 
        outputs: { primary: { id: "data_signal", label: "Branch Path" }, metadata: [] } 
      },
      common_variants: ["if_else", "switch", "filter", "threshold_check"],
      relations: [
        { target_id: "task_classify", type: "commonly_preceded_by", strength: "strong", reason: "Classification outputs feed business logic rules." },
        { target_id: "task_regress", type: "commonly_preceded_by", strength: "medium", reason: "Regression predictions trigger threshold-based actions." },
        { target_id: "system_train", type: "triggers", strength: "medium", reason: "Rule-based threshold checks trigger automated retraining when model performance degrades." }
      ]
    },
    {
      id: "system_format",
      layer_id: "layer_internal",
      name: "Format Conversion",
      slug: "format-conversion",
      task_type: "system",
      elevator_pitch: "Transforms data structure without changing meaning.",
      example_usage: "Converting JSON to CSV for spreadsheet export.",
      io_spec: { 
          inputs: { required: [{ id: "data_any", label: "Source" }], optional: [{ id: "data_schema", label: "Target Schema" }] }, 
          outputs: { primary: { id: "data_any", label: "Formatted Data" }, metadata: [] } 
      },
      common_variants: ["json_to_xml", "csv_to_json", "schema_mapping", "data_normalization"],
      relations: []
    },

    // Outbound
    {
      id: "system_api",
      layer_id: "layer_outbound",
      name: "API Call",
      slug: "api-call",
      task_type: "system",
      elevator_pitch: "Executes an action in an external service.",
      example_usage: "Booking a calendar slot via Google Calendar API.",
      io_spec: { 
        inputs: { required: [{ id: "data_json", label: "Payload" }], optional: [] }, 
        outputs: { primary: { id: "data_api_response", label: "Response" }, metadata: [] } 
      },
      common_variants: ["rest_api", "graphql", "rpc", "webhook_call"],
      relations: [
        { target_id: "task_generate", type: "commonly_preceded_by", strength: "medium", reason: "Generated content often drives API actions." }
      ]
    },
    {
      id: "system_create_db",
      layer_id: "layer_outbound",
      name: "Create Record",
      slug: "create-record",
      task_type: "system",
      elevator_pitch: "Inserts new data into persistent storage.",
      example_usage: "Creating a new user account in the database.",
      io_spec: {
        inputs: {
          required: [{ id: "data_any", label: "Record Data" }],
          optional: [{ id: "data_json", label: "Metadata" }]
        },
        outputs: {
          primary: { id: "data_db_record", label: "New Record ID" },
          metadata: [{ id: "data_json", label: "Created Record" }]
        }
      },
      common_variants: ["insert", "add", "post", "batch_create"],
      relations: [
        { target_id: "task_extract", type: "commonly_preceded_by", strength: "strong", reason: "Extracted structured data is typically persisted as new records." },
        { target_id: "task_generate", type: "commonly_preceded_by", strength: "medium", reason: "Generated content often needs to be saved as new records." },
        { target_id: "system_log", type: "commonly_followed_by", strength: "medium", reason: "Record creation should be logged for audit trails." }
      ]
    },
    {
      id: "system_update_db",
      layer_id: "layer_outbound",
      name: "Update Record",
      slug: "update-record",
      task_type: "system",
      elevator_pitch: "Modifies existing data in persistent storage.",
      example_usage: "Updating user preferences or profile information.",
      io_spec: {
        inputs: {
          required: [
            { id: "data_text", label: "Record ID" },
            { id: "data_any", label: "Updated Data" }
          ],
          optional: [{ id: "data_json", label: "Merge Strategy" }]
        },
        outputs: {
          primary: { id: "data_db_record", label: "Updated Record ID" },
          metadata: [{ id: "data_json", label: "Updated Fields" }]
        }
      },
      common_variants: ["modify", "patch", "put", "upsert", "batch_update"],
      relations: [
        { target_id: "system_read_db", type: "commonly_preceded_by", strength: "strong", reason: "Typically read existing record before updating." },
        { target_id: "task_extract", type: "commonly_preceded_by", strength: "medium", reason: "Extracted data often updates existing records." },
        { target_id: "system_log", type: "commonly_followed_by", strength: "medium", reason: "Record updates should be logged for audit trails." }
      ]
    },
    {
      id: "system_delete_db",
      layer_id: "layer_outbound",
      name: "Delete Record",
      slug: "delete-record",
      task_type: "system",
      elevator_pitch: "Removes data from persistent storage.",
      example_usage: "Deleting user account when requested or removing expired data.",
      io_spec: {
        inputs: {
          required: [{ id: "data_text", label: "Record ID" }],
          optional: [{ id: "data_config", label: "Deletion Options" }]
        },
        outputs: {
          primary: { id: "data_signal", label: "Deletion Confirmation" },
          metadata: [{ id: "data_log", label: "Deletion Log" }]
        }
      },
      common_variants: ["remove", "destroy", "purge", "soft_delete", "batch_delete"],
      relations: [
        { target_id: "system_read_db", type: "commonly_preceded_by", strength: "medium", reason: "Often verify record exists before deleting." },
        { target_id: "human_review", type: "commonly_preceded_by", strength: "strong", reason: "Deletions often require human confirmation for safety." },
        { target_id: "system_log", type: "commonly_followed_by", strength: "strong", reason: "Deletions must be logged for audit trails and compliance." }
      ]
    },
    {
      id: "system_notification",
      layer_id: "layer_outbound",
      name: "Send Notification",
      slug: "send-notification",
      task_type: "system",
      elevator_pitch: "Sends an alert to a user channel.",
      example_usage: "Push notification on mobile.",
      io_spec: { 
        inputs: { required: [{ id: "data_text", label: "Recipient" }, { id: "data_text", label: "Message" }], optional: [] }, 
        outputs: { primary: { id: "data_log", label: "Sent Status" }, metadata: [] } 
      },
      common_variants: ["email", "push", "sms", "in_app_alert"],
      relations: [
        { target_id: "task_monitor", type: "commonly_preceded_by", strength: "strong", reason: "Monitoring systems trigger notifications." }
      ]
    },
    {
      id: "system_log",
      layer_id: "layer_outbound",
      name: "Log Event",
      slug: "log-event",
      task_type: "system",
      elevator_pitch: "Records system state for audit trails.",
      example_usage: "Logging an error or user action.",
      io_spec: {
          inputs: { required: [{ id: "data_any", label: "Event Data" }], optional: [] },
          outputs: { primary: { id: "data_log", label: "Log Entry" }, metadata: [] }
      },
      common_variants: ["error_log", "audit_log", "analytics_event", "debug_trace"],
      relations: []
    },
    {
      id: "system_git",
      layer_id: "layer_outbound",
      name: "Git Action",
      slug: "git-action",
      task_type: "system",
      elevator_pitch: "Executes version control operations in a Git repository.",
      example_usage: "Committing generated code changes to a feature branch.",
      io_spec: {
        inputs: {
          required: [
            { id: "data_config", label: "Repository" },
            { id: "data_text", label: "Action" }
          ],
          optional: [
            { id: "data_code", label: "Files" },
            { id: "data_text", label: "Message" }
          ]
        },
        outputs: {
          primary: { id: "data_text", label: "Commit/Result ID" },
          metadata: [
            { id: "data_log", label: "Operation Log" }
          ]
        }
      },
      common_variants: ["commit", "push", "pull", "merge", "branch", "tag", "create_pr"],
      relations: [
        {
          target_id: "task_generate",
          type: "commonly_preceded_by",
          strength: "strong",
          reason: "Generated code often needs to be committed to version control."
        },
        {
          target_id: "system_create_db",
          type: "alternative_to",
          strength: "medium",
          reason: "Both persist data, but Git is for code/text versioning vs. structured records."
        },
        {
          target_id: "system_log",
          type: "commonly_followed_by",
          strength: "medium",
          reason: "Git operations should be logged for audit trails."
        }
      ]
    },
    {
  id: "system_train",
  layer_id: "layer_internal", // Processing/transformation
  name: "Train Model",
  slug: "train-model",
  task_type: "system",
  elevator_pitch: "Executes model training or fine-tuning on ML infrastructure.",
  example_usage: "Fine-tuning GPT-4 on customer support transcripts.",
  io_spec: {
    inputs: {
      required: [{ id: "data_table", label: "Training Data" }],
      optional: [
        { id: "data_policy", label: "Base Model" },
        { id: "data_config", label: "Training Config" }
      ]
    },
    outputs: {
      primary: { id: "data_policy", label: "Trained Model" },
      metadata: [
        { id: "data_log", label: "Training Logs" },
        { id: "data_json", label: "Training Metrics" }
      ]
    }
  },
  common_variants: [
    "fine_tune",
    "full_train",
    "transfer_learning",
    "rlhf",
    "continued_pretraining"
  ],
  relations: [
    {
      target_id: "system_evaluate",
      type: "commonly_followed_by",
      strength: "strong",
      reason: "Training jobs should be followed by evaluation to measure effectiveness."
    },
    {
      target_id: "system_create_db",
      type: "commonly_followed_by",
      strength: "strong",
      reason: "Trained models must be persisted to storage as new records."
    },
    {
      target_id: "system_format",
      type: "commonly_preceded_by",
      strength: "medium",
      reason: "Training data often needs format conversion before training."
    },
    {
      target_id: "human_provide_feedback",
      type: "commonly_preceded_by",
      strength: "medium",
      reason: "RLHF training requires human preference data."
    }
  ]
},
{
  id: "system_evaluate",
  layer_id: "layer_internal", // Quality assessment/reasoning
  name: "Evaluate Model",
  slug: "evaluate-model",
  task_type: "system",
  elevator_pitch: "Calculates performance metrics for model quality assessment.",
  example_usage: "Running test suite to measure accuracy and F1 score.",
  io_spec: {
    inputs: {
      required: [
        { id: "data_policy", label: "Model" },
        { id: "data_table", label: "Test Dataset" }
      ],
      optional: [
        { id: "data_json", label: "Evaluation Config" },
        { id: "data_policy", label: "Baseline Model" }
      ]
    },
    outputs: {
      primary: { id: "data_json", label: "Metrics Report" },
      metadata: [
        { id: "data_score", label: "Primary Metric" },
        { id: "data_json", label: "Per-Class Metrics" }
      ]
    }
  },
  common_variants: [
    "performance_test",
    "benchmark",
    "ablation_study",
    "a_b_comparison",
    "regression_test"
  ],
  relations: [
    {
      target_id: "system_train",
      type: "commonly_preceded_by",
      strength: "strong",
      reason: "Evaluation typically follows training to validate model quality."
    },
    {
      target_id: "system_rules",
      type: "commonly_followed_by",
      strength: "strong",
      reason: "Evaluation metrics trigger deployment decisions via threshold checks."
    },
    {
      target_id: "human_review",
      type: "commonly_followed_by",
      strength: "medium",
      reason: "Evaluation results should be reviewed before production deployment."
    },
    {
      target_id: "system_log",
      type: "commonly_followed_by",
      strength: "medium",
      reason: "Evaluation results are logged for model monitoring and audit trails."
    },
    { target_id: "system_rules", type: "commonly_followed_by", strength: "strong", reason: "Evaluation metrics feed into threshold logic (if accuracy < 0.9, trigger retraining)." }
  ]
},
{
  id: "system_orchestrate",
  layer_id: "layer_internal", // Coordination logic/routing
  name: "Orchestrate Workflow",
  slug: "orchestrate",
  task_type: "system",
  elevator_pitch: "Coordinates task execution across multiple agents or services.",
  example_usage: "Managing parallel execution of specialist agents in AutoGPT.",
  io_spec: {
    inputs: {
      required: [{ id: "data_json", label: "Task Plan" }],
      optional: [
        { id: "data_state_vector", label: "Shared State" },
        { id: "data_config", label: "Orchestration Rules" }
      ]
    },
    outputs: {
      primary: { id: "data_json", label: "Execution Results" },
      metadata: [
        { id: "data_log", label: "Coordination Log" },
        { id: "data_signal", label: "Completion Signal" }
      ]
    }
  },
  common_variants: [
    "agent_coordination",
    "task_distribution",
    "parallel_execution",
    "sequential_workflow",
    "dag_execution"
  ],
  relations: [
    {
      target_id: "task_plan",
      type: "commonly_preceded_by",
      strength: "strong",
      reason: "Planning tasks create the execution strategy that orchestration implements."
    },
    {
      target_id: "system_rules",
      type: "commonly_preceded_by",
      strength: "medium",
      reason: "Business logic determines orchestration routing decisions."
    },
    {
      target_id: "system_log",
      type: "commonly_followed_by",
      strength: "strong",
      reason: "Orchestration coordination should be logged for debugging and monitoring."
    },
    {
      target_id: "system_webhook",
      type: "incompatible_with",
      strength: "medium",
      reason: "Don't confuse orchestration (internal coordination) with webhooks (external events)."
    }
  ]
},
{
  id: "system_analytics",
  layer_id: "layer_interactive",
  name: "Analytics Collection",
  slug: "analytics-collection",
  task_type: "system",
  elevator_pitch: "Captures behavioral data across all user interactions for adaptation and analysis.",
  example_usage: "Tracking click patterns, dwell times, and user journey paths.",
  io_spec: {
    inputs: {
      required: [{ id: "data_any", label: "User Event" }],
      optional: [
        { id: "data_session_history", label: "Session Context" },
        { id: "data_preference_profile", label: "User Profile" }
      ]
    },
    outputs: {
      primary: { id: "data_log", label: "Analytics Event" },
      metadata: [
        { id: "data_json", label: "Event Properties" },
        { id: "data_score", label: "Timestamp" }
      ]
    }
  },
  common_variants: [
    "click_tracking",
    "scroll_depth",
    "session_recording",
    "funnel_analytics",
    "heatmap_data"
  ],
  relations: [
    {
      target_id: "task_adapt",
      type: "enables",
      strength: "strong",
      reason: "Analytics provides the raw behavioral data that adaptation requires."
    },
    {
      target_id: "system_reward",
      type: "commonly_followed_by",
      strength: "strong",
      reason: "Collected analytics events are processed into reward signals."
    },
    {
      target_id: "human_provide_feedback",
      type: "commonly_preceded_by",
      strength: "medium",
      reason: "Explicit feedback is one type of event captured by analytics."
    },
    {
      target_id: "system_log",
      type: "commonly_followed_by",
      strength: "medium",
      reason: "Analytics events are often also logged for audit/debugging."
    }
  ]
},
{
  id: "system_experiment",
  layer_id: "layer_interactive",
  name: "A/B Test Manager",
  slug: "ab-test-manager",
  task_type: "system",
  elevator_pitch: "Manages experimentation infrastructure for controlled testing of variants.",
  example_usage: "Traffic splitting between two recommendation algorithms to measure lift.",
  io_spec: {
    inputs: {
      required: [
        { id: "data_config", label: "Experiment Config" },
        { id: "data_text", label: "User ID" }
      ],
      optional: [
        { id: "data_preference_profile", label: "Segmentation Data" }
      ]
    },
    outputs: {
      primary: { id: "data_selection", label: "Variant Assignment" },
      metadata: [
        { id: "data_json", label: "Experiment Context" },
        { id: "data_score", label: "Traffic Allocation %" }
      ]
    }
  },
  common_variants: [
    "ab_test",
    "multivariate_test",
    "bandit_allocation",
    "feature_flag",
    "gradual_rollout"
  ],
  relations: [
    {
      target_id: "task_explore",
      type: "enables",
      strength: "strong",
      reason: "A/B testing is the infrastructure layer for systematic exploration."
    },
    {
      target_id: "system_analytics",
      type: "commonly_followed_by",
      strength: "strong",
      reason: "Experiment assignments are tracked via analytics to measure outcomes."
    },
    {
      target_id: "system_rules",
      type: "commonly_preceded_by",
      strength: "medium",
      reason: "Business logic determines experiment eligibility before assignment."
    },
    {
      target_id: "system_evaluate",
      type: "commonly_followed_by",
      strength: "strong",
      reason: "Experiments must be evaluated for statistical significance."
    }
  ]
},
{
  id: "system_monitor_model",
  layer_id: "layer_interactive",
  name: "Model Monitor",
  slug: "model-monitor",
  task_type: "system",
  elevator_pitch: "Detects drift, performance degradation, and anomalies in production AI systems.",
  example_usage: "Alerting when classification accuracy drops below threshold.",
  io_spec: {
    inputs: {
      required: [
        { id: "data_policy", label: "Model State" },
        { id: "data_log", label: "Inference Logs" }
      ],
      optional: [
        { id: "data_table", label: "Ground Truth Data" },
        { id: "data_config", label: "Alert Thresholds" }
      ]
    },
    outputs: {
      primary: { id: "data_signal", label: "Health Status" },
      metadata: [
        { id: "data_json", label: "Metrics Report" },
        { id: "data_score", label: "Drift Score" }
      ]
    }
  },
  common_variants: [
    "drift_detection",
    "performance_tracking",
    "anomaly_detection",
    "data_quality_check",
    "latency_monitoring"
  ],
  relations: [
    {
      target_id: "task_adapt",
      type: "triggers",
      strength: "strong",
      reason: "Drift detection triggers adaptation/retraining workflows."
    },
    {
      target_id: "system_notification",
      type: "commonly_followed_by",
      strength: "strong",
      reason: "Critical model health issues alert on-call teams."
    },
    {
      target_id: "system_train",
      type: "commonly_followed_by",
      strength: "medium",
      reason: "Detected drift may trigger model retraining."
    },
    {
      target_id: "system_log",
      type: "commonly_followed_by",
      strength: "strong",
      reason: "Monitoring results are logged for incident analysis."
    }
  ]
},
{
  id: "system_state",
  layer_id: "layer_interactive",
  name: "State Manager",
  slug: "state-manager",
  task_type: "system",
  elevator_pitch: "Persists and retrieves adaptive system state across sessions.",
  example_usage: "Loading a user's learned preferences or conversation context.",
  io_spec: {
    inputs: {
      required: [{ id: "data_text", label: "State Key" }],
      optional: [
        { id: "data_state_vector", label: "State Data (for write)" },
        { id: "data_config", label: "TTL/Expiry Rules" }
      ]
    },
    outputs: {
      primary: { id: "data_state_vector", label: "Retrieved State" },
      metadata: [
        { id: "data_score", label: "Last Updated Timestamp" },
        { id: "data_json", label: "State Metadata" }
      ]
    }
  },
  common_variants: [
    "session_persistence",
    "user_context",
    "learned_preferences",
    "dialogue_state",
    "policy_checkpoint"
  ],
  relations: [
    {
      target_id: "task_adapt",
      type: "enables",
      strength: "strong",
      reason: "Adaptation requires persisting what the system has learned."
    },
    {
      target_id: "task_plan",
      type: "enables",
      strength: "strong",
      reason: "Planning requires access to current system and environment state."
    },
    {
      target_id: "task_generate",
      type: "enables",
      strength: "medium",
      reason: "Conversational generation needs dialogue history and context."
    },
    {
      target_id: "system_read_db",
      type: "incompatible_with",
      strength: "weak",
      reason: "State Manager is for ephemeral/session data, not permanent records."
    }
  ]
},
{
  id: "system_reward",
  layer_id: "layer_interactive",
  name: "Reward Calculator",
  slug: "reward-calculator",
  task_type: "system",
  elevator_pitch: "Converts user behavior into quantitative feedback signals for learning.",
  example_usage: "Computing reward score from click-through rate, dwell time, and conversions.",
  io_spec: {
    inputs: {
      required: [{ id: "data_log", label: "User Interaction Log" }],
      optional: [
        { id: "data_json", label: "Business Objectives" },
        { id: "data_config", label: "Reward Weights" }
      ]
    },
    outputs: {
      primary: { id: "data_score", label: "Reward Signal" },
      metadata: [
        { id: "data_json", label: "Signal Breakdown" },
        { id: "data_score", label: "Confidence" }
      ]
    }
  },
  common_variants: [
    "implicit_feedback",
    "engagement_scoring",
    "conversion_attribution",
    "outcome_measurement",
    "preference_inference"
  ],
  relations: [
    {
      target_id: "task_adapt",
      type: "enables",
      strength: "strong",
      reason: "Reward signals are the primary training data for adaptive systems."
    },
    {
      target_id: "task_explore",
      type: "enables",
      strength: "strong",
      reason: "Exploration strategies require reward signals to learn which actions work."
    },
    {
      target_id: "system_analytics",
      type: "commonly_preceded_by",
      strength: "strong",
      reason: "Analytics captures raw events; reward calculator interprets them."
    },
    {
      target_id: "human_provide_feedback",
      type: "commonly_preceded_by",
      strength: "medium",
      reason: "Explicit feedback is one input to reward calculation."
    },
    {
      target_id: "system_train",
      type: "commonly_followed_by",
      strength: "medium",
      reason: "Accumulated reward signals trigger retraining workflows."
    }
  ]
},
{
  id: "system_session",
  layer_id: "layer_interactive",
  name: "Session Manager",
  slug: "session-manager",
  task_type: "system",
  elevator_pitch: "Maintains conversational and interactive context across turns.",
  example_usage: "Tracking dialogue state in a multi-turn customer service chat.",
  io_spec: {
    inputs: {
      required: [{ id: "data_text", label: "Session ID" }],
      optional: [
        { id: "data_conversation", label: "New Turn (for append)" },
        { id: "data_config", label: "Context Window Limits" }
      ]
    },
    outputs: {
      primary: { id: "data_session_history", label: "Session Context" },
      metadata: [
        { id: "data_score", label: "Turn Count" },
        { id: "data_json", label: "Session Metadata" }
      ]
    }
  },
  common_variants: [
    "dialogue_management",
    "turn_tracking",
    "context_window_management",
    "multi_turn_history",
    "conversation_branching"
  ],
  relations: [
    {
      target_id: "task_generate",
      type: "enables",
      strength: "strong",
      reason: "Generation in conversational AI requires access to dialogue history."
    },
    {
      target_id: "task_plan",
      type: "enables",
      strength: "medium",
      reason: "Multi-step planning requires tracking user goals across turns."
    },
    {
      target_id: "system_state",
      type: "commonly_followed_by",
      strength: "strong",
      reason: "Session context is often persisted via state management."
    },
    {
      target_id: "human_type_input",
      type: "commonly_preceded_by",
      strength: "strong",
      reason: "User input creates new turns that session manager appends."
    },
    {
      target_id: "system_analytics",
      type: "commonly_followed_by",
      strength: "medium",
      reason: "Session events are tracked for analytics and optimization."
    }
  ]
}
];

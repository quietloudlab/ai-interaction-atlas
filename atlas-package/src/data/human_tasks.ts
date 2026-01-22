
import { HumanTask } from '../types';

export const HUMAN_TASKS: HumanTask[] = [
    // Inbound
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
        { target_id: "task_represent", type: "enables", strength: "strong", reason: "Text input is converted to embeddings for semantic operations." },
        { target_id: "task_generate", type: "enables", strength: "strong", reason: "User prompts drive content generation." }
      ]
    },
    {
      id: "human_organize",
      layer_id: "layer_interactive",
      name: "Organize & Label",
      slug: "organize-label",
      task_type: "human",
      elevator_pitch: "User arranges items into groups, hierarchies, or applies semantic tags.",
      example_usage: "Dragging support tickets into categories or tagging images.",
      io_spec: { 
        inputs: { 
            required: [{ id: "data_any", label: "Items", isArray: true }], 
            optional: [{ id: "data_group", label: "Suggested Clusters", isArray: true }, { id: "data_list", label: "Existing Taxonomy" }] 
        }, 
        outputs: { 
            primary: { id: "data_classification", label: "Applied Labels", isArray: true }, 
            metadata: [{ id: "data_list", label: "New Taxonomy" }] 
        } 
      },
      common_variants: ["card_sorting", "tagging", "drag_and_drop_grouping", "folder_management", "taxonomy_editing"],
      relations: [
        { target_id: "task_cluster", type: "commonly_preceded_by", strength: "strong", reason: "Clustering provides the rough draft; Humans refine the structure." },
        { target_id: "system_train", type: "enables", strength: "strong", reason: "Human organization creates the labeled 'Ground Truth' dataset needed to train Classifiers." },
        { target_id: "task_classify", type: "enables", strength: "strong", reason: "Once humans define the categories (Organize), the AI can automate sorting them (Classify)." }
      ]
    },
    {
      id: "human_select_option",
      layer_id: "layer_internal",
      name: "Select Option",
      slug: "select-option",
      task_type: "human",
      elevator_pitch: "User chooses from predefined choices.",
      example_usage: "Filtering search results by category.",
      io_spec: { 
          inputs: { required: [{ id: "data_any", label: "Options", isArray: true }], optional: [] }, 
          outputs: { primary: { id: "data_selection", label: "Selection" }, metadata: [] } 
      },
      common_variants: ["dropdown", "radio_button", "checkbox", "multi_select"],
      relations: [
        { target_id: "task_rank", type: "commonly_preceded_by", strength: "strong", reason: "Ranking prepares choices for user selection." }
      ]
    },
    {
      id: "human_review",
      layer_id: "layer_interactive",
      name: "Review & Approve",
      slug: "review-approve",
      task_type: "human",
      elevator_pitch: "User validates accuracy of system output.",
      example_usage: "Moderator checking flagged content.",
      io_spec: { 
        inputs: { required: [{ id: "data_any", label: "Content" }], optional: [] }, 
        outputs: { primary: { id: "data_signal", label: "Decision" }, metadata: [] } 
      },
      common_variants: ["approve", "reject", "request_changes", "escalate"],
      relations: [
        { target_id: "task_verify", type: "commonly_preceded_by", strength: "strong", reason: "Automated verification precedes human review in hybrid workflows." },
        { target_id: "task_adapt", type: "enables", strength: "medium", reason: "Review decisions provide training signals for adaptation." }
      ]
    },
    {
      id: "human_edit",
      layer_id: "layer_outbound",
      name: "Edit Content",
      slug: "edit-content",
      task_type: "human",
      elevator_pitch: "User modifies system-generated content.",
      example_usage: "Rewriting an AI email draft.",
      io_spec: { 
        inputs: { required: [{ id: "data_any", label: "Draft" }], optional: [] }, 
        outputs: { primary: { id: "data_any", label: "Final Content" }, metadata: [] } 
      },
      common_variants: ["refine", "rewrite", "tweak", "format"],
      relations: [
        { target_id: "task_generate", type: "commonly_preceded_by", strength: "strong", reason: "Generated content is often refined by humans." },
        { target_id: "task_adapt", type: "enables", strength: "weak", reason: "Edit patterns can inform future generation." },
        {  target_id: "task_generate", type: "commonly_followed_by", strength: "weak", reason: "Human edits can trigger regeneration for iterative refinement (edit patterns inform next generation)." }
      ]
    },
    {
      id: "human_provide_feedback",
      layer_id: "layer_interactive",
      name: "Provide Feedback",
      slug: "provide-feedback",
      task_type: "human",
      elevator_pitch: "Explicit signal of quality or preference.",
      example_usage: "Thumbs up/down on a response.",
      io_spec: { 
        inputs: { required: [{ id: "data_any", label: "Target" }], optional: [] }, 
        outputs: { primary: { id: "data_signal", label: "Rating" }, metadata: [] } 
      },
      common_variants: ["star_rating", "thumbs_up_down", "sentiment_select"],
      relations: [
        { target_id: "task_adapt", type: "triggers", strength: "strong", reason: "User feedback drives system adaptation." }
      ]
    },
    {
      id: "human_start_process",
      layer_id: "layer_interactive",
      name: "Start Process",
      slug: "start-process",
      task_type: "human",
      elevator_pitch: "User initiates a workflow.",
      example_usage: "Clicking 'Run Analysis' button.",
      io_spec: { 
          inputs: { required: [], optional: [] }, 
          outputs: { primary: { id: "data_signal", label: "Trigger" }, metadata: [] } 
      },
      common_variants: ["button_click", "voice_command", "gesture", "scheduled_trigger"],
      relations: []
    },
    {
      id: "human_stop_process",
      layer_id: "layer_interactive",
      name: "Stop Process",
      slug: "stop-process",
      task_type: "human",
      elevator_pitch: "User interrupts a running workflow.",
      example_usage: "Emergency stop on a robot or canceling a generation.",
      io_spec: { 
          inputs: { required: [], optional: [] }, 
          outputs: { primary: { id: "data_signal", label: "Interrupt" }, metadata: [] } 
      },
      common_variants: ["emergency_stop", "pause", "cancel", "abort"],
      relations: [
        { target_id: "task_act", type: "enables", strength: "strong", reason: "Critical safety mechanism for physical actions." }
      ]
    },
    {
      id: "human_compare",
      layer_id: "layer_interactive",
      name: "Compare Options",
      slug: "compare-options",
      task_type: "human",
      elevator_pitch: "User evaluates multiple items side-by-side to understand differences.",
      example_usage: "Comparing three AI-generated designs or two product recommendations.",
      io_spec: {
        inputs: {
          required: [{ id: "data_any", label: "Options", isArray: true }],
          optional: [{ id: "data_list", label: "Comparison Criteria" }]
        },
        outputs: {
          primary: { id: "data_text", label: "Comparison Notes" },
          metadata: [{ id: "data_json", label: "Comparison Matrix" }]
        }
      },
      common_variants: ["side_by_side_view", "diff_comparison", "a_b_testing", "variant_review"],
      relations: [
        { target_id: "task_rank", type: "commonly_preceded_by", strength: "medium", reason: "Ranking provides initial ordering before detailed comparison." },
        { target_id: "human_choose", type: "enables", strength: "strong", reason: "Comparison informs the choice decision." }
      ]
    },
    {
      id: "human_choose",
      layer_id: "layer_internal",
      name: "Choose Winner",
      slug: "choose-winner",
      task_type: "human",
      elevator_pitch: "User picks one option as the final selection with commitment.",
      example_usage: "Selecting the best AI-generated email variant or choosing a design direction.",
      io_spec: {
        inputs: {
          required: [{ id: "data_any", label: "Options", isArray: true }],
          optional: [{ id: "data_text", label: "Comparison Notes" }]
        },
        outputs: {
          primary: { id: "data_any", label: "Chosen Option" },
          metadata: [{ id: "data_text", label: "Selection Reason" }]
        }
      },
      common_variants: ["pick_winner", "select_best", "final_decision", "commit_choice"],
      relations: [
        { target_id: "human_compare", type: "commonly_preceded_by", strength: "strong", reason: "Users typically compare before choosing." },
        { target_id: "task_adapt", type: "enables", strength: "medium", reason: "Choice patterns inform future recommendations." }
      ]
    },
    {
      id: "human_flag",
      layer_id: "layer_interactive",
      name: "Flag Content",
      slug: "flag-content",
      task_type: "human",
      elevator_pitch: "User reports problematic content, errors, or policy violations.",
      example_usage: "Reporting inappropriate AI response or marking incorrect classification.",
      io_spec: {
        inputs: {
          required: [{ id: "data_any", label: "Content" }],
          optional: []
        },
        outputs: {
          primary: { id: "data_signal", label: "Flag" },
          metadata: [{ id: "data_text", label: "Reason" }, { id: "data_classification", label: "Issue Type" }]
        }
      },
      common_variants: ["report_issue", "mark_inappropriate", "escalate_problem", "submit_bug"],
      relations: [
        { target_id: "human_review", type: "triggers", strength: "strong", reason: "Flagged content requires human review." },
        { target_id: "task_adapt", type: "enables", strength: "medium", reason: "Flags provide negative training signals." },
        { target_id: "task_verify", type: "commonly_preceded_by", strength: "weak", reason: "Automated verification may identify flaggable content." }
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
        outputs: {
          primary: { id: "data_config", label: "Configuration" },
          metadata: []
        }
      },
      common_variants: ["set_preferences", "define_thresholds", "customize_behavior", "adjust_parameters"],
      relations: [
        { target_id: "task_adapt", type: "enables", strength: "strong", reason: "Configuration defines system behavior for adaptation." },
        { target_id: "task_route", type: "enables", strength: "medium", reason: "Routing rules are often defined through configuration." }
      ]
    },
    {
      id: "human_annotate",
      layer_id: "layer_interactive",
      name: "Annotate & Mark Up",
      slug: "annotate-markup",
      task_type: "human",
      elevator_pitch: "User adds visual or spatial annotations to content (draw, highlight, comment).",
      example_usage: "Drawing boxes on images for object detection training or highlighting text passages.",
      io_spec: {
        inputs: {
          required: [{ id: "data_any", label: "Content" }],
          optional: []
        },
        outputs: {
          primary: { id: "data_any", label: "Annotated Content" },
          metadata: [{ id: "data_json", label: "Annotations", isArray: true }]
        }
      },
      common_variants: ["draw_bounding_boxes", "highlight_text", "add_markers", "spatial_markup", "redline"],
      relations: [
        { target_id: "task_detect", type: "enables", strength: "strong", reason: "Annotations provide ground truth for object detection training." },
        { target_id: "task_segment", type: "enables", strength: "strong", reason: "Annotated regions train segmentation models." },
        { target_id: "system_train", type: "enables", strength: "strong", reason: "Annotations are critical training data." }
      ]
    },
    {
      id: "human_validate",
      layer_id: "layer_interactive",
      name: "Validate Data",
      slug: "validate-data",
      task_type: "human",
      elevator_pitch: "User checks data quality, completeness, and correctness against requirements.",
      example_usage: "Verifying uploaded data fields are complete or checking extraction accuracy.",
      io_spec: {
        inputs: {
          required: [{ id: "data_any", label: "Data" }],
          optional: [{ id: "data_schema", label: "Validation Rules" }]
        },
        outputs: {
          primary: { id: "data_signal", label: "Valid/Invalid" },
          metadata: [{ id: "data_text", label: "Issues Found", isArray: true }]
        }
      },
      common_variants: ["check_completeness", "verify_accuracy", "spot_check", "quality_audit"],
      relations: [
        { target_id: "task_extract", type: "commonly_preceded_by", strength: "strong", reason: "Extracted data often requires validation." },
        { target_id: "task_verify", type: "commonly_preceded_by", strength: "medium", reason: "Automated verification precedes human validation." },
        { target_id: "task_adapt", type: "enables", strength: "weak", reason: "Validation findings improve extraction accuracy." }
      ]
    },
    {
      id: "human_voice_command",
      layer_id: "layer_inbound",
      name: "Voice Command",
      slug: "voice-command",
      task_type: "human",
      elevator_pitch: "User speaks a verbal command or query to the system.",
      example_usage: "Saying 'Alexa, turn on the lights' or asking 'What's the weather today?'",
      io_spec: {
        inputs: { required: [], optional: [] },
        outputs: {
          primary: { id: "data_speech", label: "Voice Input" },
          metadata: [{ id: "data_text", label: "Intent" }]
        }
      },
      common_variants: ["wake_word_activation", "continuous_listening", "push_to_talk", "voice_query"],
      relations: [
        { target_id: "task_transcribe", type: "enables", strength: "strong", reason: "Voice input must be transcribed to text." },
        { target_id: "task_classify", type: "enables", strength: "strong", reason: "Voice commands are classified by intent." },
        { target_id: "task_generate", type: "enables", strength: "strong", reason: "Voice queries often trigger generation." }
      ]
    },
    {
      id: "human_gesture",
      layer_id: "layer_inbound",
      name: "Gesture Input",
      slug: "gesture-input",
      task_type: "human",
      elevator_pitch: "User performs physical gestures, hand tracking, or body movements as input.",
      example_usage: "Pinching fingers in VR to zoom, waving hand to skip track, or nodding head to confirm.",
      io_spec: {
        inputs: { required: [], optional: [] },
        outputs: {
          primary: { id: "data_signal", label: "Gesture" },
          metadata: [{ id: "data_pose", label: "Body Position" }, { id: "data_trajectory", label: "Movement Path" }]
        }
      },
      common_variants: ["hand_tracking", "head_nod", "body_pose", "controller_motion", "touchless_gesture"],
      relations: [
        { target_id: "task_detect", type: "commonly_preceded_by", strength: "strong", reason: "Gesture detection recognizes hand/body movements." },
        { target_id: "task_classify", type: "enables", strength: "strong", reason: "Gestures are classified by meaning (swipe, pinch, etc.)." },
        { target_id: "task_act", type: "enables", strength: "medium", reason: "Gestures can directly control physical systems." }
      ]
    },
    {
      id: "human_navigate_space",
      layer_id: "layer_inbound",
      name: "Navigate Space",
      slug: "navigate-space",
      task_type: "human",
      elevator_pitch: "User moves through physical or virtual 3D environment.",
      example_usage: "Walking around a VR museum, teleporting in a game, or exploring AR overlays in a building.",
      io_spec: {
        inputs: {
          required: [],
          optional: [{ id: "data_point_cloud", label: "Environment Map" }]
        },
        outputs: {
          primary: { id: "data_trajectory", label: "Movement Path" },
          metadata: [{ id: "data_pose", label: "Current Position" }]
        }
      },
      common_variants: ["walk_in_vr", "teleport", "fly_navigation", "physical_movement", "gaze_navigation"],
      relations: [
        { target_id: "task_track", type: "commonly_preceded_by", strength: "strong", reason: "Position tracking enables navigation." },
        { target_id: "task_detect", type: "enables", strength: "medium", reason: "Navigation reveals what objects the user encounters." },
        { target_id: "task_adapt", type: "enables", strength: "weak", reason: "Movement patterns inform spatial recommendations." }
      ]
    },
    {
      id: "human_adjust_control",
      layer_id: "layer_inbound",
      name: "Adjust Control",
      slug: "adjust-control",
      task_type: "human",
      elevator_pitch: "User continuously adjusts a physical or virtual control (slider, knob, dial).",
      example_usage: "Turning a thermostat dial, adjusting volume slider, or dimming lights gradually.",
      io_spec: {
        inputs: {
          required: [],
          optional: [{ id: "data_config", label: "Current Value" }]
        },
        outputs: {
          primary: { id: "data_config", label: "Adjusted Value" },
          metadata: [{ id: "data_trajectory", label: "Adjustment Path" }]
        }
      },
      common_variants: ["slide_control", "rotate_knob", "drag_slider", "continuous_input", "fine_tuning"],
      relations: [
        { target_id: "task_act", type: "enables", strength: "strong", reason: "Control adjustments directly trigger physical actions." },
        { target_id: "task_adapt", type: "enables", strength: "medium", reason: "Adjustment patterns inform preference learning." },
        { target_id: "human_configure", type: "related_to", strength: "medium", reason: "Adjusting is continuous, configuring is discrete setup." }
      ]
    }
];

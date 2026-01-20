
import { AiTask } from '../types';

export const AI_TASKS: AiTask[] = [
    // --- Inbound ---
    {
      id: "task_detect",
      layer_id: "layer_inbound",
      name: "Detect",
      slug: "detect",
      task_type: "ai",
      elevator_pitch: "Locate and identify objects in image, video, audio, or other data.",
      example_usage: "Spotting pedestrians in a video feed.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_image", label: "Image" }], 
              optional: [{ id: "data_video", label: "Video" }, { id: "data_video_stream", label: "Video Stream" }, { id: "data_point_cloud", label: "LiDAR/3D" }, { id: "data_multimodal", label: "AV Stream" }, { id: "data_audio_stream", label: "Audio Stream" }] 
          }, 
          outputs: { 
              primary: { id: "data_bbox", label: "Detections", isArray: true }, 
              metadata: [{ id: "data_score", label: "Confidence" }, { id: "data_heatmap", label: "Attention Map" }] 
          } 
      },
      implementation_notes: { maturity: "established", typical_latency: "realtime", data_requirements: "medium", human_oversight: "optional" },
      ux_notes: { risk: "False negatives and false positives", tip: "Visualize bounding boxes with confidence scores", anti_patterns: ["Using in safety-critical applications without human verification"] },
      capabilities: [
        { name: "Object Detection", tag: "object-detection", example: "Camera identifying and boxing every vehicle entering a parking lot" },
        { name: "Keypoint Detection", tag: "keypoint-detection", example: "Tracking shoulder, elbow, and wrist positions during a pushup" },
        { name: "Zero-Shot Detection", tag: "zero-shot-object-detection", example: "Finding cats in photos without ever training on cat images" },
        { name: "Voice Activity Detection", tag: "voice-activity-detection", example: "Video conferencing tool unmuting a mic when user starts speaking" },
        { name: "Any to Any", tag: "any-to-any", example: "identifying objects, sounds, and text across uploaded images, audio, and documents" }
      ],
      relations: [
        { target_id: "task_monitor", type: "enables", strength: "strong", reason: "Detections are the raw signals that monitoring systems aggregate." },
        { target_id: "task_classify", type: "commonly_followed_by", strength: "medium", reason: "Detected objects (crops) are often passed to a classifier for finer detail." },
        { target_id: "task_segment", type: "commonly_followed_by", strength: "medium", reason: "Detection provides regions of interest for detailed segmentation." },
        { target_id: "task_synthesize", type: "incompatible_with", strength: "strong", reason: "Do not attempt to summarize bounding box coordinates directly as prose." }
      ]
    },
    {
      id: "task_extract",
      layer_id: "layer_inbound",
      name: "Extract",
      slug: "extract",
      task_type: "ai",
      elevator_pitch: "Pull specific data fields from documents they already have.",
      example_usage: "Getting answers from a document.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_any", label: "Source Content" }], 
              optional: [{ id: "data_text", label: "Query" }, { id: "data_markup", label: "HTML/XML" }, { id: "data_image", label: "Visual Context" }] 
          }, 
          outputs: { 
              primary: { id: "data_json", label: "Extracted Value" }, 
              metadata: [{ id: "data_text", label: "Source Span" }] 
          } 
      },
      implementation_notes: { maturity: "established", typical_latency: "realtime", data_requirements: "small", human_oversight: "optional" },
      ux_notes: { risk: "Hallucinated values", tip: "Highlight source text to show provenance", anti_patterns: ["Extracting from unreliable sources without verification"] },
      capabilities: [
        { name: "Question Answering", tag: "question-answering", example: "Asking 'What's the warranty period?' and getting '2 years' from a 50-page manual" },
        { name: "Table Question Answering", tag: "table-question-answering", example: "Asking 'Which region had highest sales in Q3?' from a spreadsheet table" },
        { name: "Document Question Answering", tag: "document-question-answering", example: "Getting 'March 15, 2025' when asking 'When does this contract expire?' from a PDF" },
        { name: "Token Classification", tag: "token-classification", example: "Highlighting every name, company, and date in a legal document" },
        { name: "Visual Question Answering", tag: "visual-question-answering", example: "Asking 'How many people are wearing hats?' about a crowd photo" },
        { name: "Image-Text-to-Text", tag: "image-text-to-text", example: "Producing the total spend on grocery items vs candy from a receipt photo" },
        { name: "Audio-Text-to-Text", tag: "audio-text-to-text", example: "Pulling action items assigned to a specific person from a meeting recording." },
        { name: "Video-Text-to-Text", tag: "video-text-to-text", example: "Asking 'When does the speaker mention pricing?' on a 2-hour webinar video" }
      ],
      relations: [
        { target_id: "task_verify", type: "commonly_followed_by", strength: "strong", reason: "LLM extraction is prone to hallucination; always verify critical data against source." },
        { target_id: "system_save_db", type: "enables", strength: "strong", reason: "Structuring unstructured data is the primary prerequisite for database storage." },
        { target_id: "task_classify", type: "commonly_followed_by", strength: "medium", reason: "Extracted structured fields (invoice type, support category) are often classified for routing." }
      ]
    },
    {
      id: "task_estimate",
      layer_id: "layer_inbound",
      name: "Estimate",
      slug: "estimate",
      task_type: "ai",
      elevator_pitch: "Measure distances, depths, and dimensions from images or sensors.",
      example_usage: "Estimating depth in an image.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_image", label: "Input Media" }], 
              optional: [{ id: "data_sensor_stream", label: "Sensor Data" }] 
          }, 
          outputs: { 
              primary: { id: "data_depth_map", label: "Depth/Heat Map" }, 
              metadata: [{ id: "data_score", label: "Confidence" }, { id: "data_optical_flow", label: "Motion Vectors" }] 
          } 
      },
      implementation_notes: { maturity: "emerging", typical_latency: "realtime", data_requirements: "large", human_oversight: "optional" },
      ux_notes: { risk: "Inaccuracy in edge cases", tip: "Show range/uncertainty bounds", anti_patterns: ["Using in safety-critical navigation without sensor fusion"] },
      capabilities: [
        { name: "Depth Estimation", tag: "depth-estimation", example: "Phone camera measuring that your wall is 10 feet away for AR picture frame placement" },
        { name: "Keypoint Detection", tag: "keypoint-detection", example: "Motion capture detecting actor's joint positions for animation rigging" },
        { name: "Pose Estimation", tag: "image-feature-extraction", example: "Extracting geometric features to estimate room dimensions from a single photo" }
      ],
      relations: [
        { target_id: "task_plan", type: "enables", strength: "medium", reason: "Spatial estimation (depth/distance) provides the world-model for planning paths." },
        { target_id: "task_segment", type: "enables", strength: "medium", reason: "Depth information improves segmentation accuracy." }
      ]
    },
    {
      id: "task_explain",
      layer_id: "layer_internal",
      name: "Explain / Interpret",
      slug: "explain",
      task_type: "ai",
      elevator_pitch: "Reveals the contributing factors behind a model's prediction.",
      example_usage: "Highlighting which words in a resume caused the 'Rejection' classification.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_any", label: "Model Output" }], 
              optional: [{ id: "data_image", label: "Source Media" }, { id: "data_text", label: "Source Text" }] 
          }, 
          outputs: { 
              primary: { id: "data_heatmap", label: "Attribution Map" }, 
              metadata: [{ id: "data_text", label: "Natural Language Explanation" }] 
          } 
      },
      implementation_notes: { maturity: "emerging", typical_latency: "realtime", data_requirements: "small", human_oversight: "none" },
      ux_notes: { risk: "False sense of causality", tip: "Use highlighting to show correlation, not just causation. Consider post-hoc analysis tools like SHAP or LIME for showing which features contributed most.", anti_patterns: ["Over-explaining low-stakes decisions"] },
      capabilities: [
        { name: "Text Generation", tag: "text-generation", example: "Generating natural language explanation of classification decision with contributing factors" }, // Part of sklearn/XGBoost
        { name: "Question Answering", tag: "question-answering", example: "Answering 'Why was this flagged?' by retrieving the specific policy violation" }, // Visual attribution
        { name: "Any to Any", tag: "any-to-any", example: "Analyzing own historical workflows or agentic tool usage and generating a natural language summary" }
      ],
      relations: [
        { target_id: "task_classify", type: "commonly_followed_by", strength: "strong", reason: "Users often need to know why an item was classified a certain way." },
        { target_id: "human_review", type: "enables", strength: "strong", reason: "Explainability tools help humans make faster review decisions." }
      ]
    },
    {
      id: "task_forecast",
      layer_id: "layer_internal",
      name: "Forecast",
      slug: "forecast",
      task_type: "ai",
      elevator_pitch: "Predicts future values in a sequence based on historical trends.",
      example_usage: "Predicting server load for the next 24 hours.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_table", label: "Historical Series" }], 
              optional: [{ id: "data_config", label: "Horizon" }] 
          }, 
          outputs: { 
              primary: { id: "data_trajectory", label: "Forecast Line" }, 
              metadata: [{ id: "data_score", label: "Confidence Interval" }] 
          } 
      },
      implementation_notes: { maturity: "established", typical_latency: "batch", data_requirements: "large", human_oversight: "optional" },
      ux_notes: { risk: "Black swan events", tip: "Always show confidence intervals (P90/P10)", anti_patterns: ["Presenting forecasts as certainty"] },
      capabilities: [
        { name: "Time Series Forecasting", tag: "time-series-forecasting", example: "Inventory system predicting when you will run out of an item in 3 weeks based on sales trends" }
      ],
      relations: [
        { target_id: "task_plan", type: "enables", strength: "strong", reason: "Forecasts (e.g., weather, stock) are the inputs for planning algorithms." },
        { target_id: "system_monitor_model", type: "monitored_by", strength: "medium", reason: "Forecasts must be constantly checked against actuals to detect drift." }
      ]
    },
    {
      id: "task_monitor",
      layer_id: "layer_inbound",
      name: "Monitor",
      slug: "monitor",
      task_type: "ai",
      elevator_pitch: "Identifies specific events or objects detected in continuous data streams.",
      example_usage: "Listening for glass breaking sounds.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_any", label: "Stream Source" }], 
              optional: [
                { id: "data_video_stream", label: "Video Feed" }, 
                { id: "data_audio_stream", label: "Audio Feed" },
                { id: "data_sensor_stream", label: "Telemetry" }
              ] 
          }, 
          outputs: { 
              primary: { id: "data_signal", label: "Event Trigger" }, 
              metadata: [{ id: "data_log", label: "Event Log" }] 
          } 
      },
      implementation_notes: { maturity: "established", typical_latency: "realtime", data_requirements: "medium", human_oversight: "none" },
      ux_notes: { risk: "Alert fatigue from false positives", tip: "Group notifications and allow threshold adjustment", anti_patterns: ["No user control over sensitivity"] },
      capabilities: [
        { name: "Image Classification", tag: "image-classification", example: "Wildlife camera logging whenever it sees a bear vs deer" },
        { name: "Audio Classification", tag: "audio-classification", example: "Microphone monitor system sending a text if a smoke alarm is detected" },
        { name: "Video Classification", tag: "video-classification", example: "Ring doorbell sending notification when it sees 'Package Delivery' vs 'Person Walking By" },
        { name: "Voice Activity Detection", tag: "voice-activity-detections", example: "Zoom automatically switching to speaker view when someone starts talking" },
        { name: "Any to Any", tag: "any-to-any", example: "construction site camera alerting 'worker without hard hat'" }
      ],
      relations: [
        { target_id: "task_detect", type: "commonly_preceded_by", strength: "strong", reason: "Detect identifies *where*, Monitor identifies *when* (and alerts)." },
        { target_id: "system_notification", type: "triggers", strength: "strong", reason: "The primary output of monitoring is alerting a human or system." }
      ]
    },
    {
      id: "task_retrieve",
      layer_id: "layer_inbound",
      name: "Retrieve",
      slug: "retrieve",
      task_type: "ai",
      elevator_pitch: "Find relevant documents or items from large collections using semantic search.",
      example_usage: "Semantic search over a knowledge base.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_text", label: "Query" }], 
              optional: [{ id: "data_embedding", label: "Vector Query" }, { id: "data_knowledge_graph", label: "Graph Context" }, { id: "data_image", label: "Visual Query" }] 
          }, 
          outputs: { 
              primary: { id: "data_any", label: "Matches", isArray: true }, 
              metadata: [{ id: "data_score", label: "Relevance Score" }] 
          } 
      },
      implementation_notes: { maturity: "established", typical_latency: "realtime", data_requirements: "medium", human_oversight: "none" },
      ux_notes: { risk: "Irrelevant results", tip: "Allow filtering and show relevance scores", anti_patterns: ["No way to refine search"] },
      capabilities: [
        { name: "Feature Extraction", tag: "feature-extraction", example: "Finding similar products in a catalog even when descriptions use different words" },
        { name: "Image Feature Extraction", tag: "image-feature-extraction", example: "Reverse image search finding similar photos across your entire photo library" },
        { name: "Sentence Similarity", tag: "sentence-similarity", example: "Searching 'how to reset password' and finding doc titled 'Account Recovery Steps" },
        { name: "Visual Document Retrieval", tag: "visual-document-retrieval", example: "Finding scanned invoice by searching 'Acme Corp March invoice' across 10,000 scans" },
        { name: "Any to Any", tag: "any-to-any", example: "Searching Notion with 'Q3 planning' and finding relevant docs, images, and meeting notes" }
      ],
      relations: [
        { target_id: "task_represent", type: "requires_input_from", strength: "strong", reason: "Semantic retrieval requires an embedding model (Represent) to vectorize the query." },
        { target_id: "task_generate", type: "enables", strength: "strong", reason: "The 'R' in RAG. Retrieval provides the grounded context for Generation." },
        { target_id: "task_rank", type: "commonly_followed_by", strength: "medium", reason: "Raw retrieval results are often noisy; Ranking re-orders them for precision." }
      ]
    },
    {
      id: "task_segment",
      layer_id: "layer_inbound",
      name: "Segment",
      slug: "segment",
      task_type: "ai",
      elevator_pitch: "Cut out and separate specific chunks of image or other data.",
      example_usage: "Removing background from an image.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_image", label: "Source Image" }], 
              optional: [{ id: "data_point_cloud", label: "3D Cloud" }] 
          }, 
          outputs: { 
              primary: { id: "data_mask", label: "Masks", isArray: true }, 
              metadata: [{ id: "data_json", label: "Polygons" }] 
          } 
      },
      implementation_notes: { maturity: "established", typical_latency: "realtime", data_requirements: "large", human_oversight: "optional" },
      ux_notes: { risk: "Artifacts at edges", tip: "Allow brush refinement for precision", anti_patterns: ["No manual correction tools"] },
      capabilities: [
        { name: "Image Segmentation", tag: "image-segmentation", example: "Photo editor selecting just the sky pixels to change color independently" },
        { name: "Mask Generation", tag: "mask-generation", example: "Video editor generating precise person outline for green screen replacement" },
        { name: "Semantic Segmentation", tag: "semantic-segmentation", example: "Self-driving car identifying road, sidewalk, vehicle, and pedestrian regions" },
        { name: "Any to Any", tag: "any-to-any", example: "Outlining the damaged area in uploaded car accident photo for insurance claim" }
      ],
      relations: [
         { target_id: "task_transform", type: "enables", strength: "medium", reason: "Segmentation masks allow targeted transformation (inpainting) of specific image regions." },
         { target_id: "task_detect", type: "commonly_preceded_by", strength: "medium", reason: "Detection provides regions of interest for detailed segmentation." },
         { target_id: "task_classify", type: "commonly_followed_by", strength: "medium", reason: "Segmented regions are often classified individually (e.g., multi-object scene understanding)." }
      ]
    },

    // --- Internal ---
    {
      id: "task_classify",
      layer_id: "layer_internal",
      name: "Classify",
      slug: "classify",
      task_type: "ai",
      elevator_pitch: "Categorize items into predefined groups.",
      example_usage: "Tagging support tickets by department.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_any", label: "Input Item" }], 
              optional: [{ id: "data_list", label: "Taxonomy" }] 
          }, 
          outputs: { 
              primary: { id: "data_classification", label: "Label" }, 
              metadata: [{ id: "data_score", label: "Confidence" }] 
          } 
      },
      implementation_notes: { maturity: "commoditized", typical_latency: "realtime", data_requirements: "medium", human_oversight: "optional" },
      ux_notes: { risk: "Ambiguity in edge cases", tip: "Show top-k results with confidence scores", anti_patterns: ["Single classification without confidence threshold"] },
      capabilities: [
        { name: "Text Classification", tag: "text-classification", example: "Tagging support tickets as 'Billing', 'Technical', or 'General'" },
        { name: "Image Classification", tag: "image-classification", example: "Identifying 'Hot Dog' vs 'Not Hot Dog' in user photos" },
        { name: "Audio Classification", tag: "audio-classification", example: "Categorizing sound clips as 'Speech', 'Music', or 'Noise'" },
        { name: "Video Classification", tag: "video-classification", example: "Labeling video clips with 'Sports', 'News', 'Comedy'" },
        { name: "Zero-Shot Classification", tag: "zero-shot-classification", example: "Classifying tweets into arbitrary categories defined at runtime" },
        { name: "Any to Any", tag: "any-to-any", example: "Classifying multimodal inputs into defined buckets" }
      ],
      relations: [
        { target_id: "system_rules", type: "enables", strength: "strong", reason: "Classification tags are the most common input for business logic (if 'Billing', route to 'Finance')." },
        { target_id: "task_generate", type: "incompatible_with", strength: "strong", reason: "Do not classify generative output directly for safety; use a specialized Verify task." },
        { target_id: "task_explain", type: "commonly_followed_by", strength: "strong", reason: "Explainability provides transparency into *why* a label was assigned." }
      ]
    },
    {
      id: "task_match",
      layer_id: "layer_internal",
      name: "Match",
      slug: "match",
      task_type: "ai",
      elevator_pitch: "Determine how similar two items are.",
      example_usage: "Finding duplicate customer records.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_any", label: "Item A" }, { id: "data_any", label: "Item B" }], 
              optional: [] 
          }, 
          outputs: { 
              primary: { id: "data_score", label: "Similarity" }, 
              metadata: [] 
          } 
      },
      implementation_notes: { maturity: "established", typical_latency: "realtime", data_requirements: "medium", human_oversight: "none" },
      ux_notes: { risk: "False matches", tip: "Side-by-side comparison for user verification", anti_patterns: ["Auto-merging without review"] },
      capabilities: [
        { name: "Sentence Similarity", tag: "sentence-similarity", example: "Matching user query 'refund policy' to FAQ 'How do I get my money back?'" },
        { name: "Feature Extraction", tag: "feature-extraction", example: "Comparing visual style of two logos" },
        { name: "Any to Any", tag: "any-to-any", example: "Matching a resume PDF to a job description text" }
      ],
      relations: [
        { target_id: "system_rules", type: "commonly_followed_by", strength: "medium", reason: "Match scores usually feed into a threshold rule (if similarity > 0.9, merge)." },
        { target_id: "human_review", type: "commonly_followed_by", strength: "medium", reason: "High-confidence matches should still be reviewed before merging." }
      ]
    },
    {
      id: "task_rank",
      layer_id: "layer_internal",
      name: "Rank",
      slug: "rank",
      task_type: "ai",
      elevator_pitch: "Sort items by relevance, quality, or importance.",
      example_usage: "Search result ordering.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_any", label: "Items", isArray: true }], 
              optional: [{ id: "data_text", label: "Context" }, { id: "data_preference_profile", label: "User Profile" }] 
          }, 
          outputs: { 
              primary: { id: "data_any", label: "Sorted List", isArray: true }, 
              metadata: [{ id: "data_score", label: "Rank Scores", isArray: true }] 
          } 
      },
      implementation_notes: { maturity: "established", typical_latency: "realtime", data_requirements: "large", human_oversight: "none" },
      ux_notes: { risk: "Bias in ranking factors", tip: "Explain ranking factors and allow sorting options", anti_patterns: ["No transparency in ranking logic"] },
      capabilities: [
        { name: "Sentence Similarity", tag: "sentence-similarity", example: "Ordering help articles by semantic relevance to query" },
        { name: "Cross-Encoder Reranking", tag: "text-classification", example: "Re-ranking search results for higher precision" },
        { name: "Text Ranking", tag: "text-ranking", example: "Sorting product reviews by helpfulness" },
        { name: "Any to Any", tag: "any-to-any", example: "Ranking candidate profiles against a job opening" }
      ],
      relations: [
        { target_id: "task_retrieve", type: "commonly_preceded_by", strength: "strong", reason: "Retrieve fetches the candidates; Rank sorts them for the user." },
        { target_id: "human_select_option", type: "enables", strength: "strong", reason: "Ranking prepares choices for human decision making." },
        { target_id: "task_adapt", type: "updated_by", strength: "medium", reason: "User interactions can refine ranking over time." }
      ]
    },
    {
      id: "task_regress",
      layer_id: "layer_internal",
      name: "Regress",
      slug: "regress",
      task_type: "ai",
      elevator_pitch: "Predict numerical values (price, score, rating) from structured data.",
      example_usage: "Predicting house prices from property attributes.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_table", label: "Features" }], 
              optional: [] 
          }, 
          outputs: { 
              primary: { id: "data_score", label: "Predicted Value" }, 
              metadata: [{ id: "data_score", label: "Confidence Interval" }] 
          } 
      },
      implementation_notes: { maturity: "established", typical_latency: "realtime", data_requirements: "medium", human_oversight: "optional" },
      ux_notes: { risk: "Outliers and extrapolation errors", tip: "Visualize trend line and confidence bounds", anti_patterns: ["Using for out-of-distribution data without warnings"] },
      capabilities: [
        { name: "Tabular Regression", tag: "tabular-regression", example: "Predicting house price based on sq ft, location, and year built" }
      ],
      relations: [
        { target_id: "system_rules", type: "commonly_followed_by", strength: "medium", reason: "Regression predictions often trigger threshold-based actions." },
        { target_id: "human_review", type: "commonly_followed_by", strength: "medium", reason: "High-stakes predictions (medical, financial) require human review." },
        { target_id: "task_forecast", type: "related_to", strength: "medium", reason: "If the data has a time dimension, switch from Regression to Forecasting." }
      ]
    },
    {
      id: "task_synthesize",
      layer_id: "layer_internal",
      name: "Synthesize",
      slug: "synthesize",
      task_type: "ai",
      elevator_pitch: "Get the key points from multiple sources combined into one.",
      example_usage: "Summarizing meeting notes from multiple sources.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_text", label: "Source Texts", isArray: true }], 
              optional: [{ id: "data_session_history", label: "History" }] 
          }, 
          outputs: { 
              primary: { id: "data_text", label: "Summary" }, 
              metadata: [] 
          } 
      },
      implementation_notes: { maturity: "established", typical_latency: "batch", data_requirements: "large", human_oversight: "recommended" },
      ux_notes: { risk: "Missing key details or introducing bias", tip: "Allow length adjustment and highlight source attribution", anti_patterns: ["No way to trace claims back to sources"] },
      capabilities: [
        { name: "Text Generation", tag: "text-generation", example: "Summarizing a long email thread into bullet points" },
        { name: "Summarization", tag: "summarization", example: "Generating a brief abstract for a research paper" },
        { name: "Any to Any", tag: "any-to-any", example: "Summarizing key points from a recorded meeting video" }
      ],
      relations: [
        { target_id: "task_retrieve", type: "commonly_preceded_by", strength: "medium", reason: "Synthesis usually operates on a set of retrieved documents." },
        { target_id: "task_verify", type: "commonly_followed_by", strength: "strong", reason: "Summaries can drift from source facts; verification ensures fidelity." }
      ]
    },
    {
      id: "task_verify",
      layer_id: "layer_internal",
      name: "Verify",
      slug: "verify",
      task_type: "ai",
      elevator_pitch: "Evaluate content/claims against evidence to determine accuracy, consistency, or compliance.",
      example_usage: "Fact checking a generated statement against source documents.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_text", label: "Claim" }, { id: "data_text", label: "Evidence" }], 
              optional: [{ id: "data_knowledge_graph", label: "Facts" }] 
          }, 
          outputs: { 
              primary: { id: "data_classification", label: "Verdict" }, 
              metadata: [{ id: "data_score", label: "Confidence" }] 
          } 
      },
      implementation_notes: { maturity: "emerging", typical_latency: "realtime", data_requirements: "large", human_oversight: "recommended" },
      ux_notes: { risk: "False confidence in incorrect verdicts", tip: "Cite evidence sources directly", anti_patterns: ["Verifying creative writing", "Using for sentiment analysis"] },
      capabilities: [
        { name: "Zero-Shot Classification", tag: "zero-shot-classification", example: "Checking if a response contradicts the provided source text" },
        { name: "Question Answering", tag: "question-answering", example: "Verifying if the answer 'Yes' is supported by the policy document" },
        { name: "Any to Any", tag: "any-to-any", example: "Verifying if the generated image matches the prompt requirements" }
      ],
      relations: [
        { target_id: "human_review", type: "commonly_followed_by", strength: "strong", reason: "Automated verification is imperfect; human review is the final gate for high-stakes claims." }
      ]
    },
    {
      id: "task_represent",
      layer_id: "layer_internal",
      name: "Represent",
      slug: "represent",
      task_type: "ai",
      elevator_pitch: "Converts content into searchable format for semantic operations (usually automatic).",
      example_usage: "Creating embeddings for similarity search.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_any", label: "Raw Data" }], 
              optional: [] 
          }, 
          outputs: { 
              primary: { id: "data_embedding", label: "Vector" }, 
              metadata: [] 
          } 
      },
      implementation_notes: { 
        maturity: "established", 
        typical_latency: "realtime", 
        data_requirements: "medium", 
        human_oversight: "none" 
      },
      ux_notes: { 
        risk: "Loss of semantic meaning in projection", 
        tip: "Visualize with dimensionality reduction (t-SNE/UMAP)", 
        anti_patterns: ["Mixing different embedding models", "Not normalizing vectors"] 
      },
      capabilities: [
        { name: "Feature Extraction", tag: "feature-extraction", example: "Converting product descriptions into vectors for search" },
        { name: "Image Feature Extraction", tag: "image-feature-extraction", example: "Generating embeddings for visual search" },
        { name: "Sentence Transformers", tag: "sentence-similarity", example: "Creating semantic vectors for paragraphs" },
        { name: "Fill-Mask", tag: "fill-mask", example: "Predicting missing words in a sentence" },
        { name: "Any to Any", tag: "any-to-any", example: "Representing mixed media as a single vector" }
      ],
      relations: [
        { target_id: "task_retrieve", type: "enables", strength: "strong", reason: "Embeddings are the foundation of semantic retrieval." },
        { target_id: "task_match", type: "enables", strength: "medium", reason: "Vector similarity enables efficient matching." },
        { target_id: "task_cluster", type: "enables", strength: "strong", reason: "Embeddings define the semantic space where clustering occurs." }
      ]
    },
    {
      id: "task_cluster",
      layer_id: "layer_internal",
      name: "Cluster",
      slug: "cluster",
      task_type: "ai",
      elevator_pitch: "Find common patterns and group similar items automatically.",
      example_usage: "Discovering common themes in thousands of support tickets.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_embedding", label: "Item Embeddings", isArray: true }], 
              optional: [{ id: "data_config", label: "Clustering Parameters" }] 
          }, 
          outputs: { 
              primary: { id: "data_group", label: "Clusters", isArray: true }, 
              metadata: [{ id: "data_score", label: "Silhouette Score" }, { id: "data_point", label: "Outliers", isArray: true }] 
          } 
      },
      implementation_notes: { 
        maturity: "established", 
        typical_latency: "batch", 
        data_requirements: "large", 
        human_oversight: "recommended" 
      },
      ux_notes: { 
        risk: "Incoherent groupings or 'noise' items", 
        tip: "Use Generative AI (Synthesize) to auto-label the resulting clusters", 
        anti_patterns: ["Forcing everything into a cluster (hiding outliers)", "Changing cluster definitions drastically between sessions"] 
      },
      capabilities: [
        { name: "Feature Extraction", tag: "feature-extraction", example: "Grouping similar news articles" }, 
        { name: "Sentence Similarity", tag: "sentence-similarity", example: "Clustering customer feedback into topics" }
      ],
      relations: [
        { target_id: "task_represent", type: "requires_input_from", strength: "strong", reason: "Clustering operates on the vector space created by the Represent task." },
        { target_id: "task_synthesize", type: "commonly_followed_by", strength: "strong", reason: "Raw clusters are just ID numbers; Synthesis is needed to read the content and generate a descriptive label." },
        { target_id: "human_organize", type: "enables", strength: "strong", reason: "Clustering provides the 'first draft' of organization for humans to refine." }
      ]
    },

    // --- Outbound ---
    {
      id: "task_generate",
      layer_id: "layer_outbound",
      name: "Generate",
      slug: "generate",
      task_type: "ai",
      elevator_pitch: "Create new content from scratch based on input.",
      example_usage: "Drafting an email reply from bullet points.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_text", label: "Prompt" }], 
              optional: [{ id: "data_image", label: "Image Context" }, { id: "data_session_history", label: "Chat History" }] 
          }, 
          outputs: { 
              primary: { id: "data_any", label: "Generated Content" }, 
              metadata: [] 
          } 
      },
      implementation_notes: { maturity: "established", typical_latency: "interactive", data_requirements: "large", human_oversight: "recommended" },
      ux_notes: { risk: "Hallucination and fabricated facts", tip: "Stream response and offer variations", anti_patterns: ["Generating facts without grounding", "Unbounded length without user control"] },
      capabilities: [
        { name: "Text Generation", tag: "text-generation", example: "Writing a blog post from a title" },
        { name: "Text-to-Image", tag: "text-to-image", example: "Generating a logo from a description" },
        { name: "Text-to-Video", tag: "text-to-video", example: "Creating a short animation from a script" },
        { name: "Text-to-Audio", tag: "text-to-audio", example: "Generating sound effects from text" },
        { name: "Unconditional Image Generation", tag: "unconditional-image-generation", example: "Generating random faces for avatars" },
        { name: "Text-to-3D", tag: "text-to-3d", example: "Creating a 3D asset from a prompt" },
        { name: "Image-to-3D", tag: "image-to-3d", example: "Converting a 2D logo to 3D" },
        { name: "Image-to-Video", tag: "image-to-video", example: "Animating a still image" },
        { name: "Any to Any", tag: "any-to-any", example: "Generating code from a screenshot" }
      ],
      relations: [
        { target_id: "task_retrieve", type: "commonly_preceded_by", strength: "strong", reason: "RAG pattern: grounding generation in retrieved facts reduces hallucination." },
        { target_id: "task_verify", type: "commonly_followed_by", strength: "strong", reason: "Generated content should be verified against sources when accuracy matters." },
        { target_id: "human_edit", type: "enables", strength: "strong", reason: "Generative outputs are often starting points for human refinement." }
      ]
    },
    {
      id: "task_transform",
      layer_id: "layer_outbound",
      name: "Transform",
      slug: "transform",
      task_type: "ai",
      elevator_pitch: "Modify style or format of existing content.",
      example_usage: "Style transfer on an image or paraphrasing text.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_any", label: "Source" }], 
              optional: [{ id: "data_text", label: "Style Prompt" }, { id: "data_mask", label: "Region Mask" }] 
          }, 
          outputs: { 
              primary: { id: "data_any", label: "Transformed Content" }, 
              metadata: [] 
          } 
      },
      implementation_notes: { maturity: "emerging", typical_latency: "interactive", data_requirements: "medium", human_oversight: "optional" },
      ux_notes: { risk: "Loss of fidelity or unintended changes", tip: "Show original vs transformed side-by-side", anti_patterns: ["No undo or revert option"] },
      capabilities: [
        { name: "Image-to-Image", tag: "image-to-image", example: "Turning a sketch into a photorealistic image" },
        { name: "Voice Conversion", tag: "audio-to-audio", example: "Changing a speaker's voice to sound like someone else" },
        { name: "Text Style Transfer", tag: "text2text-generation", example: "Rewriting formal text to be casual" },
        { name: "Video-to-Video", tag: "video-to-video", example: "Applying a style filter to a video" },
        { name: "Image-Text-to-Image", tag: "image-text-to-image", example: "Modifying an image based on instructions" },
        { name: "Any to Any", tag: "any-to-any", example: "Refactoring code to a different language" }
      ],
      relations: [
        { target_id: "task_segment", type: "commonly_preceded_by", strength: "medium", reason: "Targeted transforms (inpainting) require segmentation masks first." }
      ]
    },
    {
      id: "task_translate",
      layer_id: "layer_outbound",
      name: "Translate",
      slug: "translate",
      task_type: "ai",
      elevator_pitch: "Convert content from one language or format to another.",
      example_usage: "Transcribing speech to text, or translating English to Spanish.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_any", label: "Source" }], 
              optional: [{ id: "data_text", label: "Target Language" }, { id: "data_text", label: "Context Prompt" }] 
          }, 
          outputs: { 
              primary: { id: "data_any", label: "Translated" }, 
              metadata: [{ id: "data_score", label: "Confidence" }] 
          } 
      },
      implementation_notes: { 
        maturity: "established", 
        typical_latency: "realtime", 
        data_requirements: "large", 
        human_oversight: "optional" 
      },
      ux_notes: { 
        risk: "Lost nuance or cultural context", 
        tip: "Keep original accessible for comparison", 
        anti_patterns: ["Using for creative writing translation without post-editing", "Medical/legal without human review"] 
      },
      capabilities: [
        { name: "Translation", tag: "translation", example: "Translating a website from English to French" },
        { name: "Automatic Speech Recognition", tag: "automatic-speech-recognition", example: "Transcribing a voicemail to text" },
        { name: "Text-to-Speech", tag: "text-to-speech", example: "Reading a news article aloud" },
        { name: "Image-to-Text", tag: "image-to-text", example: "Extracting text from a scanned document (OCR)" },
        { name: "Audio-Text-to-Text", tag: "audio-text-to-text", example: "Translating spoken Spanish to English text" },
        { name: "Image-Text-to-Text", tag: "image-text-to-text", example: "Describing a chart in text" },
        { name: "Video-Text-to-Text", tag: "video-text-to-text", example: "Generating subtitles for a video" },
        { name: "Image-Text-to-Video", tag: "image-text-to-video", example: "Animating a diagram based on text explanation" },
        { name: "Any to Any", tag: "any-to-any", example: "Translating sign language video to text" }
      ],
      relations: [
        { target_id: "task_generate", type: "commonly_followed_by", strength: "medium", reason: "Translation often precedes generation in multilingual systems." },
        { target_id: "task_verify", type: "commonly_followed_by", strength: "medium", reason: "Translations should be verified for accuracy in high-stakes contexts." },
        { target_id: "task_represent", type: "commonly_followed_by", strength: "medium", reason: "Speech-to-text output is converted to embeddings for semantic search (voice search use case)." }
      ]
    },

    // --- Interactive ---
    {
      id: "task_adapt",
      layer_id: "layer_interactive",
      name: "Adapt",
      slug: "adapt",
      task_type: "ai",
      elevator_pitch: "Updates system behavior based on implicit or explicit feedback.",
      example_usage: "Personalizing recommendations based on click patterns.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_log", label: "Interaction Logs" }], 
              optional: [{ id: "data_preference_profile", label: "User Profile" }] 
          }, 
          outputs: { 
              primary: { id: "data_config", label: "Updated Model State" }, 
              metadata: [] 
          } 
      },
      implementation_notes: { maturity: "established", typical_latency: "batch", data_requirements: "continuous", human_oversight: "optional" },
      ux_notes: { risk: "Feedback loops and filter bubbles", tip: "Allow profile reset and show adaptation controls", anti_patterns: ["Over-indexing on recent clicks", "No transparency in what's being learned"] },
      capabilities: [
        { name: "Reinforcement Learning", tag: "reinforcement-learning", example: "Personalizing news feed based on dwell time" },
        { name: "Online Learning", tag: "tabular-classification", example: "Adapting spam filter based on user corrections" }
      ],
      relations: [
        { target_id: "human_provide_feedback", type: "requires_input_from", strength: "strong", reason: "Adaptation relies on signals from human interactions (clicks, ratings, edits)." },
        { target_id: "task_rank", type: "updates", strength: "strong", reason: "Adaptation refines ranking/recommendation models over time." },
        { target_id: "task_retrieve", type: "updates", strength: "medium", reason: "User behavior can improve retrieval relevance." }
      ]
    },
    {
      id: "task_act",
      layer_id: "layer_interactive",
      name: "Act",
      slug: "act",
      task_type: "ai",
      elevator_pitch: "Performs physical or digital actions in an environment.",
      example_usage: "Robot arm picking up an object, or API calling an external service.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_state_vector", label: "Environment State" }], 
              optional: [{ id: "data_policy", label: "Policy/Strategy" }] 
          }, 
          outputs: { 
              primary: { id: "data_action", label: "Action Command" }, 
              metadata: [{ id: "data_score", label: "Q-value/Expected Reward" }] 
          } 
      },
      implementation_notes: { 
        maturity: "emerging", 
        typical_latency: "realtime", 
        data_requirements: "continuous", 
        human_oversight: "required" 
      },
      ux_notes: { 
        risk: "Physical damage or unintended consequences", 
        tip: "Implement emergency stop and simulation mode", 
        anti_patterns: ["No human supervision for high-risk actions", "No rollback mechanism"] 
      },
      capabilities: [
        { name: "Reinforcement Learning", tag: "reinforcement-learning", example: "Optimizing server cooling based on load" },
        { name: "Robotics Control", tag: "robotics", example: "Robot arm sorting recycling materials" },
        { name: "Any to Any", tag: "any-to-any", example: "Smart home system adjusting lights based on occupancy" }
      ],
      relations: [
        { target_id: "task_plan", type: "commonly_preceded_by", strength: "strong", reason: "Planning determines action sequences before execution." },
        { target_id: "task_adapt", type: "enables", strength: "medium", reason: "Action outcomes provide feedback signals for learning." },
        { target_id: "human_stop_process", type: "enabled_by", strength: "strong", reason: "Users must be able to halt actions in progress." }
      ]
    },
    {
      id: "task_explore",
      layer_id: "layer_interactive",
      name: "Explore",
      slug: "explore",
      task_type: "ai",
      elevator_pitch: "Tries new actions to discover optimal strategies.",
      example_usage: "A/B testing content variants automatically to find best performer.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_state_vector", label: "State" }], 
              optional: [{ id: "data_policy", label: "Policy" }] 
          }, 
          outputs: { 
              primary: { id: "data_action", label: "Trial Action" }, 
              metadata: [] 
          } 
      },
      implementation_notes: { maturity: "emerging", typical_latency: "realtime", data_requirements: "continuous", human_oversight: "optional" },
      ux_notes: { risk: "Suboptimal user experience during exploration", tip: "Limit exploration scope and duration", anti_patterns: ["Unlimited exploration in production", "No guardrails on tried actions"] },
      capabilities: [
        { name: "Epsilon-Greedy", tag: "reinforcement-learning", example: "Occasionally showing random products to learn user tastes" },
        { name: "Thompson Sampling", tag: "reinforcement-learning", example: "Allocating traffic to best performing headlines" }
      ],
      relations: [
        { target_id: "task_adapt", type: "enables", strength: "strong", reason: "Exploration generates diverse data for adaptation." },
        { target_id: "task_act", type: "commonly_followed_by", strength: "medium", reason: "Exploration strategies select actions to try." }
      ]
    },
    {
      id: "task_plan",
      layer_id: "layer_interactive",
      name: "Plan",
      slug: "plan",
      task_type: "ai",
      elevator_pitch: "Optimizes or generates a sequence of future actions to achieve a goal.",
      example_usage: "Route optimization or task scheduling.",
      io_spec: { 
          inputs: { 
              required: [{ id: "data_text", label: "Goal" }], 
              optional: [{ id: "data_state_vector", label: "Current State" }] 
          }, 
          outputs: { 
              primary: { id: "data_json", label: "Action Plan", isArray: true }, 
              metadata: [{ id: "data_trajectory", label: "Path" }] 
          } 
      },
      implementation_notes: { maturity: "emerging", typical_latency: "batch", data_requirements: "large", human_oversight: "recommended" },
      ux_notes: { risk: "Rigidity and failure to adapt to changes", tip: "Allow manual override and replanning", anti_patterns: ["No contingency for plan failure"] },
      capabilities: [
        { name: "Policy Learning", tag: "reinforcement-learning", example: "Optimizing delivery routes in real-time" },
        { name: "Motion Planning", tag: "robotics", example: "Autonomous drone navigating around obstacles" },
        { name: "Any to Any", tag: "any-to-any", example: "Scheduling meeting times for a large team" }
      ],
      relations: [
        { target_id: "task_estimate", type: "commonly_preceded_by", strength: "medium", reason: "Spatial estimation provides the world-model for planning." },
        { target_id: "task_act", type: "enables", strength: "strong", reason: "Plans are executed as sequences of actions." }
      ]
    }
];

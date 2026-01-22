
import { DataArtifactDefinition } from '../types';

export const DATA_ARTIFACTS: DataArtifactDefinition[] = [
    // Text Data
    { id: "data_text", name: "Text", category: "text", icon: "type", description: "Plain text input/output", examples: ["User messages", "search queries", "form responses"], compatible_with: ["Classify", "Generate", "Extract", "Translate"], format_notes: "UTF-8 string, any length" },
    { id: "data_markup", name: "Markup", category: "text", icon: "code", description: "Text with semantic annotations", examples: ["HTML", "XML", "Markdown"], compatible_with: ["Extract", "Transform"], format_notes: "String with tags" },
    { id: "data_structured_text", name: "Structured Text", category: "text", icon: "file-text", description: "Formatted text with hierarchy", examples: ["Markdown", "rich text documents"], compatible_with: ["Extract", "Transform", "Generate"], format_notes: "Preserves formatting/structure" },
    { id: "data_code", name: "Code", category: "text", icon: "code", description: "Programming language text", examples: ["Python", "JavaScript", "SQL"], compatible_with: ["Generate", "Verify", "Transform"], format_notes: "Syntax-aware processing" },
    { id: "data_conversation", name: "Conversation History", category: "text", icon: "message-square", description: "Sequential dialogue", examples: ["Chat logs", "support tickets"], compatible_with: ["Synthesize", "Classify", "Generate"], format_notes: "Array of {role, content} messages" },
    { id: "data_document", name: "Document", category: "text", icon: "file-text", description: "File-based document", examples: ["PDF", "DOCX"], compatible_with: ["Extract", "Translate"], format_notes: "Binary or text content" },
    { id: "data_session_history", name: "Session History", category: "text", icon: "history", description: "Past user actions/state", examples: ["User journey", "Context"], compatible_with: ["Adapt", "Synthesize"], format_notes: "Chronological event log" },
    
    // Visual Data
    { id: "data_image", name: "Image", category: "visual", icon: "image", description: "Static 2D visual", examples: ["Photos", "screenshots", "diagrams"], compatible_with: ["Detect", "Classify", "Segment", "Transform"], format_notes: "JPEG, PNG, WebP. Typical size 512px-4K" },
    { id: "data_video", name: "Video", category: "visual", icon: "video", description: "Sequential frames", examples: ["Recordings", "animations"], compatible_with: ["Detect", "Classify", "Monitor"], format_notes: "MP4, WebM. Requires processing time/cost" },
    { id: "data_video_stream", name: "Video Stream", category: "visual", icon: "video", description: "Real-time continuous video", examples: ["Security feed", "Webcam"], compatible_with: ["Monitor", "Detect"], format_notes: "RTSP/WebRTC Stream" },
    { id: "data_optical_flow", name: "Optical Flow", category: "visual", icon: "move", description: "Motion vectors between frames", examples: ["Motion tracking"], compatible_with: ["Estimate", "Detect"], format_notes: "2D Vector Field" },
    { id: "data_3d_model", name: "3D Model", category: "visual", icon: "box", description: "Spatial geometry", examples: ["CAD files", "game assets"], compatible_with: ["Generate", "Transform"], format_notes: "OBJ, FBX, GLTF" },
    { id: "data_point_cloud", name: "Point Cloud", category: "visual", icon: "box", description: "3D spatial data points", examples: ["LiDAR scan"], compatible_with: ["Detect", "Segment", "Estimate"], format_notes: "XYZ coordinates + optional RGB" },
    { id: "data_depth_map", name: "Depth Map", category: "visual", icon: "layers", description: "Distance at each pixel", examples: ["AR sensing", "3D reconstruction"], compatible_with: ["Estimate", "Segment"], format_notes: "2D array of float distance values" },
    { id: "data_heatmap", name: "Heatmap", category: "visual", icon: "activity", description: "Probability distribution map", examples: ["Attention map", "Saliency"], compatible_with: ["Detect", "Classify"], format_notes: "2D float array normalized 0-1" },
    { id: "data_bbox", name: "Bounding Box", category: "visual", icon: "square", description: "Rectangular region of interest", examples: ["[x,y,w,h]", "YOLO output"], compatible_with: ["Detect", "Segment"], format_notes: "Normalized 0-1 or pixel coords" },
    { id: "data_mask", name: "Mask", category: "visual", icon: "circle-dashed", description: "Binary or multi-class segmentation", examples: ["Alpha channel", "Region masks"], compatible_with: ["Segment", "Transform"], format_notes: "Same dimensions as source image" },

    // Audio Data
    { id: "data_audio", name: "Audio", category: "audio", icon: "mic", description: "Sound recording", examples: ["Voice memos", "music"], compatible_with: ["Classify", "Translate", "Transform"], format_notes: "MP3, WAV, AAC" },
    { id: "data_audio_stream", name: "Audio Stream", category: "audio", icon: "mic", description: "Real-time continuous audio", examples: ["Microphone input", "Live transcription"], compatible_with: ["Monitor", "Translate", "Classify"], format_notes: "PCM Buffer" },
    { id: "data_speech", name: "Speech", category: "audio", icon: "mic", description: "Human voice (subset of audio)", examples: ["Dictation", "voice commands"], compatible_with: ["Translate (ASR)", "Classify"], format_notes: "Optimized for voice frequency range" },
    
    // Structured Data
    { id: "data_json", name: "JSON", category: "structured", icon: "code", description: "Key-value structured data", examples: ["API responses", "config files"], compatible_with: ["Extract", "Classify", "Represent"], format_notes: "Hierarchical, typed values" },
    { id: "data_list", name: "List / Array", category: "structured", icon: "list", description: "Ordered collection of items", examples: ["Menu items", "Taxonomy"], compatible_with: ["Classify", "Rank"], format_notes: "JSON Array" },
    { id: "data_table", name: "Table", category: "structured", icon: "table", description: "Rows and columns", examples: ["Spreadsheets", "SQL results"], compatible_with: ["Regress", "Classify"], format_notes: "CSV, TSV, Parquet" },
    { id: "data_knowledge_graph", name: "Knowledge Graph", category: "structured", icon: "network", description: "Entities and relationships", examples: ["Ontology", "Semantic Web"], compatible_with: ["Retrieve", "Verify"], format_notes: "Graph/Triples" },
    { id: "data_embedding", name: "Embedding", category: "structured", icon: "hash", description: "High-dimensional vector", examples: ["Search index", "Feature vector"], compatible_with: ["Retrieve", "Match"], format_notes: "Float32Array, typically 384-1536 dims" },
    { id: "data_state_vector", name: "State Vector", category: "structured", icon: "cpu", description: "Current system/environment state", examples: ["Game state", "Robot position"], compatible_with: ["Act", "Plan", "Explore"], format_notes: "Numerical array representing condition" },
    { id: "data_sensor_stream", name: "Sensor Stream", category: "structured", icon: "activity", description: "Real-time sensor readings", examples: ["Accelerometer", "Temperature"], compatible_with: ["Monitor", "Estimate"], format_notes: "Continuous measurement series" },
    { id: "data_trajectory", name: "Trajectory", category: "structured", icon: "trending-up", description: "Path over time", examples: ["Robot path", "Drone flight plan"], compatible_with: ["Plan", "Act"], format_notes: "Sequence of positions with timestamps" },
    { id: "data_preference_profile", name: "User Profile", category: "structured", icon: "user", description: "Explicit/Implicit preferences", examples: ["Settings", "Learned preferences"], compatible_with: ["Rank", "Adapt"], format_notes: "JSON or Vector representation" },
    
    // System Data
    { id: "data_score", name: "Score", category: "system", icon: "gauge", description: "Numerical value (confidence, similarity, etc)", examples: ["0.85 confidence", "0.92 similarity"], compatible_with: ["All"], format_notes: "Float, typically 0-1" },
    { id: "data_classification", name: "Classification", category: "system", icon: "tag", description: "Categorical label", examples: ["Spam/Not Spam", "Cat/Dog"], compatible_with: ["Classify", "Verify"], format_notes: "String label from taxonomy" },
    { id: "data_signal", name: "Signal", category: "system", icon: "zap", description: "Control flow trigger", examples: ["Start", "Stop", "Alert"], compatible_with: ["Monitor", "Act"], format_notes: "Boolean or Enum" },
    { id: "data_log", name: "Log", category: "system", icon: "list", description: "System event record", examples: ["Error trace", "Audit log"], compatible_with: ["Adapt"], format_notes: "Timestamped structured data" },
    { id: "data_config", name: "Config", category: "system", icon: "settings", description: "System parameters", examples: ["Model settings", "Thresholds"], compatible_with: ["Adapt"], format_notes: "JSON/YAML" },
    { id: "data_schema", name: "Schema", category: "system", icon: "file-code", description: "Data structure definition", examples: ["JSON Schema", "SQL Schema"], compatible_with: ["Format"], format_notes: "Formal specification" },
    { id: "data_db_record", name: "DB Record", category: "system", icon: "database", description: "Persisted entity", examples: ["User row", "Product item"], compatible_with: ["Load", "Save"], format_notes: "ORM Object" },
    { id: "data_api_response", name: "API Response", category: "system", icon: "globe", description: "External service data", examples: ["Weather data", "Payment status"], compatible_with: ["API Call"], format_notes: "JSON/XML" },
    { id: "data_action", name: "Action", category: "system", icon: "zap", description: "Discrete or continuous action", examples: ["Button press", "Motor command"], compatible_with: ["Act", "Explore"], format_notes: "Enum or Vector" },
    { id: "data_policy", name: "Policy", category: "system", icon: "shield", description: "Decision-making strategy", examples: ["Neural weights", "Ruleset"], compatible_with: ["Plan", "Act"], format_notes: "Model/Function" },
    { id: "data_file", name: "File", category: "system", icon: "file", description: "Binary file blob", examples: ["Uploaded document", "Image file"], compatible_with: ["Extract", "Translate"], format_notes: "Binary data with MIME type" },
    { id: "data_selection", name: "Selection", category: "system", icon: "check-square", description: "User choice from options", examples: ["Dropdown value", "Checkbox state"], compatible_with: ["Select"], format_notes: "ID or value from option set" },
    { id: "data_group", name: "Group / Cluster", category: "system", icon: "grid", description: "A collection of items grouped by similarity or logic", examples: ["Cluster ID 1", "Folder: Invoices"], compatible_with: ["Synthesize", "Organize"], format_notes: "Object containing {id, label, items[]}" },
    
    // Generic
    { id: "data_any", name: "Any", category: "generic", icon: "asterisk", description: "Flexible/unspecified data type", examples: ["Wildcard input"], compatible_with: ["All"], format_notes: "Use when type varies or is unknown" },
    { id: "data_multimodal", name: "Multimodal", category: "generic", icon: "layers", description: "Combined data types", examples: ["Video with audio", "Image with text"], compatible_with: ["Detect", "Classify"], format_notes: "Container format (MKV, MP4)" }
];


import { Example } from '../types';

export const EXAMPLES: Example[] = [
  {
    id: "ex_rag_chatbot",
    primary_task_id: "task_retrieve",
    title: "Enterprise Knowledge Bot (RAG)",
    description: "A secure internal chatbot that answers employee questions by retrieving policy documents, ranking them for relevance, and generating citations.",
    industry: "Enterprise",
    complexity: "Medium",
    tags: ["RAG", "Search", "Internal Tools"],
    image_url: "https://images.unsplash.com/photo-1555421689-d68471e18963?auto=format&fit=crop&q=80&w=1000",
    nodes: [
      { task_id: "human_type_input", x: 0, y: 0, label: "Employee Query" },
      { task_id: "task_represent", x: 300, y: 0, label: "Embed Query" },
      { task_id: "task_retrieve", x: 600, y: 0, label: "Vector Search" },
      { task_id: "task_rank", x: 900, y: 0, label: "Re-Rank Results" },
      { task_id: "task_generate", x: 1200, y: 0, label: "Synthesize Answer" },
      { task_id: "tp_chat", x: 1500, y: 0, label: "Slack Interface" }
    ]
  },
  {
    id: "ex_content_mod",
    primary_task_id: "task_classify",
    title: "Automated Content Moderation",
    description: "A high-throughput pipeline for social platforms that filters toxic content using a hybrid AI + Human-in-the-loop approach.",
    industry: "Consumer",
    complexity: "High",
    tags: ["Safety", "Classification", "HITL"],
    image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    nodes: [
      { task_id: "system_webhook", x: 0, y: 0, label: "New Post Hook" },
      { task_id: "task_classify", x: 300, y: 0, label: "Toxicity Check" },
      { task_id: "system_rules", x: 600, y: 0, label: "Confidence Gate" },
      { task_id: "system_save_db", x: 900, y: -150, label: "Auto-Publish (Safe)" },
      { task_id: "human_review", x: 900, y: 150, label: "Manual Review (Flagged)" },
      { task_id: "system_notification", x: 1200, y: 150, label: "Ban User" }
    ]
  },
  {
    id: "ex_voice_assistant",
    primary_task_id: "task_translate",
    title: "Drive-Thru Voice Agent",
    description: "A low-latency voice pipeline designed for noisy environments, handling speech-to-text, order logic, and text-to-speech synthesis.",
    industry: "Food & Bev",
    complexity: "High",
    tags: ["Audio", "Real-time", "Voice"],
    image_url: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=1000",
    nodes: [
      { task_id: "data_audio_stream", x: 0, y: 0, label: "Mic Input" },
      { task_id: "task_translate", x: 300, y: 0, label: "Speech-to-Text (Whisper)" },
      { task_id: "task_classify", x: 600, y: 0, label: "Intent Detection" },
      { task_id: "system_api", x: 900, y: 0, label: "POS System" },
      { task_id: "task_generate", x: 1200, y: 0, label: "Generate Confirmation" },
      { task_id: "task_translate", x: 1500, y: 0, label: "Text-to-Speech" }
    ]
  },
  {
    id: "ex_fraud_detection",
    primary_task_id: "task_detect",
    title: "Financial Fraud Detection",
    description: "Real-time transaction monitoring system that detects anomalies and triggers identity verification challenges.",
    industry: "Fintech",
    complexity: "High",
    tags: ["Security", "Analysis", "Finance"],
    image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    nodes: [
      { task_id: "system_webhook", x: 0, y: 0, label: "Transaction Event" },
      { task_id: "task_monitor", x: 300, y: 0, label: "Anomaly Detector" },
      { task_id: "system_rules", x: 600, y: 0, label: "Risk Score Check" },
      { task_id: "system_api", x: 900, y: -100, label: "Approve (Low Risk)" },
      { task_id: "system_notification", x: 900, y: 100, label: "Trigger 2FA (High Risk)" },
      { task_id: "human_review", x: 1200, y: 100, label: "Fraud Analyst Case" }
    ]
  },
  {
    id: "ex_predictive_maint",
    primary_task_id: "task_forecast",
    title: "IoT Predictive Maintenance",
    description: "Analyzing sensor telemetry from manufacturing equipment to forecast failures before they happen.",
    industry: "IoT",
    complexity: "Medium",
    tags: ["IoT", "Forecasting", "Industrial"],
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
    nodes: [
      { task_id: "data_sensor_stream", x: 0, y: 0, label: "Vibration Sensors" },
      { task_id: "system_load_db", x: 0, y: 150, label: "Maintenance Logs" },
      { task_id: "task_regress", x: 300, y: 75, label: "Predict Failure Probability" },
      { task_id: "task_forecast", x: 600, y: 75, label: "Time-to-Failure" },
      { task_id: "system_rules", x: 900, y: 75, label: "Threshold Check" },
      { task_id: "system_api", x: 1200, y: 75, label: "Schedule Repair Ticket" }
    ]
  }
];

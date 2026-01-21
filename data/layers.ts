
import { Layer } from '../types';

export const LAYERS: Layer[] = [
  {
    id: "layer_inbound",
    name: "Inbound",
    slug: "Sensing",
    role: "Sensing & Structuring",
    description: "How the system perceives and organizes input from the world.",
    color: "#4A8A3F",
    guidance: {
      when_to_use: "When handling raw user input or environmental data.",
      typical_position: "Start of flow.",
      red_flags: ["Ignoring noise", "Assuming structured input"]
    }
  },
  {
    id: "layer_internal",
    name: "Internal",
    slug: "Reasoning",
    role: "Reasoning & Deciding",
    description: "The cognitive processing and business logic application.",
    color: "#3D6B8F",
    guidance: {
      when_to_use: "For complex decision making or analysis.",
      typical_position: "Middle of flow.",
      red_flags: ["Black box logic", "Undefined confidence thresholds"]
    }
  },
  {
    id: "layer_outbound",
    name: "Outbound",
    slug: "Expressing",
    role: "Expressing & Creating",
    description: "Generating outputs and presenting them to the user.",
    color: "#8F3D3D",
    guidance: {
      when_to_use: "When presenting results.",
      typical_position: "End of flow.",
      red_flags: ["Overwhelming detail", "Hallucinations"]
    }
  },
  {
    id: "layer_interactive",
    name: "Interactive",
    slug: "Learning",
    role: "Acting & Learning",
    description: "Feedback loops, continuous improvement, and environmental interaction.",
    color: "#8F6E3D",
    guidance: {
      when_to_use: "For systems that adapt over time or act in environments.",
      typical_position: "Continuous loop.",
      red_flags: ["Feedback ignoring", "Model drift", "Unsafe actions"]
    }
  }
];

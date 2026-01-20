
import { TouchpointDefinition } from '../types';

export const TOUCHPOINTS: TouchpointDefinition[] = [
  // ===================================
  // SCREEN INTERFACE
  // ===================================
  { 
    id: "tp_mobile", 
    name: "Mobile App", 
    category: "screen_interface",
    icon: "smartphone", 
    description: "Native iOS/Android application.", 
    examples: ["Consumer apps", "Field tools"] 
  },
  { 
    id: "tp_web", 
    name: "Web Dashboard", 
    category: "screen_interface",
    icon: "layout", 
    description: "Desktop or responsive web interface.", 
    examples: ["SaaS portal", "Admin panel"] 
  },
  { 
    id: "tp_embedded", 
    name: "Embedded Widget", 
    category: "screen_interface",
    icon: "square-code",
    description: "Embeddable component in 3rd party sites or apps.",
    examples: ["Chatbot widget", "Form assistant", "Intercom popup"]
  },
  { 
    id: "tp_kiosk", 
    name: "Physical Kiosk", 
    category: "screen_interface",
    icon: "monitor", 
    description: "Public facing shared device.", 
    examples: ["Airport check-in", "Retail point of sale"] 
  },
  { 
    id: "tp_wearable", 
    name: "Smartwatch", 
    category: "screen_interface",
    icon: "watch", 
    description: "Small screen personal device.", 
    examples: ["Apple Watch", "Fitbit", "Garmin"] 
  },

  // ===================================
  // CONVERSATIONAL
  // ===================================
  { 
    id: "tp_chat", 
    name: "Chat Interface", 
    category: "conversational",
    icon: "message-circle", 
    description: "Conversational UI in messaging apps.", 
    examples: ["Slack", "Teams", "WhatsApp", "Discord"] 
  },
  { 
    id: "tp_sms", 
    name: "SMS / Text", 
    category: "conversational",
    icon: "message-square",
    description: "Plain text messaging via cellular network.",
    examples: ["SMS chatbot", "2FA codes", "Text alerts"]
  },
  {
    id: "tp_email",
    name: "Email",
    category: "conversational",
    icon: "mail",
    description: "Asynchronous communication channel.",
    examples: ["Reports", "Alerts", "Newsletters"]
  },
  {
    id: "tp_avatar",
    name: "Avatar/Character",
    category: "conversational",
    icon: "user-circle",
    description: "Embodied representation with personality - 2D avatar or 3D character for anthropomorphic interaction.",
    examples: ["Chatbot avatar", "Virtual assistant persona", "Game NPC", "VR avatar", "Metaverse character", "Training simulator instructor", "Brand mascot"]
  },

  // ===================================
  // VOICE & AUDIO
  // ===================================
  { 
    id: "tp_voice", 
    name: "Voice Interface", 
    category: "voice_audio",
    icon: "mic", 
    description: "Audio-only or multimodal voice interaction.", 
    examples: ["Smart Speaker", "Phone Line", "Alexa"] 
  },
  { 
    id: "tp_spatial_audio", 
    name: "Spatial Audio", 
    category: "voice_audio",
    icon: "audio-lines",
    description: "3D positioned audio interface without visual component.",
    examples: ["Spatial AirPods", "3D audio guides", "Directional voice"]
  },

  // ===================================
  // SPATIAL COMPUTING
  // ===================================
  { 
    id: "tp_vr", 
    name: "VR Headset", 
    category: "spatial_computing",
    icon: "headphones",
    description: "Fully immersive virtual reality experience with hand/controller input.",
    examples: ["Meta Quest", "PSVR", "Training simulator"]
  },
  { 
    id: "tp_ar_passthrough", 
    name: "Mixed Reality", 
    category: "spatial_computing",
    icon: "scan",
    description: "Digital content overlaid on passthrough video of physical world.",
    examples: ["Apple Vision Pro", "Meta Quest 3", "Spatial apps"]
  },
  { 
    id: "tp_ar_optical", 
    name: "AR Glasses", 
    category: "spatial_computing",
    icon: "glasses",
    description: "See-through optical display overlaying lightweight digital content.",
    examples: ["Future Apple Glasses", "Snap Spectacles", "Smart glasses"]
  },
  { 
    id: "tp_mobile_ar", 
    name: "Mobile AR", 
    category: "spatial_computing",
    icon: "scan-line",
    description: "Augmented reality through smartphone or tablet camera.",
    examples: ["IKEA Place", "Google Lens", "Pokémon GO"]
  },

  // ===================================
  // TECHNICAL
  // ===================================
  { 
    id: "tp_api", 
    name: "Public API", 
    category: "technical",
    icon: "globe", 
    description: "Programmatic interface for 3rd party devs.", 
    examples: ["REST Endpoint", "GraphQL", "SDK"] 
  },
  { 
    id: "tp_cli", 
    name: "CLI / Terminal", 
    category: "technical",
    icon: "terminal", 
    description: "Command line interface for technical users.", 
    examples: ["Dev tools", "Server admin", "Scripts"] 
  },
  { 
    id: "tp_doc", 
    name: "Document / Report", 
    category: "technical",
    icon: "file-text", 
    description: "Static file output.", 
    examples: ["PDF Report", "Excel Sheet", "CSV Export"] 
  },

  // ===================================
  // PHYSICAL DEVICES
  // ===================================
  { 
    id: "tp_iot_sensor", 
    name: "IoT Sensor/Actuator", 
    category: "physical_devices",
    icon: "radio", 
    description: "Connected sensor or actuator with physical effects.", 
    examples: ["Smart thermostat", "Smart lock", "Connected lights"] 
  },
  { 
    id: "tp_robot", 
    name: "Robot", 
    category: "physical_devices",
    icon: "bot", 
    description: "Autonomous or semi-autonomous physical system.", 
    examples: ["Warehouse robot", "Delivery drone", "Assembly robot"] 
  },
  { 
    id: "tp_appliance", 
    name: "Smart Appliance", 
    category: "physical_devices",
    icon: "plug", 
    description: "Connected home or industrial appliance.", 
    examples: ["Smart oven", "HVAC system", "Manufacturing equipment"] 
  },
  { 
    id: "tp_vehicle", 
    name: "Vehicle Interface", 
    category: "physical_devices",
    icon: "car", 
    description: "In-vehicle system or autonomous vehicle.", 
    examples: ["Tesla Autopilot", "Car infotainment", "Fleet management"] 
  },
  { 
    id: "tp_haptic", 
    name: "Haptic Device", 
    category: "physical_devices",
    icon: "vibrate", 
    description: "Touch feedback or force-based interface.", 
    examples: ["VR haptic gloves", "Game controller rumble", "Braille display"] 
  },
  { 
    id: "tp_ambient", 
    name: "Ambient Display", 
    category: "physical_devices",
    icon: "lightbulb", 
    description: "Environmental information display without active interaction.", 
    examples: ["Smart mirror", "LED status strip", "Philips Hue scenes"] 
  },
  {
    id: "tp_touchscreen",
    name: "Interactive Touchscreen",
    category: "physical_devices",
    icon: "tablet",
    description: "Fixed or mounted touchscreen for direct manipulation.",
    examples: ["Wall-mounted tablet", "Digital signage", "Interactive table", "Retail display"]
  },

  // ===================================
  // 3D ENVIRONMENTS
  // ===================================
  {
    id: "tp_3d_space",
    name: "3D Space",
    category: "spatial_computing",
    icon: "box",
    description: "Navigable real-time 3D environment with physics and spatial interaction.",
    examples: ["Video games", "Virtual showrooms", "3D design tools", "Virtual tours", "Training simulations"]
  },
  {
    id: "tp_game_controller",
    name: "Game Controller",
    category: "physical_devices",
    icon: "gamepad",
    description: "Physical controller with buttons, triggers, joysticks, and haptic feedback.",
    examples: ["Console controller", "PC gamepad", "Flight stick", "Racing wheel", "Adaptive controller"]
  },
  {
    id: "tp_overlay_hud",
    name: "Overlay HUD",
    category: "screen_interface",
    icon: "crosshair",
    description: "Non-intrusive overlay UI displaying contextual information without blocking main view.",
    examples: ["Gaming HUD", "Car dashboard overlay", "AR glasses UI", "Pilot instruments", "Sports analytics overlay"]
  },

  // ===================================
  // DIGITAL CONTROLS
  // ===================================
  {
    id: "tp_text_input",
    name: "Text Input Field",
    category: "screen_interface",
    icon: "form-input",
    description: "Text entry field for typing information - single line, multi-line, or specialized formats.",
    examples: ["Login forms", "Search bars", "Comment boxes", "Chat input", "Password fields", "Text areas"]
  },
  {
    id: "tp_button",
    name: "Button",
    category: "screen_interface",
    icon: "mouse-pointer",
    description: "Clickable element that triggers an action when pressed.",
    examples: ["Submit button", "Cancel", "Save", "Delete", "CTA buttons", "Icon buttons", "Links as buttons"]
  },
  {
    id: "tp_selection_control",
    name: "Selection Control",
    category: "screen_interface",
    icon: "check-square",
    description: "UI for choosing one or more options from a set - dropdowns, checkboxes, radio buttons, toggles.",
    examples: ["Settings toggles", "Form dropdowns", "Checkboxes", "Radio buttons", "Multi-select", "Filter controls"]
  },
  {
    id: "tp_slider",
    name: "Slider/Dial",
    category: "screen_interface",
    icon: "sliders",
    description: "Continuous value adjustment control - sliding, dialing, or stepping through a range.",
    examples: ["Volume control", "Brightness slider", "Zoom level", "Video scrubber", "Price range", "Rating stars"]
  },
  {
    id: "tp_file_picker",
    name: "File Picker",
    category: "screen_interface",
    icon: "upload",
    description: "Control for selecting files from device storage or capturing media.",
    examples: ["Photo upload", "Document attachment", "Profile picture", "Drag-drop zone", "Camera capture"]
  },
  {
    id: "tp_link",
    name: "Link/Hyperlink",
    category: "screen_interface",
    icon: "link",
    description: "Clickable text or element that navigates to another page, section, or resource.",
    examples: ["Text links", "Navigation menus", "Breadcrumbs", "Anchor links", "External links", "Deep links"]
  },
  {
    id: "tp_drag_drop",
    name: "Drag & Drop Zone",
    category: "screen_interface",
    icon: "move",
    description: "Interactive area for dragging and dropping elements to reorder, organize, or upload.",
    examples: ["Kanban boards", "File upload zones", "List reordering", "Dashboard widgets", "Image galleries"]
  },
];

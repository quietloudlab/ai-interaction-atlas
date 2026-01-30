/**
 * Generate meta data and inject into edge function
 * This script reads all pattern data and inlines it into the edge function
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Helper to extract task data from TypeScript files
function extractTasks(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const items = [];

  // Match each top-level object in the array
  const objectRegex = /\{\s*\n\s*id:\s*["']([^"']+)["'],\s*\n\s*layer_id:[^,]+,\s*\n\s*name:\s*["']([^"']+)["'],[\s\S]*?elevator_pitch:\s*["']([^"']+)["']/g;

  let match;
  while ((match = objectRegex.exec(content)) !== null) {
    items.push({
      id: match[1],
      name: match[2],
      description: match[3]
    });
  }

  return items;
}

// Helper to extract layer data
function extractLayers(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const items = [];

  const objectRegex = /\{\s*\n\s*id:\s*["']([^"']+)["'],\s*\n\s*name:\s*["']([^"']+)["'],[\s\S]*?description:\s*\n?\s*["']([^"']+)["']/g;

  let match;
  while ((match = objectRegex.exec(content)) !== null) {
    items.push({
      id: match[1],
      name: match[2],
      description: match[3]
    });
  }

  return items;
}

// Read all data files
console.log('Reading data files...');
const aiTasks = extractTasks(join(rootDir, 'data/ai_tasks.ts'));
console.log(`  - AI tasks: ${aiTasks.length}`);

const humanTasks = extractTasks(join(rootDir, 'data/human_tasks.ts'));
console.log(`  - Human tasks: ${humanTasks.length}`);

const systemTasks = extractTasks(join(rootDir, 'data/system_tasks.ts'));
console.log(`  - System tasks: ${systemTasks.length}`);

const layers = extractLayers(join(rootDir, 'data/layers.ts'));
console.log(`  - Layers: ${layers.length}`);

// Build the meta data lookup
const metaData = {
  tasks: {},
  layers: {},
  pages: {
    '/': {
      title: 'AI Interaction Atlas - Open Source AI UX Reference',
      description: 'Comprehensive reference for designing AI experiences. 100+ patterns, visual examples, and reusable components for AI UX designers and product teams.'
    },
    '/atlas': {
      title: 'Atlas Overview - AI Interaction Atlas',
      description: 'Explore the complete taxonomy of AI interaction patterns. Browse by task type, layer, or capability.'
    },
    '/atlas/ai': {
      title: 'AI Tasks - AI Interaction Atlas',
      description: 'AI-driven tasks including detection, generation, classification, and more. Explore patterns for machine learning capabilities.'
    },
    '/atlas/human': {
      title: 'Human Actions - AI Interaction Atlas',
      description: 'Human-initiated actions in AI systems. Patterns for input, review, feedback, and human-in-the-loop workflows.'
    },
    '/atlas/system': {
      title: 'System Operations - AI Interaction Atlas',
      description: 'System-level operations including data management, APIs, notifications, and infrastructure patterns.'
    },
    '/atlas/data': {
      title: 'Data Types - AI Interaction Atlas',
      description: 'Data artifacts that flow through AI systems. Understand inputs, outputs, and intermediate data structures.'
    },
    '/atlas/constraints': {
      title: 'Constraints - AI Interaction Atlas',
      description: 'Design constraints that shape AI interactions. Privacy, latency, accuracy, and other considerations.'
    },
    '/atlas/touchpoints': {
      title: 'Touchpoints - AI Interaction Atlas',
      description: 'Interface touchpoints where humans and AI systems interact. Screens, voice, APIs, and more.'
    },
    '/atlas/reference': {
      title: 'Quick Reference - AI Interaction Atlas',
      description: 'Quick reference guide for AI interaction patterns. At-a-glance summaries and navigation.'
    },
    '/privacy': {
      title: 'Privacy Policy - AI Interaction Atlas',
      description: 'Privacy policy for the AI Interaction Atlas website.'
    },
    '/terms': {
      title: 'Terms of Service - AI Interaction Atlas',
      description: 'Terms of service for the AI Interaction Atlas website.'
    }
  }
};

// Add all tasks
[...aiTasks, ...humanTasks, ...systemTasks].forEach(task => {
  metaData.tasks[task.id] = {
    title: `${task.name} - AI Interaction Atlas`,
    description: task.description
  };
});

// Add all layers
layers.forEach(layer => {
  metaData.layers[layer.id] = {
    title: `${layer.name} Layer - AI Interaction Atlas`,
    description: layer.description
  };
});

// Ensure output directory exists
mkdirSync(join(rootDir, 'netlify/edge-functions'), { recursive: true });

// Read the edge function template
const edgeFunctionPath = join(rootDir, 'netlify/edge-functions/inject-meta.ts');
let edgeFunctionContent = readFileSync(edgeFunctionPath, 'utf-8');

// Replace the placeholder with actual data
const jsonString = JSON.stringify(metaData);
edgeFunctionContent = edgeFunctionContent.replace(
  /JSON\.parse\(`INJECT_META_DATA_HERE`\)/,
  `JSON.parse(\`${jsonString.replace(/\\/g, '\\\\').replace(/`/g, '\\`')}\`)`
);

// Also replace if it was already injected (for re-runs)
edgeFunctionContent = edgeFunctionContent.replace(
  /JSON\.parse\(`\{[^`]+\}`\)/,
  `JSON.parse(\`${jsonString.replace(/\\/g, '\\\\').replace(/`/g, '\\`')}\`)`
);

// Write the updated edge function
writeFileSync(edgeFunctionPath, edgeFunctionContent);

console.log('\n✓ Injected meta data into edge function');
console.log(`  - ${Object.keys(metaData.tasks).length} tasks`);
console.log(`  - ${Object.keys(metaData.layers).length} layers`);
console.log(`  - ${Object.keys(metaData.pages).length} static pages`);

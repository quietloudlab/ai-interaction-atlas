# AI Interaction Atlas

[![npm version](https://img.shields.io/npm/v/@quietloudlab/ai-interaction-atlas)](https://www.npmjs.com/package/@quietloudlab/ai-interaction-atlas)
[![License](https://img.shields.io/npm/l/@quietloudlab/ai-interaction-atlas)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

A shared language for designing AI experiences across human actions, AI tasks, system operations, data, constraints, and touchpoints.

**100+ interaction patterns** organized into **6 system dimensions** to help you design inspectable, responsible AI systems.

🌐 [**Explore the Atlas**](https://ai-interaction.com) | 📖 [**Documentation**](https://ai-interaction.com/rationale) | 🐙 [**GitHub**](https://github.com/quietloudlab/ai-interaction-atlas)

---

## Why Use This Package?

The AI Interaction Atlas provides structured data for:

- 🤖 **Building AI coding assistants** that understand interaction design patterns
- 🛠️ **Creating design tools** that reference the taxonomy
- 📊 **Validating AI workflows** against established patterns
- 🔍 **Searching patterns programmatically** by keyword or dimension
- 📝 **Generating documentation** from interaction flows
- 🧪 **Training and education** with structured AI design patterns

---

## Installation

```bash
npm install @quietloudlab/ai-interaction-atlas
```

```bash
yarn add @quietloudlab/ai-interaction-atlas
```

```bash
pnpm add @quietloudlab/ai-interaction-atlas
```

---

## Quick Start

```typescript
import {
  AI_TASKS,
  HUMAN_TASKS,
  SYSTEM_TASKS,
  searchPatterns,
  getPattern,
  getAtlasStats
} from '@quietloudlab/ai-interaction-atlas';

// Get all AI capabilities
console.log(`${AI_TASKS.length} AI task patterns available`);

// Search for patterns
const reviewPatterns = searchPatterns('review', { dimensions: ['human'] });
console.log(reviewPatterns);

// Get a specific pattern by ID
const classifyTask = getPattern('classify-intent');
console.log(classifyTask?.description);

// Get Atlas statistics
const stats = getAtlasStats();
console.log(`Total patterns: ${stats.total}`);
```

---

## The Six Dimensions

The Atlas organizes AI interactions into six core dimensions:

| Dimension | Description | Count |
|-----------|-------------|-------|
| **AI Tasks** | Probabilistic capabilities (detect, classify, generate, transform) | 45+ |
| **Human Tasks** | Human actions in the loop (review, approve, configure, decide) | 28+ |
| **System Tasks** | Infrastructure operations (routing, caching, logging, state) | 31+ |
| **Data Artifacts** | Information types that flow through the system | 52+ |
| **Constraints** | Boundaries that shape design (latency, privacy, cost, quality) | 42+ |
| **Touchpoints** | Where interactions happen (UI, API, voice, AR) | 18+ |

---

## Core Exports

### Data Collections

```typescript
import {
  AI_TASKS,           // Array of AI capability patterns
  HUMAN_TASKS,        // Array of human action patterns
  SYSTEM_TASKS,       // Array of system operation patterns
  DATA_ARTIFACTS,     // Array of data type definitions
  CONSTRAINTS,        // Array of constraint definitions
  TOUCHPOINTS,        // Array of touchpoint definitions
  LAYERS,             // Array of processing layer definitions
  WORKFLOW_TEMPLATES, // Array of pre-built workflow templates
  EXAMPLES,           // Array of real-world examples
  ATLAS_DATA          // All data in one object
} from '@quietloudlab/ai-interaction-atlas';
```

### Types

```typescript
import type {
  AiTask,
  HumanTask,
  SystemTask,
  DataArtifactDefinition,
  ConstraintDefinition,
  TouchpointDefinition,
  Layer,
  WorkflowTemplate,
  AtlasData
} from '@quietloudlab/ai-interaction-atlas';
```

---

## API Reference

### Search Functions

#### `searchPatterns(query, options?)`

Search across all Atlas patterns by keyword.

```typescript
import { searchPatterns } from '@quietloudlab/ai-interaction-atlas';

// Search all dimensions
const results = searchPatterns('review');

// Search specific dimensions
const humanResults = searchPatterns('review', {
  dimensions: ['human']
});

// Case-sensitive search
const exactMatches = searchPatterns('API', {
  caseSensitive: true
});

// Limit results
const topResults = searchPatterns('generate', {
  dimensions: ['ai'],
  limit: 5
});
```

**Options:**
- `dimensions?: Array<'ai' | 'human' | 'system' | 'data' | 'constraints' | 'touchpoints'>` - Dimensions to search (default: all)
- `caseSensitive?: boolean` - Case sensitive search (default: false)
- `searchDescription?: boolean` - Search in description field (default: true)
- `limit?: number` - Limit number of results (default: no limit)

---

#### `getPattern(id)`

Get a specific pattern by ID (slug or target_id).

```typescript
import { getPattern } from '@quietloudlab/ai-interaction-atlas';

const task = getPattern('classify-intent');
const artifact = getPattern('embedding');
const constraint = getPattern('privacy-compliance');

if (task) {
  console.log(task.name);
  console.log(task.description);
  console.log(task.inputs);
  console.log(task.outputs);
}
```

---

#### `getPatternsByDimension(dimension)`

Get all patterns from a specific dimension.

```typescript
import { getPatternsByDimension } from '@quietloudlab/ai-interaction-atlas';

const aiTasks = getPatternsByDimension('ai');
const constraints = getPatternsByDimension('constraints');
```

---

### Filter Functions

#### `filterByLayer(tasks, layerId)`

Filter tasks by processing layer.

```typescript
import { AI_TASKS, filterByLayer } from '@quietloudlab/ai-interaction-atlas';

const inboundTasks = filterByLayer(AI_TASKS, 'layer_inbound');
const internalTasks = filterByLayer(AI_TASKS, 'layer_internal');
```

---

#### `getTasksByLayer(layerId)`

Get all tasks (AI, Human, System) in a specific layer.

```typescript
import { getTasksByLayer } from '@quietloudlab/ai-interaction-atlas';

const inbound = getTasksByLayer('layer_inbound');
console.log(inbound.ai);     // AI tasks in inbound layer
console.log(inbound.human);  // Human tasks in inbound layer
console.log(inbound.system); // System tasks in inbound layer
```

---

#### `filterArtifactsByCategory(category)`

Filter data artifacts by category.

```typescript
import { filterArtifactsByCategory } from '@quietloudlab/ai-interaction-atlas';

const textArtifacts = filterArtifactsByCategory('text');
const visualArtifacts = filterArtifactsByCategory('visual');
```

---

#### `getAtlasStats()`

Get statistics about the Atlas.

```typescript
import { getAtlasStats } from '@quietloudlab/ai-interaction-atlas';

const stats = getAtlasStats();
console.log(stats);
// {
//   ai: 45,
//   human: 28,
//   system: 31,
//   data: 52,
//   constraints: 42,
//   touchpoints: 18,
//   layers: 4,
//   total: 216
// }
```

---

### Validation Functions

#### `isValidTaskId(taskId)`

Check if a task ID exists in the Atlas.

```typescript
import { isValidTaskId } from '@quietloudlab/ai-interaction-atlas';

if (isValidTaskId('ai_classify_intent')) {
  console.log('Valid task!');
}
```

---

#### `validateWorkflow(nodeIds)`

Validate a workflow design.

```typescript
import { validateWorkflow } from '@quietloudlab/ai-interaction-atlas';

const result = validateWorkflow([
  'ai_classify_intent',
  'human_review_output',
  'system_log_event'
]);

if (!result.valid) {
  console.error('Invalid IDs:', result.invalidIds);
}
```

---

#### Type Guards

```typescript
import { isAiTask, isHumanTask, isSystemTask } from '@quietloudlab/ai-interaction-atlas';

if (isAiTask(someTask)) {
  // TypeScript knows this is an AiTask
  console.log(someTask.layer);
}
```

---

## Real-World Use Cases

### 1. LLM System Prompt

Include Atlas patterns in your AI assistant's context:

```typescript
import { AI_TASKS, HUMAN_TASKS } from '@quietloudlab/ai-interaction-atlas';

const systemPrompt = `
You are an AI workflow designer. Use these interaction patterns from the AI Interaction Atlas:

AI Capabilities:
${AI_TASKS.map(t => `- ${t.name}: ${t.description}`).join('\n')}

Human Actions:
${HUMAN_TASKS.map(t => `- ${t.name}: ${t.description}`).join('\n')}

Design workflows that combine these patterns effectively.
`;
```

---

### 2. Validate Workflow Designs

Ensure workflows use valid patterns:

```typescript
import { validateWorkflow, getPattern } from '@quietloudlab/ai-interaction-atlas';

function analyzeWorkflow(nodeIds: string[]) {
  const validation = validateWorkflow(nodeIds);

  if (!validation.valid) {
    console.error('Invalid patterns:', validation.invalidIds);
    return false;
  }

  // Analyze each node
  nodeIds.forEach(id => {
    const pattern = getPattern(id);
    console.log(`✓ ${pattern?.name}`);
  });

  return true;
}
```

---

### 3. Generate Documentation

Auto-generate workflow documentation:

```typescript
import { getPattern } from '@quietloudlab/ai-interaction-atlas';

function documentWorkflow(nodeIds: string[]) {
  const docs = nodeIds.map(id => {
    const pattern = getPattern(id);
    if (!pattern) return null;

    return {
      name: pattern.name,
      description: pattern.description,
      inputs: pattern.inputs,
      outputs: pattern.outputs
    };
  }).filter(Boolean);

  return docs;
}
```

---

### 4. Build a Pattern Search Tool

Create a CLI tool for exploring patterns:

```typescript
import { searchPatterns, getAtlasStats } from '@quietloudlab/ai-interaction-atlas';

function searchCLI(query: string) {
  console.log('Searching Atlas...\n');

  const results = searchPatterns(query);

  console.log(`Found ${results.length} patterns:\n`);

  results.forEach(pattern => {
    console.log(`- ${pattern.name}`);
    console.log(`  ${pattern.description}\n`);
  });

  const stats = getAtlasStats();
  console.log(`\nAtlas contains ${stats.total} total patterns.`);
}
```

---

### 5. Filter by Constraint

Find patterns compatible with specific constraints:

```typescript
import {
  AI_TASKS,
  CONSTRAINTS,
  filterConstraintsByCategory
} from '@quietloudlab/ai-interaction-atlas';

// Get all privacy-related constraints
const privacyConstraints = filterConstraintsByCategory('Quality & Safety');

// Find AI tasks suitable for high-privacy scenarios
const privateTasks = AI_TASKS.filter(task => {
  // Your custom logic to check compatibility
  return task.description.toLowerCase().includes('privacy');
});
```

---

## TypeScript Support

This package is written in TypeScript and includes full type definitions.

```typescript
import type {
  AiTask,
  HumanTask,
  IOSpec,
  AtlasData
} from '@quietloudlab/ai-interaction-atlas';

function analyzeTask(task: AiTask) {
  // Full type safety and autocomplete
  const inputs: IOSpec | undefined = task.inputs;
  const outputs: IOSpec | undefined = task.outputs;
  const layer: string = task.layer;
}
```

---

## Bundle Size

- **~220KB** uncompressed
- **Tree-shakeable** - import only what you need
- **Zero dependencies** - pure data

---

## License

Apache 2.0 - see [LICENSE](LICENSE) file for details.

---

## About

Created by [Brandon Harwood](https://www.linkedin.com/in/brandon-harwood/) at [quietloudlab](https://quietloudlab.com), a design and research studio specializing in human-centered AI.

---

## Links

- 🌐 [Live Atlas](https://ai-interaction.com)
- 📖 [Rationale](https://ai-interaction.com/rationale)
- 🐙 [GitHub Repository](https://github.com/quietloudlab/ai-interaction-atlas)
- 🐛 [Report Issues](https://github.com/quietloudlab/ai-interaction-atlas/issues)

---

## Contributing

The Atlas is open source and contributions are welcome! See the main repository for contribution guidelines.

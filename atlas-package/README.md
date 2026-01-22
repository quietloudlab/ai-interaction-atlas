# AI Interaction Atlas

[![npm version](https://img.shields.io/npm/v/@quietloudlab/ai-interaction-atlas)](https://www.npmjs.com/package/@quietloudlab/ai-interaction-atlas)
[![License](https://img.shields.io/npm/l/@quietloudlab/ai-interaction-atlas)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

A shared language for designing **legible, inspectable AI systems**.

The AI Interaction Atlas is a structured taxonomy of interaction patterns used to design, reason about, and document human–AI systems. It focuses on *how systems behave*, *where agency lives*, and *what constraints shape outcomes* — not just models or UI.

**180 structured elements** across **6 system dimensions**, designed to make AI systems visible before they are built.

🌐 **Explore the Atlas:** https://ai-interaction.com  
🐙 **GitHub:** https://github.com/quietloudlab/ai-interaction-atlas  

---

## What This Package Is

This npm package provides the **Atlas data and utilities**:

- A curated, opinionated dataset of AI interaction patterns
- Strongly typed structures for tasks, data, constraints, and touchpoints
- Search, filtering, and validation utilities
- Zero dependencies, tree-shakeable, framework-agnostic

It is designed to be used:
- in code
- in prompts
- in documentation
- in tools built by you or the community

---

## What This Package Is *Not*

- ❌ Not an AI framework
- ❌ Not a UI kit
- ❌ Not an orchestration engine
- ❌ Not a visual editor

> **Note:**  
> A visual canvas for composing and mapping systems using the Atlas is being explored separately.  
> This package intentionally focuses on the **language layer**, not the tooling.

---

## Who This Is For

You may find the Atlas useful if you are:

- Designing AI-powered products or workflows
- Building internal tools or design systems for AI teams
- Creating AI assistants that reason about interaction patterns
- Documenting or auditing AI systems
- Teaching or learning applied AI system design

You do **not** need to be an ML engineer to use the Atlas.  
It encodes *design intent and system behavior*, not implementation details.

---

## Why Use the Atlas?

Most AI products are designed at the wrong level of abstraction.

Teams jump to:
> “Use an LLM”  
> “Add an agent”  
> “Automate this”

Instead of asking:
- Where does human judgment remain essential?
- Which decisions are probabilistic vs deterministic?
- What constraints govern safety, latency, or trust?
- Who is accountable when the system fails?

The Atlas provides a **shared vocabulary** to answer those questions *before* systems harden.

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

```ts
import {
  AI_TASKS,
  searchPatterns,
  getPattern,
  validateWorkflow,
  getAtlasStats
} from '@quietloudlab/ai-interaction-atlas';

// Inspect available AI capabilities
console.log(`${AI_TASKS.length} AI task patterns available`);

// Search patterns by keyword
const reviewPatterns = searchPatterns('review', { dimensions: ['human'] });

// Retrieve a specific pattern
const classifyIntent = getPattern('classify-intent');
console.log(classifyIntent?.description);

// Validate a proposed system workflow
const validation = validateWorkflow([
  'ai_classify_intent',
  'human_review_output',
  'system_log_event'
]);

if (!validation.valid) {
  console.error('Invalid pattern IDs:', validation.invalidIds);
}

// Get Atlas statistics
console.log(getAtlasStats());
```

---

## The Six System Dimensions

The Atlas models AI systems as compositions of six dimensions:

| Dimension | Description |
|---------|-------------|
| **AI Patterns** | Probabilistic capabilities (detect, classify, generate, transform) |
| **Human Actions** | Where human agency lives (review, approve, decide, configure) |
| **System Operations** | Deterministic infrastructure behavior (routing, caching, logging) |
| **Data Artifacts** | Inputs, outputs, and contextual information |
| **Constraints** | Boundaries that shape behavior (latency, privacy, accuracy, cost) |
| **Touchpoints** | Where systems surface (UI, API, voice, notifications) |

---

## Core Exports

### Data Collections

```ts
import {
  AI_TASKS,
  HUMAN_TASKS,
  SYSTEM_TASKS,
  DATA_ARTIFACTS,
  CONSTRAINTS,
  TOUCHPOINTS,
  LAYERS,
  WORKFLOW_TEMPLATES,
  EXAMPLES,
  ATLAS_DATA
} from '@quietloudlab/ai-interaction-atlas';
```

### Types

```ts
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

## API Overview

### `searchPatterns(query, options?)`
Search across all Atlas elements by keyword.

```ts
searchPatterns('review', { dimensions: ['human'], limit: 5 });
```

### `getPattern(id)`
Retrieve a single pattern by ID (slug or target_id).

```ts
getPattern('privacy-compliance');
```

### `getPatternsByDimension(dimension)`
Retrieve all patterns from one dimension.

```ts
getPatternsByDimension('constraints');
```

### `validateWorkflow(nodeIds)`
Validate that a workflow uses valid Atlas elements.

```ts
validateWorkflow([
  'ai_generate_text',
  'human_review_output',
  'system_store_result'
]);
```

---

## Real-World Uses

- **Design audits:** Map an existing AI product to surface risks and gaps
- **System prompts:** Ground AI assistants in real interaction patterns
- **Documentation:** Generate inspectable system diagrams and specs
- **Tooling:** Build search, validation, or mapping tools on top of the Atlas
- **Education:** Teach applied AI system design with concrete language

---

## TypeScript Support

Written in TypeScript with full type definitions.

```ts
function analyzeTask(task: AiTask) {
  console.log(task.layer);
  console.log(task.inputs);
  console.log(task.outputs);
}
```

---

## Bundle & Dependencies

- ~220KB uncompressed
- Tree-shakeable
- Zero runtime dependencies
- Pure data + utilities

---

## License

Apache 2.0 — free to use, modify, and integrate commercially.  
See [LICENSE](LICENSE) for details.

---

## About

Created by **Brandon Harwood** at **quietloudlab** —  
a design and research studio focused on human-centered AI, system legibility, and responsible interaction design.

- 🌐 https://quietloudlab.com
- 🌐 https://ai-interaction.com

---

## Contributing

The Atlas is open source and evolving.

Contributions, issues, and discussions are welcome — especially around:
- new patterns
- clearer definitions
- real-world examples
- missing constraints

See the GitHub repository for contribution guidelines.

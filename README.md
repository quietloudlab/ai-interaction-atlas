# AI Interaction Atlas

[![Apache 2.0 License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://ai-interaction.com)
[![GitHub](https://img.shields.io/github/stars/quietloudlab/ai-interaction-atlas?style=social)](https://github.com/quietloudlab/ai-interaction-atlas)

A shared language for designing AI experiences across human actions, AI tasks, system operations, data, constraints, and touchpoints.

## What is the Atlas?

The AI Interaction Atlas is an open-source taxonomy for AI interaction design. It provides a vocabulary for mapping roles, responsibilities, and decision points in AI systems—helping teams move beyond "User → Model → Output" and reason about complex, multi-step AI experiences.

### What it is

- An open-source taxonomy for AI interaction design
- A vocabulary for mapping roles, responsibilities, and decision points
- A way to reason about AI systems beyond "User → Model → Output"

### What it is not

- Not a UI framework
- Not a canvas tool (yet)
- Not prescriptive about solutions
- Not tied to a single model or vendor

## The Atlas Structure

The Atlas organizes AI interactions into six core dimensions:

- **AI Tasks** — What capabilities AI provides (classify, generate, verify, transform)
- **Human Tasks** — What people do in the loop (review, approve, edit, compare)
- **System Tasks** — What infrastructure handles (routing, logging, state management)
- **Data Artifacts** — What information flows between tasks
- **Constraints** — What boundaries shape the design (latency, privacy, cost, accuracy)
- **Touchpoints** — Where interactions happen (UI, API, notifications, integrations)

## Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn/pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/quietloudlab/ai-interaction-atlas.git
cd ai-interaction-atlas

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the Atlas locally.

### Building for Production

```bash
npm run build
npm run preview
```

## Contributing

Contributions are welcome! The Atlas is incomplete and will always be incomplete—AI interaction design is still forming as a discipline.

Having _some_ shared vocabulary is better than having none. If you have patterns, examples, or improvements to suggest:

1. Fork this repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Apache License 2.0 - see [LICENSE](LICENSE) file for details.

This project is licensed under the Apache License, Version 2.0, which provides explicit patent grants and trademark protection.

## About

Created by [Brandon Harwood](https://www.linkedin.com/in/brandon-harwood/) at [quietloudlab](https://quietloudlab.com), a design and research studio specializing in human-centered AI.

## Learn More

- [Read the rationale](https://ai-interaction.com/rationale) - Why the Atlas exists
- [Browse the Atlas](https://ai-interaction.com/atlas) - Explore the full taxonomy
- [View on GitHub](https://github.com/quietloudlab/ai-interaction-atlas) - Contribute to the project

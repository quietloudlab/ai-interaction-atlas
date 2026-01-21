# Contributing to AI Interaction Atlas

Thank you for your interest in contributing to the AI Interaction Atlas! This project aims to create a shared vocabulary for designing AI experiences, and we welcome contributions from the community.

## How to Contribute

### Suggesting New Patterns

The Atlas is incomplete by design—AI interaction design is still forming as a discipline. If you have patterns, examples, or improvements to suggest:

1. **Check existing issues** - See if someone else has already suggested something similar
2. **Open an issue** - Use the "Pattern Suggestion" template to describe your proposed pattern
3. **Discuss** - Engage with maintainers and the community to refine the pattern
4. **Submit a PR** - Once the pattern is refined, submit a pull request

### Reporting Bugs

If you find a bug in the website or documentation:

1. **Check existing issues** - See if the bug has already been reported
2. **Open an issue** - Use the "Bug Report" template with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs. actual behavior
   - Screenshots if applicable

### Suggesting Features

Have an idea for improving the Atlas?

1. **Open an issue** - Use the "Feature Request" template
2. **Describe the use case** - Explain what problem this solves
3. **Discuss alternatives** - What other approaches did you consider?

## Development Setup

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/ai-interaction-atlas.git
cd ai-interaction-atlas

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your changes.

### Making Changes

1. **Create a branch** - `git checkout -b feature/your-feature-name`
2. **Make your changes** - Edit files and test locally
3. **Test your changes** - Run `npm run build` to ensure production builds work
4. **Commit your changes** - Use clear, descriptive commit messages
5. **Push to your fork** - `git push origin feature/your-feature-name`
6. **Open a Pull Request** - Describe what you changed and why

## Project Structure

```
/data/              # Atlas taxonomy data (tasks, constraints, touchpoints, etc.)
/features/          # Feature-based React components (atlas, marketing, etc.)
/components/        # Shared React components
/src/               # Assets (images, etc.)
/types.ts           # TypeScript type definitions
```

## Adding New Patterns

Patterns are defined in `/data/` as TypeScript files:

- **AI Tasks** - `/data/ai_tasks.ts`
- **Human Tasks** - `/data/human_tasks.ts`
- **System Tasks** - `/data/system_tasks.ts`
- **Data Artifacts** - `/data/artifacts.ts`
- **Constraints** - `/data/constraints.ts`
- **Touchpoints** - `/data/touchpoints.ts`

Follow the existing structure and TypeScript types when adding new patterns.

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting (Prettier/ESLint config)
- Keep components focused and single-purpose
- Add comments for complex logic
- Use descriptive variable and function names

## Pull Request Guidelines

- Keep PRs focused - one feature/fix per PR
- Write clear PR descriptions explaining what and why
- Reference related issues (e.g., "Closes #123")
- Be responsive to feedback and questions
- Ensure the build passes before requesting review

## Community Guidelines

- Be respectful and inclusive
- Assume good intent
- Provide constructive feedback
- Help others learn and grow
- Keep discussions focused and on-topic

## Questions?

If you have questions about contributing:

- Open a [GitHub Discussion](https://github.com/quietloudlab/ai-interaction-atlas/discussions)
- Email: brandon@quietloudlab.com

## License

By contributing to the AI Interaction Atlas, you agree that your contributions will be licensed under the Apache License 2.0.

---

**Thank you for helping build a shared language for AI interaction design!** 🗺️

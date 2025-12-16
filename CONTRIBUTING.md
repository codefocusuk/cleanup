# Contributing to @codefocus/clean

Thank you for your interest in contributing to @codefocus/clean! We welcome contributions from the community.

## Getting Started

### Prerequisites

- Node.js >= 14.0.0
- npm, pnpm, or yarn
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/clean.git
   cd clean
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the project:
   ```bash
   npm run build
   ```

## Development Workflow

### Running the Tool Locally

```bash
# Build and run
npm run build
node dist/bin/cleanup.js --help

# Or use the clean script
npm run cleanup -- --dry-run
```

### Watch Mode

For active development:

```bash
npm run dev
```

This will watch for changes and rebuild automatically.

### Type Checking

```bash
npm run lint
```

## Making Changes

### Branching Strategy

- Create a new branch for each feature or bugfix
- Use descriptive branch names (e.g., `feature/add-python-preset`, `fix/windows-path-issue`)

```bash
git checkout -b feature/your-feature-name
```

### Code Style

- Write TypeScript with strict type checking
- Follow the existing code organization:
  - Types in `src/lib/types.ts`
  - Constants in `src/lib/constants.ts`
  - Utilities in `src/lib/utils/`
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### Testing

Before submitting:

1. Test your changes manually
2. Ensure TypeScript compiles without errors: `npm run lint`
3. Test on multiple platforms if possible (Windows, macOS, Linux)

## Submitting Changes

### Pull Request Process

1. Update documentation if needed (README.md, ROADMAP.md)
2. Add your changes to CHANGELOG.md under "Unreleased"
3. Commit your changes with clear, descriptive messages:
   ```bash
   git commit -m "Add: Python preset support"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request on GitHub

### Pull Request Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Include examples of usage if adding features
- Be responsive to feedback and questions

## Commit Message Guidelines

We follow conventional commit format:

- `feat: Add new feature`
- `fix: Fix a bug`
- `docs: Documentation changes`
- `refactor: Code refactoring`
- `test: Add or update tests`
- `chore: Maintenance tasks`

Examples:
```
feat: Add size-based filtering option
fix: Resolve Windows path handling issue
docs: Update installation instructions
refactor: Simplify directory scanning logic
```

## Feature Requests

Have an idea? We'd love to hear it!

1. Check existing issues to avoid duplicates
2. Open a new issue with the "enhancement" label
3. Describe:
   - The problem you're trying to solve
   - Your proposed solution
   - Any alternatives you've considered

## Bug Reports

Found a bug? Please help us fix it!

1. Check if it's already reported
2. Open a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Your environment (OS, Node version, etc.)
   - Screenshots if applicable

## Questions?

- Open a discussion on GitHub
- Check existing issues and discussions
- Review the [ROADMAP.md](ROADMAP.md) for planned features

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the project and community

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to @codefocus/clean! 🎉

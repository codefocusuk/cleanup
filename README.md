# @codefocus/cleanup

[![npm version](https://img.shields.io/npm/v/@codefocus/clean.svg)](https://www.npmjs.com/package/@codefocus/clean)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@codefocus/clean@0.7.0)](https://bundlephobia.com/package/@codefocus/clean@0.7.0)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D14.0.0-green.svg)](https://nodejs.org/)
[![Coverage Status](https://coveralls.io/repos/github/codefocusuk/clean/badge.svg?branch=master)](https://coveralls.io/github/codefocusuk/clean?branch=master)

  **A zero-dependency CLI to safely clean build artifacts for Node.js projects.**

If you've ever run `rm -rf node_modules`, broken something, or maintained a pile of messy cleanup scripts — this replaces all of that with one safe command.

---

## Why this exists

Every project leaves behind junk:

- `node_modules`, `dist`, `.next`
- `bin/`, `obj/`, `.vs`
- `__pycache__`, `.pytest_cache`
- `target/`, `build/`, `vendor/`

Most developers clean these with:

- handwritten scripts
- `git clean -xfd` (not good)
- shell commands
- or muscle memory and hope

`@codefocus/cleanup` aims to give you a single, predictable, cross-platform command:

- **Safe by default** — nothing is deleted unless you confirm
- **Dry-run mode** — preview everything first
- **Node.js focused** — specifically designed for Node.js projects
- **Zero runtime dependencies**
- **Cross-platform** — macOS, Linux, Windows
- **CLI + TypeScript API**
- **Monorepo-friendly** — traverses sub-projects automatically

---

## Installation

Install as a dev dependency:

```bash
npm install -D @codefocus/cleanup
# or
yarn add -D @codefocus/cleanup
# or
pnpm add -D @codefocus/cleanup
```

After installing as a dev dependency, add a script to your project's `package.json` to run it with a simple command:

```json
{
  "scripts": {
    "clean": "cleanup --confirm"
  }
}
```

Then you can run:

```bash
npm run clean
```

---

## Basic usage

### Preview what would be deleted (recommended)

```bash
npx @codefocus/cleanup --dry-run
```

Nothing is deleted. You'll see a list of matched directories and files.

### Perform the cleanup

```bash
npx @codefocus/cleanup --confirm
```

The `--confirm` flag requires confirmation before deleting. Use `--dry-run` to preview or `--confirm` to proceed with deletion.

---

## What it cleans

`cleanup` removes common Node.js build artifacts and dependencies:

- `node_modules`
- `dist`
- `build`
- `.next`
- `.nuxt`
- `.vite`
- Coverage files (`.nyc_output`, `coverage`)
- Temporary files (`.tmp`, `temp`)

### Examples

Preview what would be deleted:

```bash
npx @codefocus/cleanup --dry-run
```

Perform the cleanup:

```bash
npx @codefocus/cleanup --confirm
```

---

## CLI options

| Flag | Description |
|------|-------------|
| `-d, --dry-run` | Show what would be deleted |
| `-c, --confirm` | Confirm before deleting (optional) |
| `-v, --verbose` | Detailed output |
| `-q, --quiet` | Minimal output |
| `-h, --help` | Help |
| `-V, --version` | Version |

---

## Programmatic usage

You can also use it as a library:

```typescript
import { clean } from '@codefocus/cleanup';

await clean({
  dryRun: true,
  verbose: true,
});
```

Full TypeScript type definitions included:

```typescript
import { CleanOptions, getCleanupTargets } from '@codefocus/cleanup';

const options: CleanOptions = {
  dryRun: true,
  verbose: true,
};

// Get all cleanup targets
const targets = getCleanupTargets();
```

---

## How is this different from…?

### `rm -rf node_modules`

- Easy to make mistakes
- Only solves one ecosystem
- No preview

### `git clean -xfd`

- Extremely destructive
- Deletes ignored but important files
- One typo away from regret

### `@codefocus/cleanup`

- Safe by default
- Preview first
- Node.js focused
- Designed for real projects

---

## Who is this for?

- Node.js developers
- Teams with Node.js monorepos
- Anyone who wants a repeatable, boring, safe cleanup
- CI pipelines that need a known-clean workspace

---

## How it works

1. **Discovery**: Finds all directories containing `package.json` files
2. **Target Cleanup**: Removes Node.js build artifacts and dependencies
3. **Reporting**: Provides a detailed summary of what was cleaned

The tool safely handles:
- Recursive directory traversal with configurable depth
- Cross-platform path handling (Windows, macOS, Linux)
- Dry-run mode for safe previewing
- User confirmation prompts for destructive operations

---

## Safety & Disclaimer

**USE AT YOUR OWN RISK!**

This tool permanently deletes files and directories from your filesystem. While it includes safety features like dry-run mode and confirmation prompts, **deleted files cannot be recovered**.

**Before using this tool:**
- Always run with `--dry-run` first to preview what will be deleted
- Ensure you have backups of important data
- Verify you're in the correct directory
- Use version control (git) to protect your source code
- Test in a non-critical environment first

**Important:**
- This tool is designed for cleaning build artifacts and caches, not source code
- The authors and contributors are not responsible for any data loss whatsoever
- This software is provided "AS IS" without warranty of any kind (see [LICENSE](LICENSE))

**Recommended workflow:**
```bash
# 1. Preview what will be deleted
npx @codefocus/cleanup --dry-run --verbose

# 2. If you're sure, run with confirmation
npx @codefocus/cleanup --confirm
```

---

## Philosophy

This tool intentionally avoids:

- plugins
- config files
- magic behaviour
- runtime dependencies

It aims to be:

- predictable
- transparent
- boring (the good kind)

---

## Development

This project is written in TypeScript and requires Node.js >= 14.0.0.

### Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Watch mode for development
npm run dev

# Run tests
npm test
```

### Project Structure

```
src/
├── bin/
│   └── clean.ts           # CLI entry point
└── lib/
    ├── cleaner.ts         # Main cleanup orchestration
    ├── constants.ts       # Node.js cleanup targets and excluded directories
    ├── types.ts           # TypeScript type definitions
    ├── index.ts           # Public API exports
    └── utils/
        ├── cleaner.ts     # Directory cleaning utilities
        ├── fs.ts          # Filesystem operations
        └── ui.ts          # User interface & prompts
```

The code is organized into focused modules:
- **types.ts** - All TypeScript interfaces and types
- **constants.ts** - Configuration constants (Node.js cleanup targets, exclusions)
- **utils/fs.ts** - Filesystem operations (finding directories, removing files)
- **utils/ui.ts** - User interface (prompts, output formatting)
- **utils/cleaner.ts** - Core cleaning logic
- **cleaner.ts** - Main orchestration and workflow

---

## Contributing

Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Issues and PRs are welcome for edge cases and safety improvements

### Quick Start for Contributors

```bash
# Clone the repository
git clone https://github.com/codefocusuk/cleanup.git
cd clean

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test
```

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and releases.

---

## Support

- [Documentation](https://github.com/codefocusuk/clean#readme)
- [Issue Tracker](https://github.com/codefocusuk/clean/issues)
- [Discussions](https://github.com/codefocusuk/clean/discussions)

---
## Supporting this project

`cleanup` is an open-source project. If you find it useful, the best ways to support it are:

- Report bugs or edge cases you run into
- Open a discussion with ideas or feedback

---

## License

MIT © [Codefocus](https://codefocus.co.uk)

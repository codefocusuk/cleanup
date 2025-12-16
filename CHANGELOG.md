# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Future releases will be documented here

### [0.7.21] - 2025-12-16
- **Documentation**: Expanded "Every project leaves behind junk:" section in README.md with comprehensive examples of cleanup targets
- **Documentation**: Added new "Customizing Cleanup Targets" section explaining how to modify source code and add custom cleanup targets

---

## [0.7.0] - 2025-12-16

### Added
- Initial public release of @codefocus/cleanup
- Zero-dependency CLI tool for cleaning Node.js build artifacts
- Safe cleanup with dry-run mode for preview
- Cross-platform support (Windows, macOS, Linux)
- Monorepo-friendly recursive directory traversal
- TypeScript API for programmatic usage
- User confirmation prompts for destructive operations
- Verbose and quiet output modes

### Features
- **CLI Interface**: Command-line interface with multiple flags
  - `--dry-run` / `-d`: Preview what would be deleted
  - `--confirm` / `-c`: Confirm before deleting
  - `--verbose` / `-v`: Detailed output
  - `--quiet` / `-q`: Minimal output
  - `--help` / `-h`: Show help message
  - `--version` / `-V`: Show version number

- **Cleanup Targets**: Removes common Node.js build artifacts
  - `node_modules` directories
  - `dist` and `build` directories
  - `.next`, `.nuxt`, `.vite` framework caches
  - Coverage files (`.nyc_output`, `coverage`)
  - Temporary files (`.tmp`, `temp`)
  - Other common build artifacts

- **Safety Features**:
  - Safe by default - requires explicit confirmation
  - Dry-run mode for safe previewing
  - User confirmation prompts
  - Detailed reporting of what was cleaned

- **Programmatic API**:
  - TypeScript type definitions included
  - `clean()` function for programmatic usage
  - `CleanOptions` interface for configuration
  - `getCleanupTargets()` utility function

### Technical Details
- **Zero Runtime Dependencies**: No external dependencies required
- **TypeScript**: Written in TypeScript with full type definitions
- **Node.js Support**: Compatible with Node.js >= 14.0.0
- **ES Modules**: Uses ES modules (`type: "module"`)
- **Project Structure**: Organized into focused modules
  - CLI entry point (`src/bin/clean.ts`)
  - Core cleaning logic (`src/lib/cleaner.ts`)
  - Constants and configuration (`src/lib/constants.ts`)
  - Utility functions (`src/lib/utils/`)
  - Type definitions (`src/lib/types.ts`)

### Installation
```bash
npm install -D @codefocus/cleanup
# or
yarn add -D @codefocus/cleanup
# or
pnpm add -D @codefocus/cleanup
```

### Usage Examples
```bash
# Preview what would be deleted
npx @codefocus/cleanup --dry-run

# Perform the cleanup
npx @codefocus/cleanup --confirm

# Programmatic usage
import { clean } from '@codefocus/cleanup';

await clean({
  dryRun: true,
  verbose: true,
});
```

### Development
- **Testing**: Vitest test suite
- **Build System**: TypeScript compiler
- **Development Mode**: Watch mode for development
- **Linting**: TypeScript strict mode

---

## [0.6.2] - Previous Development Version

### Internal Development Build
- Development version used during active development
- Features and functionality may differ from stable releases

---

## Version History

### [0.x.x] - Development Versions
Early development versions with evolving functionality and API.

---

## Contributing

When adding entries to this changelog:

1. Keep the format consistent with [Keep a Changelog](https://keepachangelog.com/)
2. Follow [Semantic Versioning](https://semver.org/)
3. Group changes under these headers:
   - `Added` for new features
   - `Changed` for changes in existing functionality
   - `Deprecated` for soon-to-be removed features
   - `Removed` for now removed features
   - `Fixed` for any bug fixes
   - `Security` for vulnerability fixes

### Unreleased Section
- Keep an "Unreleased" section at the top for upcoming changes
- Move released changes to a new version section with date

---

## Links

- **Repository**: https://github.com/codefocusuk/clean
- **npm Package**: https://www.npmjs.com/package/@codefocus/clean
- **Issues**: https://github.com/codefocusuk/clean/issues
- **Discussions**: https://github.com/codefocusuk/clean/discussions

---

## License

This changelog is part of the MIT licensed @codefocus/cleanup project.
See [LICENSE](LICENSE) for more details.
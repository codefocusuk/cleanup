#!/usr/bin/env node

import { clean } from '../lib/index.js';

// Types
interface CLIOptions {
  dryRun: boolean;
  confirm: boolean;
  verbose: boolean;
  quiet: boolean;
  help: boolean;
  version: boolean;
}

// Parse command line arguments
function parseArgs(): CLIOptions {
  const args = process.argv.slice(2);
  const options: CLIOptions = {
    dryRun: false,
    confirm: false,
    verbose: false,
    quiet: false,
    help: false,
    version: false
  };

  // Check npm config for --confirm and --dry-run (when passed via npm run)
  if (process.env.npm_config_confirm === 'true') {
    options.confirm = true;
  }
  if (process.env.npm_config_dry_run === 'true') {
    options.dryRun = true;
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '-d':
      case '--dry-run':
        options.dryRun = true;
        break;
      case '-c':
      case '--confirm':
        options.confirm = true;
        break;
      case '-v':
      case '--verbose':
        options.verbose = true;
        break;
      case '-q':
      case '--quiet':
        options.quiet = true;
        break;
      case '-h':
      case '--help':
        options.help = true;
        break;
      case '-V':
      case '--version':
        options.version = true;
        break;
      default:
        if (arg.startsWith('-')) {
          console.error(`Unknown option: ${arg}`);
          options.help = true;
        }
        break;
    }
  }

  return options;
}

// Show help
function showHelp(): void {
  console.log(`
@codefocus/clean v0.6.2

Clean build artifacts and caches from Node.js projects

Usage: clean [options]

Options:
  -d, --dry-run       Preview what would be deleted without actually deleting
  -c, --confirm       Delete without requiring confirmation
  -v, --verbose       Verbose output
  -q, --quiet         Quiet output
  -h, --help          Show this help message
  -V, --version       Show version number

Examples:
  clean --dry-run
  clean --confirm --verbose
  clean --quiet
`);
}

// Show version
function showVersion(): void {
  console.log('0.6.2');
}

// Main execution
async function main(): Promise<void> {
  const options = parseArgs();

  if (options.help) {
    showHelp();
    return;
  }

  if (options.version) {
    showVersion();
    return;
  }

  // Require either --dry-run or --confirm
  if (!options.dryRun && !options.confirm) {
    console.error('Error: Either --dry-run or --confirm must be specified.');
    console.error('Use --help for more information.');
    process.exit(1);
  }

  try {
    await clean(options);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error:', errorMessage);
    process.exit(1);
  }
}

main();

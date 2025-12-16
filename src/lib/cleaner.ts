import type { CleanOptions } from './types.js';
import { CLEANUP_TARGETS } from './constants.js';
import { findPackageJsonDirectories } from './utils/fs.js';
import { displaySummary, askConfirmation, displayCompletion } from './utils/ui.js';
import { clearDirectory, cleanNodeModules } from './utils/cleaner.js';

/**
 * Main cleanup function
 * @param options - CLI options
 */
export async function clean(options: CleanOptions = {}): Promise<void> {
  const { dryRun = false, confirm = false, verbose = false, quiet = false } = options;

  if (!quiet) {
    console.log(`${dryRun ? '🔍 DRY RUN: ' : '🧹 '}Starting project cleanup...\n`);
  }

  const rootDir = process.cwd();
  if (verbose) console.log(`Root directory: ${rootDir}`);

  // Use default Node.js targets
  const targets = CLEANUP_TARGETS;

  // Find all package.json directories
  const packageJsonDirs = findPackageJsonDirectories(rootDir);

  if (packageJsonDirs.length === 0) {
    if (!quiet) console.log('❌ No package.json files found. Nothing to clean.');
    return;
  }

  displaySummary(packageJsonDirs, targets, options);

  // Ask for confirmation unless --confirm is specified
  if (!confirm && !dryRun) {
    const confirmed = await askConfirmation('Are you sure you want to proceed with cleanup?');
    if (!confirmed) {
      console.log('Cleanup cancelled.');
      return;
    }
  }

  // Clean up directories
  if (!quiet) console.log('Cleaning directories...');

  for (const target of targets) {
    if (target.name === 'node_modules') {
      // Clean node_modules from all package.json directories
      cleanNodeModules(packageJsonDirs, target.name, target.description, options);
    } else {
      // Clean other directories recursively from root
      if (!quiet) console.log(`\n🧹 Cleaning ${target.name} (${target.description})...`);
      const recursive = target.recursive !== undefined ? target.recursive : true;
      clearDirectory(rootDir, target.name, target.description, recursive, options);
    }
  }

  displayCompletion(dryRun, quiet);
}

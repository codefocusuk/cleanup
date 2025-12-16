import { createInterface } from 'readline';
import type { CleanOptions, CleanupTarget } from '../types.js';

/**
 * Display cleanup summary
 * @param packageJsonDirs - Directories with package.json files
 * @param cleanupTargets - Array of cleanup targets
 * @param options - Options object
 */
export function displaySummary(
  packageJsonDirs: string[],
  cleanupTargets: CleanupTarget[],
  options: CleanOptions = {}
): void {
  const { quiet = false } = options;

  if (quiet) return;

  console.log('\n' + '='.repeat(50));
  console.log('CLEANUP SUMMARY');
  console.log('='.repeat(50));
  console.log(`Found ${packageJsonDirs.length} project(s) with package.json files:`);

  packageJsonDirs.forEach((dir, index) => {
    console.log(`  ${index + 1}. ${dir}`);
  });

  console.log(`\nCleaning up the following directory types:`);
  cleanupTargets.forEach((target, index) => {
    console.log(`  ${index + 1}. ${target.name} (${target.description})`);
  });
  console.log('');
}

/**
 * Ask for confirmation
 * @param message - Confirmation message
 * @returns User response
 */
export function askConfirmation(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(`${message} (y/N): `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

/**
 * Display completion message
 * @param dryRun - Whether this was a dry run
 * @param quiet - Whether to suppress output
 */
export function displayCompletion(dryRun: boolean, quiet: boolean): void {
  if (quiet) return;

  console.log('\n' + '='.repeat(50));
  console.log(`${dryRun ? 'DRY RUN COMPLETE' : '✅ CLEANUP COMPLETE'}!`);
  console.log('='.repeat(50));
  if (!dryRun) {
    console.log('Your project directories have been cleaned.');
    console.log('You may need to run "npm install" or equivalent to reinstall dependencies.');
  } else {
    console.log('This was a dry run. No files were actually deleted.');
    console.log('Run without --dry-run to perform the actual cleanup.');
  }
}

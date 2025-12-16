import { join } from 'path';
import { existsSync } from 'fs';
import type { ClearDirectoryOptions } from '../types.js';
import { removeDirectory, findTargetDirectories } from './fs.js';

/**
 * Generic function to clear specified directories
 * @param baseDir - Base directory to search in
 * @param targetDir - Target directory name to remove
 * @param description - Description of what's being removed
 * @param searchRecursively - Whether to search recursively for the target
 * @param options - Options object
 */
export function clearDirectory(
  baseDir: string,
  targetDir: string,
  description: string,
  searchRecursively: boolean = false,
  options: ClearDirectoryOptions = {}
): void {
  const { dryRun = false, quiet = false, verbose = false } = options;

  if (searchRecursively) {
    // Search recursively for all instances of the target directory
    const foundDirs = findTargetDirectories(baseDir, targetDir, verbose);

    if (foundDirs.length > 0) {
      if (!quiet) {
        console.log(`\nFound ${foundDirs.length} ${targetDir} ${foundDirs.length === 1 ? 'directory' : 'directories'}:`);
      }
      let removedCount = 0;

      for (const dirPath of foundDirs) {
        if (removeDirectory(dirPath, options)) {
          if (!dryRun && !quiet) console.log(`✓ Removed: ${dirPath}`);
          removedCount++;
        }
      }

      if (!quiet) {
        console.log(`${description} cleanup: ${removedCount}/${foundDirs.length} directories ${dryRun ? 'would be' : ''} removed`);
      }
    } else {
      if (!quiet) console.log(`No ${targetDir} directories found`);
    }
  } else {
    // Only check in the base directory
    const targetPath = join(baseDir, targetDir);
    if (existsSync(targetPath)) {
      if (removeDirectory(targetPath, options)) {
        if (!dryRun && !quiet) console.log(`✓ Removed: ${targetPath}`);
      }
    } else {
      if (!quiet) console.log(`${targetDir} not found in: ${baseDir}`);
    }
  }
}

/**
 * Clean node_modules from all package.json directories
 * @param packageJsonDirs - Array of directories containing package.json
 * @param targetName - Name of the directory to clean
 * @param description - Description for logging
 * @param options - Options object
 */
export function cleanNodeModules(
  packageJsonDirs: string[],
  targetName: string,
  description: string,
  options: ClearDirectoryOptions = {}
): void {
  const { dryRun = false, quiet = false } = options;

  if (!quiet) console.log(`\n🧹 Cleaning ${targetName} (${description})...`);

  let removedCount = 0;

  for (const dir of packageJsonDirs) {
    const targetPath = join(dir, targetName);
    if (existsSync(targetPath)) {
      if (removeDirectory(targetPath, options)) {
        if (!dryRun && !quiet) console.log(`✓ Removed: ${targetPath}`);
        removedCount++;
      }
    }
  }

  if (removedCount === 0) {
    if (!quiet) console.log(`No ${targetName} directories found in package.json locations`);
  } else {
    if (!quiet) console.log(`${description} cleanup: ${removedCount} directories ${dryRun ? 'would be' : ''} removed`);
  }
}

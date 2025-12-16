import { execSync } from 'child_process';
import { join } from 'path';
import { readdirSync, statSync } from 'fs';
import type { RemoveDirectoryOptions } from '../types.js';
import { EXCLUDE_DIRS } from '../constants.js';

/**
 * Cross-platform directory removal
 * @param dirPath - Path to the directory to remove
 * @param options - Options object
 * @returns Success status
 */
export function removeDirectory(dirPath: string, options: RemoveDirectoryOptions = {}): boolean {
  const { dryRun = false, verbose = false } = options;

  if (dryRun) {
    if (verbose) console.log(`Would remove: ${dirPath}`);
    return true;
  }

  try {
    if (process.platform === 'win32') {
      // Windows
      execSync(`cmd.exe /c rmdir /s /q "${dirPath}"`, { stdio: 'pipe' });
    } else {
      // Unix-like systems (Linux, macOS)
      execSync(`rm -rf "${dirPath}"`, { stdio: 'pipe' });
    }
    if (verbose) console.log(`✓ Removed: ${dirPath}`);
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.warn(`Error removing ${dirPath}: ${errorMessage}`);
    return false;
  }
}

/**
 * Find all directories containing package.json files
 * @param rootDir - Root directory to start searching from
 * @returns Array of directories containing package.json
 */
export function findPackageJsonDirectories(rootDir: string): string[] {
  const packageJsonDirs: string[] = [];

  function walkSync(currentDir: string): void {
    try {
      const files = readdirSync(currentDir);

      if (files.includes('package.json')) {
        packageJsonDirs.push(currentDir);
      }

      for (const file of files) {
        const fullPath = join(currentDir, file);

        try {
          const stats = statSync(fullPath);

          if (stats.isDirectory() && !EXCLUDE_DIRS.includes(file)) {
            walkSync(fullPath);
          }
        } catch (error) {
          // Ignore errors
        }
      }
    } catch (error) {
      // Ignore errors
    }
  }

  walkSync(rootDir);
  return packageJsonDirs;
}

/**
 * Find all instances of a target directory recursively
 * @param baseDir - Base directory to search in
 * @param targetDir - Target directory name to find
 * @param verbose - Whether to log errors
 * @returns Array of found directory paths
 */
export function findTargetDirectories(
  baseDir: string,
  targetDir: string,
  verbose: boolean = false
): string[] {
  const foundDirs: string[] = [];

  function findDirs(currentDir: string): void {
    try {
      const files = readdirSync(currentDir);

      for (const file of files) {
        const fullPath = join(currentDir, file);

        try {
          const stats = statSync(fullPath);

          if (stats.isDirectory()) {
            if (file === targetDir) {
              foundDirs.push(fullPath);
            } else if (!EXCLUDE_DIRS.includes(file)) {
              findDirs(fullPath);
            }
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          if (verbose) console.warn(`Error accessing ${fullPath}: ${errorMessage}`);
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (verbose) console.warn(`Error reading directory ${currentDir}: ${errorMessage}`);
    }
  }

  findDirs(baseDir);
  return foundDirs;
}

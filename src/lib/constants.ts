import type { CleanupTarget } from './types.js';

/**
 * Directories to exclude from searching for package.json
 */
export const EXCLUDE_DIRS = [
  'node_modules',
  '.turbo',
  '.BUILD',
  '.dist',
  '.test-report',
  '.git',
  '.vscode',
  '.idea'
];

/**
 * Directories to clean up (Node.js default targets)
 */
export const CLEANUP_TARGETS: CleanupTarget[] = [
  { name: 'node_modules', description: 'Node.js dependencies', recursive: false },
  { name: '.turbo', description: 'Turbo cache', recursive: true },
  { name: '.BUILD', description: 'Build directory', recursive: true },
  { name: '.dist', description: 'Distribution directory', recursive: true },
  { name: '.test-report', description: 'Test report directory', recursive: true },
  { name: 'dist', description: 'Distribution directory (alternative naming)', recursive: true },
  { name: 'build', description: 'Build output directory', recursive: true },
  { name: 'coverage', description: 'Test coverage reports', recursive: true },
  { name: '.nyc_output', description: 'NYC coverage output', recursive: true },
  { name: '.next', description: 'Next.js cache and build files', recursive: true },
  { name: '.nuxt', description: 'Nuxt.js cache and build files', recursive: true },
  { name: '.vite', description: 'Vite cache directory', recursive: true },
  { name: 'tmp', description: 'Temporary files', recursive: true },
  { name: 'temp', description: 'Temporary files', recursive: true }
];

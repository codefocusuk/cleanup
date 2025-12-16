/**
 * Cleanup target definition
 */
export interface CleanupTarget {
  name: string;
  description: string;
  recursive?: boolean;
}


/**
 * Options for the clean operation
 */
export interface CleanOptions {
  dryRun?: boolean;
  confirm?: boolean;
  verbose?: boolean;
  quiet?: boolean;
}

/**
 * Options for directory removal
 */
export interface RemoveDirectoryOptions {
  dryRun?: boolean;
  verbose?: boolean;
}

/**
 * Options for clearing directories
 */
export interface ClearDirectoryOptions {
  dryRun?: boolean;
  verbose?: boolean;
  quiet?: boolean;
}

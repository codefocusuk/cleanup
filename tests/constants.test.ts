import { describe, it, expect } from 'vitest';
import { CLEANUP_TARGETS, EXCLUDE_DIRS } from '../dist/lib/constants.js';

describe('Constants Module', () => {
  describe('CLEANUP_TARGETS', () => {
    it('should be an array', () => {
      expect(Array.isArray(CLEANUP_TARGETS)).toBe(true);
    });

    it('should have at least one target', () => {
      expect(CLEANUP_TARGETS.length > 0).toBe(true);
    });

    it('should have valid target structure', () => {
      CLEANUP_TARGETS.forEach(target => {
        expect(target.name).toBeDefined();
        expect(target.description).toBeDefined();
        expect(typeof target.recursive === 'boolean' || target.recursive === undefined).toBe(true);
      });
    });

    it('should include node_modules', () => {
      const hasNodeModules = CLEANUP_TARGETS.some(t => t.name === 'node_modules');
      expect(hasNodeModules).toBe(true);
    });

    it('should include common build directories', () => {
      const targetNames = CLEANUP_TARGETS.map(t => t.name);

      expect(targetNames.includes('dist')).toBe(true);
      expect(targetNames.includes('build')).toBe(true);
    });

    it('should include framework-specific directories', () => {
      const targetNames = CLEANUP_TARGETS.map(t => t.name);

      expect(targetNames.includes('.next')).toBe(true);
      expect(targetNames.includes('.nuxt')).toBe(true);
    });

    it('should not have duplicate target names', () => {
      const names = CLEANUP_TARGETS.map(t => t.name);
      const uniqueNames = new Set(names);

      expect(names.length).toBe(uniqueNames.size);
    });
  });

  describe('EXCLUDE_DIRS', () => {
    it('should be an array', () => {
      expect(Array.isArray(EXCLUDE_DIRS)).toBe(true);
    });

    it('should have at least one directory', () => {
      expect(EXCLUDE_DIRS.length > 0).toBe(true);
    });

    it('should contain strings', () => {
      EXCLUDE_DIRS.forEach(dir => {
        expect(typeof dir).toBe('string');
      });
    });

    it('should include node_modules', () => {
      expect(EXCLUDE_DIRS.includes('node_modules')).toBe(true);
    });

    it('should include .git', () => {
      expect(EXCLUDE_DIRS.includes('.git')).toBe(true);
    });

    it('should include common IDE directories', () => {
      expect(EXCLUDE_DIRS.includes('.vscode') || EXCLUDE_DIRS.includes('.idea')).toBe(true);
    });

    it('should not have duplicates', () => {
      const uniqueDirs = new Set(EXCLUDE_DIRS);
      expect(EXCLUDE_DIRS.length).toBe(uniqueDirs.size);
    });
  });
});
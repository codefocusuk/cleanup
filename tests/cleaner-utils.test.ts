import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs';
import { join } from 'path';
import { clearDirectory, cleanNodeModules } from '../dist/lib/utils/cleaner.js';

describe('Cleaner Utilities', () => {
  const testDir = join(process.cwd(), 'test-temp-cleaner');

  beforeAll(() => {
    // Clean up any existing test directory
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  afterAll(() => {
    // Clean up test directory
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('clearDirectory', () => {
    it('should work in dry-run mode without removing directories', () => {
      const rootDir = join(testDir, 'dry-run-clear');
      const distDir = join(rootDir, 'dist');

      mkdirSync(distDir, { recursive: true });
      writeFileSync(join(distDir, 'test.js'), 'test');

      clearDirectory(rootDir, 'dist', 'Test description', false, { dryRun: true, quiet: true });

      expect(existsSync(distDir)).toBe(true);

      // Cleanup
      rmSync(rootDir, { recursive: true, force: true });
    });

    it('should remove directory in non-recursive mode', () => {
      const rootDir = join(testDir, 'non-recursive-clear');
      const distDir = join(rootDir, 'dist');

      mkdirSync(distDir, { recursive: true });
      writeFileSync(join(distDir, 'test.js'), 'test');

      clearDirectory(rootDir, 'dist', 'Test description', false, { dryRun: false, quiet: true });

      expect(existsSync(distDir)).toBe(false);

      // Cleanup
      rmSync(rootDir, { recursive: true, force: true });
    });

    it('should find and remove directories recursively', () => {
      const rootDir = join(testDir, 'recursive-clear');
      const dist1 = join(rootDir, 'pkg1', 'dist');
      const dist2 = join(rootDir, 'pkg2', 'dist');

      mkdirSync(dist1, { recursive: true });
      mkdirSync(dist2, { recursive: true });

      clearDirectory(rootDir, 'dist', 'Test description', true, { dryRun: false, quiet: true });

      expect(existsSync(dist1)).toBe(false);
      expect(existsSync(dist2)).toBe(false);

      // Cleanup
      rmSync(rootDir, { recursive: true, force: true });
    });

    it('should handle non-existent directory gracefully in non-recursive mode', () => {
      const rootDir = join(testDir, 'non-existent-clear');
      mkdirSync(rootDir, { recursive: true });

      // Should not throw
      expect(() => {
        clearDirectory(rootDir, 'nonexistent', 'Test description', false, { quiet: true });
      }).not.toThrow();

      // Cleanup
      rmSync(rootDir, { recursive: true, force: true });
    });

    it('should handle no targets found in recursive mode', () => {
      const rootDir = join(testDir, 'no-targets-clear');
      mkdirSync(rootDir, { recursive: true });

      // Should not throw
      expect(() => {
        clearDirectory(rootDir, 'nonexistent', 'Test description', true, { quiet: true });
      }).not.toThrow();

      // Cleanup
      rmSync(rootDir, { recursive: true, force: true });
    });

    it('should respect quiet option', () => {
      const rootDir = join(testDir, 'quiet-clear');
      const distDir = join(rootDir, 'dist');

      mkdirSync(distDir, { recursive: true });

      // Should not throw and should respect quiet mode
      expect(() => {
        clearDirectory(rootDir, 'dist', 'Test description', false, { dryRun: false, quiet: true });
      }).not.toThrow();

      expect(existsSync(distDir)).toBe(false);

      // Cleanup
      rmSync(rootDir, { recursive: true, force: true });
    });
  });

  describe('cleanNodeModules', () => {
    it('should clean node_modules from package.json directories', () => {
      const rootDir = join(testDir, 'node-modules-clean');
      const pkg1 = join(rootDir, 'pkg1');
      const pkg2 = join(rootDir, 'pkg2');
      const nodeModules1 = join(pkg1, 'node_modules');
      const nodeModules2 = join(pkg2, 'node_modules');

      mkdirSync(nodeModules1, { recursive: true });
      mkdirSync(nodeModules2, { recursive: true });
      writeFileSync(join(pkg1, 'package.json'), '{}');
      writeFileSync(join(pkg2, 'package.json'), '{}');

      cleanNodeModules([pkg1, pkg2], 'node_modules', 'Dependencies', { dryRun: false, quiet: true });

      expect(existsSync(nodeModules1)).toBe(false);
      expect(existsSync(nodeModules2)).toBe(false);

      // Cleanup
      rmSync(rootDir, { recursive: true, force: true });
    });

    it('should work in dry-run mode without removing node_modules', () => {
      const rootDir = join(testDir, 'node-modules-dry-run');
      const pkg = join(rootDir, 'pkg');
      const nodeModules = join(pkg, 'node_modules');

      mkdirSync(nodeModules, { recursive: true });
      writeFileSync(join(pkg, 'package.json'), '{}');

      cleanNodeModules([pkg], 'node_modules', 'Dependencies', { dryRun: true, quiet: true });

      expect(existsSync(nodeModules)).toBe(true);

      // Cleanup
      rmSync(rootDir, { recursive: true, force: true });
    });

    it('should handle directories without node_modules', () => {
      const rootDir = join(testDir, 'no-node-modules');
      const pkg = join(rootDir, 'pkg');

      mkdirSync(pkg, { recursive: true });
      writeFileSync(join(pkg, 'package.json'), '{}');

      // Should not throw
      expect(() => {
        cleanNodeModules([pkg], 'node_modules', 'Dependencies', { quiet: true });
      }).not.toThrow();

      // Cleanup
      rmSync(rootDir, { recursive: true, force: true });
    });

    it('should handle empty package directories array', () => {
      // Should not throw
      expect(() => {
        cleanNodeModules([], 'node_modules', 'Dependencies', { quiet: true });
      }).not.toThrow();
    });

    it('should respect quiet option', () => {
      const rootDir = join(testDir, 'quiet-node-modules');
      const pkg = join(rootDir, 'pkg');
      const nodeModules = join(pkg, 'node_modules');

      mkdirSync(nodeModules, { recursive: true });

      // Should not throw and should respect quiet mode
      expect(() => {
        cleanNodeModules([pkg], 'node_modules', 'Dependencies', { dryRun: false, quiet: true });
      }).not.toThrow();

      expect(existsSync(nodeModules)).toBe(false);

      // Cleanup
      rmSync(rootDir, { recursive: true, force: true });
    });
  });
});
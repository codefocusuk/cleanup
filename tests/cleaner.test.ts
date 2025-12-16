import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs';
import { join } from 'path';
import { cleanup } from '../dist/lib/cleaner.js';

describe('Main Cleaner Module', () => {
  const testDir = join(process.cwd(), 'test-temp-main');

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

  describe('clean function', () => {
    it('should work in dry-run mode without removing files', async () => {
      const projectDir = join(testDir, 'dry-run-project');
      const nodeModules = join(projectDir, 'node_modules');
      const distDir = join(projectDir, 'dist');

      mkdirSync(nodeModules, { recursive: true });
      mkdirSync(distDir, { recursive: true });
      writeFileSync(join(projectDir, 'package.json'), '{}');

      // Change to project directory
      const originalCwd = process.cwd();
      process.chdir(projectDir);

      await cleanup({ dryRun: true, quiet: true });

      // Restore original directory
      process.chdir(originalCwd);

      expect(existsSync(nodeModules)).toBe(true);
      expect(existsSync(distDir)).toBe(true);

      // Cleanup
      rmSync(projectDir, { recursive: true, force: true });
    });

    it('should clean node_modules and dist directories', async () => {
      const projectDir = join(testDir, 'clean-project');
      const nodeModules = join(projectDir, 'node_modules');
      const distDir = join(projectDir, 'dist');

      mkdirSync(nodeModules, { recursive: true });
      mkdirSync(distDir, { recursive: true });
      writeFileSync(join(projectDir, 'package.json'), '{}');
      writeFileSync(join(nodeModules, 'test.js'), 'test');
      writeFileSync(join(distDir, 'build.js'), 'build');

      const originalCwd = process.cwd();
      process.chdir(projectDir);

      await cleanup({ confirm: true, quiet: true });

      process.chdir(originalCwd);

      expect(existsSync(nodeModules)).toBe(false);
      expect(existsSync(distDir)).toBe(false);

      // Cleanup
      rmSync(projectDir, { recursive: true, force: true });
    });

    it('should handle monorepo structure', async () => {
      const projectDir = join(testDir, 'monorepo-project');
      const pkg1 = join(projectDir, 'packages', 'pkg1');
      const pkg2 = join(projectDir, 'packages', 'pkg2');
      const nodeModules1 = join(pkg1, 'node_modules');
      const nodeModules2 = join(pkg2, 'node_modules');

      mkdirSync(nodeModules1, { recursive: true });
      mkdirSync(nodeModules2, { recursive: true });
      writeFileSync(join(projectDir, 'package.json'), '{}');
      writeFileSync(join(pkg1, 'package.json'), '{}');
      writeFileSync(join(pkg2, 'package.json'), '{}');

      const originalCwd = process.cwd();
      process.chdir(projectDir);

      await cleanup({ confirm: true, quiet: true });

      process.chdir(originalCwd);

      expect(existsSync(nodeModules1)).toBe(false);
      expect(existsSync(nodeModules2)).toBe(false);

      // Cleanup
      rmSync(projectDir, { recursive: true, force: true });
    });
  });

  describe('clean function options', () => {
    it('should respect verbose option', async () => {
      const projectDir = join(testDir, 'verbose-project');
      const distDir = join(projectDir, 'dist');

      mkdirSync(distDir, { recursive: true });
      writeFileSync(join(projectDir, 'package.json'), '{}');

      const originalCwd = process.cwd();
      process.chdir(projectDir);

      // Should not throw with verbose option
      await expect(async () => {
        await cleanup({ dryRun: true, verbose: true, quiet: false });
      }).not.toThrow();

      process.chdir(originalCwd);

      // Cleanup
      rmSync(projectDir, { recursive: true, force: true });
    });

    it('should respect quiet option', async () => {
      const projectDir = join(testDir, 'quiet-project');
      const distDir = join(projectDir, 'dist');

      mkdirSync(distDir, { recursive: true });
      writeFileSync(join(projectDir, 'package.json'), '{}');

      const originalCwd = process.cwd();
      process.chdir(projectDir);

      // Should not throw with quiet option
      await expect(async () => {
        await cleanup({ dryRun: true, quiet: true });
      }).not.toThrow();

      process.chdir(originalCwd);

      // Cleanup
      rmSync(projectDir, { recursive: true, force: true });
    });
  });
});
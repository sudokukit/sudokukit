import { describe, expect, test } from 'vitest';
import { convertToGrid, Grid, MP1, MS1, MS2, multisolve, SudokuString, stringSort } from '../src';

describe('MultiSolver', () => {
  test('should have two solutions', () => {
    const grid: Grid = convertToGrid(MP1);
    const result: SudokuString[] = multisolve(grid);
    expect(result.length).toBe(2);

    const stringResults: string[] = result.sort(stringSort);
    const stringExpected: string[] = [MS1, MS2];

    expect(stringResults).toEqual(stringExpected);
  });

  test(`performance with two solutions`, () => {
    const numberOfIterations = 81000;

    let totalTime: number = 0;
    for (let i: number = 0; i < numberOfIterations; i++) {
      const grid: Grid = convertToGrid(MP1);
      const start: number = performance.now();
      multisolve(grid);
      const end: number = performance.now();
      totalTime += end - start;
    }

    const average: number = totalTime / numberOfIterations;
    const microseconds: number = Math.round(average * 1000);
    console.log('multisolve() - Performance');
    console.log(`Average time: ${microseconds} µs`);
    console.log(`Total time:   ${Math.round(totalTime)} ms`);

    expect(microseconds).toBeLessThan(20);
  });
});

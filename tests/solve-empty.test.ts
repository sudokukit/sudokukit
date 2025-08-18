import { describe, expect, test } from 'vitest';
import { Grid, newGrid, solveEmpty } from '../src';

describe('solveEmpty() - Performance', () => {
  test(`performance`, () => {
    const numberOfIterations: number = 63500;

    let totalTime: number = 0;
    for (let i: number = 0; i < numberOfIterations; i++) {
      const grid: Grid = newGrid();
      const start: number = performance.now();
      solveEmpty(grid);
      const end: number = performance.now();
      totalTime += end - start;
    }

    const average: number = totalTime / numberOfIterations;
    const microseconds: number = Math.round(average * 1000);
    console.log('solveEmpty() - Performance');
    console.log(`Average time: ${microseconds} µs`);
    console.log(`Total time:   ${Math.round(totalTime)} ms`);

    expect(microseconds).toBeLessThan(20);
  });
});

describe('solveEmpty() - Validity', () => {
  // TODO : Check grid is valid

  test(`should solve an empty grid`, () => {
    const grid: Grid = newGrid();
    solveEmpty(grid);

    let count: number = 0;
    for (let i: number = 0; i < 81; i++) {
      if (grid[i].value === 0) count++;
    }
    expect(count).toBe(0);
  });
});

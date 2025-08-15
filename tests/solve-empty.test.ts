import { solveEmpty } from '@sudokukit/functions';
import { GridHelper } from '@sudokukit/helpers';
import { Grid } from '@sudokukit/types';
import { describe, expect, test } from 'vitest';

describe('solveEmpty()', () => {
  test(`should solve an empty grid`, () => {
    const grid: Grid = GridHelper.newGrid();
    solveEmpty(grid);

    let count: number = 0;
    for (let i: number = 0; i < 81; i++) {
      if (grid[i].value === 0) count++;
    }
    expect(count).toBe(0);
    // TODO : Check grid is valid
  });

  test(`measures average performance of generate over 50000 calls`, () => {
    const numberOfIterations = 53000;
    const start: number = performance.now();
    for (let i: number = 0; i < numberOfIterations; i++) {
      const grid: Grid = GridHelper.newGrid();
      solveEmpty(grid);
    }
    const end: number = performance.now();
    const totalTime: number = end - start;
    const average: number = totalTime / numberOfIterations;
    const microseconds: number = Math.round(average * 1000);
    console.log(`Average time: ${microseconds} µs`);

    expect(microseconds).toBeLessThan(25);
  });
});

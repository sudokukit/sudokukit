import { describe, expect, test } from 'vitest';
import { convertGrid, convertToGrid, Grid, MP1, MS1, MS2, newGrid, SP1, SS1, SudokuString, solve } from '../src';

describe('solve()', () => {
  // TODO : Testcase : Add solve returns valid grid

  test(`solve an empty grid`, () => {
    const grid: Grid = newGrid();
    solve(grid);

    let count: number = 0;
    for (let i: number = 0; i < 81; i++) {
      if (grid[i].value === 0) count++;
    }
    expect(count).toBe(0);
  });

  test('solve multi puzzle', () => {
    const grid: Grid = convertToGrid(MP1);

    const result: boolean = solve(grid);

    expect(result).toBe(true);

    const solution: SudokuString = convertGrid(grid);
    const solutions: SudokuString[] = [MS1, MS2];

    expect(solutions.includes(solution)).toBe(true);
  });

  test.skip('solve 17 given puzzle', () => {
    const grid: Grid = convertToGrid(SP1);

    const result: boolean = solve(grid);

    expect(result).toBe(true);

    const solution: SudokuString = convertGrid(grid);
    expect(solution).toBe(SS1);
  }, 30000);

  test(`performance with empty grid`, () => {
    const numberOfIterations = 65000;

    let totalTime: number = 0;
    for (let i: number = 0; i < numberOfIterations; i++) {
      const grid: Grid = newGrid();
      const start: number = performance.now();
      solve(grid);
      const end: number = performance.now();
      totalTime += end - start;
    }

    const average: number = totalTime / numberOfIterations;
    const microseconds: number = Math.round(average * 1000);
    console.log('solve() - Performance');
    console.log(`Average time: ${microseconds} µs`);
    console.log(`Total time:   ${Math.round(totalTime)} ms`);

    expect(microseconds).toBeLessThan(20);
  });
});

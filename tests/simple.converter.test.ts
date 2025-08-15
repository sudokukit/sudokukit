import { convertSimpleGrid } from '@sudokukit/converters';
import { newGrid } from '@sudokukit/functions';
import { Grid } from '@sudokukit/types';
import { describe, expect, test } from 'vitest';

const EMPTY: string = '.................................................................................';
const SOLUTION: string = '589716342634259817271843956856324179412697583397581264723168495968435721145972638';
const PARTIAL: string = '123......456......789............................................................';

describe('SimpleConverter', () => {
  test('converts an empty grid to a string', () => {
    const grid: Grid = newGrid();
    const string: string = convertSimpleGrid(grid);

    expect(string).toEqual(EMPTY);
  });

  test('converts a full grid to a string', () => {
    const grid: Grid = newGrid();

    for (let i: number = 0; i < 81; i++) {
      grid[i].value = Number(SOLUTION[i]);
    }
    const string: string = convertSimpleGrid(grid);

    expect(string).toBe(SOLUTION);
  });

  test('converts a partial grid to a string', () => {
    const grid: Grid = newGrid();

    for (let i: number = 0; i < 81; i++) {
      const value: string = PARTIAL[i];
      if (value !== '.') grid[i].value = Number(value);
    }
    const string: string = convertSimpleGrid(grid);

    expect(string).toBe(PARTIAL);
  });

  test(`measures average performance of generate over 1000 calls`, () => {
    const numberOfIterations = 1000;
    let totalTime: number = 0;
    const grid: Grid = newGrid();
    for (let i: number = 0; i < numberOfIterations; i++) {
      const start: number = performance.now();
      convertSimpleGrid(grid);
      const end: number = performance.now();
      totalTime += end - start;
    }
    const average: number = totalTime / numberOfIterations;
    const nanoseconds: number = Math.round(average * 1000000);
    console.log(`Average time: ${nanoseconds} ns`);

    expect(nanoseconds).toBeLessThan(2500);
  });
});

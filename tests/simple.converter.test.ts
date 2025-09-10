import { describe, expect, test } from 'vitest';
import { convertFromGrid, Grid, newGrid } from '../src';

const EMPTY: string = '.................................................................................';
const SOLUTION: string = '589716342634259817271843956856324179412697583397581264723168495968435721145972638';
const PARTIAL: string = '123......456......789............................................................';

describe('SimpleConverter', () => {
  test('converts an empty grid to a string', () => {
    const grid: Grid = newGrid();
    const string: string = convertFromGrid(grid);

    expect(string).toEqual(EMPTY);
  });

  test('converts a full grid to a string', () => {
    const grid: Grid = newGrid();

    for (let i: number = 0; i < 81; i++) {
      grid[i].value = Number(SOLUTION[i]);
    }
    const string: string = convertFromGrid(grid);

    expect(string).toBe(SOLUTION);
  });

  test('converts a partial grid to a string', () => {
    const grid: Grid = newGrid();

    for (let i: number = 0; i < 81; i++) {
      const value: string = PARTIAL[i];
      if (value !== '.') grid[i].value = Number(value);
    }
    const string: string = convertFromGrid(grid);

    expect(string).toBe(PARTIAL);
  });
});

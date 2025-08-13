import { GRID_SIZE } from '@sudokukit/constants';
import { convertSimpleGrid } from '@sudokukit/converters';
import { GridHelper } from '@sudokukit/helpers';
import { Grid } from '@sudokukit/types';
import { describe, expect, test } from 'vitest';

const EMPTY: string = '.................................................................................';
const SOLUTION: string = '589716342634259817271843956856324179412697583397581264723168495968435721145972638';
const PARTIAL: string = '123......456......789............................................................';

describe('SimpleConverter', () => {
  test('converts an empty grid to a string', () => {
    const grid: Grid = GridHelper.newGrid();
    const string: string = convertSimpleGrid(grid);

    expect(string).toEqual(EMPTY);
  });

  test('converts a full grid to a string', () => {
    const grid: Grid = GridHelper.newGrid();

    for (let i: number = 0; i < GRID_SIZE; i++) {
      GridHelper.setSimpleValue(grid, i, Number(SOLUTION[i]));
    }
    const string: string = convertSimpleGrid(grid);

    expect(string).toBe(SOLUTION);
  });

  test('converts a partial grid to a string', () => {
    const grid: Grid = GridHelper.newGrid();

    for (let i: number = 0; i < GRID_SIZE; i++) {
      const value: string = PARTIAL[i];
      if (value !== '.') GridHelper.setSimpleValue(grid, i, Number(value));
    }
    const string: string = convertSimpleGrid(grid);

    expect(string).toBe(PARTIAL);
  });
});

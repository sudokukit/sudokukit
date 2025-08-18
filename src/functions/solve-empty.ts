import { Cell } from '../interfaces';
import { Grid } from '../types';
import { bitmaskToArray } from './bitmask-to-array';
import { restoreCellOptions } from './restore-cell-options';
import { setGridValue } from './set-grid-value';
import { shuffle } from './shuffle';

export function solveEmpty(grid: Grid): void {
  setGridValue(grid, 0, Math.floor(Math.random() * 9) + 1);
  for (let index: number = 1; index < 81; index++) {
    const cell: Cell = grid[index];

    if (cell.value === 0) {
      cell.candidates = bitmaskToArray(cell.options);
      shuffle(cell.candidates);
    }

    if (cell.value > 0) {
      restoreCellOptions(grid, cell.affected, cell.value);
      cell.affected = [];
    }

    if (cell.candidates.length === 0) {
      cell.value = 0;
      index -= 2;
      continue;
    }

    const candidate: number = cell.candidates.pop() as number;
    const result: boolean = setGridValue(grid, index, candidate);

    if (!result) index--;
  }
}

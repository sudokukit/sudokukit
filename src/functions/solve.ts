import { Cell } from '../interfaces';
import { Grid } from '../types';
import { bitmaskToArray } from './bitmask-to-array';
import { restoreCellOptions } from './restore-cell-options';
import { setGridValue } from './set-grid-value';
import { shuffle } from './shuffle';

export function solve(grid: Grid): boolean {
  let backtracking: boolean = false;

  for (let index: number = 0; index < 81; index++) {
    if (index < 0) return false;
    const cell: Cell = grid[index];

    if (cell.given) {
      if (backtracking) index -= 2;
      continue;
    }

    if (cell.value === 0) {
      cell.candidates = bitmaskToArray(cell.options);
      shuffle(cell.candidates);
    }

    if (backtracking && cell.value > 0) {
      restoreCellOptions(grid, cell.affected, cell.value);
      cell.affected = [];
    }

    if (cell.candidates.length === 0) {
      cell.value = 0;
      index -= 2;
      backtracking = true;
      continue;
    }
    backtracking = false;
    const candidate: number = cell.candidates.pop() as number;
    const result: boolean = setGridValue(grid, index, candidate);

    if (!result) index--;
  }
  return true;
}

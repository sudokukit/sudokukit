import { convertFromGrid } from '../converters';
import { Cell } from '../interfaces';
import { Grid, SudokuString } from '../types';
import { bitmaskToArray } from './bitmask-to-array';
import { restoreCellOptions } from './restore-cell-options';
import { setGridValue } from './set-grid-value';
import { shuffle } from './shuffle';

export function multisolve(grid: Grid): SudokuString[] {
  let backtracking: boolean = false;
  const solutions: SudokuString[] = [];

  for (let index: number = 0; index < 81; index++) {
    if (index < 0) break;
    const cell: Cell = grid[index];

    if (backtracking && cell.given) {
      index -= 2;
      continue;
    }

    if (cell.given) {
      if (index < 80) continue;

      index = addSolutionAndRollback(solutions, grid);
      continue;
    }

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
      backtracking = true;
      continue;
    }
    backtracking = false;
    const candidate: number = cell.candidates.pop() as number;
    const result: boolean = setGridValue(grid, index, candidate);

    if (!result) {
      index--;
      continue;
    }

    if (index === 80) index = addSolutionAndRollback(solutions, grid);
  }
  return solutions;
}

function addSolutionAndRollback(solutions: SudokuString[], grid: Grid): number {
  solutions.push(convertFromGrid(grid));

  let index: number = indexOfCellWithOptions(grid);
  if (index >= 0) rollback(grid, index);

  return --index;
}

function indexOfCellWithOptions(grid: Grid): number {
  for (let index: number = 80; index > -1; index--) {
    if (grid[index].candidates.length > 0) return index;
  }
  return -1;
}

function rollback(grid: Grid, rollbackIndex: number): void {
  for (let index: number = 80; index > rollbackIndex; index--) {
    const cell: Cell = grid[index];

    if (cell.given) continue;

    if (cell.value > 0) restoreCellOptions(grid, cell.affected, cell.value);
    cell.value = 0;
    cell.affected = [];
    cell.candidates = [];
  }
}

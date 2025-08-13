import { GRID_SIZE } from '@sudokukit/constants';
import { Cell } from '@sudokukit/interfaces';
import { Grid, SudokuString } from '@sudokukit/types';

export function convertSimpleGrid(grid: Grid): SudokuString {
  const values = new Array(GRID_SIZE);
  for (let i: number = 0; i < GRID_SIZE; i++) {
    const cell: Cell = grid[i];
    values[i] = !cell.value ? '.' : cell.value;
  }
  return values.join('') as SudokuString;
}

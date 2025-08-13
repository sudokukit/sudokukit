import { Cell } from '@sudokukit/interfaces';
import { Grid, SudokuString } from '@sudokukit/types';

export function convertSimpleGrid(grid: Grid): SudokuString {
  const values = new Array(81);
  for (let i: number = 0; i < 81; i++) {
    const cell: Cell = grid[i];
    values[i] = !cell.value ? '.' : cell.value;
  }
  return values.join('') as SudokuString;
}

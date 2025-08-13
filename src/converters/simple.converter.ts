import { CellIndices, GRID_SIZE } from '@sudokukit/constants';
import { Grid, SudokuString } from '@sudokukit/types';

export function convertSimpleGrid(grid: Grid): SudokuString {
  const values = new Array(GRID_SIZE);
  for (let i: number = 0; i < GRID_SIZE; i++) {
    const value: number = grid[i][CellIndices.Value];
    values[i] = !value ? '.' : value;
  }
  return values.join('') as SudokuString;
}

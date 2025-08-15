import { Cell } from '@sudokukit/interfaces';
import { Grid } from '@sudokukit/types';

export function restoreCellOptions(grid: Grid, affectedIndices: number[], value: number): void {
  for (let i: number = 0; i < affectedIndices.length; i++) {
    const cell: Cell = grid[affectedIndices[i]];
    cell.options |= 1 << value;
  }
}

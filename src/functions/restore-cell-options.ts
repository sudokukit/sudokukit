import { Cell } from '../interfaces';
import { Grid } from '../types';

export function restoreCellOptions(grid: Grid, affectedIndices: number[], value: number): void {
  for (const affectedIndex of affectedIndices) {
    const cell: Cell = grid[affectedIndex];
    cell.options |= 1 << value;
  }
}

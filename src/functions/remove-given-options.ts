import { Cell } from '@sudokukit/interfaces';
import { Grid } from '@sudokukit/types';

export function removeGivenOptions(grid: Grid, candidateIndices: number[], value: number): void {
  for (const index of candidateIndices) {
    const cell: Cell = grid[index];

    if (cell.value > 0 || (cell.options & (1 << value)) === 0) continue;

    cell.options &= ~(1 << value);
  }
}

import { Cell } from '../interfaces';
import { Grid } from '../types';
import { restoreCellOptions } from './restore-cell-options';

export function removeCellOptions(grid: Grid, candidateIndices: number[], value: number): number[] | null {
  const affectedIndices: number[] = [];

  for (let i: number = 0; i < candidateIndices.length; i++) {
    const cell: Cell = grid[candidateIndices[i]];

    // If value is set or option is unset
    if (cell.value > 0 || (cell.options & (1 << value)) === 0) continue;

    cell.options &= ~(1 << value); // unset option
    affectedIndices.push(candidateIndices[i]); // add candidate to affected

    // After operation, if no more options, invalid move, restore and signal back
    if (cell.options === 0) {
      restoreCellOptions(grid, affectedIndices, value);

      return null;
    }
  }

  return affectedIndices;
}

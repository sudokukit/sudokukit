import { Cell } from '@sudokukit/interfaces';
import { AFFECTED_INDICES } from '@sudokukit/luts';
import { Grid } from '@sudokukit/types';

export const GridHelper = {
  newGrid(): Grid {
    const grid: Grid = new Array<Cell>(81);
    for (let i: number = 0; i < 81; i++) {
      grid[i] = { value: 0, candidates: [], options: 0b1111111110, affected: [] };
    }
    return grid;
  },

  setValue(grid: Grid, index: number, value: number): boolean {
    const cell: Cell = grid[index];
    cell.value = value;

    const possibleAffectedIndices: number[] = AFFECTED_INDICES[index];

    const affectedIndices: number[] | null = this.removeOptions(grid, possibleAffectedIndices, value);

    if (affectedIndices === null) return false;

    cell.affected = affectedIndices;
    return true;
  },

  removeOptions(grid: Grid, candidateIndices: number[], value: number): number[] | null {
    const affectedIndices: number[] = [];
    for (let i: number = 0; i < candidateIndices.length; i++) {
      const cell: Cell = grid[candidateIndices[i]];

      // If value is set or option is unset
      if (cell.value > 0 || (cell.options & (1 << value)) === 0) continue;

      cell.options &= ~(1 << value); // unset option
      affectedIndices.push(candidateIndices[i]); // add candidate to affected

      // After operation, if no more options, invalid move, restore and signal back
      if (cell.options === 0) {
        this.restoreOptions(grid, affectedIndices, value);

        return null;
      }
    }

    return affectedIndices;
  },

  restoreOptions(grid: Grid, affectedIndices: number[], value: number): void {
    for (let i: number = 0; i < affectedIndices.length; i++) {
      const cell: Cell = grid[affectedIndices[i]];
      cell.options |= 1 << value;
    }
  },
};

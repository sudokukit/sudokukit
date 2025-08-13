import { GRID_SIZE, MAX_VALUE, MIN_VALUE, ValueMask } from '@sudokukit/constants';
import { Cell } from '@sudokukit/interfaces';
import { BOX_LUT, COLUMN_LUT, ROW_LUT } from '@sudokukit/luts';
import { Bitmask, Grid } from '@sudokukit/types';
import { IndexHelper } from './index.helper';

export const GridHelper = {
  newGrid(): Grid {
    const grid: Grid = new Array<Cell>(GRID_SIZE);
    for (let i: number = 0; i < GRID_SIZE; i++) {
      grid[i] = { value: 0, candidates: 0, options: ValueMask, affected: [] };
    }
    return grid;
  },

  setSimpleValue(grid: Grid, index: number, newValue: number): boolean {
    const cell: Cell = grid[index];
    cell.value = newValue;
    cell.candidates &= ~(1 << newValue);

    const possibleAffectedIndices: number[] = [
      ...ROW_LUT[IndexHelper.getRow(index)],
      ...COLUMN_LUT[IndexHelper.getColumn(index)],
      ...BOX_LUT[IndexHelper.getBox(index)],
    ];

    const affectedIndices: number[] | null = this.removeOptions(grid, possibleAffectedIndices, newValue);

    cell.affected = affectedIndices ?? [];
    return affectedIndices !== null;
  },

  removeOptions(grid: Grid, candidateIndices: number[], value: number): number[] | null {
    const affectedIndices: number[] = [];
    const length: number = candidateIndices.length; // cache for performance
    for (let i: number = 0; i < length; i++) {
      const cell: Cell = grid[candidateIndices[i]];

      // If value is set or option is unset
      if (cell.value !== 0 || (cell.options & (1 << value)) === 0) continue;

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
    const length: number = affectedIndices.length;
    for (let i: number = 0; i < length; i++) {
      const cell: Cell = grid[affectedIndices[i]];
      cell.options |= 1 << value;
    }
  },

  selectRandomCandidate(candidates: Bitmask): number {
    const numberOfCandidates: number = (candidates & ValueMask).toString(2).split('1').length - 1;
    const randomCandidateIndex: number = Math.floor(Math.random() * numberOfCandidates);

    let bitCount: number = 0;
    for (let value: number = MIN_VALUE; value <= MAX_VALUE; value++) {
      if (candidates & (1 << value) && bitCount++ === randomCandidateIndex) {
        return value;
      }
    }
    return 0;
  },
};

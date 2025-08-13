import { CellIndices, GRID_SIZE, MAX_VALUE, MIN_VALUE, ValueMask } from '@sudokukit/constants';
import { BOX_LUT, COLUMN_LUT, ROW_LUT } from '@sudokukit/luts';
import { Bitmask, Cell, Grid } from '@sudokukit/types';
import { IndexHelper } from './index.helper';

export const GridHelper = {
  newGrid(): Grid {
    const grid: Grid = new Array<Cell>(GRID_SIZE);
    for (let i: number = 0; i < GRID_SIZE; i++) {
      grid[i] = [0, ValueMask, ValueMask, [], false];
    }
    return grid;
  },

  setSimpleValue(grid: Grid, index: number, newValue: number): boolean {
    const cell: Cell = grid[index];
    cell[CellIndices.Value] = newValue;
    cell[CellIndices.Candidates] &= ~(1 << newValue);

    const possibleAffectedIndices: number[] = [
      ...ROW_LUT[IndexHelper.getRow(index)],
      ...COLUMN_LUT[IndexHelper.getColumn(index)],
      ...BOX_LUT[IndexHelper.getBox(index)],
    ];

    const affectedIndices: number[] | null = this.removeOptions(grid, possibleAffectedIndices, newValue);

    cell[CellIndices.Affected] = affectedIndices ?? [];
    return affectedIndices !== null;
  },

  removeOptions(grid: Grid, candidateIndices: number[], value: number): number[] | null {
    const affectedIndices: number[] = [];
    const length: number = candidateIndices.length; // cache for performance
    for (let i: number = 0; i < length; i++) {
      const cell: Cell = grid[candidateIndices[i]];

      // If value is set or option is unset
      if (cell[CellIndices.Value] !== 0 || (cell[CellIndices.Options] & (1 << value)) === 0) continue;

      cell[CellIndices.Options] &= ~(1 << value); // unset option
      affectedIndices.push(candidateIndices[i]); // add candidate to affected

      // After operation, if no more options, invalid move, restore and signal back
      if (cell[CellIndices.Options] === 0) {
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
      cell[CellIndices.Options] |= 1 << value;
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

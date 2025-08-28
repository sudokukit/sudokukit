import { SudokuString } from '../types';

export function hasValidBound(sudoku: SudokuString, indices: number[], minBound: number): boolean {
  let count: number = 0;

  for (const index of indices) {
    if (sudoku[index] !== '.') count++;
  }

  return count > minBound; // not >= because the current cell is still filled
}

import { AFFECTED_INDICES_LUT } from '../luts';
import { Bitmask, SudokuString } from '../types';

export function getCandidates(sudoku: SudokuString, index: number): Bitmask {
  const affectedIndices: number[] = AFFECTED_INDICES_LUT[index];
  let mask: Bitmask = 0b1111111110;

  for (let affectedIndex: number = 0; affectedIndex < affectedIndices.length; affectedIndex++) {
    const value: string = sudoku[affectedIndices[affectedIndex]];
    if (value !== '.') mask &= ~(1 << Number(value));
  }
  mask &= ~(1 << Number(sudoku[index])); // Unset self

  return mask;
}

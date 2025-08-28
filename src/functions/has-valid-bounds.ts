import { BOX_INDEX_LUT, BOX_LUT, COLUMN_LUT, ROW_LUT } from '../luts';
import { SudokuString } from '../types';
import { hasValidBound } from './has-valid-bound';

export function hasValidBounds(sudoku: SudokuString, index: number, minBound: number): boolean {
  if (minBound < 1) return true;

  return (
    hasValidBound(sudoku, ROW_LUT[Math.floor(index / 9)], minBound) &&
    hasValidBound(sudoku, COLUMN_LUT[index % 9], minBound) &&
    hasValidBound(sudoku, BOX_LUT[BOX_INDEX_LUT[index]], minBound)
  );
}

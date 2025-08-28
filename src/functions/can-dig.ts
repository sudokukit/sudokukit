import { convertToGrid } from '../converters';
import { Bitmask, Grid, SudokuString } from '../types';
import { bitmaskToArray } from './bitmask-to-array';
import { getCandidates } from './get-candidates';
import { hasValidBounds } from './has-valid-bounds';
import { replaceCharacterAt } from './replace-character-at';
import { solve } from './solve';

export function canDig(sudoku: SudokuString, index: number, minBound: number): boolean {
  if (!hasValidBounds(sudoku, index, minBound)) return false;

  const candidateMask: Bitmask = getCandidates(sudoku, index);

  if (candidateMask === 0) return true;

  const candidates: number[] = bitmaskToArray(candidateMask);

  let grid: Grid;

  for (let candidateIndex: number = 0; candidateIndex < candidates.length; candidateIndex++) {
    const value: number = candidates[candidateIndex];

    const candidateSudoku: SudokuString = replaceCharacterAt(sudoku, index, String(value));
    grid = convertToGrid(candidateSudoku);

    if (solve(grid)) return false;
  }

  return true;
}

import { SudokuString } from '../types';
import { canDig } from './can-dig';
import { getIndices } from './get-indices';
import { replaceCharacterAt } from './replace-character-at';
import { shuffle } from './shuffle';

export function digHoles(sudoku: SudokuString, numberOfHoles: number, minBound: number): SudokuString {
  const indices: number[] = getIndices();
  shuffle(indices);

  for (let holeIndex: number = 0; holeIndex < numberOfHoles; holeIndex++) {
    const candidateIndex: number = indices[holeIndex];
    if (canDig(sudoku, candidateIndex, minBound)) sudoku = replaceCharacterAt(sudoku, candidateIndex, '.');
  }

  return sudoku;
}

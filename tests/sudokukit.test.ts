import { describe, expect, test } from 'vitest';
import { SudokuKit, SudokuString } from '../src';

describe('SudokuKit', () => {
  test('generateSolution()', () => {
    const solution: SudokuString = SudokuKit.generateSolution();

    expect(solution.length).toBe(81);
    expect(solution.includes('.')).toBe(false);
  });

  test('generateSolutions()', () => {
    const solutions: SudokuString[] = SudokuKit.generateSolutions(3);

    expect(solutions.length).toBe(3);
  });
});

import { describe, expect, test } from 'vitest';
import { MEDIUM_PUZZLE_1, MEDIUM_SOLUTION_1, SudokuKit, SudokuString } from '../src';

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

  test('solve()', () => {
    const solution: SudokuString = SudokuKit.solve(MEDIUM_PUZZLE_1);

    expect(solution).toBe(MEDIUM_SOLUTION_1);
  });
});

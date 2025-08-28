import { describe, expect, test } from 'vitest';
import {
  convertToGrid,
  Grid,
  MEDIUM_PUZZLE_1,
  MEDIUM_SOLUTION_1,
  multisolve,
  SudokuKit,
  SudokuString,
  WORLDS_HARDEST_SUDOKU_PUZZLE,
  WORLDS_HARDEST_SUDOKU_SOLUTION,
} from '../src';

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

  test("The World's Hardest Sudoku", () => {
    const solution: SudokuString = SudokuKit.solve(WORLDS_HARDEST_SUDOKU_PUZZLE);

    expect(solution).toBe(WORLDS_HARDEST_SUDOKU_SOLUTION);
  });

  test('generatePuzzle() - Default', () => {
    const puzzle: SudokuString = SudokuKit.generatePuzzle();

    expect(puzzle.length).toBe(81);
    expect(puzzle.split('').filter((character: string) => character === '.').length).toBeGreaterThan(0);
  });

  test('generatePuzzle() - Unique Puzzle', () => {
    const puzzle: SudokuString = SudokuKit.generatePuzzle({ holes: 81, bound: 0 });
    const grid: Grid = convertToGrid(puzzle);
    const results: SudokuString[] = multisolve(grid);

    expect(results.length).toBe(1);
  });

  test(`generatePuzzle() = Performance"`, () => {
    const numberOfIterations = 8000;

    let totalTime: number = 0;
    for (let i: number = 0; i < numberOfIterations; i++) {
      const start: number = performance.now();
      SudokuKit.generatePuzzle();
      const end: number = performance.now();
      totalTime += end - start;
    }

    const average: number = totalTime / numberOfIterations;
    const microseconds: number = Math.round(average * 1000);
    console.log('generatePuzzle() - Default - Performance');
    console.log(`Average time: ${microseconds} µs`);
    console.log(`Total time:   ${Math.round(totalTime)} ms`);

    expect(microseconds).toBeLessThan(2500);
  });
});

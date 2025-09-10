import { convertFromGrid, convertToGrid } from '../converters';
import { digHoles, newGrid, solve, solveEmpty } from '../functions';
import { PuzzleOptions } from '../interfaces';
import { Grid, SudokuString } from '../types';

export const SudokuKit = {
  generateSolution(): SudokuString {
    const grid: Grid = newGrid();
    solveEmpty(grid);

    return convertFromGrid(grid);
  },

  solve(sudoku: SudokuString): SudokuString {
    const grid: Grid = convertToGrid(sudoku);

    solve(grid);

    return convertFromGrid(grid);
  },

  generatePuzzle(options: PuzzleOptions = {}): SudokuString {
    const grid: Grid = newGrid();
    solveEmpty(grid);
    const solution: string = convertFromGrid(grid);

    const holes: number = options.holes ?? 30;
    const bound: number = options.bound ?? 3;

    return digHoles(solution, holes, bound);
  },
};

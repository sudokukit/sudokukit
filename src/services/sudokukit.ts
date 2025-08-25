import { convertGrid, convertToGrid } from '../converters';
import { newGrid, solve, solveEmpty } from '../functions';
import { Grid, SudokuString } from '../types';

export const SudokuKit = {
  generateSolution(): SudokuString {
    const grid: Grid = newGrid();
    solveEmpty(grid);

    return convertGrid(grid);
  },

  generateSolutions(amount: number): SudokuString[] {
    const solutions: SudokuString[] = new Array(amount);
    for (let index: number = 0; index < amount; index++) {
      solutions[index] = this.generateSolution();
    }
    return solutions;
  },

  solve(sudoku: SudokuString): SudokuString {
    const grid: Grid = convertToGrid(sudoku);

    solve(grid);

    return convertGrid(grid);
  },
};

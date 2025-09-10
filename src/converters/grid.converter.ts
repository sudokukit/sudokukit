import { newGrid, setGivenValue } from '../functions';
import { Cell } from '../interfaces';
import { Grid, SudokuString } from '../types';

export function convertFromGrid(grid: Grid): SudokuString {
  const values = new Array(81);
  for (let i: number = 0; i < 81; i++) {
    const cell: Cell = grid[i];
    values[i] = !cell.value ? '.' : cell.value;
  }
  return values.join('');
}

export function convertToGrid(sudokuString: SudokuString): Grid {
  const grid: Grid = newGrid();
  for (let i: number = 0; i < 81; i++) {
    if (sudokuString[i] === '.') continue;

    setGivenValue(grid, i, Number(sudokuString[i]));
  }
  return grid;
}

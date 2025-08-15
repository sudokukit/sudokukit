import { Cell } from '@sudokukit/interfaces';
import { Grid } from '@sudokukit/types';

export function newGrid(): Grid {
  const grid: Grid = new Array<Cell>(81);
  for (let i: number = 0; i < 81; i++) {
    grid[i] = { value: 0, candidates: [], options: 0b1111111110, affected: [], given: false };
  }
  return grid;
}

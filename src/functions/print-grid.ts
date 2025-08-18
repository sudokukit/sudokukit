import { Cell } from '../interfaces';
import { Grid } from '../types';
import { bitmaskToArray } from './bitmask-to-array';

export function printGrid(grid: Grid): void {
  for (let index: number = 0; index < 81; index++) {
    const cell: Cell = grid[index];
    if (cell.given) console.log(`${index < 10 ? ' ' : ''}${index}: ${cell.value}`);
    else console.log(`${index}: [${bitmaskToArray(cell.options)}]`);
  }
}

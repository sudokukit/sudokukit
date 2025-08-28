import { Cell } from '../interfaces';
import { AFFECTED_INDICES_LUT } from '../luts';
import { Grid } from '../types';
import { removeGivenOptions } from './remove-given-options';

export function setGivenValue(grid: Grid, index: number, value: number): void {
  const cell: Cell = grid[index];
  cell.value = value;
  cell.given = true;
  cell.options = 0;
  removeGivenOptions(grid, AFFECTED_INDICES_LUT[index], value);
}

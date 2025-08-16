import { LOOKAHEAD_AFFECTED_INDICES } from '@sudokukit/luts';
import { Grid } from '@sudokukit/types';
import { removeCellOptions } from './remove-cell-options';

export function setGridValue(grid: Grid, index: number, value: number): boolean {
  grid[index].value = value;
  const affectedIndices: number[] | null = removeCellOptions(grid, LOOKAHEAD_AFFECTED_INDICES[index], value);

  if (affectedIndices === null) return false;

  grid[index].affected = affectedIndices;

  return true;
}

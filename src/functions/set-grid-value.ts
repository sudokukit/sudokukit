import { Cell } from '@sudokukit/interfaces';
import { AFFECTED_INDICES } from '@sudokukit/luts';
import { Grid } from '@sudokukit/types';
import { removeCellOptions } from './remove-cell-options';

export function setGridValue(grid: Grid, index: number, value: number): boolean {
  const cell: Cell = grid[index];
  cell.value = value;

  const possibleAffectedIndices: number[] = AFFECTED_INDICES[index];

  const affectedIndices: number[] | null = removeCellOptions(grid, possibleAffectedIndices, value);

  if (affectedIndices === null) return false;

  cell.affected = affectedIndices;
  return true;
}

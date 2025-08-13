import { GRID_SIZE } from '@sudokukit/constants';
import { convertSimpleGrid } from '@sudokukit/converters';
import { GridHelper } from '@sudokukit/helpers';
import { Cell } from '@sudokukit/interfaces';
import { Grid } from '@sudokukit/types';

export function generateSolution(): string {
  const grid: Grid = GridHelper.newGrid();

  for (let index: number = 0; index < GRID_SIZE; index++) {
    const cell: Cell = grid[index];

    if (cell.value === 0) {
      cell.candidates = cell.options;
    }

    if (cell.value > 0) {
      GridHelper.restoreOptions(grid, cell.affected, cell.value);
      cell.affected = [];
    }

    if (cell.candidates === 0) {
      cell.value = 0;
      index -= 2;
      continue;
    }

    const candidate: number = GridHelper.selectRandomCandidate(cell.candidates);
    const result: boolean = GridHelper.setSimpleValue(grid, index, candidate);

    if (!result) index--;
  }

  return convertSimpleGrid(grid);
}

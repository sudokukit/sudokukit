import { CellIndices, GRID_SIZE } from '@sudokukit/constants';
import { convertSimpleGrid } from '@sudokukit/converters';
import { GridHelper } from '@sudokukit/helpers';
import { Cell, Grid } from '@sudokukit/types';

export function generateSolution(): string {
  const grid: Grid = GridHelper.newGrid();

  for (let index: number = 0; index < GRID_SIZE; index++) {
    const cell: Cell = grid[index];

    if (cell[CellIndices.Value] === 0) {
      cell[CellIndices.Candidates] = cell[CellIndices.Options];
    }

    if (cell[CellIndices.Value] > 0) {
      GridHelper.restoreOptions(grid, cell[CellIndices.Affected], cell[CellIndices.Value]);
      cell[CellIndices.Affected] = [];
    }

    if (cell[CellIndices.Candidates] === 0) {
      cell[CellIndices.Value] = 0;
      index -= 2;
      continue;
    }

    const candidate: number = GridHelper.selectRandomCandidate(cell[CellIndices.Candidates]);
    const result: boolean = GridHelper.setSimpleValue(grid, index, candidate);

    if (!result) index--;
  }

  return convertSimpleGrid(grid);
}

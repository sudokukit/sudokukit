import { ArrayHelper, BitmaskHelper, GridHelper } from '@sudokukit/helpers';
import { Cell } from '@sudokukit/interfaces';
import { Grid } from '@sudokukit/types';

export function solveEmpty(grid: Grid): void {
  for (let index: number = 0; index < 81; index++) {
    const cell: Cell = grid[index];

    if (cell.value === 0) {
      cell.candidates = BitmaskHelper.toArray(cell.options);
      ArrayHelper.shuffle(cell.candidates);
    }

    if (cell.value > 0) {
      GridHelper.restoreOptions(grid, cell.affected, cell.value);
      cell.affected = [];
    }

    if (cell.candidates.length === 0) {
      cell.value = 0;
      index -= 2;
      continue;
    }

    const candidate: number = cell.candidates.pop() as number;
    const result: boolean = GridHelper.setValue(grid, index, candidate);

    if (!result) index--;
  }
}

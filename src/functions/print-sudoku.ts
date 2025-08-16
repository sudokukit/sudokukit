import { Cell } from '@sudokukit/interfaces';
import { Grid } from '@sudokukit/types';

export function printSudoku(grid: Grid): void {
  for (let row: number = 0; row < 9; row++) {
    const rowValues: string[] = grid
      .slice(row * 9, (row + 1) * 9)
      .map((cell: Cell): string => (cell.value === 0 ? '.' : String(cell.value)));
    console.log(rowValues.join(' '));
  }
}

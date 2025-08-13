import { ROW_SIZE } from '@sudokukit/constants';
import { BOX_INDEX_LUT } from '@sudokukit/luts';

export const IndexHelper = {
  getRow(index: number): number {
    return Math.floor(index / ROW_SIZE);
  },

  getColumn(index: number): number {
    return index % ROW_SIZE;
  },

  getBox(index: number): number {
    return BOX_INDEX_LUT[index];
  },
};

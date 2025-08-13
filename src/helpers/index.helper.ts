import { BOX_INDEX_LUT } from '@sudokukit/luts';

export const IndexHelper = {
  getRow(index: number): number {
    return Math.floor(index / 9);
  },

  getColumn(index: number): number {
    return index % 9;
  },

  getBox(index: number): number {
    return BOX_INDEX_LUT[index];
  },
};

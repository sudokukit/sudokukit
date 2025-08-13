import { Bitmask } from '@sudokukit/types';

export interface Cell {
  value: number;
  candidates: Bitmask;
  options: Bitmask;
  affected: number[];
}

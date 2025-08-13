import { Bitmask } from '@sudokukit/types';

export interface Cell {
  value: number;
  candidates: number[];
  options: Bitmask;
  affected: number[];
}

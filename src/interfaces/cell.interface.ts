import { Bitmask } from '../types';

export interface Cell {
  value: number;
  candidates: number[];
  options: Bitmask;
  affected: number[];
  given: boolean;
}

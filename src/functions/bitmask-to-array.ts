import { Bitmask } from '@sudokukit/types';

export function bitmaskToArray(mask: Bitmask): number[] {
  const array: number[] = [];
  for (let value: number = 1; value <= 9; value++) {
    if ((mask & (1 << value)) !== 0) {
      array.push(value);
    }
  }
  return array;
}

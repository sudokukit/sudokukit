export function getIndices(): number[] {
  const array = new Array(81);
  for (let index: number = 0; index < 81; index++) {
    array[index] = index;
  }
  return array;
}

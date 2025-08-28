export function replaceCharacterAt(string: string, index: number, character: string): string {
  const array: string[] = string.split('');
  array[index] = character;
  return array.join('');
}

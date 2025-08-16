export function bitmaskToString(mask: number, length: number = 10): string {
  return '0b' + mask.toString(2).padStart(length, '0');
}

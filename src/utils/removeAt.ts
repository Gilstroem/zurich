export function removeAt<T>(array: T[], index: number) {
  return array.slice(0, index).concat(array.slice(index + 1));
}

export function pickRandomFrom<T>(arr: T[], n: number = 1) {
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    result.push(arr[Math.floor(Math.random() * (arr.length + 1))]);
  }
  return result;
}

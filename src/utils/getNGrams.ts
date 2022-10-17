export function getNGrams(n: number, string: string) {
  const grams: string[] = [];
  for (let i = 0; i <= string.length - n; i++) {
    const gram = string.substring(i, n + i);
    grams.push(gram);
  }

  return grams;
}

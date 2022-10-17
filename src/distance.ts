import { jaccard } from "./utils/jaccard";
import { mergeDefaultAndArgOptions } from "./utils/mergeDefaultAndArgOptions";
import { Options } from "./types";

export function distance(
  a: string,
  b: string,
  optionsArg?: Partial<Options>
): number {
  const { n, caseSensitive } = mergeDefaultAndArgOptions(optionsArg);

  const aString = caseSensitive ? a : a.toLowerCase();
  const bString = caseSensitive ? b : b.toLowerCase();

  const aBigrams = getNGrams(n, aString);
  const bBigrams = getNGrams(n, bString);
  return jaccard(aBigrams, bBigrams);
}

function getNGrams(n: number, string: string) {
  const grams: string[] = [];
  for (let i = 0; i <= string.length - n; i++) {
    const gram = string.substring(i, n + i);
    grams.push(gram);
  }

  return grams;
}

import { jaccard } from "./utils/jaccard";
import { mergeDefaultAndArgOptions } from "./utils/mergeDefaultAndArgOptions";
import { Options } from "./types";
import { getNGrams } from "./utils/getNGrams";

export function distance(
  a: string,
  b: string,
  optionsArg?: Partial<Pick<Options, "caseSensitive" | "n">>
): number {
  const { n, caseSensitive } = mergeDefaultAndArgOptions(optionsArg);

  const aString = caseSensitive ? a : a.toLowerCase();
  const bString = caseSensitive ? b : b.toLowerCase();

  const aBigrams = getNGrams(n, aString);
  const bBigrams = getNGrams(n, bString);
  return jaccard(aBigrams, bBigrams);
}

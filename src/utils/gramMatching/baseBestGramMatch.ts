import { Options } from "../../types";
import { getNGrams } from "../getNGrams";
import { jaccard } from "../jaccard";

function baseBestGramMatch<T>(
  str: string,
  other: T[],
  options: Options,
  returnsIndex: true,
  getOther?: (other: T) => string
): number | null;
function baseBestGramMatch<T>(
  str: string,
  other: T[],
  options: Options,
  returnsIndex: false,
  getOther?: (other: T) => string
): T | null;
function baseBestGramMatch<T>(
  str: string,
  other: T[],
  options: Options,
  returnsIndex: boolean,
  getOther?: (other: T) => string
): T | number | null {
  if (str.length === 0 || other.length === 0) return null;
  const { n, caseSensitive } = options;

  const aString = caseSensitive ? str : str.toLowerCase();
  const aGrams = getNGrams(n, aString);

  let closestIndex: number | null = null;
  let closestDistance = 1;

  for (let i = 0; i < other.length; i++) {
    const b = getOther?.(other[i]) ?? other[i];
    if (!b || typeof b !== "string") continue;
    const bString = caseSensitive ? b : b.toLowerCase();
    const bGrams = getNGrams(n, bString);
    const distance = jaccard(aGrams, bGrams);
    if (distance < closestDistance) {
      closestIndex = i;
      closestDistance = distance;
    }
  }

  if (returnsIndex) {
    return closestIndex;
  }

  return closestIndex === null ? null : other[closestIndex];
}

export { baseBestGramMatch };

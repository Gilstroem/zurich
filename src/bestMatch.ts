import { mergeDefaultAndArgOptions } from "./utils/mergeDefaultAndArgOptions";
import { Options } from "./types";
import { getMultipleGramMatches } from "./utils/getMultipleGramMatches";
import { getBestGramMatch } from "./utils/getBestGramMatch";

/* The overloads help TS determine whether the function will return `string` or `string[]` */

function bestMatch(
  str: string,
  other: string[],
  optionsArg?: { returnCount: 1 } & Partial<Options>
): string | null;
function bestMatch(
  str: string,
  other: string[],
  optionsArg?: Partial<Options>
): string[] | null;
function bestMatch(
  str: string,
  other: string[],
  optionsArg?: Partial<Options>
): string | string[] | null {
  if (str.length === 0 || other.length === 0) return null;

  const options = mergeDefaultAndArgOptions(optionsArg);

  if (options.returnCount > 1)
    return getMultipleGramMatches(str, other, options);

  return getBestGramMatch(str, other, options);
}

export { bestMatch };

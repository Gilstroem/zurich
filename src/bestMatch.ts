import { bestGramMatch } from "./utils/gramMatching";
import { mergeDefaultAndArgOptions } from "./utils/mergeDefaultAndArgOptions";
import { Options } from "./types";
import { getMultipleGramMatches } from "./utils/getMultipleGramMatches";

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
  const options = mergeDefaultAndArgOptions(optionsArg);

  if (options.returnCount > 1)
    return getMultipleGramMatches(str, other, options);

  return bestGramMatch(str, other, options);
}

export { bestMatch };

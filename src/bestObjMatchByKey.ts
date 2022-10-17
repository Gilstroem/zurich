import { bestGramMatch } from "./utils/gramMatching";
import { mergeDefaultAndArgOptions } from "./utils/mergeDefaultAndArgOptions";
import { Options } from "./types";
import { getMultipleGramMatches } from "./utils/getMultipleGramMatches";

export type OtherBase = { [key: string]: any | undefined };

/* The overloads help TS determine whether the function will return `Other` or `Other[]` */

function bestObjMatchByKey<Other extends OtherBase>(
  str: string,
  other: Other[],
  key: keyof Other,
  optionsArg?: { returnCount: 1 } & Partial<Options>
): Other | null;
function bestObjMatchByKey<Other extends OtherBase>(
  str: string,
  other: Other[],
  key: keyof Other,
  optionsArg?: Partial<Options>
): Other[] | null;
function bestObjMatchByKey<Other extends OtherBase>(
  str: string,
  other: Other[],
  key: keyof Other,
  optionsArg?: Partial<Options>
): Other | Other[] | null {
  const options = mergeDefaultAndArgOptions(optionsArg);

  if (options.returnCount > 1)
    return getMultipleGramMatches(str, other, options, (other) => other[key]);

  return bestGramMatch(str, other, options, (other) => other[key]);
}

export { bestObjMatchByKey };

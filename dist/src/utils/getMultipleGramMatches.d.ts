import { GetOtherFn, Options } from "../types";
export declare function getMultipleGramMatches<T>(str: string, other: T[], options: Options, getOther?: GetOtherFn<T>): T[] | null;

import { Options } from "./types";
declare function bestMatch(str: string, other: string[], optionsArg?: {
    returnCount: 1;
} & Partial<Options>): string | null;
declare function bestMatch(str: string, other: string[], optionsArg?: Partial<Options>): string[] | null;
export { bestMatch };

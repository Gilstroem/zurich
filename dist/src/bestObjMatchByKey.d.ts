import { Options } from "./types";
export declare type OtherBase = {
    [key: string]: any | undefined;
};
declare function bestObjMatchByKey<Other extends OtherBase>(str: string, other: Other[], key: keyof Other, optionsArg?: {
    returnCount: 1;
} & Partial<Options>): Other | null;
declare function bestObjMatchByKey<Other extends OtherBase>(str: string, other: Other[], key: keyof Other, optionsArg?: Partial<Options>): Other[] | null;
export { bestObjMatchByKey };

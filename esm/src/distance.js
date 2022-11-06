import { jaccard } from "./utils/jaccard";
import { mergeDefaultAndArgOptions } from "./utils/mergeDefaultAndArgOptions";
import { getNGrams } from "./utils/getNGrams";
export function distance(a, b, optionsArg) {
    var _a = mergeDefaultAndArgOptions(optionsArg), n = _a.n, caseSensitive = _a.caseSensitive;
    var aString = caseSensitive ? a : a.toLowerCase();
    var bString = caseSensitive ? b : b.toLowerCase();
    var aBigrams = getNGrams(n, aString);
    var bBigrams = getNGrams(n, bString);
    return jaccard(aBigrams, bBigrams);
}

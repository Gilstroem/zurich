import { getNGrams } from "./getNGrams";
import { jaccard } from "./jaccard";
export function getBestGramMatch(str, other, options, getOther) {
    var _a;
    if (str.length === 0 || other.length === 0)
        return null;
    var n = options.n, caseSensitive = options.caseSensitive;
    var aString = caseSensitive ? str : str.toLowerCase();
    var aGrams = getNGrams(n, aString);
    var closestIndex = null;
    var closestDistance = 1;
    for (var i = 0; i < other.length; i++) {
        var b = (_a = getOther === null || getOther === void 0 ? void 0 : getOther(other[i])) !== null && _a !== void 0 ? _a : other[i];
        if (!b || typeof b !== "string")
            continue;
        var bString = caseSensitive ? b : b.toLowerCase();
        var bGrams = getNGrams(n, bString);
        var distance = jaccard(aGrams, bGrams);
        if (distance < closestDistance) {
            closestIndex = i;
            closestDistance = distance;
        }
    }
    return closestIndex === null ? null : other[closestIndex];
}

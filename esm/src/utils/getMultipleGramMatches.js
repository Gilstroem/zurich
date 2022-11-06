import { distance } from "../distance";
import { SortedBucket } from "./sortedBucket";
export function getMultipleGramMatches(str, other, options, getOther) {
    var _a;
    var bucket = new SortedBucket();
    for (var i = 0; i < other.length; i++) {
        var b = (_a = getOther === null || getOther === void 0 ? void 0 : getOther(other[i])) !== null && _a !== void 0 ? _a : other[i];
        if (!b || typeof b !== "string")
            continue;
        bucket.insert(distance(str, b, options), other[i]);
    }
    var results = bucket.get();
    if (arrayIsEmpty(results))
        return null;
    return results.slice(0, options.returnCount);
}
function arrayIsEmpty(arr) {
    return arr.length === 0;
}

import { indexOfBestGramMatch } from "./gramMatching";
import { removeAt } from "./removeAt";
export function getMultipleGramMatches(str, other, options, getOther) {
    var remainingOther = other;
    var results = [];
    for (var i = 0; i < options.returnCount; i++) {
        var i_1 = indexOfBestGramMatch(str, remainingOther, options, getOther);
        if (i_1 === null || i_1 === -1)
            continue;
        results.push(remainingOther[i_1]);
        remainingOther = removeAt(remainingOther, i_1);
    }
    if (arrayIsEmpty(results))
        return null;
    return results;
}
function arrayIsEmpty(arr) {
    return arr.length === 0;
}

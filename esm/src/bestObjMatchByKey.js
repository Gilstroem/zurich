import { mergeDefaultAndArgOptions } from "./utils/mergeDefaultAndArgOptions";
import { getBestGramMatch } from "./utils/getBestGramMatch";
import { getMultipleGramMatches } from "./utils/getMultipleGramMatches";
function bestObjMatchByKey(str, other, key, optionsArg) {
    if (str.length === 0 || other.length === 0)
        return null;
    var options = mergeDefaultAndArgOptions(optionsArg);
    if (options.returnCount > 1)
        return getMultipleGramMatches(str, other, options, function (other) { return other[key]; });
    return getBestGramMatch(str, other, options, function (other) { return other[key]; });
}
export { bestObjMatchByKey };

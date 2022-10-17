import { bestGramMatch } from "./utils/gramMatching";
import { mergeDefaultAndArgOptions } from "./utils/mergeDefaultAndArgOptions";
import { getMultipleGramMatches } from "./utils/getMultipleGramMatches";
function bestObjMatchByKey(str, other, key, optionsArg) {
    var options = mergeDefaultAndArgOptions(optionsArg);
    if (options.returnCount > 1)
        return getMultipleGramMatches(str, other, options, function (other) { return other[key]; });
    return bestGramMatch(str, other, options, function (other) { return other[key]; });
}
export { bestObjMatchByKey };

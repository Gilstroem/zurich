import { mergeDefaultAndArgOptions } from "./utils/mergeDefaultAndArgOptions";
import { getMultipleGramMatches } from "./utils/getMultipleGramMatches";
import { getBestGramMatch } from "./utils/getBestGramMatch";
function bestMatch(str, other, optionsArg) {
    if (str.length === 0 || other.length === 0)
        return null;
    var options = mergeDefaultAndArgOptions(optionsArg);
    if (options.returnCount > 1)
        return getMultipleGramMatches(str, other, options);
    return getBestGramMatch(str, other, options);
}
export { bestMatch };

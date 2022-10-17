import { bestGramMatch } from "./utils/gramMatching";
import { mergeDefaultAndArgOptions } from "./utils/mergeDefaultAndArgOptions";
import { getMultipleGramMatches } from "./utils/getMultipleGramMatches";
function bestMatch(str, other, optionsArg) {
    var options = mergeDefaultAndArgOptions(optionsArg);
    if (options.returnCount > 1)
        return getMultipleGramMatches(str, other, options);
    return bestGramMatch(str, other, options);
}
export { bestMatch };

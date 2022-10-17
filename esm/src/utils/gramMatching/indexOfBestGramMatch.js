import { baseBestGramMatch } from "./baseBestGramMatch";
export function indexOfBestGramMatch(str, other, options, getOther) {
    return baseBestGramMatch(str, other, options, true, getOther);
}

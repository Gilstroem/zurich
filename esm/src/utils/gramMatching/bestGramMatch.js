import { baseBestGramMatch } from "./baseBestGramMatch";
export function bestGramMatch(str, other, options, getOther) {
    return baseBestGramMatch(str, other, options, false, getOther);
}

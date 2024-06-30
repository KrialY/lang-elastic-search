import { ContextTracker } from "@lezer/lr";
import { STATE_ENUM } from "./state";
import { Method, Endpoint, ESIndex, UrlParamQuestion } from "./syntax.grammar.terms";

export default new ContextTracker({
  start: STATE_ENUM.METHOD,
  shift(context, term, stack, input) {
    if (term === Method) {
      return STATE_ENUM.PATH_START
    } else if (term === ESIndex) {
      return STATE_ENUM.PATH_ENDPOINT
    } else if (term === Endpoint) {
      return STATE_ENUM.PATH_ENDPOINT
    } else if (term === UrlParamQuestion) {
      return STATE_ENUM.URL_PARAMS_KEY
    }
    return context
  }
})

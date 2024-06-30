import { ContextTracker } from "@lezer/lr";
import { STATE_ENUM } from "./state";

export default new ContextTracker({
  start: STATE_ENUM.METHOD,
  shift(context, term, stack, input) {
    if (term === STATE_ENUM.METHOD) {
      return STATE_ENUM.PATH_ENDPOINT
    }
    return context
  }
})

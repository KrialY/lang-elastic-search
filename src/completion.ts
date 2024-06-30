import { LRLanguage } from "@codemirror/language";
import { completeFromList, Completion, CompletionContext, CompletionSource, ifIn } from "@codemirror/autocomplete"
import { esStatueInstance, STATE_ENUM } from "./state";
import { methods } from "./tokens/method";
import { endpoints } from "./tokens/endpoints";
import { esIndics } from "./tokens/esIndex";
import { getTokensBeforePosition } from "./tokenUtils";

export function esCompletion(language: LRLanguage) {
  return language.data.of({
    autocomplete: completeES()
  })
}

function completeES() {
  return (context: CompletionContext) => {
    let completionList: Completion[] = []

    const methodList = methods.map((method) => {
      return {
        label: method,
        type: 'method',
        boost: -1
      }
    })
    const endpointList = Object.keys(endpoints).map((endpoint) => {
      return {
        label: endpoint,
        type: 'keyword',
        boost: -1
      }
    })
    const esIndexList = Object.keys(esIndics).map((esIndex) => {
      return {
        label: esIndex,
        type: 'text',
        boost: -1
      }
    })

    const { currentState } = esStatueInstance ?? {}
    if (currentState === STATE_ENUM.METHOD) {
      completionList = methodList
    } else if (currentState === STATE_ENUM.PATH_START) {
      completionList = [...endpointList, ...esIndexList]
    } else if (currentState === STATE_ENUM.PATH_ENDPOINT) {
      completionList = endpointList
    }
    const esSource: CompletionSource = completeFromList(completionList)
    const tokens = getTokensBeforePosition(context.state, context.pos)
    console.log(tokens, currentState, 'context.pos')
    return esSource(context);
  };
}
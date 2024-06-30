import { LRLanguage } from "@codemirror/language";
import { completeFromList, Completion, CompletionContext, CompletionSource, ifIn } from "@codemirror/autocomplete"
import { esStatueInstance, STATE_ENUM } from "./state";
import { methods } from "./tokens/method";

export function esCompletion(language: LRLanguage) {
  return language.data.of({
    autocomplete: completeES()
  })
}

function completeES() {
  let completionList: Completion[] = []

  const methodList = methods.map((method) => {
    return {
      label: method,
      type: 'variable',
      boost: -1
    }
  })
  const { currentState } = esStatueInstance ?? {}
  console.log(currentState, 'currentState')
  if (currentState === STATE_ENUM.METHOD) {
    completionList = methodList
  }
  const esSource: CompletionSource = completeFromList(completionList)

  return (context: CompletionContext) => {
    return esSource(context);
  };
}
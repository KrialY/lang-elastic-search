import { LRLanguage } from "@codemirror/language";
import { completeFromList, Completion, CompletionContext, CompletionSource, ifIn } from "@codemirror/autocomplete"
import { getTokensBeforePosition } from "./tokenUtils";
import { apiTree, getTreeNodesByPath } from "./apiTree";

export function esCompletion(language: LRLanguage) {
  return language.data.of({
    autocomplete: completeES()
  })
}

function getCompletionListByNode(node: any, currentToken: any) {
  const res: any = []
  node?.children?.forEach?.((item: any) => {
    const { type } = item ?? {}
    if (type === 'ESIndex') {
      const indicsCompletionList = item.indics.map((i: any) => {
        return {
          label: i,
          type: 'text',
          boost: -1
        }
      })
      res.push(...indicsCompletionList)
    } else if (type === 'urlParams') {
      res.push({
        label: item.key,
        type: 'text',
        boost: -1
      })
    } else {
      res.push({
        label: item.name,
        type: 'keyword',
        boost: -1
      })
    }
  }) ?? []
  return res
}

function completeES() {
  return (context: CompletionContext) => {
    let completionList: Completion[] = []
    const tokens = getTokensBeforePosition(context.state, context.pos)
    const filteredTokens = tokens.filter((item: any) => ['Method', 'Endpoint', 'ESIndex', 'UrlParamKey', 'UrlParamValue'].includes(item.type))
    const currentToken = filteredTokens[filteredTokens.length - 1]
    const node = getTreeNodesByPath(apiTree, filteredTokens)
    // console.log(tokens, currentState, node, apiTree, 'context.pos')
    const completionListRes = getCompletionListByNode(node, currentToken)


    console.log(completionListRes, 'completionListRes')

    completionList = completionListRes
    const esSource: CompletionSource = completeFromList(completionList)
    return esSource(context);
  };
}
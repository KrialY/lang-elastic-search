import { LRLanguage } from "@codemirror/language";
import { completeFromList, Completion, CompletionContext, CompletionSource, ifIn } from "@codemirror/autocomplete"
import { getTokensBeforePosition } from "./tokenUtils";
import { apiTree, getTreeNodesByPath } from "./apiTree";
import { NodeTypeEnum } from "./completionNode/baseNode";

export function esCompletion(language: LRLanguage) {
  return language.data.of({
    autocomplete: completeES()
  })
}

function getCompletionListByNode(node: any, currentToken: any) {
  const res: any = []
  console.log(node, 'node')
  node?.children?.forEach?.((item: any) => {
    const { type } = item ?? {}
    if (type === NodeTypeEnum.ESIndex) {
      const indicsCompletionList = item.indics.map((i: any) => {
        return {
          label: i,
          type: 'text',
          boost: -1
        }
      })
      res.push(...indicsCompletionList)
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
    const tokens = getTokensBeforePosition(context.state, context.pos)
    const filteredTokens = tokens.filter((item: any) => ['Method', 'Endpoint', 'ESIndex', 'UrlParamKey', 'UrlParamValue'].includes(item.type))
    const currentToken = filteredTokens[filteredTokens.length - 1]
    const node = getTreeNodesByPath(apiTree, filteredTokens)
    const completionList: Completion[] = getCompletionListByNode(node, currentToken)
    const esSource: CompletionSource = completeFromList(completionList)

    console.log(completionList, 'completionListRes')
    return esSource(context);
  };
}
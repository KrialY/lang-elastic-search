import { LRLanguage } from "@codemirror/language";
import { completeFromList, Completion, CompletionContext, CompletionSource, ifIn } from "@codemirror/autocomplete"
import { getTokensBeforePosition } from "./tokenUtils";
import { apiTree, getTreeNodesByPath } from "./apiTree";
import { NodeTypeEnum } from "./completionNode/baseNode";
import { SyncTreeNodeType } from "./completionNode/const";

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

function getFilterTokens(tokensBeforePosition: Array<any>) {
  const res: Array<any> = []
  const paramsToken: Array<any> = []
  // multi command
  let newLineIndex = 0
  for (let i = tokensBeforePosition.length - 1; i >= 0; i--) {
    if (tokensBeforePosition[i].type === SyncTreeNodeType.NewLineMethodBodyStart) {
      newLineIndex = i
      break
    }
  }
  tokensBeforePosition.slice(newLineIndex).forEach((item) => {
    if ([SyncTreeNodeType.Method, SyncTreeNodeType.Endpoint,
    SyncTreeNodeType.ESIndex].includes(item.type)) {
      res.push(item)
    } else if ([SyncTreeNodeType.UrlParamKey, SyncTreeNodeType.UrlParamValue, SyncTreeNodeType.UrlParamAnd].includes(item.type)) {
      paramsToken.push(item)
    }
  })

  let current = paramsToken.pop()
  const filterParamsToken = []
  while (current && current.type !== SyncTreeNodeType.UrlParamAnd) {
    filterParamsToken.unshift(current)
    current = paramsToken.pop()
  }

  return [...res, ...filterParamsToken];
}

function completeES() {
  return (context: CompletionContext) => {
    const tokens = getTokensBeforePosition(context.state, context.pos)
    const filteredTokens = getFilterTokens(tokens)
    const currentToken = filteredTokens[filteredTokens.length - 1]
    const node = getTreeNodesByPath(apiTree, filteredTokens)
    const completionList: Completion[] = getCompletionListByNode(node, currentToken)
    const esSource: CompletionSource = completeFromList(completionList)

    console.log(tokens, currentToken, 'completionListRes')
    return esSource(context);
  };
}
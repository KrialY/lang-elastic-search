import { endpoints } from "./apiData/endpoints";
import { methods } from "./apiData/method";
import { RootNode } from './completionNode/rootNode'
import { IndexNode } from "./completionNode/indexNode";
import { EndpointNode } from "./completionNode/endpointNode";
import { UrlParams } from "./completionNode/urlParamNode";
import { MethodNode } from "./completionNode/methodNode";
import { BaseNode, NodeTypeEnum } from "./completionNode/baseNode";


export function generateApiTree(endpoints: Record<string, object>) {
  const root = new RootNode()
  const rootNodes: Array<BaseNode> = []
  const sharedIndexNode = new IndexNode()

  methods.forEach((method) => {
    rootNodes.push(new MethodNode({
      name: method
    }))
  })
  root.children = [...rootNodes]
  Object.keys(endpoints).forEach((endpointKey) => {
    const endpoint: any = endpoints[endpointKey]
    const { methods, patterns, ur_params } = endpoint ?? {}

    // method path
    methods.forEach((method: string) => {
      const methodNode = rootNodes.find((item: any) => item.name === method)

      // patterns path
      patterns.forEach((pattern: any) => {
        const patternList = pattern.split('/')

        let current: any = methodNode
        while (true) {
          const patternItem = patternList.shift()
          if (!patternItem) break
          const isESIndex = patternItem === '{indices}'

          let targetNode: any = null
          if (isESIndex) {
            targetNode = sharedIndexNode
          } else {
            targetNode = new EndpointNode({
              name: patternItem,
            })
          }
          // url params
          if (!isESIndex) {
            Object.keys(ur_params).forEach((key) => {
              targetNode.addChild(
                new UrlParams({
                  name: key,
                  key: key,
                  value: ur_params[key]
                })
              )
            })
          }
          current.addChild(targetNode)
          current = targetNode
        }
      })
    })
  })

  return root
}

export function getTreeNodesByPath(apiTree: any, pathList: any) {
  let current = apiTree
  let queue = [...apiTree.children]

  pathList.forEach((item: any) => {
    const { content, type } = item ?? {}
    const node = queue.find((item: any) => {
      if (type === 'ESIndex') {
        return item.type === NodeTypeEnum.ESIndex
      }
      return item.name === content
    })
    if (node) {
      current = node
      queue = [...node.children]
    } else {
      queue = []
    }
  })

  return current
}


export const apiTree = generateApiTree(endpoints)


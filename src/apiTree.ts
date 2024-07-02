import { endpoints } from "./tokens/endpoints";
import { esIndics } from "./tokens/esIndex";
import { methods } from "./tokens/method";



class ApiTreeNode {
  name
  type
  children
  constructor(params: any) {
    this.name = params?.name ?? ''
    this.type = params?.type ?? ''
    this.children = params?.children ?? []
  }

  addChild(node: any) {
    this.children.push(node)
  }
}

class RootNode extends ApiTreeNode {
  constructor() {
    super({ type: 'Root', name: 'Root' })
  }
}

class EndpointNode extends ApiTreeNode {
  urlParams: Object = {}
  constructor(params: any) {
    super(params)
    this.type = 'endpoint'
    this.urlParams = params?.urlParams ?? {}
  }
}

class UrlParams extends ApiTreeNode {
  key;
  value;
  constructor(params: any) {
    super(params)
    this.type = 'urlParams'
    this.key = params?.key ?? ''
    this.value = params?.value ?? ''
  }
}

class IndexNode extends ApiTreeNode {
  indics
  constructor() {
    super({ type: 'ESIndex', name: 'ESIndex' })
    this.indics = Object.keys(esIndics)
  }

  addChild(node: any) {
    const isExist = !!this.children.find((item: any) => item.name === node.name)
    if (!isExist) {
      this.children.push(node)
    }

  }
}


export function generateApiTree(endpoints: Record<string, object>) {
  const root = new RootNode()
  const rootNodes: any = []
  const sharedIndexNode = new IndexNode()

  methods.forEach((method) => {
    rootNodes.push(new ApiTreeNode({
      type: 'method',
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

        let current = methodNode
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
              urlParams: ur_params
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

  console.log(apiTree, 'api tree')
  pathList.forEach((item: any) => {
    const { content, type } = item ?? {}
    const node = queue.find((item: any) => {
      if (type === 'ESIndex') {
        return item.type === 'ESIndex'
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

  console.log(pathList, current, 'current')

  return current
}


export const apiTree = generateApiTree(endpoints)



export enum NodeTypeEnum {
  Base,
  Root,
  Endpoint,
  UrlParam,
  Method,
  ESIndex
}

export class BaseNode {
  type: NodeTypeEnum
  children: Array<BaseNode>
  constructor(params?: { type?: NodeTypeEnum, children?: Array<BaseNode> }) {
    this.type = params?.type ?? NodeTypeEnum.Base
    this.children = params?.children ?? []
  }

  addChild(node: BaseNode) {
    this.children.push(node)
  }
}
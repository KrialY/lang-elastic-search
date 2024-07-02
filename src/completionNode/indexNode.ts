import { BaseNode, NodeTypeEnum } from "./baseNode"
import { esIndics } from "../apiData/esIndex";
import { EndpointNode } from "./endpointNode";

export class IndexNode extends BaseNode {
  indics: Array<string> = []
  children: Array<EndpointNode> = []
  constructor(params?: { children?: Array<BaseNode> }) {
    super(params)
    this.type = NodeTypeEnum.ESIndex
    this.indics = Object.keys(esIndics)
  }

  addChild(node: EndpointNode) {
    const isExist = !!this.children.find((item) => item.name === node.name)
    if (!isExist) {
      this.children.push(node)
    }
  }
}
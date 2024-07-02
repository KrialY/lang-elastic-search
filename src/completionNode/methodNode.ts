import { BaseNode, NodeTypeEnum } from "./baseNode"

export class MethodNode extends BaseNode {
  name: string
  constructor(params: { name: string, children?: Array<BaseNode> }) {
    super(params)
    this.type = NodeTypeEnum.Method
    this.name = params.name
  }
}
import { BaseNode, NodeTypeEnum } from "./baseNode"

export class EndpointNode extends BaseNode {
  name: string
  constructor(params: { name: string, children?: Array<BaseNode> }) {
    super(params)
    this.type = NodeTypeEnum.Endpoint
    this.name = params.name
  }
}
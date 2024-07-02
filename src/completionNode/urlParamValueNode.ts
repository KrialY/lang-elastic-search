import { BaseNode, NodeTypeEnum } from "./baseNode";

export class UrlParamValueNode extends BaseNode {
  name: string;
  constructor(params: { name: string, children?: Array<BaseNode> }) {
    super(params)
    this.type = NodeTypeEnum.UrlKey
    this.name = params.name
  }
}
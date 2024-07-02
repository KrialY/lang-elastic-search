import { BaseNode, NodeTypeEnum } from "./baseNode";
import { UrlParamValueNode } from "./urlParamValueNode";

export class UrlParamKeyNode extends BaseNode {
  name: string;
  children: UrlParamValueNode[] = [];
  constructor(params: { name: string, children?: Array<UrlParamValueNode> }) {
    super(params)
    this.type = NodeTypeEnum.UrlKey
    this.name = params.name
  }

  addChildren(rawUrlValue: string | Array<string>): void {
    const urlValueList = typeof rawUrlValue === 'string' ? [rawUrlValue] : rawUrlValue

    const urlValueInstance = urlValueList.map((urlValue) => new UrlParamValueNode({ name: urlValue }))
    this.children.push(...urlValueInstance)
  }
}
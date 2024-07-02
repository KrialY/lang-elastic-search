import { BaseNode, NodeTypeEnum } from "./baseNode";

export class UrlParams extends BaseNode {
  key: string;
  value: string;
  constructor(params: any) {
    super(params)
    this.type = NodeTypeEnum.UrlParam
    this.key = params?.key ?? ''
    this.value = params?.value ?? ''
  }
}
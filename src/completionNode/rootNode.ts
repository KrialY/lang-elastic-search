
import { BaseNode, NodeTypeEnum } from "./baseNode"

export class RootNode extends BaseNode {
  constructor() {
    super()
    this.type = NodeTypeEnum.Root
  }
}

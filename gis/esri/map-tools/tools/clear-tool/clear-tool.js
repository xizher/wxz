import { BaseTool } from '../../base-tool/base-tool'

export class ClearTool extends BaseTool {

  //#region 构造函数

  /**
   * 构造：缩小工具
   * @param { import('../../../web-map/web-map').$Map } map 地图对象
   * @param { import('../../../web-map/web-map').$View } view 视图对象
   */
  constructor (map, view) {
    super(map, view, true)
  }

  //#endregion

  //#region 公有方法

  onToolActived (event) {
    if (super.onToolActived(event)) {
      const { mapElementDisplay } = this.map.$owner
      mapElementDisplay.clear()
      return true
    } else {
      return false
    }
  }

  //#endregion

}

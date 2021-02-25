import { BaseTool } from '../../base-tool/base-tool'

/**
 * 放大工具类
 */
export class ZoomInTool extends BaseTool {

  //#region 构造函数

  /**
   * 构造放大工具对象
   * @param { import('../../../../web-map/web-map').IMap } map 地图对象
   * @param { import('../../../../web-map/web-map').IView } view 视图对象
   */
  constructor (map, view) {
    super(map, view, true)
  }

  //#endregion

  //#region 公有方法

  /**
   * （重写）工具激活监听事件
   * @param { import('../../../../../../listener').IListenerCallback } event
   */
  onToolActived (event) {
    if (super.onToolActived(event)) {
      const zoom = this.view.getZoom() + 1
      this.view.animate({ zoom, duration: 500 })
      return true
    } else {
      return false
    }
  }

  //#endregion

}

/**
 * 缩小工具类
 */
export class ZoomOutTool extends BaseTool {

  //#region 构造函数

  /**
   * 构造缩小工具对象
   * @param { import('../../../../web-map/web-map').IMap } map 地图对象
   * @param { import('../../../../web-map/web-map').IView } view 视图对象
   */
  constructor (map, view) {
    super(map, view, true)
  }

  //#endregion

  //#region 公有方法

  /**
   * （重写）工具激活监听事件
   * @param { import('../../../../../../listener').IListenerCallback } event
   */
  onToolActived (event) {
    if (super.onToolActived(event)) {
      const zoom = this.view.getZoom() - 1
      this.view.animate({ zoom, duration: 500 })
      return true
    } else {
      return false
    }
  }

  //#endregion

}

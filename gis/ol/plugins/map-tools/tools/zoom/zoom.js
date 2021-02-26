import { BaseTool } from '../../base-tool/base-tool'
import { DrawTool } from '../draw/draw'
// import Extent from 'ol/extent'

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

/**
 * 拉框放大工具类
 */
export class ZoomInRectTool extends DrawTool {

  //#region 构造函数

  constructor (map, view) {
    super(map, view, 'rectangle-faster', 'zoomin')

    this.drawer.setDrawingStyle({
      polygonStyle: {
        fill: {
          color: 'rgba(0, 0, 0, 0.5)'
        },
        stroke: {
          color: 'rgba(0, 0, 0, 0.8)'
        }
      }
    })
  }

  //#endregion

  //#region 公有方法

  onDrawEnd (event) {
    if (super.onDrawEnd(event)) {
      this.clearDrawed()
      const [feature] = event.features
      this.view.fit(feature.getGeometry(), { duration: 500 })
      return event
    } else {
      return false
    }
  }

  //#endregion

}

/**
 * 拉框缩小工具类
 */
export class ZoomOutRectTool extends DrawTool {

  //#region 构造函数

  constructor (map, view) {
    super(map, view, 'rectangle-faster', 'zoomout')

    this.drawer.setDrawingStyle({
      polygonStyle: {
        fill: {
          color: 'rgba(0, 0, 0, 0.5)'
        },
        stroke: {
          color: 'rgba(0, 0, 0, 0.8)'
        }
      }
    })
  }

  //#endregion

  //#region 公有方法

  onDrawEnd (event) {
    if (super.onDrawEnd(event)) {
      this.clearDrawed()
      const [feature] = event.features
      const [gXmin, gYmin, gXmax, gYmax] = feature.getGeometry().getExtent()
      const [vXmin, vYmin, vXmax, vYmax] = this.view.calculateExtent()
      const [gWidth, gHeight] = [gXmax - gXmin, gYmax, gYmin]
      const [vWidth, vHeight] = [vXmax - vXmin, vYmax - vYmin]
      const nWidth = vWidth ** 2 / gWidth
      const nHeight = vHeight ** 2 / gHeight
      const nXmin = vXmin - ((gXmin - vXmin) * vWidth / gWidth)
      const nYmin = vYmin - ((gYmin - vYmin) * vHeight / gHeight)
      const nXmax = nXmin + Math.abs(nWidth)
      const nYMax = nYmin + Math.abs(nHeight)
      this.view.fit([nXmin, nYmin, nXmax, nYMax], { duration: 500 })
      return event
    } else {
      return false
    }
  }

  //#endregion

}

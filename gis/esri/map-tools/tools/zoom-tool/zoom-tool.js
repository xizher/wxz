import { esri } from '../../../esri-modules/esri-modules'
import { BaseTool } from '../../base-tool/base-tool'
import { DrawTool } from '../draw-tool/draw-tool'

export class ZoomInTool extends BaseTool {

  //#region 构造函数

  /**
   * 构造：放大工具
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
      const { esriExt } = this.map.$owner
      esriExt(this.view).plusZoom(1)
      return true
    } else {
      return false
    }
  }

  //#endregion

}

export class ZoomOutTool extends BaseTool {

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
      const { esriExt } = this.map.$owner
      esriExt(this.view).plusZoom(-1)
      return true
    } else {
      return false
    }
  }

  //#endregion

}

export class ZoomHomeTool extends BaseTool {

  //#region 私有属性

  /**
   * 起始范围
   * @type { __esri.Geometry }
   */
  #homeExtent = null

  //#endregion

  //#region 构造函数

  /**
   * 构造：返回起始位置工具
   * @param { import('../../../web-map/web-map').$Map } map 地图对象
   * @param { import('../../../web-map/web-map').$View } view 视图对象
   */
  constructor (map, view) {
    super(map, view, true)

    let extent = null
    if (view.extent) {
      extent = view.extent
    } else if (view.zoom && view.center) {
      extent = {
        center: view.center,
        zoom: view.zoom,
      }
    } else {
      extent = { center: [0, 0], zoom: 3 }
    }
    this.#homeExtent = extent
  }

  //#endregion

  //#region 公有方法

  onToolActived (event) {
    if (super.onToolActived(event)) {
      this.view.goTo(this.#homeExtent)
      return true
    } else {
      return false
    }
  }

  /**
   * 设置起始范围
   * @param { __esri.Geometry } extent 起始范围
   */
  setHomeExtent (extent) {
    this.#homeExtent = extent
  }

  //#endregion

}

export class ZoomInRectTool extends DrawTool {

  constructor (map, view) {
    super (map, view, 'rectangle-faster')

    this.drawer.setDrawingStyle({
      color: [0, 0, 0, .2],
      outline: { color: [0, 0, 0, .5] }
    })
  }

  get cursorType () {
    return 'zoomin'
  }

  onDrawEnd (event) {
    if (super.onDrawEnd(event)) {
      this.clearDrawed()
      this.view.goTo(event.geometry)
      return true
    } else {
      return false
    }
  }

}

export class ZoomOutRectTool extends DrawTool {

  constructor (map, view) {
    super (map, view, 'rectangle-faster')

    this.drawer.setDrawingStyle({
      color: [0, 0, 0, .2],
      outline: { color: [0, 0, 0, .5] }
    })
  }

  get cursorType () {
    return 'zoomout'
  }

  onDrawEnd (event) {
    if (super.onDrawEnd(event)) {
      this.clearDrawed()
      if (this.view.zoom > this.view.constraints.minZoom) {
        const { esriUtils } = this.view.$owner
        const width = this.view.extent.width * this.view.extent.width / event.geometry.extent.width
        const hegiht = this.view.extent.height * this.view.extent.height / event.geometry.extent.height
        const xmin = this.view.extent.xmin - ((event.geometry.extent.xmin - this.view.extent.xmin) * this.view.extent.width / event.geometry.extent.width)
        const ymin = this.view.extent.ymin - ((event.geometry.extent.ymin - this.view.extent.ymin) * this.view.extent.height / event.geometry.extent.height)
        const xmax = xmin + Math.abs(width)
        const ymax = ymin + Math.abs(hegiht)
        const extent = esriUtils.createExtent({ xmin, ymin, xmax, ymax })
        this.view.goTo(extent)
      } else {
        console.warn('已到达最小缩放等级')
      }
      return true
    } else {
      return false
    }
  }

}

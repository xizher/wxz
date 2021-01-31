import { esri } from '../../../esri-modules/esri-modules'
import { $ext } from '../../../../../js-ext'
import { BaseTool } from '../../../map-tools/base-tool/base-tool'
import { Drawer } from '../../../map-element-display/drawer/drawer'

export class DrawOperation {

  //#region 静态属性

  static removed = {
    'double-click': null,
    'click': null,
    'pointer-down': null,
    'pointer-move': null,
    'pointer-up': null,
    'drag': null
  }

  //#endregion

  //#region 静态方法

  /**
     * 清除绘制响应事件
     */
  static clearDrawType () {
    Object.keys(DrawOperation.removed).forEach(item => {
      DrawOperation.removed[item]?.remove?.()
      DrawOperation.removed[item] = null
    })
  }

  /**
     * 绘制点
     * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
     */
  static point (drawTool) {
    DrawOperation.clearDrawType()
    DrawOperation.removed.click = drawTool.view.on('click', event => {
      if (event.button !== 0) {
        return
      }
      drawTool.fire('draw-start', { geometry: event.mapPoint })
      drawTool.fire('draw-end', { geometry: event.mapPoint })
    })
  }

  /**
   * 绘制直线
   * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
   */
  static line (drawTool) {
    DrawOperation.clearDrawType()
    const { esriUtils } = drawTool.map.$owner
    let drawing = false
    let startPoint = null
    DrawOperation.removed.click = drawTool.view.on('click', event => {
      if (event.button !== 0) {
        return
      }
      if (drawing) { // 绘制完成
        drawing = false
        const endPoint = event.mapPoint
        const polyline = esriUtils.pointsToPolyline([startPoint, endPoint])
        drawTool.fire('draw-end', { geometry: polyline })
      } else { // 绘制第一个起始端点
        drawing = true
        startPoint = event.mapPoint
        drawTool.fire('draw-start', { geometry: event.mapPoint })
      }
    })
    DrawOperation.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = esriUtils.screenToMapPoint(event)
        const polyline = esriUtils.pointsToPolyline([startPoint, endPoint])
        drawTool.fire('draw-moving', { geometry: polyline })
      }
    })
  }

  /**
   * 绘制直线（以较快的方式）
   * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
   */
  static 'line-faster' (drawTool) {
    DrawOperation.clearDrawType()
    const { esriUtils } = drawTool.map.$owner
    let drawing = false
    let startPoint = null
    DrawOperation.removed.drag = drawTool.view.on('drag', event => {
      event.stopPropagation()
    })
    DrawOperation.removed['pointer-down'] = drawTool.view.on('pointer-down', event => {
      if (event.button !== 0) {
        return
      }
      drawing = true
      startPoint = esriUtils.screenToMapPoint(event)
      drawTool.fire('draw-start', { geometry: startPoint })
    })
    DrawOperation.removed['pointer-up'] = drawTool.view.on('pointer-up', event => {
      if (event.button !== 0) {
        return
      }
      drawing = false
      const endPoint = esriUtils.screenToMapPoint(event)
      const polyline = esriUtils.pointsToPolyline([startPoint, endPoint])
      drawTool.fire('draw-end', { geometry: polyline })
    })
    DrawOperation.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = esriUtils.screenToMapPoint(event)
        const polyline = esriUtils.pointsToPolyline([startPoint, endPoint])
        drawTool.fire('draw-moving', { geometry: polyline })
      }
    })
  }

  /**
   * 绘制线段
   * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
   */
  static polyline (drawTool) {
    DrawOperation.clearDrawType()
    const { esriUtils } = drawTool.map.$owner
    let drawing = false
    const points = []
    DrawOperation.removed['double-click'] = drawTool.view.on('double-click', event => {
      if (event.button !== 0) {
        return
      }
      event.stopPropagation()
      drawing = false
      const polyline = esriUtils.pointsToPolyline([...points, event.mapPoint])
      $ext(points).clear()
      drawTool.fire('draw-end', { geometry: polyline })
    })
    DrawOperation.removed['click'] = drawTool.view.on('click', event => {
      if (event.button !== 0) {
        return
      }
      drawing = true
      points.push(event.mapPoint)
      if (points.length === 1) {
        drawTool.fire('draw-start', { geometry: event.mapPoint })
      }
    })
    DrawOperation.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = esriUtils.screenToMapPoint(event)
        const polyline = esriUtils.pointsToPolyline([...points, endPoint])
        drawTool.fire('draw-moving', { geometry: polyline })
      }
    })
  }

  /**
   * 绘制多边形
   * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
   */
  static polygon (drawTool) {
    DrawOperation.clearDrawType()
    const { esriUtils } = drawTool.map.$owner
    let drawing = false
    const points = []
    DrawOperation.removed['double-click'] = drawTool.view.on('double-click', event => {
      if (event.button !== 0) {
        return
      }
      event.stopPropagation()
      drawing = false
      const polygon = esriUtils.pointsToPolygon([...points, event.mapPoint])
      $ext(points).clear()
      drawTool.fire('draw-end', { geometry: polygon })
    })
    DrawOperation.removed['click'] = drawTool.view.on('click', event => {
      if (event.button !== 0) {
        return
      }
      drawing = true
      points.push(event.mapPoint)
      if (points.length === 1) {
        drawTool.fire('draw-start', { geometry: event.mapPoint })
      }
    })
    DrawOperation.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = esriUtils.screenToMapPoint(event)
        const polygon = esriUtils.pointsToPolygon([...points, endPoint])
        drawTool.fire('draw-moving', { geometry: polygon })
      }
    })
  }

  /**
   * 绘制矩形
   * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
   */
  static rectangle (drawTool) {
    DrawOperation.clearDrawType()
    const { esriUtils, esriExt } = drawTool.map.$owner
    let drawing = false
    let startPoint = null
    DrawOperation.removed.click = drawTool.view.on('click', event => {
      if (event.button !== 0) {
        return
      }
      if (drawing) { // 绘制完成
        drawing = false
        const endPoint = event.mapPoint
        const polyline = esriUtils.pointsToPolyline([startPoint, endPoint])
        const rectangle = esriExt(polyline.extent).toPolygon()
        drawTool.fire('draw-end', { geometry: rectangle })
      } else { // 绘制第一个起始端点
        drawing = true
        startPoint = event.mapPoint
        drawTool.fire('draw-start', { geometry: event.mapPoint })
      }
    })
    DrawOperation.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = esriUtils.screenToMapPoint(event)
        const polyline = esriUtils.pointsToPolyline([startPoint, endPoint])
        const rectangle = esriExt(polyline.extent).toPolygon()
        drawTool.fire('draw-moving', { geometry: rectangle })
      }
    })
  }


  /**
   * 绘制矩形（以较快的方式）
   * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
   */
  static 'rectangle-faster' (drawTool) {
    DrawOperation.clearDrawType()
    const { esriUtils, esriExt } = drawTool.map.$owner
    let drawing = false
    let startPoint = null
    DrawOperation.removed.drag = drawTool.view.on('drag', event => {
      event.stopPropagation()
    })
    DrawOperation.removed['pointer-down'] = drawTool.view.on('pointer-down', event => {
      if (event.button !== 0) {
        return
      }
      drawing = true
      startPoint = esriUtils.screenToMapPoint(event)
      drawTool.fire('draw-start', { geometry: startPoint })
    })
    DrawOperation.removed['pointer-up'] = drawTool.view.on('pointer-up', event => {
      if (event.button !== 0) {
        return
      }
      drawing = false
      const endPoint = esriUtils.screenToMapPoint(event)
      const polyline = esriUtils.pointsToPolyline([startPoint, endPoint])
      const rectangle = esriExt(polyline.extent).toPolygon()
      drawTool.fire('draw-end', { geometry: rectangle })
    })
    DrawOperation.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = esriUtils.screenToMapPoint(event)
        const polyline = esriUtils.pointsToPolyline([startPoint, endPoint])
        const rectangle = esriExt(polyline.extent).toPolygon()
        drawTool.fire('draw-moving', { geometry: rectangle })
      }
    })
  }

  /**
   * 绘制圆
   * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
   */
  static circle (drawTool) {
    DrawOperation.clearDrawType()
    const { esriUtils } = drawTool.map.$owner
    let drawing = false
    let startPoint = null
    DrawOperation.removed.click = drawTool.view.on('click', event => {
      if (event.button !== 0) {
        return
      }
      if (drawing) { // 绘制完成
        drawing = false
        const endPoint = event.mapPoint
        const radius = endPoint.distance(startPoint)
        const circle = new esri.geometry.Circle({
          center: startPoint, radius
        })
        drawTool.fire('draw-end', { geometry: circle })
      } else { // 绘制第一个起始端点
        drawing = true
        startPoint = event.mapPoint
        drawTool.fire('draw-start', { geometry: startPoint })
      }
    })
    DrawOperation.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = esriUtils.screenToMapPoint(event)
        const radius = endPoint.distance(startPoint)
        const circle = new esri.geometry.Circle({
          center: startPoint, radius
        })
        drawTool.fire('draw-moving', { geometry: circle })
      }
    })
  }

  /**
   * 绘制圆（以较快的方式）
   * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
   */
  static 'circle-faster' (drawTool) {
    DrawOperation.clearDrawType()
    const { esriUtils } = drawTool.map.$owner
    let drawing = false
    let startPoint = null
    DrawOperation.removed.drag = drawTool.view.on('drag', event => {
      event.stopPropagation()
    })
    DrawOperation.removed['pointer-down'] = drawTool.view.on('pointer-down', event => {
      if (event.button !== 0) {
        return
      }
      drawing = true
      startPoint = esriUtils.screenToMapPoint(event)
      drawTool.fire('draw-start', { geometry: startPoint })
    })
    DrawOperation.removed['pointer-up'] = drawTool.view.on('pointer-up', event => {
      if (event.button !== 0) {
        return
      }
      drawing = false
      const endPoint = esriUtils.screenToMapPoint(event)
      const radius = endPoint.distance(startPoint)
      const circle = new esri.geometry.Circle({
        center: startPoint, radius
      })
      drawTool.fire('draw-end', { geometry: circle })
    })
    DrawOperation.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = esriUtils.screenToMapPoint(event)
        const radius = endPoint.distance(startPoint)
        const circle = new esri.geometry.Circle({
          center: startPoint, radius
        })
        drawTool.fire('draw-moving', { geometry: circle })
      }
    })
  }

  //#endregion

}

export class DrawTool extends BaseTool {

  //#region 私有属性

  /**
   * 绘制器
   * @type { Drawer }
   */
  #drawer = null

  /**
   * 绘制类型
   * @type { import('./draw-tool').EDrawType }
   */
  #drawType = null

  /**
   * 地图鼠标样式对象
   * @type { import('../../../map-cursor/map-cursor').MapCursor }
   */
  #mapCursor = null

  //#endregion

  //#region getter

  /**
   * 鼠标样式
   */
  get cursorType () {
    return 'draw'
  }

  /**
   * 绘制器
   * @type { Drawer }
   */
  get drawer () {
    return this.#drawer
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造：绘制工具
   * @param { import('../../../web-map/web-map').$Map } map 地图对象
   * @param { import('../../../web-map/web-map').$View } view 视图对象
   * @param { import('./draw-tool').EDrawType } drawType 绘制类型
   */
  constructor (map, view, drawType) {
    super(map, view, false)

    this.#drawer = new Drawer(map.$owner.mapElementDisplay)
    this.#drawType = drawType
    this.#mapCursor = view.$owner.mapCursor
  }

  //#endregion

  //#region 公有方法

  /**
   * 设置绘制状态
   * @param { import('./draw-tool').EDrawType } type 绘制类型
   * @returns { DrawTool } this
   */
  setDrawType (type) {
    this.#drawType = type
    if (this.actived) {
      DrawOperation[type](this)
    }
    return this
  }

  /**
   * 清理绘制对象
   * @returns { DrawTool } this
   */
  clearDrawed () {
    this.fire('tool-clear')
    return this
  }

  onToolActived (event) {
    if (super.onToolActived(event)) {
      DrawOperation[this.#drawType](this)
      this.#mapCursor.setCursor(this.cursorType)
      return true
    } else {
      return false
    }
  }

  onDrawEnd (event) {
    if (super.onDrawEnd(event)) {
      const graphics = this.#drawer.add(event.geometry, true)
      return graphics
    } else {
      return false
    }
  }

  onDrawMoving (event) {
    if (super.onDrawEnd(event)) {
      this.#drawer.setTemp(event.geometry)
      return true
    } else {
      return false
    }
  }

  onToolDeActiced (event) {
    if (super.onToolDeActiced(event)) {
      DrawOperation.clearDrawType()
      this.#mapCursor.setCursor('')
      return true
    } else {
      return false
    }
  }

  onToolClear (event) {
    if (super.onToolClear(event)) {
      this.#drawer.clear()
      return true
    } else {
      return false
    }
  }

  //#endregion

}

import { createCircle, createLineString, createPoint, createPolygon } from '../../../../utilities/geom.utils'
import { Drawer } from '../../../map-element-display/drawer/drawer'
import { BaseTool } from '../../base-tool/base-tool'
import { $ext } from '../../../../../../js-ext'
import { distanceByTwoPoint } from '../../../../../turf'

/**
 * 绘制类型控制类
 */
export class DrawOperation {

  //#region 静态属性

  /**
   * 事件处理池
   */
  static handlerPool = {
    'click': null,
    'dblclick': null,
    'moveend': null,
    'movestart': null,
    'pointerdrag': null,
    'pointermove': null,
    'singleclick': null,
    'mousedown': null,
    'mouseup': null,
  }

  //#endregion

  //#region 静态方法

  /**
   * 清理绘制相关响应事件
   */
  static clearDrawHandler () {
    Object.entries(DrawOperation.handlerPool).forEach(([key, item]) => {
      if (item) {
        item.remove()
        DrawOperation.handlerPool[key] = null
      }
    })

    return DrawOperation
  }

  /**
   * 绘制点
   * @param { DrawTool } drawTool 绘制工具对象
   */
  static point (drawTool) {
    DrawOperation.clearDrawHandler()
    const eventKey = drawTool.map.on('singleclick', event => {
      const features = drawTool.drawer.add(createPoint(event.coordinate), {}, true)
      drawTool.fire('draw-start', { features })
      drawTool.fire('draw-end', { features })
    })
    DrawOperation.handlerPool.singleclick = {
      remove () {
        drawTool.map.un('singleclick', eventKey.listener)
      }
    }
  }

  /**
   * 绘制线段
   * @param { DrawTool } drawTool 绘制工具对象
   */
  static line (drawTool) {
    DrawOperation.clearDrawHandler()
    let drawing = false
    let startCoordinate = null
    const eventKey = drawTool.map.on('singleclick', event => {
      if (!drawing) {
        startCoordinate = event.coordinate
        drawing = true
        drawTool.fire('draw-start', { startCoordinate })
      } else {
        drawing = false
        const features = drawTool.drawer.add(createLineString([startCoordinate, event.coordinate]), {}, true)
        startCoordinate = null
        drawTool.fire('draw-end', { features })
      }
    })
    const eventKey2 = drawTool.map.on('pointermove', event => {
      if (drawing && startCoordinate) {
        const features = drawTool.drawer.setTemp(createLineString([startCoordinate, event.coordinate]), {}, true)
        drawTool.fire('draw-move', { features })
      }
    })
    DrawOperation.handlerPool.singleclick = {
      remove () {
        drawTool.map.un('singleclick', eventKey.listener)
      }
    }
    DrawOperation.handlerPool.pointermove = {
      remove () {
        drawTool.map.un('pointermove', eventKey2.listener)
      }
    }
  }

  /**
   * 快速绘制线段
   * @param { DrawTool } drawTool 绘制工具对象
   */
  static 'line-faster' (drawTool) {
    DrawOperation.clearDrawHandler()
    let drawing = false
    let startCoordinate = null
    const eventKey = drawTool.map.on('pointerdrag', event => {
      if (drawing) {
        const coordinate = event.coordinate
        const features = drawTool.drawer.setTemp(createLineString([startCoordinate, coordinate]), {}, true)
        drawTool.fire('draw-move', { features })
      }
      event.stopPropagation()
    })
    function mousedownHandler (event) {
      drawing = true
      startCoordinate = drawTool.map.getEventCoordinate(event)
      drawTool.fire('draw-start', { startCoordinate })
    }
    function mouseupHandler (event) {
      drawing = false
      const coordinate = drawTool.map.getEventCoordinate(event)
      const features = drawTool.drawer.add(createLineString([startCoordinate, coordinate]), {}, true)
      drawTool.fire('draw-end', { features })
    }
    drawTool.map.getTargetElement().addEventListener('mousedown', mousedownHandler)
    drawTool.map.getTargetElement().addEventListener('mouseup', mouseupHandler)

    DrawOperation.handlerPool.pointerdrag = {
      remove () {
        drawTool.map.un('pointerdrag', eventKey.listener)
      }
    }
    DrawOperation.handlerPool.mousedown = {
      remove () {
        drawTool.map.getTargetElement().removeEventListener('mousedown', mousedownHandler)
      }
    }
    DrawOperation.handlerPool.mouseup = {
      remove () {
        drawTool.map.getTargetElement().removeEventListener('mouseup', mouseupHandler)
      }
    }
  }

  /**
   * 绘制线
   * @param { DrawTool } drawTool 绘制工具对象
   */
  static 'polyline' (drawTool) {
    DrawOperation.clearDrawHandler()
    let drawing = false
    const coordinates = []
    const eventKey = drawTool.map.on('singleclick', ({ coordinate }) => {
      coordinates.push(coordinate)
      if (!drawing) {
        drawTool.fire('draw-start', { coordinate })
        drawing = true
      }
    })
    const eventKey2 = drawTool.map.on('dblclick', e => {
      e.stopPropagation()
      if (drawing) {
        coordinates.push(e.coordinate)
        const features = drawTool.drawer.add(createLineString(coordinates), {}, true)
        drawTool.fire('draw-end', { features })
        $ext(coordinates).clear()
        drawing = false
      }
    })
    const eventKey3 = drawTool.map.on('pointermove', event => {
      if (drawing) {
        const features = drawTool.drawer.setTemp(createLineString([...coordinates, event.coordinate]), {}, true)
        drawTool.fire('draw-move', { features })
      }
    })
    DrawOperation.handlerPool.singleclick = {
      remove () {
        drawTool.map.un('singleclick', eventKey.listener)
      }
    }
    DrawOperation.handlerPool.dblclick = {
      remove () {
        drawTool.map.un('dblclick', eventKey2.listener)
      }
    }
    DrawOperation.handlerPool.pointermove = {
      remove () {
        drawTool.map.un('pointermove', eventKey3.listener)
      }
    }
  }

  /**
   * 绘制面
   * @param { DrawTool } drawTool 绘制工具对象
   */
  static 'polygon' (drawTool) {
    DrawOperation.clearDrawHandler()
    let drawing = false
    const coordinates = []
    const eventKey = drawTool.map.on('singleclick', ({ coordinate }) => {
      coordinates.push(coordinate)
      if (!drawing) {
        drawTool.fire('draw-start', { coordinate })
        drawing = true
      }
    })
    const eventKey2 = drawTool.map.on('dblclick', e => {
      e.stopPropagation()
      if (drawing) {
        coordinates.push(e.coordinate)
        const features = drawTool.drawer.add(createPolygon([coordinates]), {}, true)
        drawTool.fire('draw-end', { features })
        $ext(coordinates).clear()
        drawing = false
      }
    })
    const eventKey3 = drawTool.map.on('pointermove', event => {
      if (drawing) {
        const features = drawTool.drawer.setTemp(createPolygon([[...coordinates, event.coordinate]]), {}, true)
        drawTool.fire('draw-move', { features })
      }
    })
    DrawOperation.handlerPool.singleclick = {
      remove () {
        drawTool.map.un('singleclick', eventKey.listener)
      }
    }
    DrawOperation.handlerPool.dblclick = {
      remove () {
        drawTool.map.un('dblclick', eventKey2.listener)
      }
    }
    DrawOperation.handlerPool.pointermove = {
      remove () {
        drawTool.map.un('pointermove', eventKey3.listener)
      }
    }
  }

  /**
   * 绘制矩形
   * @param { DrawTool } drawTool 绘制工具对象
   */
  static 'rectangle' (drawTool) {
    DrawOperation.clearDrawHandler()
    let drawing = false
    let startX, startY
    const eventKey = drawTool.map.on('singleclick', event => {
      if (!drawing) {
        [startX, startY] = event.coordinate
        drawing = true
        drawTool.fire('draw-start', { startX, startY })
      } else {
        drawing = false
        const [endX, endY] = event.coordinate
        const coordinates = [[
          [startX, startY], [startX, endY],
          [endX, endY], [endX, startY],
        ]]
        const features = drawTool.drawer.add(createPolygon(coordinates), {}, true)
        startX = null
        startY = null
        drawTool.fire('draw-end', { features })
      }
    })
    const eventKey2 = drawTool.map.on('pointermove', event => {
      if (drawing && startX && startY) {
        const [endX, endY] = event.coordinate
        const coordinates = [[
          [startX, startY], [startX, endY],
          [endX, endY], [endX, startY],
        ]]
        const features = drawTool.drawer.setTemp(createPolygon(coordinates), {}, true)
        drawTool.fire('draw-move', { features })
      }
    })
    DrawOperation.handlerPool.singleclick = {
      remove () {
        drawTool.map.un('singleclick', eventKey.listener)
      }
    }
    DrawOperation.handlerPool.pointermove = {
      remove () {
        drawTool.map.un('pointermove', eventKey2.listener)
      }
    }
  }

  /**
   * 快速绘制矩形
   * @param { DrawTool } drawTool 绘制工具对象
   */
  static 'rectangle-faster' (drawTool) {
    DrawOperation.clearDrawHandler()
    let drawing = false
    let startX, startY
    const eventKey = drawTool.map.on('pointerdrag', event => {
      if (drawing) {
        const [endX, endY] = event.coordinate
        const coordinates = [[
          [startX, startY], [startX, endY],
          [endX, endY], [endX, startY],
        ]]
        const features = drawTool.drawer.setTemp(createPolygon(coordinates), {}, true)
        drawTool.fire('draw-move', { features })
      }
      event.stopPropagation()
    })
    function mousedownHandler (event) {
      drawing = true
      ;[startX, startY] = drawTool.map.getEventCoordinate(event)
      drawTool.fire('draw-start', { startX, startY })
    }
    function mouseupHandler (event) {
      drawing = false
      const [endX, endY] = drawTool.map.getEventCoordinate(event)
      const coordinates = [[
        [startX, startY], [startX, endY],
        [endX, endY], [endX, startY],
      ]]
      const features = drawTool.drawer.add(createPolygon(coordinates), {}, true)
      drawTool.fire('draw-end', { features })
    }
    drawTool.map.getTargetElement().addEventListener('mousedown', mousedownHandler)
    drawTool.map.getTargetElement().addEventListener('mouseup', mouseupHandler)

    DrawOperation.handlerPool.pointerdrag = {
      remove () {
        drawTool.map.un('pointerdrag', eventKey.listener)
      }
    }
    DrawOperation.handlerPool.mousedown = {
      remove () {
        drawTool.map.getTargetElement().removeEventListener('mousedown', mousedownHandler)
      }
    }
    DrawOperation.handlerPool.mouseup = {
      remove () {
        drawTool.map.getTargetElement().removeEventListener('mouseup', mouseupHandler)
      }
    }
  }

  /**
   * 绘制圆
   * @param { DrawTool } drawTool 绘制工具对象
   */
  static 'circle' (drawTool) {
    let drawing = false
    let centerCoordinate = null
    const eventKey = drawTool.map.on('singleclick', e => {
      const coordinate = e.coordinate
      if (drawing) {
        drawing = false
        const radius = distanceByTwoPoint(centerCoordinate, coordinate)
        const features = drawTool.drawer.add(createCircle(centerCoordinate, radius), {}, true)
        drawTool.fire('draw-end', { features })
      } else {
        drawing = true
        centerCoordinate = coordinate
        drawTool.fire('draw-start', { centerCoordinate })
      }
    })
    const eventKey2 = drawTool.map.on('pointermove', event => {
      if (drawing && centerCoordinate) {
        const radius = distanceByTwoPoint(centerCoordinate, event.coordinate)
        const features = drawTool.drawer.setTemp(createCircle(centerCoordinate, radius), {}, true)
        drawTool.fire('draw-move', { features })
      }
    })
    DrawOperation.handlerPool.singleclick = {
      remove () {
        drawTool.map.un('singleclick', eventKey.listener)
      }
    }
    DrawOperation.handlerPool.pointermove = {
      remove () {
        drawTool.map.un('pointermove', eventKey2.listener)
      }
    }
  }

  /**
   * 快速绘制圆
   * @param { DrawTool } drawTool 绘制工具对象
   */
  static 'circle-faster' (drawTool) {
    DrawOperation.clearDrawHandler()
    let drawing = false
    let centerCoordinate = null
    const eventKey = drawTool.map.on('pointerdrag', event => {
      if (drawing) {
        const radius = distanceByTwoPoint(centerCoordinate, event.coordinate)
        const features = drawTool.drawer.setTemp(createCircle(centerCoordinate, radius), {}, true)
        drawTool.fire('draw-move', { features })
      }
      event.stopPropagation()
    })
    function mousedownHandler (event) {
      drawing = true
      centerCoordinate = drawTool.map.getEventCoordinate(event)
      drawTool.fire('draw-start', { centerCoordinate })
    }
    function mouseupHandler (event) {
      drawing = false
      const coordinate = drawTool.map.getEventCoordinate(event)
      const radius = distanceByTwoPoint(centerCoordinate, coordinate)
      const features = drawTool.drawer.add(createCircle(centerCoordinate, radius), {}, true)
      drawTool.fire('draw-end', { features })
    }
    drawTool.map.getTargetElement().addEventListener('mousedown', mousedownHandler)
    drawTool.map.getTargetElement().addEventListener('mouseup', mouseupHandler)

    DrawOperation.handlerPool.pointerdrag = {
      remove () {
        drawTool.map.un('pointerdrag', eventKey.listener)
      }
    }
    DrawOperation.handlerPool.mousedown = {
      remove () {
        drawTool.map.getTargetElement().removeEventListener('mousedown', mousedownHandler)
      }
    }
    DrawOperation.handlerPool.mouseup = {
      remove () {
        drawTool.map.getTargetElement().removeEventListener('mouseup', mouseupHandler)
      }
    }
  }

  //#endregion

}

/**
 * 绘制工具类
 */
export class DrawTool extends BaseTool {

  //#region 私有属性

  /**
   * 绘制器对象
   * @type { import('../../../map-element-display/drawer/drawer').Drawer }
   */
  #drawer = null

  /**
   * 绘制类型
   * @type { import('./draw').EDrawType }
   */
  #drawType = null

  /**
   * 鼠标样式
   * @type { import('../../../map-cursor/map-cursor').EMapCursorType }
   */
  #cursorType = null

  //#endregion

  //#region getter

  /**
   * 绘制器对象
   * @type { import('../../../map-element-display/drawer/drawer').Drawer }
   */
  get drawer () {
    return this.#drawer
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造绘制工具对象
   * @param { import('../../../../web-map/web-map').IMap } map 地图对象
   * @param { import('../../../../web-map/web-map').IView } view 视图对象
   * @param { import('./draw').EDrawType } drawType 绘制类型
   * @param { import('../../../map-cursor/map-cursor').EMapCursorType } cursorType 鼠标样式
   */
  constructor (map, view, drawType, cursorType = 'draw') {
    super(map, view, false)

    this.#drawer = new Drawer(map.$owner.mapElementDisplay)
    this.#drawType = drawType
    this.#cursorType = cursorType

    this.on('draw-start', event => this.onDrawStart(event))
    this.on('draw-move', event => this.onDrawMove(event))
    this.on('draw-end', event => this.onDrawEnd(event))
  }

  //#endregion

  //#region 公有方法

  /**
   * 清理绘制图形
   * @returns { this }
   */
  clearDrawed () {
    this.fire('tool-clear')
    return this
  }

  onDrawStart (event) {
    if (this.actived) {
      console.log(event)
      return event
    } else {
      return false
    }
  }

  onDrawMove (event) {
    if (this.actived) {
      console.log(event)
      return event
    } else {
      return false
    }
  }

  onDrawEnd (event) {
    if (this.actived) {
      console.log(event)
      return event
    } else {
      return false
    }
  }

  onToolActived (event) {
    if (super.onToolActived(event)) {
      DrawOperation[this.#drawType](this)
      this.map.$owner.mapCursor.setMapCursor(this.#cursorType)
      return true
    } else {
      return false
    }
  }

  onToolClear (event) {
    this.#drawer.clear()
    if (super.onToolClear(event)) {
      return true
    } else {
      return false
    }
  }

  onToolDeActived (event) {
    if (super.onToolDeActived(event)) {
      this.map.$owner.mapCursor.setMapCursor('default')
      DrawOperation.clearDrawHandler()
      return true
    } else {
      return false
    }
  }

  //#endregion

}

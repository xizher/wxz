import { createLineString, createPoint } from '../../../../utilities/geom.utils'
import { Drawer } from '../../../map-element-display/drawer/drawer'
import { BaseTool } from '../../base-tool/base-tool'

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
    Object.values(DrawOperation.handlerPool).forEach(item => {
      if (item) {
        item.remove()
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
    DrawOperation.handlerPool.pointermove = {
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
   * @type { import('./draw').EDrawType }
   */
  #drawType = null

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
   */
  constructor (map, view, drawType) {
    super(map, view, false)

    this.#drawer = new Drawer(map.$owner.mapElementDisplay)
    this.#drawType = drawType

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
      DrawOperation.clearDrawHandler()
      return true
    } else {
      return false
    }
  }

  //#endregion

}

/*
 * 描    述：ArcGIS API for JavaScript DrawOperations类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { esri } from '../../../esri-modules/esri-modules'
import { EsriUtils } from '../../../esri-utils/esri-utils'
import { $ext } from '../../../../../js-ext'
import { $esriExt } from '../../../esri-exts/esri-exts'

/**
 * 绘制操作类
 */
export const DrawOperations = (function () {

  //#region 私有属性

  /**
   * 绘图工具对象
   * @type { WeakMap<__DrawOperations__, import('./draw-tool').DrawTool> }
   */
  const _drawTool = new WeakMap()

  //#endregion

  //#region 类体

  class __DrawOperations__ {

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
      Object.keys(__DrawOperations__.removed).forEach(item => {
        __DrawOperations__.removed[item]?.remove?.()
        __DrawOperations__.removed[item] = null
      })
    }

    /**
     * 绘制点
     * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
     */
    static point (drawTool) {
      __DrawOperations__.removed.click = drawTool.view.on('click', event => {
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
      let drawing = false
      let startPoint = null
      __DrawOperations__.removed.click = drawTool.view.on('click', event => {
        if (event.button !== 0) {
          return
        }
        if (drawing) { // 绘制完成
          drawing = false
          const endPoint = event.mapPoint
          const polyline = EsriUtils.pointsToPolyline([startPoint, endPoint])
          drawTool.fire('draw-end', { geometry: polyline })
        } else { // 绘制第一个起始端点
          drawing = true
          startPoint = event.mapPoint
          drawTool.fire('draw-start', { geometry: event.mapPoint })
        }
      })
      __DrawOperations__.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
        if (drawing) {
          const endPoint = EsriUtils.screenToMapPoint(event)
          const polyline = EsriUtils.pointsToPolyline([startPoint, endPoint])
          drawTool.fire('draw-moving', { geometry: polyline })
        }
      })
    }

    /**
   * 绘制直线（以较快的方式）
   * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
   */
    static 'line-faster' (drawTool) {
      let drawing = false
      let startPoint = null
      __DrawOperations__.removed.drag = drawTool.view.on('drag', event => {
        event.stopPropagation()
      })
      __DrawOperations__.removed['pointer-down'] = drawTool.view.on('pointer-down', event => {
        if (event.button !== 0) {
          return
        }
        drawing = true
        startPoint = EsriUtils.screenToMapPoint(event)
        drawTool.fire('draw-start', { geometry: startPoint })
      })
      __DrawOperations__.removed['pointer-up'] = drawTool.view.on('pointer-up', event => {
        if (event.button !== 0) {
          return
        }
        drawing = false
        const endPoint = EsriUtils.screenToMapPoint(event)
        const polyline = EsriUtils.pointsToPolyline([startPoint, endPoint])
        drawTool.fire('draw-end', { geometry: polyline })
      })
      __DrawOperations__.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
        if (drawing) {
          const endPoint = EsriUtils.screenToMapPoint(event)
          const polyline = EsriUtils.pointsToPolyline([startPoint, endPoint])
          drawTool.fire('draw-moving', { geometry: polyline })
        }
      })
    }

    /**
   * 绘制线段
   * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
   */
    static polyline (drawTool) {
      let drawing = false
      const points = []
      __DrawOperations__.removed['double-click'] = drawTool.view.on('double-click', event => {
        if (event.button !== 0) {
          return
        }
        event.stopPropagation()
        drawing = false
        const polyline = EsriUtils.pointsToPolyline([...points, event.mapPoint])
        $ext(points).clear()
        drawTool.fire('draw-end', { geometry: polyline })
      })
      __DrawOperations__.removed['click'] = drawTool.view.on('click', event => {
        if (event.button !== 0) {
          return
        }
        drawing = true
        points.push(event.mapPoint)
        if (points.length === 1) {
          drawTool.fire('draw-start', { geometry: event.mapPoint })
        }
      })
      __DrawOperations__.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
        if (drawing) {
          const endPoint = EsriUtils.screenToMapPoint(event)
          const polyline = EsriUtils.pointsToPolyline([...points, endPoint])
          drawTool.fire('draw-moving', { geometry: polyline })
        }
      })
    }

    /**
   * 绘制多边形
   * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
   */
    static polygon (drawTool) {
      let drawing = false
      const points = []
      __DrawOperations__.removed['double-click'] = drawTool.view.on('double-click', event => {
        if (event.button !== 0) {
          return
        }
        event.stopPropagation()
        drawing = false
        const polygon = EsriUtils.pointsToPolygon([...points, event.mapPoint])
        $ext(points).clear()
        drawTool.fire('draw-end', { geometry: polygon })
      })
      __DrawOperations__.removed['click'] = drawTool.view.on('click', event => {
        if (event.button !== 0) {
          return
        }
        drawing = true
        points.push(event.mapPoint)
        if (points.length === 1) {
          drawTool.fire('draw-start', { geometry: event.mapPoint })
        }
      })
      __DrawOperations__.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
        if (drawing) {
          const endPoint = EsriUtils.screenToMapPoint(event)
          const polygon = EsriUtils.pointsToPolygon([...points, endPoint])
          drawTool.fire('draw-moving', { geometry: polygon })
        }
      })
    }

    /**
   * 绘制矩形
   * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
   */
    static rectangle (drawTool) {
      let drawing = false
      let startPoint = null
      __DrawOperations__.removed.click = drawTool.view.on('click', event => {
        if (event.button !== 0) {
          return
        }
        if (drawing) { // 绘制完成
          drawing = false
          const endPoint = event.mapPoint
          const polyline = EsriUtils.pointsToPolyline([startPoint, endPoint])
          const rectangle = $esriExt(polyline.extent).toPolygon()
          drawTool.fire('draw-end', { geometry: rectangle })
        } else { // 绘制第一个起始端点
          drawing = true
          startPoint = event.mapPoint
          drawTool.fire('draw-start', { geometry: event.mapPoint })
        }
      })
      __DrawOperations__.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
        if (drawing) {
          const endPoint = EsriUtils.screenToMapPoint(event)
          const polyline = EsriUtils.pointsToPolyline([startPoint, endPoint])
          const rectangle = $esriExt(polyline.extent).toPolygon()
          drawTool.fire('draw-moving', { geometry: rectangle })
        }
      })
    }


    /**
   * 绘制矩形（以较快的方式）
   * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
   */
    static 'rectangle-faster' (drawTool) {
      let drawing = false
      let startPoint = null
      __DrawOperations__.removed.drag = drawTool.view.on('drag', event => {
        event.stopPropagation()
      })
      __DrawOperations__.removed['pointer-down'] = drawTool.view.on('pointer-down', event => {
        if (event.button !== 0) {
          return
        }
        drawing = true
        startPoint = EsriUtils.screenToMapPoint(event)
        drawTool.fire('draw-start', { geometry: startPoint })
      })
      __DrawOperations__.removed['pointer-up'] = drawTool.view.on('pointer-up', event => {
        if (event.button !== 0) {
          return
        }
        drawing = false
        const endPoint = EsriUtils.screenToMapPoint(event)
        const polyline = EsriUtils.pointsToPolyline([startPoint, endPoint])
        const rectangle = $esriExt(polyline.extent).toPolygon()
        drawTool.fire('draw-end', { geometry: rectangle })
      })
      __DrawOperations__.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
        if (drawing) {
          const endPoint = EsriUtils.screenToMapPoint(event)
          const polyline = EsriUtils.pointsToPolyline([startPoint, endPoint])
          const rectangle = $esriExt(polyline.extent).toPolygon()
          drawTool.fire('draw-moving', { geometry: rectangle })
        }
      })
    }

    /**
   * 绘制圆
   * @param {import('./draw-tool').DrawTool} drawTool 绘制工具对象
   */
    static circle (drawTool) {
      let drawing = false
      let startPoint = null
      __DrawOperations__.removed.click = drawTool.view.on('click', event => {
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
      __DrawOperations__.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
        if (drawing) {
          const endPoint = EsriUtils.screenToMapPoint(event)
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
      let drawing = false
      let startPoint = null
      __DrawOperations__.removed.drag = drawTool.view.on('drag', event => {
        event.stopPropagation()
      })
      __DrawOperations__.removed['pointer-down'] = drawTool.view.on('pointer-down', event => {
        if (event.button !== 0) {
          return
        }
        drawing = true
        startPoint = EsriUtils.screenToMapPoint(event)
        drawTool.fire('draw-start', { geometry: startPoint })
      })
      __DrawOperations__.removed['pointer-up'] = drawTool.view.on('pointer-up', event => {
        if (event.button !== 0) {
          return
        }
        drawing = false
        const endPoint = EsriUtils.screenToMapPoint(event)
        const radius = endPoint.distance(startPoint)
        const circle = new esri.geometry.Circle({
          center: startPoint, radius
        })
        drawTool.fire('draw-end', { geometry: circle })
      })
      __DrawOperations__.removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
        if (drawing) {
          const endPoint = EsriUtils.screenToMapPoint(event)
          const radius = endPoint.distance(startPoint)
          const circle = new esri.geometry.Circle({
            center: startPoint, radius
          })
          drawTool.fire('draw-moving', { geometry: circle })
        }
      })
    }

    //#endregion

    //#region getter

    get drawTool () {
      return _drawTool.get(this)
    }

    //#endregion

    //#region 构造函数

    constructor (drawTool) {
      _drawTool.set(this, drawTool)
    }

    //#endregion

    //#region 公有方法

    /**
     * 设置绘制类型
     * @param { import('./draw-tool').EDrawType } drawType 绘制类型
     */
    setDrawType (drawType) {
      DrawOperations.clearDrawType()
      drawType && DrawOperations[drawType.toLowerCase()]?.(this.drawTool)
    }

    //#endregion

  }

  //#endregion

  return __DrawOperations__

}())

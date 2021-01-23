/*
 * 描    述：ArcGIS API for JavaScript Drawer类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { BaseUtils } from '../../../../../js-utils'

/**
 * 绘图器
 */
export const Drawer = (function () {

  //#region 私有变量

  /**
   * 图元控制对象
   * @type { WeakMap<__Drawer__, import('../../../map-element-display/map-element-display').MapElementDisplay> }
   */
  const _mapElementDisplay = new WeakMap()

  /**
   * 绘制的图形样式
   * @type { WeakMap<__Drawer__, import('./drawer').IDrawerStyle> }
   */
  const _drawedStyle = new WeakMap()

  /**
   * 绘制时的图形样式
   * @type { WeakMap<__Drawer__, import('./drawer').IDrawerStyle> }
   */
  const _drawingStyle = new WeakMap()

  /**
   * 图元存储容器
   * @type { WeakMap<__Drawer__, __esri.Graphic[]> }
   */
  const _graphicsList = new WeakMap()

  //#endregion

  //#region 类体

  class __Drawer__ {

    //#region getter

    get mapElementDisplay () {
      return _mapElementDisplay.get(this)
    }

    get drawedStyle () {
      return _drawedStyle.get(this)
    }

    get drawingStyle () {
      return _drawingStyle.get(this)
    }

    get graphicsList () {
      return _graphicsList.get(this)
    }

    //#endregion

    //#region 构造函数

    constructor (mapElementDisplay) {
      _mapElementDisplay.set(this, mapElementDisplay)
      _drawedStyle.set(this, {
        color: [255, 0, 0, .5]
      })
      _drawingStyle.set(this, {
        color: [255, 0, 0, .3],
        outline: {
          color: [255, 0, 0, .5],
        }
      })
      _graphicsList.set(this, [])
    }

    //#endregion

    //#region 公有方法

    /**
     * 设置绘制图形样式
     * @param { import('./drawer').IDrawerStyle } style 样式
     * @returns { __Drawer__ } this
     */
    setDrawedStyle (style) {
      BaseUtils.deepExtent(true, _drawedStyle.get(this), style)
      return this
    }

    /**
     * 设置绘制中图形样式
     * @param { import('./drawer').IDrawerStyle } style 样式
     * @returns { __Drawer__ } this
     */
    setDrawingStyle (style) {
      BaseUtils.deepExtent(true, _drawingStyle.get(this), style)
      return this
    }

    /**
     * 添加图形
     * @param { __esri.Geometry | __esri.Geometry[] } geometries 图形
     * @returns { __Drawer__ } this
     */
    add (geometries) {
      const graphics = this.mapElementDisplay.parseGraphics(geometries, this.drawedStyle)
      Array.isArray(graphics)
        ? this.graphicsList.push(...graphics)
        : this.graphicsList.push(graphics)
      this.mapElementDisplay
        .clearTempGraphics()
        .addGraphics(graphics)
      return this
    }

    /**
     * 清空图形
     * @returns { __Drawer__ } this
     */
    clear () {
      this.mapElementDisplay.removeGraphics(this.graphicsList)
      _graphicsList.set(this, [])
      return this
    }

    /**
     * 设置图形
     * @param { __esri.Geometry | __esri.Geometry[] } geometries 图形
     * @returns { __Drawer__ } this
     */
    set (geometries) {
      return this
        .clear()
        .add(geometries)
    }

    // TODO
    // /**
    //  * 移除指定图形
    //  * @param { __esri.Geometry | __esri.Geometry[] } geometries 图形
    //  * @returns { __Drawer__ } this
    //  */
    // remove (geometries) {

    // }

    /**
     * 设置图形
     * @param { __esri.Geometry | __esri.Geometry[] } geometries 图形
     * @returns { __Drawer__ } this
     */
    setTemp (geometries) {
      const graphics = this.mapElementDisplay.parseGraphics(geometries, this.drawedStyle)
      this.mapElementDisplay.setTempGraphics(graphics)
      return this
    }

    //#endregion

  }

  //#endregion

  return __Drawer__

}())

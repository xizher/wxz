import { BaseUtils } from '../../../../js-utils'
import { $ext } from '../../../../js-ext'

export class Drawer {

  //#region 私有属性

  /**
   * 图元控制对象
   * @type { import('../map-element-display').MapElementDisplay }
   */
  #mapElementDisplay = null

  /**
   * 图形池
   * @type { __esri.Graphic[] }
   */
  #graphicPool = []

  /**
   * 绘制结果图形样式
   * @type { import('./drawer').EDrawerStyle }
   */
  #drawedStyle = {
    color: [255, 0, 0, .5],
  }

  /**
   * 绘制进行时样式
   * @type { import('./drawer').EDrawerStyle }
   */
  #drawingStyle = {
    color: [255, 0, 0, .3],
    outline: {
      color: [255, 0, 0, .5],
    },
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造：绘制器
   * @param { import('../map-element-display').MapElementDisplay } mapElementDisplay 图元控制对象
   */
  constructor (mapElementDisplay) {
    this.#mapElementDisplay = mapElementDisplay
  }

  //#endregion

  //#region 公有方法

  /**
   * 设置绘制图形样式
   * @param { import('./drawer').EDrawerStyle } style 样式
   * @returns { Drawer } this
   */
  setDrawedStyle (style) {
    BaseUtils.jExtent(true, this.#drawedStyle, style)
    return this
  }

  /**
   * 设置绘制中图形样式
   * @param { import('./drawer').EDrawerStyle } style 样式
   * @returns { Drawer } this
   */
  setDrawingStyle (style) {
    BaseUtils.jExtent(true, this.#drawingStyle, style)
    return this
  }

  /**
   * 添加图形
   * @param { __esri.Geometry | __esri.Geometry[] } geometries 图形
   * @returns { Drawer | __esri.Graphic | __esri.Graphic[] } this
   */
  add (geometries, returnGraphics = false) {
    const graphics = this.#mapElementDisplay.parseGraphics(geometries, this.#drawedStyle)
    Array.isArray(graphics)
      ? this.#graphicPool.push(...graphics)
      : this.#graphicPool.push(graphics)
    this.#mapElementDisplay
      .clearTempGraphics()
      .addGraphics(graphics)
    if (returnGraphics) {
      return graphics
    } else {
      return this
    }
  }

  /**
   * 清空图形
   * @returns { Drawer } this
   */
  clear () {
    this.#mapElementDisplay.removeGraphics(this.#graphicPool)
    $ext(this.#graphicPool).clear()
    return this
  }

  /**
   * 设置图形
   * @param { __esri.Geometry | __esri.Geometry[] } geometries 图形
   * @returns { Drawer | __esri.Graphic | __esri.Graphic[] } this
   */
  set (geometries, returnGraphics = false) {
    return this
      .clear()
      .add(geometries, returnGraphics)
  }

  /**
   * 移除指定图形
   * @param { __esri.Graphic | __esri.Graphic[] } graphics 图形
   * @returns { Drawer } this
   */
  remove (graphics) {
    this.#mapElementDisplay.removeGraphics(graphics)
    return this
  }

  /**
   * 设置图形
   * @param { __esri.Geometry | __esri.Geometry[] } geometries 图形
   * @returns { Drawer } this
   */
  setTemp (geometries) {
    const graphics = this.#mapElementDisplay.parseGraphics(geometries, this.#drawingStyle)
    this.#mapElementDisplay.setTempGraphics(graphics)
    return this
  }

  //#endregion

}

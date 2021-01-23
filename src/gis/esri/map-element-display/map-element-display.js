/*
 * 描    述：ArcGIS API for JavaScript 图元类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { esri } from '../esri-modules/esri-modules'
import { BaseUtils } from '../../../js-utils'

export const MapElementDisplay = (function () {

  //#region 私有属性

  /**
   * esri地图对象
   * @type { WeakMap<__MapElementDisplay__, import('../webmap/webmap').$Map> }
   */
  const _map = new WeakMap()

  /**
   * esri视图对象
   * @type { WeakMap<__MapElementDisplay__, import('../webmap/webmap').$View> }
   */
  const _view = new WeakMap()

  /**
   * 图元存储图层
   * @type { WeakMap<__MapElementDisplay__, __esri.GraphicsLayer> }
   */
  const _graphicsLayer = new WeakMap()

  //#endregion

  //#region 私有方法

  /**
   * 初始化
   * @type { WeakMap<__MapElementDisplay__, () => void> }
   */
  const _init = new WeakMap()

  //#endregion

  //#region 类体

  class __MapElementDisplay__ {

    //#region 静态属性

    /**
     * 默认符号类型库
     */
    static defaultSymbols = {
      simpleMarker: {
        color: [255, 0, 0, .8],
        style: 'circle',
        size: '12px',
        outline: {
          color: [255, 0, 0],
          width: 1
        }
      },
      simpleLine: {
        color: [255, 0, 0, .8],
        width: '2px',
        style: 'solid'
      },
      simpleFill: {
        color: [255, 0, 0, .4],
        style: 'solid',
        outline: {
          color: [255, 0, 0],
          width: 1
        }
      }
    }

    //#endregion

    //#region getter

    get map () {
      return _map.get(this)
    }

    get view () {
      return _view.get(this)
    }

    get graphicsLayer () {
      return _graphicsLayer.get(this)
    }

    //#endregion

    constructor (map, view) {
      _map.set(this, map)
      _view.set(this, view)

      //#region 私有方法定义

      _init.set(this, () => {
        const layer = new esri.layers.GraphicsLayer()
        this.map.layers.add(layer)
        _graphicsLayer.set(this, layer)
      })

      //#endregion

      _init.get(this)()
    }

    //#region 公有方法

    /**
     * 添加图元（保存已有图元基础上）
     * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
     * @returns { __MapElementDisplay__ } this
     */
    addGraphics (graphics) {
      Array.isArray(graphics)
        ? this.graphicsLayer.addMany(graphics)
        : this.graphicsLayer.add(graphics)
      return this
    }

    /**
     * 清理所有图元
     * @returns { __MapElementDisplay__ } this
     */
    clearGraphics () {
      this.graphicsLayer.removeAll()
      return this
    }

    /**
     * 清理指定图元
     * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
     * @returns { __MapElementDisplay__ } this
     */
    removeGraphics (graphics) {
      Array.isArray(graphics)
        ? this.graphicsLayer.removeMany(graphics)
        : this.graphicsLayer.remove(graphics)
      return
    }

    /**
     * 设置图元（清空已有图元基础上）
     * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
     * @returns { __MapElementDisplay__ } this
     */
    setGraphics (graphics) {
      return this
        .clearGraphics()
        .addGraphics(graphics)
    }

    /**
     * 添加过渡图元（保留已有过渡图元基础上）
     * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
     * @returns { __MapElementDisplay__ } this
    */
    addTempGraphics (graphics) {
      Array.isArray(graphics)
        ? this.view.graphics.addMany(graphics)
        : this.view.graphics.add(graphics)
      return this
    }

    /**
     * 清理所有过渡图元
     * @returns { __MapElementDisplay__ } this
     */
    clearTempGraphics () {
      this.view.graphics.removeAll()
      return this
    }

    /**
     * 清理指定过渡图元
     * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
     * @returns { __MapElementDisplay__ } this
     */
    removeTempGraphics (graphics) {
      Array.isArray(graphics)
        ? this.view.graphics.removeMany(graphics)
        : this.view.graphics.remove(graphics)
      return this
    }

    /**
     * 设置过渡图元（清空已有过渡图元基础上）
     * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
     * @returns { __MapElementDisplay__ } this
     */
    setTempGraphics (graphics) {
      return this
        .clearTempGraphics()
        .addTempGraphics(graphics)
    }

    /**
     * 清理所有图元（包括过渡图元）
     * @returns { __MapElementDisplay__ } this
     */
    clear () {
      return this
        .clearGraphics()
        .clearTempGraphics()
    }

    /**
     * 解析图元
     * @param { __esri.Geometry | __esri.Geometry[] } geometrys 图元
     * @param { __esri.Symbol } symbolOptions
     * @returns { __esri.Graphic | __esri.Graphic[] }
     */
    parseGraphics (geomeytries, symbolOptions = {}) {
      let symbol = null
      let type = Array.isArray(geomeytries) ? geomeytries[0].type : geomeytries.type
      if (type === 'point') {
        symbol = new esri.symbols.SimpleMarkerSymbol(__MapElementDisplay__.defaultSymbols.simpleMarker)
      } else if (type === 'polyline') {
        symbol = new esri.symbols.SimpleLineSymbol(__MapElementDisplay__.defaultSymbols.simpleLine)
      } else if (type === 'polygon' || type === 'extent') {
        symbol = new esri.symbols.SimpleFillSymbol(__MapElementDisplay__.defaultSymbols.simpleFill)
      }
      BaseUtils.deepExtent(true, symbol, symbolOptions)
      if (Array.isArray(geomeytries)) {
        return geomeytries.map(geometry => ({ geometry, symbol }))
      } else {
        return { geometry: geomeytries, symbol }
      }
    }

    //#endregion

  }

  //#endregion

  return __MapElementDisplay__

}())

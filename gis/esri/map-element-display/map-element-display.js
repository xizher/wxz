import { esri } from '../esri-modules/esri-modules'
import { BaseUtils } from '../../../js-utils'

export * from './drawer/drawer'

export class MapElementDisplay {

  //#region 静态属性

  /**
   * 默认符号库
   * @type { import("./map-element-display").IDefaultSumbols }
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
    },
    highlight: {
      simpleMarker: {
        color: [0, 255, 255, .8],
        style: 'circle',
        size: '12px',
        outline: {
          color: [0, 255, 255],
          width: 1
        }
      },
      simpleLine: {
        color: [0, 255, 255, .8],
        width: '2px',
        style: 'solid'
      },
      simpleFill: {
        color: [0, 255, 255, .4],
        style: 'solid',
        outline: {
          color: [0, 255, 255],
          width: 1
        }
      },
    }
  }

  //#endregion

  //#region 私有属性

  /**
   * 地图对象
   * @type { import("../web-map/web-map").$Map }
   */
  #map = null

  /**
   * 视图对象
   * @type { import("../web-map/web-map").$View }
   */
  #view = null

  /**
   * 图元存储图层
   * @type { __esri.GroupLayer }
   */
  #graphicsLayer = null

  /**
   * 高亮图元存储图层
   * @type { __esri.GroupLayer }
   */
  #highlightLayer = null

  //#endregion

  //#region getter

  get graphicsLayer () {
    return this.#graphicsLayer
  }

  //#endregion

  //#region 构造函数

  constructor () {
    // not
  }

  /**
   * 插件名
   * @type { string }
   */
  get PLUGIN_NAME () {
    return 'mapElementDisplay'
  }

  /**
   * 插件注册
   * @param { import('../web-map/web-map').WebMap } webMap WebGIS应用程式
   */
  REGISTER_PLUGIN (webMap) { // eslint-disable-line
    this.#map = webMap.map
    this.#view = webMap.view

    this.#init()
  }

  //#endregion

  //#region 私有方式

  /**
   * 初始化
   */
  #init () {
    this.#graphicsLayer = new esri.layers.GraphicsLayer()
    this.#highlightLayer = new esri.layers.GraphicsLayer()
    this.#map.add(this.#graphicsLayer)
    this.#map.add(this.#highlightLayer)
  }

  //#endregion

  //#region 公有方法

  /**
     * 添加图元（保存已有图元基础上）
     * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
     * @returns { MapElementDisplay } this
     */
  addGraphics (graphics) {
    Array.isArray(graphics)
      ? this.#graphicsLayer.addMany(graphics)
      : this.#graphicsLayer.add(graphics)
    return this
  }

  /**
   * 清理所有图元
   * @returns { MapElementDisplay } this
   */
  clearGraphics () {
    this.#graphicsLayer.removeAll()
    return this
  }

  /**
   * 清理指定图元
   * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
   * @returns { MapElementDisplay } this
   */
  removeGraphics (graphics) {
    Array.isArray(graphics)
      ? this.#graphicsLayer.removeMany(graphics)
      : this.#graphicsLayer.remove(graphics)
    return this
  }

  /**
   * 设置图元（清空已有图元基础上）
   * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
   * @returns { MapElementDisplay } this
   */
  setGraphics (graphics) {
    return this
      .clearGraphics()
      .addGraphics(graphics)
  }

  /**
   * 添加图元（保存已有图元基础上）
   * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
   * @returns { MapElementDisplay } this
   */
  addHighlight (graphics) {
    Array.isArray(graphics)
      ? this.#highlightLayer.addMany(graphics)
      : this.#highlightLayer.add(graphics)
    return this
  }

  /**
   * 清理所有图元
   * @returns { MapElementDisplay } this
   */
  clearHighlight () {
    this.#highlightLayer.removeAll()
    return this
  }

  /**
   * 清理指定图元
   * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
   * @returns { MapElementDisplay } this
   */
  removeHighlight (graphics) {
    Array.isArray(graphics)
      ? this.#highlightLayer.removeMany(graphics)
      : this.#highlightLayer.remove(graphics)
    return this
  }

  /**
   * 设置图元（清空已有图元基础上）
   * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
   * @returns { MapElementDisplay } this
   */
  setHighlight (graphics) {
    return this
      .clearHighlight()
      .addHighlight(graphics)
  }

  /**
   * 添加过渡图元（保留已有过渡图元基础上）
   * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
   * @returns { MapElementDisplay } this
  */
  addTempGraphics (graphics) {
    Array.isArray(graphics)
      ? this.#view.graphics.addMany(graphics)
      : this.#view.graphics.add(graphics)
    return this
  }

  /**
   * 清理所有过渡图元
   * @returns { MapElementDisplay } this
   */
  clearTempGraphics () {
    this.#view.graphics.removeAll()
    return this
  }

  /**
   * 清理指定过渡图元
   * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
   * @returns { MapElementDisplay } this
   */
  removeTempGraphics (graphics) {
    Array.isArray(graphics)
      ? this.#view.graphics.removeMany(graphics)
      : this.#view.graphics.remove(graphics)
    return this
  }

  /**
   * 设置过渡图元（清空已有过渡图元基础上）
   * @param { __esri.Graphic | __esri.Graphic[] } graphics 图元
   * @returns { MapElementDisplay } this
   */
  setTempGraphics (graphics) {
    return this
      .clearTempGraphics()
      .addTempGraphics(graphics)
  }

  /**
   * 清理所有图元（包括过渡图元）
   * @returns { MapElementDisplay } this
   */
  clear () {
    return this
      .clearGraphics()
      .clearHighlight()
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
      symbol = new esri.symbols.SimpleMarkerSymbol(MapElementDisplay.defaultSymbols.simpleMarker)
    } else if (type === 'polyline') {
      symbol = new esri.symbols.SimpleLineSymbol(MapElementDisplay.defaultSymbols.simpleLine)
    } else if (type === 'polygon' || type === 'extent') {
      symbol = new esri.symbols.SimpleFillSymbol(MapElementDisplay.defaultSymbols.simpleFull)
    }
    BaseUtils.jExtent(true, symbol, symbolOptions)
    if (Array.isArray(geomeytries)) {
      return geomeytries.map(geometry => new esri.Graphic({ geometry, symbol }))
    } else {
      return new esri.Graphic({ geometry: geomeytries, symbol })
    }
  }

  /**
   * 解析高亮图元
   * @param { __esri.Geometry | __esri.Geometry[] } geometrys 图元
   * @param { __esri.Symbol } symbolOptions
   * @returns { __esri.Graphic | __esri.Graphic[] }
   */
  parseHighlightGraphics (geomeytries, symbolOptions = {}) {
    let symbol = null
    let type = Array.isArray(geomeytries) ? geomeytries[0].type : geomeytries.type
    if (type === 'point') {
      symbol = new esri.symbols.SimpleMarkerSymbol(MapElementDisplay.defaultSymbols.highlight.simpleMarker)
    } else if (type === 'polyline') {
      symbol = new esri.symbols.SimpleLineSymbol(MapElementDisplay.defaultSymbols.highlight.simpleLine)
    } else if (type === 'polygon' || type === 'extent') {
      symbol = new esri.symbols.SimpleFillSymbol(MapElementDisplay.defaultSymbols.highlight.simpleFull)
    }
    BaseUtils.jExtent(true, symbol, symbolOptions)
    if (Array.isArray(geomeytries)) {
      return geomeytries.map(geometry => new esri.Graphic({ geometry, symbol }))
    } else {
      return new esri.Graphic({ geometry: geomeytries, symbol })
    }
  }

  //#endregion

}

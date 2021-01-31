import { esri } from '../esri-modules/esri-modules'

/**
 * 图层操作类
 */
export class LayerOperation {

  //#region 私有方法

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

  // /** // reorder() 方法无效 原因未知
  //  * 根图层组（存储图层用）
  //  * @type { __esri.GroupLayer }
  //  */
  // #rootGroupLayer = null

  /**
   * 图层池
   * @type { import("./layer-operation").ILayerOperationLayerPool }
   */
  #layerPool = {}

  /**
   * 配置项
   * @type { import("./layer-operation").ILayerOperationOptions }
   */
  #options = null

  //#endregion

  //#region getter

  /**
   * 管理的图层总数
   * @returns { number }
   */
  get count () {
    return Object.keys(this.#layerPool).length
  }

  //#endregion

  //#region 构造函数

  constructor (options) {
    this.#options = options
  }

  /**
   * 插件名
   * @type { string }
   */
  get PLUGIN_NAME () {
    return 'layerOperation'
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

  //#region 私有方法

  /**
   * 初始化
   */
  #init () {
    // this.#rootGroupLayer = new esri.layers.GroupLayer()
    // this.#map.add(this.#rootGroupLayer, 0)
    this.#initLayerPool()
  }

  /**
   * 初始化图层迟
   */
  #initLayerPool () {
    this.#options.layerList.forEach(item => {
      const { target, name, alias, key } = item
      const layer = this.#createLayer(target)
      if (layer) {
        this.#map.add(layer, 0)
        this.#layerPool[name] = { alias, key, target, targetLayer: layer }
      }
    })
  }

  /**
   * 创建图层
   * @param { Object } _
   * @param { string } _.type 图层类型
   * @param { __esri.LayerProperties } _.options 图层配置项
   * @returns { __esri.Layer } 图层对象
   */
  #createLayer ({ type, options }) {
    let layer = null
    const typeStr = type.toLowerCase()
    if (typeStr === 'imagerylayer') {
      layer = new esri.layers.ImageryLayer(options)
    } else if (typeStr === 'featurelayer') {
      layer = new esri.layers.FeatureLayer(options)
    }
    return layer
  }

  //#endregion

  //#region 公有方法

  /**
   * 通过图层名寻找图层对象
   * @param { string } layerName 图层名
   * @returns { __esri.Layer | null } 图层对象
   */
  findLayerByName (layerName) {
    if (this.#layerPool[layerName]) {
      return this.#layerPool[layerName].targetLayer
    } else {
      return null
    }
  }

  /**
   * 设置图层层级
   * @param { string | __esri.Layer } layerName 图层名 或 图层对象
   * @param { number } level 层级
   * @returns { LayerOperation } this
   */
  setLayerLevel (layerName, level) {
    let layer = layerName
    if (typeof layerName === 'string') {
      layer = this.findLayerByName(layerName)
    }
    this.#map.reorder(layer, level)
    return this
  }

  /**
   * 设置图层层级到最高层
   * @param { string | __esri.Layer } layerName 图层名 或 图层对象
   * @returns { LayerOperation } this
   */
  setLayerLevelToTop (layerName) {
    let layer = layerName
    if (typeof layerName === 'string') {
      layer = this.findLayerByName(layerName)
    }
    this.#map.reorder(layer, this.count - 1)
    return this
  }

  /**
   * 克隆图层
   * @param { string | __esri.Layer } layerName 图层名 或 图层对象
   * @returns { __esri.Layer } 新图层
   */
  cloneLayer (layerName) {
    if (typeof layerName === 'string') {
      const layer = this.#createLayer(this.#layerPool[layerName].target)
      return layer
    }
    const layer = layerName
    for (const key in this.#layerPool) {
      const item = this.#layerPool[key]
      if (item.targetLayer === layer) {
        return this.#createLayer(item.target)
      }
    }
    return null
  }

  /**
   * 设置图层可见性
   * @param { string } layerName 图层名
   * @param { boolean } visible 可见性，默认值 true
   * @returns { LayerOperation } this
   */
  setLayerVisible (layerName, visible = true) {
    const layer = this.findLayerByName(layerName)
    layer.visible = visible
    return this
  }

  /**
   * 缩放至图层
   * @param { string | __esri.Layer } layerName 图层名 或 图层对象
   * @returns { LayerOperation } this
   */
  zoomToLayer (layerName) {
    let layer = layerName
    if (typeof layerName === 'string') {
      layer = this.findLayerByName(layerName)
    }
    this.#view.goTo(layer.fullExtent)
    return this
  }

  /**
   * 缩放至图层（异步）
   * @param { string | __esri.Layer } layerName 图层名 或 图层对象
   * @returns { Promise<void> } promise
   */
  zoomToLayerAsync (layerName) {
    let layer = layerName
    if (typeof layerName === 'string') {
      layer = this.findLayerByName(layerName)
    }
    return this.#view.goTo(layer.fullExtent)
  }

  //#endregion

}

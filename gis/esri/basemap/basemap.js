import { esri } from '../esri-modules/esri-modules'

/**
 * 底图控制类
 */
export class Basemap {

  //#region 私有变量

  /**
   * 地图对象
   * @type { import("../web-map/web-map").$Map }
   */
  #map = null

  /**
   * 底图可选性
   * @type { import("./basemap").IBasemapItems }
   */
  #basemapItems = []

  /**
   * 配置项
   * @type { import("./basemap").IBasemapOptions }
   */
  #options = null

  /**
   * 当前底图选择项
   * @type { string }
   */
  #selectedKey = null

  //#endregion

  //#region getter

  /**
   * 当前底图选择项
   * @type { string }
   */
  get selectedKey () {
    return this.#selectedKey
  }

  //#endregion

  //#region setter

  /**
   * 当前底图选择项
   */
  set selectedKey (key) {
    this.#selectedKey = key
    this.#setBasemap(key)
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造：底图控制对象
   * @param { import('../web-map/web-map').$Map } map 地图对象
   * @param { import('./basemap').IBasemapOptions } options 配置项
   */
  constructor (options) {
    this.#options = options
  }

  /**
   * 插件名
   * @type { string }
   */
  get PLUGIN_NAME () {
    return 'basemap'
  }

  /**
   * 插件注册
   * @param { import('../web-map/web-map').WebMap } webMap WebGIS应用程式
   */
  REGISTER_PLUGIN (webMap) { // eslint-disable-line
    this.#map = webMap.map

    this.#init()
  }

  //#endregion

  //#region 私有方法

  /**
   * 初始化
   */
  #init () {
    this.#options.layers.forEach(lyr => {
      let layer = null
      if (lyr.type.toLowerCase() === 'webtilelayer') {
        layer = new esri.layers.WebTileLayer(lyr.options)
      }
      this.#basemapItems[lyr.key] = { layer, ...lyr }
    })
    this.selectedKey = this.#options.selectedKey
  }

  /**
   * 根据Key值设置底图项
   * @param { string } key 底图项Key值
   * @returns { Basemap } this
   */
  #setBasemap (key) {
    this.setVisible(this)
    if (this.#basemapItems[key]) {
      this.#map.basemap = {
        baseLayers: [
          this.#basemapItems[key].layer
        ]
      }
    }
    return this
  }

  //#endregion

  //#region 公有方法

  /**
   * 设置底图可见性
   * @param { boolean } visible 可见性
   * @returns { Basemap } this
   */
  setVisible (visible) {
    Object.values(this.#basemapItems)
      .forEach(item => item.layer.visible = visible)
    return this
  }

  /**
   * 根据Key值设置底图项
   * @param { string } key 底图项Key值
   * @returns { Basemap } this
   */
  setBasemap (key) {
    this.selectedKey = key // 触发流 -> setter -> #setBasemap
    return this
  }

  //#endregion

}

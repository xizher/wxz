import { BaseUtils } from '../../../js-utils'
import OlMap from 'ol/Map'
import View from 'ol/View'
import { Listener } from '../../../listener'

/**
 * WebMap应用程式类
 */
export class WebMap {

  //#region 私有变量

  /**
   * 目标容器
   * @type { String | HTMLElement }
   */
  #targetDiv = ''

  /**
   * 地图对象
   * @type { import('./web-map').IMap }
   */
  #map = null

  /**
   * 视图对象
   * @type { import('./web-map').IView }
   */
  #view = null

  /**
   * 配置项
   * @type { import('./web-map').IWebMapOptions }
   */
  #options = {
    viewOptions: {
      center: [0, 0],
      zoom: 1
    }
  }

  //#endregion

  //#region getter

  /**
   * 目标容器
   * @type { String | HTMLElement }
   */
  get targetDiv () {
    return this.#targetDiv
  }

  /**
   * 地图对象
   * @type { import('./web-map').IMap }
   */
  get map () {
    return this.#map
  }

  /**
   * 视图对象
   * @type { import('./web-map').IView }
   */
  get view () {
    return this.#view
  }

  //#endregion

  //#region setter

  //#endregion

  //#region 构造函数

  /**
   * 构造WebMap应用程式对象
   * @param { String | HTMLElement } targetDiv 目标容器
   * @param { import('./web-map').IWebMapOptions } options 配置项
   */
  constructor (targetDiv = '', options = {}) {
    this.#targetDiv = targetDiv
    BaseUtils.jExtent(true, this.#options, options)
    this.#init()
  }

  //#endregion

  //#region 私有方法

  /**
   * 对象初始化
   */
  #init () {
    const opt = this.#options
    const view = new View(opt.viewOptions)
    const map = new OlMap({ view })
    // map.on('change:target', e => this.#targetDiv = e.)
    this.#view = view
    this.#view.$owner = this
    this.#map = map
    this.#map.$owner = this
  }

  //#endregion

  //#region 公有方法

  /**
   * 装载应用程式
   * @returns { this }
   */
  mount () {
    const target = this.#targetDiv
    this.#map.setTarget(target)
    return this
  }

  /**
   * 装载应用程式插件
   * @param { import('./web-map').WebMapPlugin } plugin WebMap应用程式插件
   */
  use (plugin) {
    this[plugin.pluginName] = plugin.installPlugin(this)
    return this
  }

  //#endregion

}

/**
 * WebMap应用程式插件类
 */
export class WebMapPlugin extends Listener {

  //#region 私有属性

  /**
   * 地图对象
   * @type { import('./web-map').IMap }
   */
  #map = null

  /**
   * 视图对象
   * @type { import('./web-map').IView }
   */
  #view = null

  //#endregion

  //#region getter

  /**
   * 地图对象
   * @type { import('./web-map').IMap }
   */
  get map () {
    return this.#map
  }

  /**
   * 视图对象
   * @type { import('./web-map').IView }
   */
  get view () {
    return this.#view
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造WebMap应用程式插件对象
   * @param { string } pluginName 应用程式插件属性名
   */
  constructor (pluginName) {
    super()
    this.pluginName = pluginName
  }

  //#endregion

  //#region 公有方法

  /**
   * 装载应用程式插件
   * @param { WebMap } webMap WebMap应用程式
   * @returns { this }
   */
  installPlugin (webMap) {
    this.#map = webMap.map
    this.#view = webMap.view
    return this
  }

  //#endregion

}

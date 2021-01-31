
import { Listener } from '../../../listener'
import { esri } from '../esri-modules/esri-modules'

/**
 * WebGIS应用程式类
 * @type { import('./web-map').WebMap }
 */
export class WebMap extends Listener {

  //#region 私有属性

  /**
   * 视图绑定的元素ID
   * @type { string }
   */
  #divId = ''

  /**
   * 配置项
   * @type { import('./web-map').IWebMapOptions }
   */
  #options = {}

  /**
   * 地图对象
   * @type { import('./web-map').$Map }
   */
  #map = null

  /**
   * 视图对象
   * @type { import('./web-map').$View }
   */
  #view = null

  //#endregion

  //#region getter

  /**
   * 视图绑定的元素ID
   * @type { string }
   */
  get divId () {
    return this.#divId
  }

  /**
   * 地图对象
   * @type { import('./web-map').$Map }
   */
  get map () {
    return this.#map
  }

  /**
   * 视图对象
   * @type { import('./web-map').$View }
   */
  get view () {
    return this.#view
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造：WebGIS应用程式对象
   * @param { string } divId 视图绑定元素ID
   * @param { import('./web-map').IWebMapOptions } options 配置项
   */
  constructor (divId, options) {
    super()

    this.#divId = divId
    this.#options = options
    this.#map = new esri.Map()
    this.#map.$owner = this
    this.#view = new esri.views.MapView({
      map: this.#map,
      ...this.#options.viewOptions
    })
    this.#view.$owner = this
  }

  //#endregion

  //#region 公有方法

  /**
   * WebGIS应用程式装载
   * @returns { WebMap } this
   */
  mount () {
    this.#view.container = this.#divId
    this.fire('mounted')
    return this
  }

  /**
   * 外挂装载
   * @param { import('./web-map').IWebMapPlugin } plugin
   * @returns { WebMap } this
   */
  use (plugin) {
    plugin.REGISTER_PLUGIN(this)
    this[plugin.PLUGIN_NAME] = plugin
    return this
  }

  //#endregion

}

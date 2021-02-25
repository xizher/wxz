import { Listener } from '../../../../../listener'

/**
 * 基础工具类
 */
export class BaseTool extends Listener {

  //#region 私有变量

  /**
   * 地图对象
   * @type { import('../../../web-map/web-map').IMap }
   */
  #map = null

  /**
   * 视图对象
   * @type { import('../../../web-map/web-map').IView }
   */
  #view = null

  /**
   * 是否为一次性工具
   * @type { boolean }
   */
  #isOnceTool = null

  /**
   * 工具激活状态
   * @type { boolean }
   */
  #actived = false

  //#endregion

  //#region getter

  /**
   * 地图对象
   * @type { import('../../../web-map/web-map').IMap }
   */
  get map () {
    return this.#map
  }

  /**
   * 视图对象
   * @type { import('../../../web-map/web-map').IView }
   */
  get view () {
    return this.#view
  }

  /**
   * 是否为一次性工具
   * @type { boolean }
   */
  get isOnceTool () {
    return this.#isOnceTool
  }

  /**
   * 工具激活状态
   * @type { boolean }
   */
  get actived () {
    return this.#actived
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造基础工具对象
   * @param { import('../../../web-map/web-map').IMap } map 地图对象
   * @param { import('../../../web-map/web-map').IView } view 视图对象
   * @param { boolean } isOnceTool 是否为一次性工具
   */
  constructor (map, view, isOnceTool = false) {
    super()
    this.#map = map
    this.#view = view
    this.#isOnceTool = isOnceTool

    this.#init()
  }

  //#endregion

  //#region 私有方法

  #init () {
    this.on('tool-actived', event => this.onToolActived(event))
    this.on('tool-clear', event => this.onToolClear(event))
    this.on('tool-deactived', event => this.onToolDeActived(event))
  }

  //#endregion

  //#region 公有方法

  /**
   * 激活工具
   * @returns { this }
   */
  active () {
    if (this.#actived) {
      return this
    }
    this.#actived = true
    this.fire('tool-actived')
    if (this.#isOnceTool) {
      this.deactive()
    }
    return this
  }

  /**
   * 解除激活
   * @returns { this }
   */
  deactive () {
    if (!this.#actived) {
      return this
    }
    this.fire('tool-deactived')
    return this
  }

  /**
   * 工具激活监听事件
   * @param { import('../../../../../listener').IListenerCallback } event
   */
  onToolActived (event) {
    if (this.#actived) {
      return event
    } else {
      return false
    }
  }

  /**
   * 工具清理监听事件
   * @param { import('../../../../../listener').IListenerCallback } event
   */
  onToolClear (event) {
    if (this.#actived) {
      return event
    } else {
      return false
    }
  }

  /**
   * 工具解除激活监听事件
   * @param { import('../../../../../listener').IListenerCallback } event
   */
  onToolDeActived (event) {
    if (this.#actived) {
      this.#actived = false
      return event
    } else {
      return false
    }
  }

  //#endregion

}

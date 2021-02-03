import { Listener } from '../../../../listener'

export class BaseTool extends Listener {

  //#region 私有属性

  /**
   * 地图对象
   * @type { import('../../web-map/web-map').$Map }
   */
  #map = null

  /**
   * @type { import('../../web-map/web-map').$View }
   */
  #view = null

  /**
   * 工具激活状态
   * @type { boolean }
   */
  #actived = false

  /**
   * 是否为一次性工具
   * @type { boolean }
   */
  #once = false

  //#endregion

  //#region getter

  get map () {
    return this.#map
  }

  get view () {
    return this.#view
  }

  get actived () {
    return this.#actived
  }

  get isOnce () {
    return this.#once
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造：基础工具
   * @param { import('../../web-map/web-map').$Map } map 地图对象
   * @param { import('../../web-map/web-map').$View } view 视图对象
   * @param { boolean } once 是否为一次性工具
   */
  constructor (map, view, once = false) {
    super ()
    this.#map = map
    this.#view = view
    this.#once = once

    this.#init()
  }

  //#endregion

  //#region 私有方法

  #init () {
    this.on('tool-actived', event => this.onToolActived(event))
    this.on('tool-deactived', event => this.onToolDeActiced(event))
    this.on('tool-clear', event => this.onToolClear(event))
    this.on('draw-start', event => this.onDrawStart(event))
    this.on('draw-moving', event => this.onDrawMoving(event))
    this.on('draw-end', event => this.onDrawEnd(event))
  }

  //#endregion

  //#region 公有方法

  onToolActived (event) { // eslint-disable-line
    if (this.#actived) {
      // ...
      return true
    } else {
      return false
    }
  }

  onToolDeActiced (event) { // eslint-disable-line
    if (this.#actived) {
      this.#actived = false
      // ...
      return true
    } else {
      return false
    }
  }

  onDrawStart (event) { // eslint-disable-line
    if (this.#actived) {
      // ...
      return true
    } else {
      return false
    }
  }

  onDrawMoving (event) { // eslint-disable-line
    if (this.#actived) {
      // ...
      return true
    } else {
      return false
    }
  }

  onDrawEnd (event) { // eslint-disable-line
    if (this.#actived) {
      // ...
      return true
    } else {
      return false
    }
  }

  onToolClear (event) { // eslint-disable-line
    if (this.#actived) {
      // ...
      return true
    } else {
      return false
    }
  }

  /**
     * 激活工具
     * @type { __BaseTool__ } this
     */
  active () {
    if (this.#actived) {
      return this
    }
    this.#actived = true
    this.fire('tool-actived')
    if (this.#once) {
      this.deactive()
    }
    return this
  }

  /**
   * 解除激活
   * @type { __BaseTool__ } this
   */
  deactive () {
    if (!this.#actived) {
      return this
    }
    this.fire('tool-deactived')
    return this
  }

  //#endregion

}

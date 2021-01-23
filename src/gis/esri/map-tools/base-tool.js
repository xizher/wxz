/*
 * 描    述：ArcGIS API for JavaScript 基础工具类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { Listener } from '../../../listener/listener'

/**
 * 基础工具类
 */
export const BaseTool = (function () {

  //#region 私有属性

  /**
   * esri地图对象
   * @type { WeakMap<__BaseTool__, import('../webmap/webmap').$Map> }
   */
  const _map = new WeakMap()

  /**
   * esri视图对象
   * @type { WeakMap<__BaseTool__, import('../webmap/webmap').$View> }
   */
  const _view = new WeakMap()

  /**
   * 工具激活状态
   * @type { WeakMap<__BaseTool__, boolean> }
   */
  const _actived = new WeakMap()

  /**
   * 是否为一次性工具
   * @type { WeakMap<__BaseTool__, boolean> }
   */
  const _once = new WeakMap()

  //#endregion

  //#region 私有方法

  /**
   * 初始化
   * @type { WeakMap<__BaseTool__, () => void> }
   */
  const _init = new WeakMap()

  //#endregion

  //#region 类体

  class __BaseTool__ extends Listener {

    //#region getter

    get map () {
      return _map.get(this)
    }

    get view () {
      return _view.get(this)
    }

    get actived () {
      return _actived.get(this)
    }

    get once () {
      return _once.get(this)
    }

    //#endregion

    //#region 构造函数

    constructor (map, view, once = false) {
      super ()
      _map.set(this, map)
      _view.set(this, view)
      _actived.set(this, false)
      _once.set(this, once)

      //#region 私有方法定义

      _init.set(this, () => {
        this.on('tool-actived', event => this.onToolActived(event))
        this.on('tool-deactived', event => this.onToolDeActiced(event))
        this.on('tool-clear', event => this.onToolClear(event))
        this.on('draw-start', event => this.onDrawStart(event))
        this.on('draw-moving', event => this.onDrawMoving(event))
        this.on('draw-end', event => this.onDrawEnd(event))
      })

      //#endregion

      _init.get(this)()
    }

    //#endregion

    //#region 公有方法

    onToolActived (event) { // eslint-disable-line
      if (this.actived) {
        // ...
        return true
      } else {
        return false
      }
    }

    onToolDeActiced (event) { // eslint-disable-line
      if (this.actived) {
        _actived.set(this, false)
        // ...
        return true
      } else {
        return false
      }
    }

    onDrawStart (event) { // eslint-disable-line
      if (this.actived) {
        // ...
        return true
      } else {
        return false
      }
    }

    onDrawMoving (event) { // eslint-disable-line
      if (this.actived) {
        // ...
        return true
      } else {
        return false
      }
    }

    onDrawEnd (event) { // eslint-disable-line
      if (this.actived) {
        // ...
        return true
      } else {
        return false
      }
    }

    onToolClear (event) { // eslint-disable-line
      if (this.actived) {
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
      if (this.actived) {
        return this
      }
      _actived.set(this, true)
      this.fire('tool-actived')
      if (this.once) {
        this.deactive()
      }
      return this
    }

    /**
     * 解除激活
     * @type { __BaseTool__ } this
     */
    deactive () {
      if (!this.actived) {
        return this
      }
      this.fire('tool-deactived')
      return this
    }

    //#endregion

  }

  //#endregion

  return __BaseTool__
}())

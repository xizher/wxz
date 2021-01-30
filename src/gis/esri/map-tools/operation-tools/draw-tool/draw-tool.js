/*
 * 描    述：ArcGIS API for JavaScript DrawTool类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { BaseTool } from '../../base-tool'
import { DrawOperations } from './draw-operations'
import { Drawer } from './drawer'

export const DrawTool = (function () {

  //#region 私有属性

  /**
   * 图形绘制对象
   * @type { WeakMap<__DrawTool__, Drawer> }
   */
  const _drawer = new WeakMap()

  /**
   * 地图绘制类型控制对象
   * @type { WeakMap<__DrawTool__, DrawOperations> }
   */
  const _drawOperations = new WeakMap()

  /**
   * 绘制图形类型
   * @type { WeakMap<__DrawTool__, import('./draw-tool').EDrawType> }
   */
  const _drawType = new WeakMap()

  //#endregion

  //#region 类体

  class __DrawTool__ extends BaseTool {

    //#region getter

    get drawer () {
      return _drawer.get(this)
    }

    get drawOperations () {
      return _drawOperations.get(this)
    }

    get drawType () {
      return _drawType.get(this)
    }

    //#endregion

    //#region setter

    set drawType (type) {
      _drawType.set(this, type)
      if (this.actived) {
        this.drawOperations.setDrawType(this.drawType)
      }
    }

    //#endregion

    //#region 构造函数

    constructor (map, view, drawType) {
      super(map, view)

      _drawer.set(this, new Drawer(this.view.$owner.mapElementDisplay))
      _drawOperations.set(this, new DrawOperations(this))
      _drawType.set(this, drawType)
    }

    //#endregion

    //#region 公有方法

    onToolActived (event) {
      if (super.onToolActived(event)) {
        this.drawOperations.setDrawType(this.drawType)
        return true
      } else {
        return false
      }
    }

    onDrawEnd (event) {
      if (super.onDrawEnd(event)) {
        const graphics = this.drawer.add(event.geometry, true)
        return graphics
      } else {
        return false
      }
    }

    onDrawMoving (event) {
      if (super.onDrawEnd(event)) {
        this.drawer.setTemp(event.geometry)
        return true
      } else {
        return false
      }
    }

    onToolDeActiced (event) {
      if (super.onToolDeActiced(event)) {
        DrawOperations.clearDrawType()
        return true
      } else {
        return false
      }
    }

    //#endregion

  }

  //#endregion

  return __DrawTool__

}())

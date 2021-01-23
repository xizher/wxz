/*
 * 描    述：ArcGIS API for JavaScript MapTools类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { BaseTool } from './base-tool'
import { DrawTool } from './operation-tools/draw-tool/draw-tool'


export const MapTools = (function () {

  //#region 私有属性

  /**
   * 地图对象
   * @type { WeakMap<__MapTools__, import('../webmap/webmap').$Map> }
   */
  const _map = new WeakMap()

  /**
   * 视图对象
   * @type { WeakMap<__MapTools__, import('../webmap/webmap').$View> }
   */
  const _view = new WeakMap()

  /**
   * 地图操作工具集
   * @type { WeakMap<__MapTools__, import('./map-tools').IToolOperations> }
   */
  const _toolOperations = new WeakMap()

  /**
   * 上一个非一次性工具标识
   * @type { WeakMap<__MapTools__, import('./operation-tools/draw-tool/draw-tool').EDrawType> }
   */
  const _preMapToolKey = new WeakMap()

  /**
   * 当前激活状态的地图工具
   * @type { WeakMap<__MapTools__, import('./operation-tools/draw-tool/draw-tool').EDrawType> }
   */
  const _activedMapToolKey = new WeakMap()

  //#endregion

  //#region 类体

  class __MapTools__ {

    //#region getter

    get map () {
      return _map.get(this)
    }

    get view () {
      return _view.get(this)
    }

    get toolOperations () {
      return _toolOperations.get(this)
    }

    get preMapToolKey () {
      return _preMapToolKey.get(this)
    }

    get activedMapToolKey () {
      return _activedMapToolKey.get(this)
    }

    //#endregion

    //#region 构造函数

    constructor (map, view) {
      _map.set(this, map)
      _view.set(this, view)
      _toolOperations.set(this, {
        '': new BaseTool(this.map, this.view),
        'draw-point': new DrawTool(this.map, this.view, 'point'),
        'draw-line': new DrawTool(this.map, this.view, 'line'),
        'draw-line-faster': new DrawTool(this.map, this.view, 'line-faster'),
        'draw-polyline': new DrawTool(this.map, this.view, 'polyline'),
        'draw-polygon': new DrawTool(this.map, this.view, 'polygon'),
        'draw-rectangle': new DrawTool(this.map, this.view, 'rectangle'),
        'draw-rectangle-faster': new DrawTool(this.map, this.view, 'rectangle-faster'),
        'draw-circle': new DrawTool(this.map, this.view, 'circle'),
        'draw-circle-faster': new DrawTool(this.map, this.view, 'circle-faster'),
      })
    }

    //#endregion

    //#region 公有方法

    /**
     * 设置当前地图工具
     * @param { import('./operation-tools/draw-tool/draw-tool').EDrawType } mapTool 工具字符串
     */
    setMapTool (mapTool) {
      // this.#view.owner.mapElementDisplay.clear()
      let targetTool = null
      for (const key in this.toolOperations) {
        if (key === mapTool.toLowerCase()) {
          targetTool = this.toolOperations[key]
        } else {
          this.toolOperations[key].deactive()
        }
      }
      if (targetTool) {
        targetTool.active()
        _activedMapToolKey.set(this, mapTool)
        if (targetTool.once) {
          return this.setMapTool(this.preMapToolKey)
        } else {
          _preMapToolKey.set(this, mapTool)
          return this.activedMapToolKey
        }
      } else {
        return this.setMapTool('')
      }
    }

    /**
     * 创建自定义工具
     * @param { string } toolName 工具名
     * @param { BaseTool } toolObject 工具对象
     */
    createCustomTool (toolName, toolObject) {
      this.toolOperations[toolName] = toolObject
    }

    /**
     * 检查是否已记录工具
     * @param { string } toolName 工具名
     */
    hasTool (toolName) {
      return Object.prototype.hasOwnProperty(toolName) // eslint-disable-line
    }

    //#endregion

  }

  //#endregion

  return __MapTools__

}())

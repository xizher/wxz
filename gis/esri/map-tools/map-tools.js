import { BaseTool } from './base-tool/base-tool'
import { DrawTool } from './tools/draw-tool/draw-tool'
import {
  ZoomInTool,
  ZoomOutTool,
  ZoomHomeTool,
  ZoomInRectTool,
  ZoomOutRectTool,
} from './tools/zoom-tool/zoom-tool'
import { ClearTool } from './tools/clear-tool/clear-tool'


export class MapTools {

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
   * 工具池
   * @type { import('./map-tools').IMapToolsToolPool }
   */
  #toolPool = {}

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
    return 'mapTools'
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
    const map = this.#map
    const view = this.#view
    this.#toolPool = {
      '': new BaseTool(map, view),
      'draw-point': new DrawTool(map, view, 'point'),
      'draw-line': new DrawTool(map, view, 'line'),
      'draw-line-faster': new DrawTool(map, view, 'line-faster'),
      'draw-polyline': new DrawTool(map, view, 'polyline'),
      'draw-polygon': new DrawTool(map, view, 'polygon'),
      'draw-rectangle': new DrawTool(map, view, 'rectangle'),
      'draw-rectangle-faster': new DrawTool(map, view, 'rectangle-faster'),
      'draw-circle': new DrawTool(map, view, 'circle'),
      'draw-circle-faster': new DrawTool(map, view, 'circle-faster'),
      'zoom-in': new ZoomInTool(map, view),
      'zoom-out': new ZoomOutTool(map, view),
      'zoom-home': new ZoomHomeTool(map, view),
      'clear': new ClearTool(map, view),
      'zoom-in-rect': new ZoomInRectTool(map, view),
      'zoom-out-rect': new ZoomOutRectTool(map, view),
    }
  }

  //#endregion

  //#region 公有方法

  /**
   * 设置激活工具
   * @param { string } key 工具Key值
   */
  setMapTool (toolKey) {
    let targetTool = this.#toolPool[toolKey]
    if (targetTool.once) {
      targetTool.active()
    } else {
      for (const key in this.#toolPool) {
        if (key !== toolKey) {
          this.#toolPool[key].deactive()
        }
      }
      targetTool.active()
    }
  }

  /**
   * 创建自定义工具
   * @param { string } toolKey 工具名
   * @param { BaseTool } toolObject 工具对象
   * @returns { MapTools } this
   */
  createCustomTool (toolKey, toolObject) {
    this.#toolPool[toolKey] = toolObject
    return this
  }

  /**
   * 检查是否已记录工具
   * @param { string } toolKey 工具名
   */
  hasTool (toolKey) {
    if (this.#toolPool[toolKey]) {
      return true
    } else {
      return false
    }
  }

  /**
   * 删除指定工具
   * @param { string } toolKey 工具名
   * @returns { MapTools } this
   */
  deleteTool (toolKey) {
    this.#toolPool[toolKey] = undefined
    return this
  }

  /**
   * 获取工具实例
   * @param { string } toolKey 工具名
   */
  getTool (toolKey) {
    return this.#toolPool[toolKey]
  }

  //#endregion

}

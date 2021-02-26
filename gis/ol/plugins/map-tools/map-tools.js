import { WebMap, WebMapPlugin } from '../../web-map/web-map' // eslint-disable-line
import { BaseTool } from './base-tool/base-tool'
import { DrawTool } from './tools/draw/draw'
import { MarkTool } from './tools/mark/mark'
import { ZoomOutRectTool } from './tools/zoom/zoom'
import { ZoomInRectTool } from './tools/zoom/zoom'
import { ZoomInTool, ZoomOutTool } from './tools/zoom/zoom'

/**
 * 地图工具链类
 */
export class MapTools extends WebMapPlugin {

  //#region 私有属性

  /**
   * 工具池
   * @type { import('./map-tools').IMapToolsToolPool }
   */
  #toolPool = {}

  /**
   * 当前激活工具Key值
   * @type { string }
   */
  #activedKey = 'default'

  //#endregion

  //#region 构造函数

  constructor () {
    super('mapTools')
  }

  //#endregion

  //#region 私有方法

  #init () {
    this.#toolPool = {
      'default': new BaseTool(this.map, this.view),
      'zoom-in': new ZoomInTool(this.map, this.view),
      'zoom-out': new ZoomOutTool(this.map, this.view),
      'draw-point': new DrawTool(this.map, this.view, 'point'),
      'draw-line': new DrawTool(this.map, this.view, 'line'),
      'draw-line-faster': new DrawTool(this.map, this.view, 'line-faster'),
      'draw-polyline': new DrawTool(this.map, this.view, 'polyline'),
      'draw-polygon': new DrawTool(this.map, this.view, 'polygon'),
      'draw-rectangle': new DrawTool(this.map, this.view, 'rectangle'),
      'draw-rectangle-faster': new DrawTool(this.map, this.view, 'rectangle-faster'),
      'draw-circle': new DrawTool(this.map, this.view, 'circle'),
      'draw-circle-faster': new DrawTool(this.map, this.view, 'circle-faster'),
      'zoom-in-rect': new ZoomInRectTool(this.map, this.view),
      'zoom-out-rect': new ZoomOutRectTool(this.map, this.view),
      'mark': new MarkTool(this.map, this.view)
    }
  }

  //#endregion

  //#region 公有方法

  /**
   * （重写）插件注册
   * @param { WebMap } webMap WebGIS应用程式对象
   * @returns { this }
   */
  installPlugin (webMap) {
    super.installPlugin(webMap)
    this.#init()
    return this
  }

  /**
   * 设置激活工具
   * @param { string } toolKey 工具Key值
   * @returns { this }
   */
  setMapTool (toolKey) {
    const targetTool = this.#toolPool[toolKey]
    if (!targetTool) {
      return this.setMapTool('default')
    }
    if (targetTool.isOnceTool) {
      this.fire('change:actived-key', { key: this.#activedKey })
      targetTool.active()
      return this
    }
    this.#activedKey = toolKey
    for (const key in this.#toolPool) {
      if (key !== toolKey) {
        this.#toolPool[key].deactive()
      }
    }
    this.fire('change:actived-key', { key: this.#activedKey })
    targetTool.active()
    return this
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
    delete this.#toolPool[toolKey]
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

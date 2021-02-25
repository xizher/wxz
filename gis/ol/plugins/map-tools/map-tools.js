import { WebMap, WebMapPlugin } from '../../web-map/web-map' // eslint-disable-line
import { BaseTool } from './base-tool/base-tool'
import { DrawTool } from './tools/draw/draw'
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
      targetTool.active()
      return this
    }
    for (const key in this.#toolPool) {
      if (key !== toolKey) {
        this.#toolPool[key].deactive()
      }
    }
    targetTool.active()
    return this
  }

  //#endregion

}

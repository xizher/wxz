import { WebMapPlugin } from "../../web-map/web-map";
import { BaseTool } from "./base-tool/base-tool";

export declare interface IMapToolsToolPool {
  [key: string] : BaseTool
}

/**
 * 地图工具链类
 */
export declare class MapTools extends WebMapPlugin<{
  name: 'change:actived-key', data: { key: string }
}> {
  /**
   * 设置激活工具
   * @param toolKey 工具Key值
   */
  setMapTool (toolKey:string) : this
  /**
   * 创建自定义工具
   * @param toolKey 工具Key值
   * @param toolObject 工具对象
   */
  createCustomTool (toolKey: string, toolObject: BaseTool<any>) : this
  /**
   * 检查是否含有工具
   * @param toolKey 工具Key值
   */
  hasTool (toolKey: string) : boolean
  /**
   * 删除工具
   * @param toolKey 工具Key值
   */
  deleteTool (toolKey: string) : this
  /**
   * 获取工具对象
   * @param toolKey 工具Key值
   */
  getTool (toolKey: string) : BaseTool<any>
}
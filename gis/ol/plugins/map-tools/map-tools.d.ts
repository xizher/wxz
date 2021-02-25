import { WebMapPlugin } from "../../web-map/web-map";
import { BaseTool } from "./base-tool/base-tool";

export declare interface IMapToolsToolPool {
  [key: string] : BaseTool
}

/**
 * 地图工具链类
 */
export declare class MapTools extends WebMapPlugin {
  /**
   * 设置激活工具
   * @param toolKey 工具Key值
   */
  setMapTool (toolKey:string) : this
}
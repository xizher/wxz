import { IWebMapPlugin } from '../web-map/web-map';
import { BaseTool } from './base-tool/base-tool'

export declare interface IMapToolsToolPool {
  [key: string]: BaseTool
}

export declare class MapTools implements IWebMapPlugin {
  setMapTool (toolKey: string) : string
  createCustomTool (toolKey: string, toolObject: BaseTool) : this
  hasTool (toolKey: string) : boolean
  deleteTool (toolKey: string) : this
  getTool (toolKey: string) : BaseTool
}

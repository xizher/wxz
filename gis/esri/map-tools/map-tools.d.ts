import { IWebMapPlugin, WebMap } from '../web-map/web-map';
import { BaseTool } from './base-tool/base-tool'

export declare interface IMapToolsToolPool {
  [key: string]: BaseTool<any>
}

export declare class MapTools implements IWebMapPlugin {
  PLUGIN_NAME: 'mapTools'
  REGISTER_PLUGIN (webMap: WebMap) : void
  setMapTool (toolKey: string) : string
  createCustomTool (toolKey: string, toolObject: BaseTool<any>) : this
  hasTool (toolKey: string) : boolean
  deleteTool (toolKey: string) : this
  getTool (toolKey: string) : BaseTool<any>
}

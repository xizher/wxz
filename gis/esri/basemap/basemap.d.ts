import { $Map, IWebMapPlugin, WebMap } from "../web-map/web-map";

export declare interface IBasemapItems {
  [key: string]: {
    layer: __esri.Layer
    name: string
    type: string
    alias: string
  }
}

export declare interface IBasemapOptions {
  visible: boolean,
  selectedKey: number,
  layers: Array<{
    key: string
    alias: string
    type: string
    options: __esri.LayerProperties
  }>
}

export declare class Basemap implements IWebMapPlugin {
  PLUGIN_NAME: 'basemap'
  REGISTER_PLUGIN (webMap: WebMap) : void
  constructor (map: $Map, options: IBasemapOptions)
  get selectedKey () : string
  set selectedKey (key: string)
}

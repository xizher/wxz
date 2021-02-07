import { IWebMapPlugin } from "../web-map/web-map";

export declare class Highlight implements IWebMapPlugin {
  PLUGIN_NAME: 'basemap'
  REGISTER_PLUGIN (webMap: WebMap) : void
  setHighlight (layer: __esri.Layer, graphic: __esri.Graphic | __esri.Feature | string, reset:? boolean) : this
  clearHighlight () : this
}
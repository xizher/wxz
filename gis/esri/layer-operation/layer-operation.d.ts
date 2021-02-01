import { IWebMapPlugin, WebMap } from "../web-map/web-map";

export declare interface ILayerOperationLayerPool {
  [name: string]: {
    alias: string
    key: string
    target: {
      type: string
      options: __esri.LayerProperties
    }
    targetLayer: __esri.Layer
  }
}

export declare interface ILayerOperationOptions {
  layerList: Array<{
    name: string
    alias: string
    key: string
    target: {
      type: string
      options: __esri.LayerProperties
    }
  }>
}

export declare class LayerOperation implements IWebMapPlugin {
  PLUGIN_NAME: string
  REGISTER_PLUGIN (webMap: WebMap) : void
  constructor (options: ILayerOperationOptions)
  get count () : number
  findLayerByName (layerName: string) : __esri.Layer | null
  setLayerLevel (layerName: string, level: number) : this
  setLayerLevel (layer: __esri.Layer, level: number) : this
  setLayerLevelToTop (layerName: string) : this
  setLayerLevelToTop (layer: __esri.Layer) : this
  cloneLayer (layerName: string) : this
  cloneLayer (layer: __esri.Layer) : this
  setLayerVisible (layerName: string, visible?: boolean) : this
  zoomToLayer (layerName: string) : this
  zoomToLayer (layer: __esri.Layer) : this
  zoomToLayerAsync (layerName: string) : Promise<void>
  zoomToLayerAsync (layer: __esri.Layer) : Promise<void>
}

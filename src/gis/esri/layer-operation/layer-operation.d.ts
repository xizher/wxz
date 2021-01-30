import { $Map } from "../webmap/webmap";

export declare interface ILayerOperationLayerItem {
  name: string
  alias: string
  key: string
  target: {
    type: string
    options: any
  }
  targetLayer?: __esri.Layer
}

export declare interface ILayerOperationOptions {
  layerList: Array<ILayerOperationLayerItem>
}

export declare class LayerOperation {
  constructor (map: $Map, options: ILayerOperationOptions)
  get map () : $Map
  get layerGroup () : __esri.GroupLayer
  get layerList () : ILayerOperationLayerItem[]
  get options () : ILayerOperationOptions
  findLayerByName (layerName: string) : __esri.Layer
  cloneLayer (layerName: string) : __esri.Layer
  setLayerVisible (layerName: string, visible: boolean) : this
  setAllLayersInvisible () : this
  setLayerVisibleAndZoomTo (layerName: string) : this
  setLayerLevel (layer: __esri.Layer, level: number) : this
}

import { Listener } from "../../../listener";
import { Basemap } from "../basemap/basemap";
import { LayerOperation } from "../layer-operation/layer-operation";
import { MapCursor } from "../map-cursor/map-cursor";
import { MapElementDisplay } from "../map-element-display/map-element-display";
import { EsriUtils } from '../esri-utils/esri-utils'
import { esriExt } from '../esri-exts/esri-exts'

export declare interface $Map extends __esri.Map {
  $owner: WebMap
}

export declare interface $MapView extends __esri.MapView {
  $owner: WebMap
}

export declare interface $SceneView extends __esri.SceneView {
  $owner: WebMap
}

export declare interface $View extends $MapView, $SceneView { }

export declare interface IWebMapOptions {
  viewOptions: __esri.MapViewProperties | __esri.SceneViewProperties
}

export declare interface IWebMapPlugin {
  PLUGIN_NAME: string
  REGISTER_PLUGIN (webMap: WebMap) : void
}

export declare interface IWebMapStaticPlugin {
  static PLUGIN_NAME: string
  static REGISTER_PLUGIN (webMap: WebMap) : void
}

export declare class WebMap extends Listener<
  { name: 'mounted', data: {} }
> {
  constructor (divId: string , options: IWebMapOptions)
  get divId () : string
  get map () : $Map
  get view () : $View
  mount () : this
  use (plugin: IWebMapPlugin) : this

  basemap?: Basemap
  layerOperation?: LayerOperation
  mapCursor?: MapCursor
  mapElementDisplay?: MapElementDisplay
  esriUtils?: typeof EsriUtils
  esriExt?: typeof esriExt
}
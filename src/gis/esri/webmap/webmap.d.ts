/*
 * 描    述：TypeScript声明文件：ArcGIS API for JavaScript WebMap类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { Listener } from "../../../listener/listener"
import { Basemap, IBasemapOptions } from "../basemap/basemap"
import { MapElementDisplay } from "../map-element-display/map-element-display"


export declare class $Map extends __esri.Map {
  $owner: WebMap
}

export declare class $View extends __esri.MapView{
  $owner: WebMap
}

export declare interface IWebMapOptions {
  viewOptions: __esri.ViewProperties | __esri.MapViewProperties | __esri.SceneViewProperties
  basemapOptions: IBasemapOptions
}

export declare class WebMap extends Listener<{ string: 'loaded', data: {} }> {
  constructor (divId: string, options: IWebMapOptions)
  get map () : $Map
  get view () : $View
  get divId () : string
  get basemap () : Basemap
  get options () : IWebMapOptions
  get mapElementDisplay () : MapElementDisplay
  load () : void
}
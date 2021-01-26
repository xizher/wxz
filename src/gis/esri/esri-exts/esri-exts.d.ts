import { $Map, $View } from "../webmap/webmap";

export declare function registerEsriExts (map: $Map) : (view: $View) => void

export declare interface IEsriExtExtent {
  getMaxLonLat () : [number, number]
  getMinLonLat () : [number, number]
}

export declare function $esriExt (_this: __esri.Extent) : IEsriExtExtent
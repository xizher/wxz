import { $Map, $View } from "../webmap/webmap";

export declare function registerEsriExts (map: $Map) : (view: $View) => void

export declare interface IEsriExtExtent {
  getMaxLonLat () : [number, number]
  getMinLonLat () : [number, number]
  getNorthEastPoint() : __esri.Point
  getNorthWestPoint() : __esri.Point
  getSouthWestPoint() : __esri.Point
  getSouthEastPoint() : __esri.Point
  toPolygon () : __esri.Polygon
}

export declare function $esriExt (_this: __esri.Extent) : IEsriExtExtent
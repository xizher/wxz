export declare interface IEsriExtExtent {
  getNorthEastPoint () : __esri.Point
  getNorthWestPoint () : __esri.Point
  getSouthWestPoint () : __esri.Point
  getSouthEastPoint () : __esri.Point
  getMaxLonLat () : [number, number]
  getMinLonLat () : [number, number]
  toPolygon () : __esri.Polygon
}

export declare interface IEsriExtMapView {
  plusZoom (num: number) : __esri.MapView
}

export declare function esriExt (extent: __esri.Extent) : IEsriExtExtent 
export declare function esriExt (view: __esri.MapView) : IEsriExtMapView
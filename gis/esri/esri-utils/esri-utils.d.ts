import { $Map, $View, IWebMapStaticPlugin } from "../web-map/web-map";

export class EsriUtils implements IWebMapStaticPlugin {
  static map : $Map
  static view : $View
  static createExtent (options: __esri.ExtentProperties = {}) : __esri.Extent
  static createPoint (options: __esri.PointProperties = {}) : __esri.Point
  static createPolyline (options: __esri.PolylineProperties = {}) : __esri.Polyline
  static createPolygon (options: __esri.PolygonProperties = {}) : __esri.Polylgon
  static createCircle (options: __esri.CircleProperties = {}) : __esri.Circle
  static pointsToPolyline (points: __esri.Point) : __esri.Polyline
  static pointsToPolygon (points: __esri.Point) : __esri.Polygon
  static geometryToCircumcircle (geometry: __esri.Geometry) : __esri.Circle
  static screenToMapPoint (screenPoint: MouseEvent | __esri.ScreenPoint) : __esri.Point
  static longitudeToX (longitude : number) : number
  static latitudeToY (latitude : number) : number
  static lonLatToXY ([longitude, latitude]: [number, number]) : [number, number]
}
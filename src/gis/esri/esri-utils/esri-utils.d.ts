/*
 * 描    述：TypeScript声明文件：ArcGIS API for JavaScript 工具类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { $Map, $View } from '../webmap/webmap';

export declare interface IPixelsMatrix {
  getByGeoPoint (point: __esri.Point) : number
  getByGeoLine (startPoint: __esri.Point, endPoint: __esri.Point) : number[]
}
export declare class EsriUtils {
  static register (map: $Map) : (view: $View) => void
  static pointsToPolyline (points: __esri.Point[]) : __esri.Polyline
  static pointsToPolygon (points: __esri.Point[]) : __esri.Polygon
  static geometryToCircumcircle (geometry: __esri.Geometry) : __esri.Circle
  static screenToMapPoint (screenPoint: MouseEvent | __esri.ScreenPoint) : __esri.Point
  static createPixelsMatrix (pixelData: __esri.PixelData) : IPixelsMatrix
  static longitudeToX (longitude: number) : number
  static latitudeToY (latitude: number) : number
  static lonLatToXY (lonlat: [number, number]) : [number, number]
}
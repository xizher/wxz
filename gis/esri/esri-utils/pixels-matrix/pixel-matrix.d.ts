import { Matrix } from "../../../../matrix";

export declare class PixelMatrix extends Matrix {
  constructor (pixelData: __esri.PixelData)
  getValueByGeoPoint (point: __esri.Point) : number[]
  getValueByGeoLine (startPoint: __esri.Point, endPoint: __esri.Point) : number[]
  getValueByGeoPolygon (polygon: __esri.Polygon) : number[]
}
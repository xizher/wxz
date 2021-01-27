/*
 * 描    述：ArcGIS API for JavaScript 工具类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { esri } from '../esri-modules/esri-modules'
import { Matrix } from '../../../linear-algebra'

export class EsriUtils {

  /**
   * esri地图对象
   * @type { import('../webmap/webmap').$Map }
   */
  static map = null

  /**
   * esri视图对象
   * @type { import('../webmap/webmap').$View }
   */
  static view = null

  /**
   * esri对象注册
   * @type { import('../webmap/webmap').$Map }
   * @returns { (view: $View) => void }
   */
  static register (map) {
    EsriUtils.map = map
    return view => EsriUtils.view = view
  }

  /**
   * 点集转线
   * @param { __esri.Point[] } points 点集
   * @returns { __esri.Polyline } 线
   */
  static pointsToPolyline (points) {
    const { spatialReference } = EsriUtils.view
    const polyline = new esri.geometry.Polyline({ spatialReference })
    polyline.addPath([])
    points.forEach((pt, i) => polyline.insertPoint(0, i, pt))
    return polyline
  }

  /**
   * 点集转面
   * @param { __esri.Point[] } points 点集
   * @returns { __esri.Polygon } 面
   */
  static pointsToPolygon (points) {
    const { spatialReference } = EsriUtils.view
    const polygon = new esri.geometry.Polygon({ spatialReference })
    polygon.addRing([])
    points.forEach((pt, i) => polygon.insertPoint(0, i, pt))
    return polygon
  }

  /**
   * 几何转外接圆
   * @param { __esri.Geometry } geometry 几何对象
   * @returns { __esri.Circle } 外接圆
   */
  static geometryToCircumcircle (geometry) {
    const { extent } = geometry
    const center = extent.center
    const { height, width } = extent
    const radius = Math.sqrt(height ** 2, width ** 2)
    const circle = new esri.geometry.Circle({ center, radius })
    return circle
  }

  /**
   * 屏幕坐标转地图坐标
   * @param { MouseEvent | __esri.ScreenPoint } screenPoint 屏幕坐标对象
   * @returns { __esri.Point } 地图点对象
   */
  static screenToMapPoint (screenPoint) {
    return EsriUtils.view.toMap(screenPoint)
  }

  /**
   * 根据像元数据创建像元矩阵对象
   * @param { __esri.PixelData } pixelData 像元数据
   */
  static createPixelsMatrix (pixelData) {
    const { extent, pixelBlock } = pixelData
    const { pixels, width, height } = pixelBlock
    const matrix = new Matrix(pixels[0], height, width)

    /** @param { __esri.Point } point */
    function _geoXYToSceneXY (point) {
      const { xmin, ymin, xmax, ymax } = extent
      const [dx, dy] = [xmax - xmin, ymax - ymin]
      const [x, y] = [
        Math.round((point.x - xmin) * (width - 0) / (dx) + 0),
        Math.round(((ymax - (point.y - ymin) - ymin) * (height - 0)) / (dy) + 0)
      ]
      return [x, y]
    }

    /** @param { __esri.Point } point */
    function getByGeoPoint (point) {
      const [x, y] = _geoXYToSceneXY(point)
      return matrix.getValue([y, x])
    }

    /**
     *
     * @param { __esri.Point } startPoint
     * @param { __esri.Point } endPoint
     */
    function getByGeoLine (startPoint, endPoint) {
      const [startX, startY] = _geoXYToSceneXY(startPoint)
      const [endX, endY] = _geoXYToSceneXY(endPoint)
      return DDA()

      function DDA () {
        const dx = Math.abs(endX - startX)
        const dy = Math.abs(endY - startY)
        const k = dx > dy ? dx : dy
        const xincre = (endX - startX) / k
        const yincre = (endY - startY) / k
        let x = startX
        let y = startY
        const arr = []
        for (let i = 0; i < k; i ++) {
          arr.push(matrix.getValue([Math.round(y), Math.round(x)]))
          x += xincre
          y += yincre
        }
        return arr
      }
    }

    return {
      getByGeoPoint,
      getByGeoLine,
      matrix,
    }
  }


  static longitudeToX (longitude) {
    const point = new esri.geometry.Point({
      longitude, latitude: 0, spatialReference: EsriUtils.view.spatialReference
    })
    return point.x
  }

  static latitudeToY (latitude) {
    const point = new esri.geometry.Point({
      longitude: 0, latitude, spatialReference: EsriUtils.view.spatialReference
    })
    return point.y
  }

  static lonLatToXY ([longitude, latitude]) {
    const point = new esri.geometry.Point({
      longitude, latitude, spatialReference: EsriUtils.view.spatialReference
    })
    return [point.x, point.y]
  }

}

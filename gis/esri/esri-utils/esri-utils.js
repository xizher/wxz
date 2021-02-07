import { esri } from '../esri-modules/esri-modules'
import { PixelMatrix } from './pixels-matrix/pixel-matrix'

export class EsriUtils {

  /**
   * esri地图对象
   * @type { import('../web-map/web-map').$Map }
   */
  static map = null

  /**
   * esri视图对象
   * @type { import('../web-map/web-map').$View }
   */
  static view = null

  /**
   * 插件名
   * @type { string }
   */
  static PLUGIN_NAME = 'esriUtils'

  /**
   * 插件注册
   * @param { import('../web-map/web-map').WebMap } webMap WebGIS应用程式
   */
  static REGISTER_PLUGIN (webMap) { // eslint-disable-line
    EsriUtils.map = webMap.map
    EsriUtils.view = webMap.view
  }

  /**
   * 创建返回对象
   * @param { __esri.ExtentProperties } options 配置项
   */
  static createExtent (options = {}) {
    const { spatialReference } = EsriUtils.view
    const extent = new esri.geometry.Extent({
      spatialReference,
      ...options
    })
    return extent
  }

  /**
   * 创建点对象
   * @param { __esri.PointProperties } options 配置项
   */
  static createPoint (options = {}) {
    const { spatialReference } = EsriUtils.view
    const point = new esri.geometry.Point({
      spatialReference,
      ...options
    })
    return point
  }

  /**
   * 创建线对象
   * @param { __esri.PolylineProperties } options 配置项
   */
  static createPolyline (options = {}) {
    const { spatialReference } = EsriUtils.view
    const polyline = new esri.geometry.Polyline({
      spatialReference,
      ...options
    })
    return polyline
  }

  /**
   * 创建面对象
   * @param { __esri.PolygonProperties } options 配置项
   */
  static createPolygon (options = {}) {
    const { spatialReference } = EsriUtils.view
    const polygon = new esri.geometry.Polygon({
      spatialReference,
      ...options
    })
    return polygon
  }

  /**
   * 创建圆对象
   * @param { __esri.CircleProperties } options 配置项
   */
  static createCircle (options = {}) {
    const { spatialReference } = EsriUtils.view
    const circle = new esri.geometry.Circle({
      spatialReference,
      ...options
    })
    return circle
  }

  /**
   * 点集转线
   * @param { __esri.Point[] } points 点集
   * @returns { __esri.Polyline } 线
   */
  static pointsToPolyline (points) {
    const polyline = EsriUtils.createPolyline()
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
    const polygon = EsriUtils.createPolygon()
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
    const circle = EsriUtils.createCircle({ center, radius })
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
   * 地理经度转投影坐标
   * @param { number } longitude 经度
   * @returns { number }
   */
  static longitudeToX (longitude) {
    const point = EsriUtils.createPoint({ longitude, latitude: 0 })
    return point.x
  }

  /**
   * 地理纬度转投影坐标
   * @param { number } latitude 纬度
   * @returns { number }
   */
  static latitudeToY (latitude) {
    const point = EsriUtils.createPoint({ longitude: 0, latitude })
    return point.y
  }

  /**
   * 地理坐标转投影坐标
   * @param { [number, number] } lonlat 经纬度
   * @returns { [number, number] }
   */
  static lonLatToXY ([longitude, latitude]) {
    const point = EsriUtils.createPoint({ longitude, latitude })
    return [point.x, point.y]
  }

  /**
   * 创建像元矩阵对象
   * @param { __esri.PixelData } pixelData pixelData对象
   */
  static createPixelMatrix (pixelData) {
    return new PixelMatrix(pixelData)
  }

  /**
   * 视图同步
   * @param { __esri.MapView | __esri.SceneView } views 视图对象
   * @returns { { remove() : void } }
   */
  static synchronizeViews (views) {
    let handles = views.map((view, idx, views) => {
      let others = views.concat()
      others.splice(idx, 1)
      return synchronizeView(view, others)
    })

    return {
      remove: function () {
        handles.forEach(h => h.remove())
        handles = null
      }
    }

    /**
     * @param { __esri.MapView | __esri.SceneView } view 视图对象
     * @param { __esri.MapView[] | __esri.SceneView[] } others 视图对象数组
     */
    function synchronizeView (view, others) {
      others = Array.isArray(others) ? others : [others]
      let viewpointWatchHandler,
        viewStationaryHandler,
        otherInteractHandlers,
        scheduleId
      const clear = () => {
        if (otherInteractHandlers) {
          otherInteractHandlers.forEach(handler => handler.remove())
        }
        viewpointWatchHandler && viewpointWatchHandler.remove()
        viewStationaryHandler && viewStationaryHandler.remove()
        scheduleId && clearTimeout(scheduleId)
        otherInteractHandlers = viewpointWatchHandler = viewStationaryHandler = scheduleId = null
      }

      const interactWatcher = view.watch('interacting,animation', _ => {
        if (!_) {
          return
        }
        if (viewpointWatchHandler || scheduleId) {
          return
        }

        scheduleId = setTimeout(() => {
          scheduleId = null
          viewpointWatchHandler = view.watch('viewpoint', val => {
            others.forEach(otherView => otherView.viewpoint = val)
          })
        }, 0)

        otherInteractHandlers = others.map(otherView => {
          return esri.core.watchUtils.watch(
            otherView,
            'interacting,animation',
            function (value) {
              if (value) {
                clear()
              }
            }
          )
        })

        viewStationaryHandler = esri.core.watchUtils.whenTrue(
          view,
          'stationary',
          clear
        )
      })

      return {
        remove () {
          clear()
          interactWatcher.remove()
        }
      }
    }
  }

}

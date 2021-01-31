import { esri } from '../esri-modules/esri-modules'

export function esriExt (_this) {
  const { esriUtils } = esriExt.map.$owner
  if (_this instanceof esri.geometry.Extent) {
    return {
      getNorthEastPoint () {
        const { xmax, ymax } = _this
        const point = esriUtils.createPoint({ x: xmax, y: ymax })
        return point
      },
      getNorthWestPoint () {
        const { xmin, ymax } = _this
        const point = esriUtils.createPoint({ x: xmin, y: ymax })
        return point
      },
      getSouthWestPoint () {
        const { xmin, ymin } = _this
        const point = esriUtils.createPoint({ x: xmin, y: ymin })
        return point
      },
      getSouthEastPoint () {
        const { xmax, ymin } = _this
        const point = esriUtils.createPoint({ x: xmax, y: ymin })
        return point
      },
      getMaxLonLat () {
        const point = esriExt(_this).getNorthEastPoint()
        return [point.longitude, point.latitude]
      },
      getMinLonLat () {
        const point = esriExt(_this).getSouthWestPoint()
        return [point.longitude, point.latitude]
      },
      toPolygon () {
        const extentExt = esriExt(_this)
        const northEast = extentExt.getNorthEastPoint()
        const northWest = extentExt.getNorthWestPoint()
        const southWest = extentExt.getSouthWestPoint()
        const southEast = extentExt.getSouthEastPoint()
        return esriUtils.pointsToPolygon([
          northEast, northWest,
          southWest, southEast,
        ])
      },
    }
  } else if (_this instanceof esri.views.MapView) {
    return {
      plusZoom (num) {
        _this.goTo({
          zoom: _this.zoom + num
        })
        return this
      },
    }
  }
}

/**
 * esri地图对象
 * @type { import('../web-map/web-map').$Map }
 */
esriExt.map = null

/**
 * esri视图对象
 * @type { import('../web-map/web-map').$View }
 */
esriExt.view = null

/**
 * 插件名
 * @type { string }
 */
esriExt.PLUGIN_NAME = 'esriExt'

/**
 * 插件注册
 * @param { import('../web-map/web-map').WebMap } webMap WebGIS应用程式
 */
esriExt.REGISTER_PLUGIN = function (webMap) {
  esriExt.map = webMap.map
  esriExt.view = webMap.view
}

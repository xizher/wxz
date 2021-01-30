import { esri } from '../esri-modules/esri-modules'
import { EsriUtils } from '../esri-utils/esri-utils'

/** @type {import('../webmap/webmap').$Map} */
let _map = null
/** @type {import('../webmap/webmap').$View} */
let _view = null

export function registerEsriExts (map) {
  _map = map
  return view => _view = view
}

export function $esriExt (_this) {
  if (_this instanceof esri.geometry.Extent) {
    return {
      getMaxLonLat () {
        const point = $esriExt(_this).getNorthEastPoint()
        return [point.longitude, point.latitude]
      },
      getMinLonLat () {
        const point = $esriExt(_this).getSouthWestPoint()
        return [point.longitude, point.latitude]
      },
      getNorthEastPoint () {
        const { xmax, ymax } = _this
        const { spatialReference } = _view
        const point = new esri.geometry.Point({
          x: xmax, y: ymax, spatialReference
        })
        return point
      },
      getNorthWestPoint () {
        const { xmin, ymax } = _this
        const { spatialReference } = _view
        const point = new esri.geometry.Point({
          x: xmin, y: ymax, spatialReference
        })
        return point
      },
      getSouthWestPoint () {
        const { xmin, ymin } = _this
        const { spatialReference } = _view
        const point = new esri.geometry.Point({
          x: xmin, y: ymin, spatialReference
        })
        return point
      },
      getSouthEastPoint () {
        const { xmax, ymin } = _this
        const { spatialReference } = _view
        const point = new esri.geometry.Point({
          x: xmax, y: ymin, spatialReference
        })
        return point
      },
      toPolygon () {
        const extentExt = $esriExt(_this)
        const northEast = extentExt.getNorthEastPoint()
        const northWest = extentExt.getNorthWestPoint()
        const southWest = extentExt.getSouthWestPoint()
        const southEast = extentExt.getSouthEastPoint()
        return EsriUtils.pointsToPolygon([
          northEast,
          northWest,
          southWest,
          southEast,
        ])
      },
    }
  }
}

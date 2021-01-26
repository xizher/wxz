import { esri } from '../esri-modules/esri-modules'

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
        const { xmax, ymax } = _this
        const { spatialReference } = _view
        const point = new esri.geometry.Point({
          x: xmax, y: ymax, spatialReference
        })
        return [point.longitude, point.latitude]
      },
      getMinLonLat () {
        const { xmin, ymin } = _this
        const { spatialReference } = _view
        const point = new esri.geometry.Point({
          x: xmin, y: ymin, spatialReference
        })
        return [point.longitude, point.latitude]
      }
    }
  }
}

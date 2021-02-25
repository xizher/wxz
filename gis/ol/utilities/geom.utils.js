import GeometryLayout from 'ol/geom/GeometryLayout' // eslint-disable-line
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'

/**
 * 创建点对象
 * @param { import('ol/coordinate').Coordinate } coordinates
 * @param { GeometryLayout } optLayout
 */
export function createPoint (coordinates, optLayout) {
  if (optLayout) {
    return new Point(coordinates, optLayout)
  }
  return new Point(coordinates)
}

/**
 * 创建线对象
 * @param { import('ol/coordinate').Coordinate[] | number[] } coordinates
 * @param { GeometryLayout } optLayout
 */
export function createLineString (coordinates, optLayout) {
  if (optLayout) {
    return new LineString(coordinates, optLayout)
  }
  return new LineString(coordinates)
}

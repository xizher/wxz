import GeometryLayout from 'ol/geom/GeometryLayout' // eslint-disable-line
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import Polygon from 'ol/geom/Polygon'
import Circle from 'ol/geom/Circle'

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

/**
 * 创建面对象
 * @param { import('ol/coordinate').Coordinate[][] | number[] } coordinates
 * @param { GeometryLayout } optLayout
 * @param { number[] } optEnds
 */
export function createPolygon (coordinates, optLayout, optEnds) {
  if (optLayout) {
    return new Polygon(coordinates, optLayout, optEnds)
  }
  return new Polygon(coordinates)
}

/**
 * 创建圆对象
 * @param { import('ol/coordinate').Coordinate } center 圆心
 * @param { number } radius 半径
 * @param { GeometryLayout } optLayout
 */
export function createCircle (center, radius, optLayout) {
  if (optLayout) {
    return new Circle(center, radius, optLayout)
  }
  return new Circle(center, radius)
}

/**
 * 创建范围对象
 * @param { [number, number, number, number] } bounds 坐标值
 */
export function createExtent (bounds) {
  const [xmin, ymin, xmax, ymax] = bounds
  const polygon = createPolygon([[
    [xmin, ymin], [xmin, ymax], [xmax, ymax], [xmax, ymin]
  ]])
  return polygon.getExtent()
}

import {
  point,
  distance,
} from '@turf/turf'

/**
 * 计算两点的距离
 * @param { [number, number] } pt1 点位
 * @param { [number, number] } pt2 点位
 * @param { { units: import('@turf/turf').Units } } options 配置项
 * @returns { number }
 */
export function distanceByTwoPoint (pt1, pt2) {
  const [x1, y1] = pt1
  const [x2, y2] = pt2
  return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** .5
}
// export function distanceByTwoPoint (pt1, pt2, options = {
//   units: ''
// }) {
//   const from = point(pt1)
//   const to = point(pt2)
//   return distance(from, to, options)
// }


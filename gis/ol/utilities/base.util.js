import Collection from 'ol/Collection'
import Feature from 'ol/Feature'

/**
 * 创建集合
 * @param { any[] } arr 集合
 * @param { import('ol/Collection').Options } options 配置项
 */
export function createCollection (arr = [], options = {}) {
  const collection = new Collection(arr, options)
  return collection
}

/**
 * 创建要素
 * @param { {
 *    style: import('ol/style/Style')
 *    geometry: import('ol/geom/Geometry')
 *  } } options 配置项
 */
export function createFeature (options = {}) {
  const feature = new Feature(options.geometry)
  feature.setStyle(options.style)
  return feature
}

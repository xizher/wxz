import Collection from 'ol/Collection'

/**
 * 创建集合
 * @param { any[] } arr 集合
 * @param { import('ol/Collection').Options } options 配置项
 */
export function createCollection (arr = [], options = {}) {
  const collection = new Collection(arr, options)
  return collection
}

import XYZ from 'ol/source/XYZ'
import TileLayer from 'ol/layer/Tile'
import { BaseUtils } from '../../../js-utils'
import OSM from 'ol/source/OSM'

/**
 *
 * @param { string } xzyUrl XZY地址
 * @param { import('ol/source/XYZ').Options } options 配置项
 */
export function createXYZLayer (xzyUrl, options = {}) {
  /** @type { import('ol/source/XYZ').Options } */
  const _options = { url: xzyUrl }
  BaseUtils.jExtent(true, _options, options)
  const source = new XYZ(_options)
  // const source = new OSM()
  const layer = new TileLayer({ source })
  return layer
}

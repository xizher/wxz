import XYZ from 'ol/source/XYZ'
import TileLayer from 'ol/layer/Tile'
import { BaseUtils } from '../../../js-utils'

/**
 *
 * @param { string } xzyUrl XZY地址
 * @param { {
 *  xyzOptions: import('ol/source/XYZ').Options
 *  layerOptions: import('ol/layer/Layer').Options
 * } } options 配置项
 */
export function createXYZLayer (xzyUrl, options = {}) {
  /** @type { import('ol/source/XYZ').Options } */
  const _options = { url: xzyUrl }
  BaseUtils.jExtent(true, _options, options.xyzOptions ?? {})
  const source = new XYZ(_options)
  // const source = new OSM()
  const layer = new TileLayer({ source, ...options.layerOptions ?? {} })
  return layer
}

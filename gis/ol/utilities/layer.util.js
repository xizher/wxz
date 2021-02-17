import XYZ from 'ol/source/XYZ'
import TileLayer from 'ol/layer/Tile'
import { BaseUtils } from '../../../js-utils'
import OSM from 'ol/source/OSM'
import LayerGroup from 'ol/layer/Group'

/**
 * 创建XZY图层
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

/**
 * 创建OSM图层
 * @param { {
 *  osmOptions: import('ol/source/OSM').Options
 *  layerOptions: import('ol/layer/Layer').Options
 * } } options 配置项
 */
export function createOSMLayer (options = {}) {
  const source = new OSM(options.osmOptions ?? {})
  const layer = new TileLayer({ source, ...options.layerOptions ?? {} })
  return layer
}

/**
 * 创建图层组
 * @param { import('ol/layer/Group').Options } options 配置项
 */
export function createLayerGroup (options = {}) {
  const layer = new LayerGroup(options)
  return layer
}

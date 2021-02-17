import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style'

/**
 * 创建圆形样式
 * @param { import('ol/style/Circle').Options } options 配置项
 */
export function createCircleStyle (options = {}) {
  return new CircleStyle(options)
}

/**
 * 创建样式
 * @param { import('ol/style/Style').Options } options 配置项
 */
export function createStyle (options = {}) {
  return new Style(options)
}

/**
 * 创建Stroke
 * @param { import('ol/style/Stroke').Options } options 配置项
 */
export function createStroke (options = {}) {
  return new Stroke(options)
}


/**
 * 创建Fill
 * @param { import('ol/style/Fill').Options } options 配置项
 */
export function createFill (options = {}) {
  return new Fill(options)
}

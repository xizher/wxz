/* eslint-disable */
import Feature from 'ol/Feature'
import Geometry from 'ol/geom/Geometry'
/* eslint-enable */
import { BaseUtils } from '../../../../../js-utils'

/**
 * 绘制器类
 */
export class Drawer {

  //#region 私有属性

  /**
   * 图元控制对象
   * @type { import('../map-element-display').MapElementDisplay }
   */
  #mapElementDisplay = null

  /**
   * 图形池
   * @type { Feature[] }
   */
  #graphicPool = []

  /**
   * 过程图形
   * @type { Feature }
   */
  #tempGraphic = null

  /**
   * 绘制结果图形样式
   * @type { import('../map-element-display').IGeometryStyleOptinos }
   */
  #drawedStyle = {
    pointStyle: {
      image: {
        styleType: 'circle',
        radius: 5,
        stroke: {
          color: 'red',
          width: 1
        },
        fill: {
          color: 'rgba(255, 0, 0, 0.8)'
        }
      }
    },
    polylineStyle: {
      stroke: {
        color: 'red',
        width: 1
      }
    },
    polygonStyle: {
      stroke: {
        color: 'red',
        width: 1
      },
      fill: {
        color: 'rgba(255, 0, 0, 0.5)'
      }
    }
  }

  /**
   * 绘制进行时样式
   * @type { import('../map-element-display').IGeometryStyleOptinos }
   */
  #drawingStyle = {
    pointStyle: {
      image: {
        styleType: 'circle',
        radius: 5,
        stroke: {
          color: 'rgba(255, 0, 0, 0.5)',
          width: 1
        },
        fill: {
          color: 'rgba(255, 0, 0, 0.4)'
        }
      }
    },
    polylineStyle: {
      stroke: {
        color: 'rgba(255, 0, 0, 0.5)',
        width: 1
      }
    },
    polygonStyle: {
      stroke: {
        color: 'rgba(255, 0, 0, 0.5)',
        width: 1
      },
      fill: {
        color: 'rgba(255, 0, 0, 0.25)'
      }
    }
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造绘制器对象
   * @param { import('../map-element-display').MapElementDisplay } mapElementDisplay 图元控制对象
   */
  constructor (mapElementDisplay) {
    this.#mapElementDisplay = mapElementDisplay
  }

  //#endregion

  //#region 私有方法

  /**
   * 匹配样式
   * @param { Geometry | Geometry[] } geometries
   * @param { import('../..').IGeometryStyleOptinos } styleOptions
   */
  #matchStyle (geometries, styleOptions) {
    const type = Array.isArray(geometries)
      ? geometries[0].getType()
      : geometries.getType()
    let style = {}
    switch (type) {
      case 'Point':
        style = BaseUtils.deepCopy(styleOptions.pointStyle)
        break
      case 'LineString':
        style = BaseUtils.deepCopy(styleOptions.polylineStyle)
        break
      case 'Polygon':
        style = BaseUtils.deepCopy(styleOptions.polygonStyle)
        break
      default:
        break
    }
    return style
  }

  //#endregion

  //#region 公有方法

  /**
   * 设置绘制图形样式
   * @param { import('../map-element-display').IGeometryStyleOptinos } style 样式
   * @returns { this }
   */
  setDrawedStyle (style = {}) {
    BaseUtils.jExtent(true, this.#drawedStyle, style)
    return this
  }

  /**
   * 设置绘制过程图形样式
   * @param { import('../map-element-display').IGeometryStyleOptinos } style 样式
   * @returns { this }
   */
  setDrawingStyle (style = {}) {
    BaseUtils.jExtent(true, this.#drawingStyle, style)
    return this
  }

  /**
   * 添加图形
   * @param { Geometry | Geometry[] } geometries 几何图形
   * @param { import('../map-element-display').IGeometryStyleOptinos } styleOptions 样式配置项
   * @returns { this }
   */
  add (geometries, styleOptions = {}, returnFeature = false) {
    this.clearTemp()
    const _styleOptions = BaseUtils.deepCopy(this.#drawedStyle)
    BaseUtils.jExtent(true, _styleOptions, styleOptions)
    const feature = this.#mapElementDisplay.parseGraphics(geometries, this.#matchStyle(geometries, this.#drawedStyle))
    this.#mapElementDisplay.add(feature)
    this.#graphicPool.push(feature)
    if (returnFeature) {
      return feature
    }
    return this
  }

  /**
   * 清空图形
   * @returns { this }
   */
  clear () {
    this.#mapElementDisplay
      .remove(this.#graphicPool)
      .clearTemp()
    return this
  }

  /**
   * 移除指定图形
   * @param { Feature | Feature[] } features 图形
   * @returns { this }
   */
  remove (features) {
    this.#mapElementDisplay.remove(features)
    return this
  }

  /**
   * 设置图形
   * @param { Geometry | Geometry[] } geometries 几何图形
   * @param { import('../map-element-display').IGeometryStyleOptinos } styleOptions 样式配置项
   * @returns { this }
   */
  set (geometries, styleOptions = {}, returnFeature = false) {
    return this
      .clear()
      .add(geometries, styleOptions, returnFeature)
  }

  /**
   * 设置过程图形
   * @param { Geometry | Geometry[] } geometries 几何图形
   * @param { import('../map-element-display').IGeometryStyleOptinos } styleOptions 样式配置项
   * @returns { this }
   */
  setTemp (geometries, returnFeature = false) {
    this.clearTemp()
    const feature = this.#mapElementDisplay.parseGraphics(geometries, this.#matchStyle(geometries, this.#drawingStyle))
    this.#mapElementDisplay.add(feature)
    this.#tempGraphic = feature
    if (returnFeature) {
      return feature
    }
    return this
  }

  /**
   * 清理过程图形
   * @returns { this }
   */
  clearTemp () {
    if (this.#tempGraphic) {
      this.#mapElementDisplay.remove(this.#tempGraphic)
      this.#tempGraphic = null
    }
    return this
  }

  //#endregion

}

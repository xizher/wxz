import Feature from 'ol/Feature' // eslint-disable-line
import Geometry from 'ol/geom/Geometry' // eslint-disable-line
import LayerGroup from 'ol/layer/Group' // eslint-disable-line
import VectorLayer from 'ol/layer/Vector' // eslint-disable-line
// import GeoJSON from 'ol/format/GeoJSON'  // eslint-disable-line
import { createCollection, createFeature } from '../../utilities/base.util'
import { createLayerGroup, createVectorLayer } from '../../utilities/layer.util'
import { createCircleStyle, createFill, createStroke, createStyle } from '../../utilities/style.util'
import { WebMapPlugin } from '../../web-map/web-map'
import { BaseUtils } from '../../../../js-utils'

/**
 * 图元控制类
 * @example
 * import Point from 'ol/geom/Point'
 * const pt = new Point([0, 0])
 * const pt2 = new Point([100, 40])
 * const pt3 = new Point([100000, 100000])
 * const feature = mapElementDisplay.parseGraphics(pt)
 * mapElementDisplay.add(feature)
 */
export class MapElementDisplay extends WebMapPlugin {

  //#region 私有属性

  /**
   * 图元存储图层组
   * @type { LayerGroup }
   */
  #layerGroup = null

  /**
   * 基础图元存储图层组
   * @type { VectorLayer }
   */
  #graphicsLayer = null

  /**
   * 高亮图元存储图层组
   * @type { VectorLayer }
   */
  #highlightLayer = null


  /**
   * 图元样式
   * @type { import('./map-element-display').IStyleOptions }
   */
  #styleOptions = {
    graphicsStyle: {
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
    },
    highlightStyle: {
      pointStyle: {
        image: {
          styleType: 'circle',
          radius: 5,
          stroke: {
            color: 'rgba(0, 255, 255, 1)',
            width: 1
          },
          fill: {
            color: 'rgba(0, 255, 255, 0.8)'
          }
        }
      },
      polylineStyle: {
        stroke: {
          color: 'rgba(0, 255, 255, 0.8)',
          width: 1
        }
      },
      polygonStyle: {
        stroke: {
          color: 'rgba(0, 255, 255, 0.8)',
          width: 1
        },
        fill: {
          color: 'rgba(0, 255, 255, 0.5)'
        }
      }
    },
  }

  //#endregion

  //#region getter

  get style () {
    const {
      graphicsStyle: gStyle,
      highlightStyle: hStyle,
    } = this.#styleOptions

    return {
      graphicsStyle: {
        pointStyle: this.#createPointStyle(gStyle.pointStyle),
        polylineStyle: this.#createPolylineStyle(gStyle.polylineStyle),
        polygonStyle: this.#createPolygonStyle(gStyle.polygonStyle),
      },
      highlightStyle: {
        pointStyle: this.#createPointStyle(hStyle.pointStyle),
        polylineStyle: this.#createPolylineStyle(hStyle.polylineStyle),
        polygonStyle: this.#createPolygonStyle(hStyle.polygonStyle),
      },
    }
  }

  //#endregion

  //#region 构造函数

  constructor () {
    super('mapElementDisplay')
  }

  //#endregion

  //#region 私有方法

  #init () {
    const layerGroup = createLayerGroup()
    const graphicsLayer = createVectorLayer()
    const highlightLayer = createVectorLayer()
    layerGroup.setLayers(createCollection([graphicsLayer, highlightLayer]))
    this.map.addLayer(layerGroup)

    this.#layerGroup = layerGroup
    this.#graphicsLayer = graphicsLayer
    this.#highlightLayer = highlightLayer
  }

  //#endregion

  //#region 私有方法

  /**
   * 创建点样式
   * @param { import('./map-element-display').IPointStyleOptions } pointStyleOptions 点样式配置项
   */
  #createPointStyle (pointStyleOptions) {
    let image = {}
    const options = pointStyleOptions.image
    switch (options.styleType) {
      case 'circle':
        image = createCircleStyle({
          fill: createFill(options.fill),
          stroke: createStroke(options.stroke),
          radius: options.radius,
        })
        break
      default:
        break
    }
    return createStyle({ image })
  }

  /**
   * 创建线样式
   * @param { import('./map-element-display').IPolylineStyleOptions } polylineStyleOptions 线样式配置项
   */
  #createPolylineStyle (polylineStyleOptions) {
    return createStyle({
      stroke: createStroke(polylineStyleOptions.stroke)
    })
  }

  /**
   * 创建面样式
   * @param { import('./map-element-display').IPolygonStyleOptions } polygonStyleOptions 面样式配置项
   */
  #createPolygonStyle (polygonStyleOptions) {
    return createStyle({
      stroke: createStroke(polygonStyleOptions.stroke),
      fill: createFill(polygonStyleOptions.fill),
    })
  }

  //#endregion

  //#region 公有方法

  /**
   * 装载插件
   * @param { WebMap } webMap WebMap应用程式
   * @returns { this }
   */
  installPlugin (webMap) {
    super.installPlugin(webMap)
    this.#init()
    return this
  }

  /**
   * 添加基础图元
   * @param { Feature | Feature[] } features 要素
   */
  add (features) {
    const _features = Array.isArray(features) ? features : [features]
    this.#graphicsLayer.getSource().addFeatures(_features)
    return this
  }

  /**
   * 移除指定基础图元
   * @param { Feature | Feature[] } features 要素
   */
  remove (features) {
    const _features = Array.isArray(features) ? features : [features]
    _features.map(feat => {
      this.#graphicsLayer.getSource().removeFeature(feat)
    })
    return this
  }

  /**
   * 清除基础图元
   */
  clear () {
    this.#graphicsLayer.getSource().clear()
    return this
  }

  /**
   * 设置基础图元
   * @param { Feature | Feature[] } features 要素
   */
  set (features) {
    return this.clear().add(features)
  }

  /**
   * 添加高亮图元
   * @param { Feature | Feature[] } features 要素
   */
  addHighlight (features) {
    const _features = Array.isArray(features) ? features : [features]
    this.#highlightLayer.getSource().addFeatures(_features)
    return this
  }

  /**
   * 移除指定高亮图元
   * @param { Feature | Feature[] } features 要素
   */
  removeHighlight (features) {
    const _features = Array.isArray(features) ? features : [features]
    _features.map(feat => {
      this.#highlightLayer.getSource().removeFeature(feat)
    })
    return this
  }

  /**
   * 清除高亮图元
   */
  clearHighlight () {
    this.#highlightLayer.getSource().clear()
    return this
  }

  /**
   * 设置高亮图元
   * @param { Feature | Feature[] } features 要素
   */
  setHighlight (features) {
    return this.clearHighlight().add(features)
  }

  /**
   * 清除所有图元
   */
  clearAll () {
    return this.clear()
  }

  /**
   * 解析图元
   * @param { Geometry | Geometry[] } geometries 几何图形
   * @param { import('./map-element-display').IPointStyleOptions | import('./map-element-display').IPolylineStyleOptions | import('./map-element-display').IPolygonStyleOptions } styleOptions 样式配置项
   */
  parseGraphics (geometries, styleOptions = {}) {
    const _geometries = Array.isArray(geometries) ? geometries : [geometries]
    return _geometries.map(geometry => {
      let style = {}, options = {}
      switch (geometry.getType()) {
        case 'Point':
          options = BaseUtils.deepCopy(this.#styleOptions.graphicsStyle.pointStyle)
          BaseUtils.jExtent(true, options, styleOptions)
          style = this.#createPointStyle(options)
          break
        case 'LineString':
          options = BaseUtils.deepCopy(this.#styleOptions.graphicsStyle.polylineStyle)
          BaseUtils.jExtent(true, options, styleOptions)
          style = this.#createPolylineStyle(options)
          break
        case 'Polygon':
          options = BaseUtils.deepCopy(this.#styleOptions.graphicsStyle.polygonStyle)
          BaseUtils.jExtent(true, options, styleOptions)
          style = this.#createPolygonStyle(options)
          break
        default:
          break
      }
      return createFeature({ style, geometry })
    })
  }

  /**
   * 解析高亮图元
   * @param { Geometry | Geometry[] } geometries 几何图形
   * @param { import('./map-element-display').IPointStyleOptions | import('./map-element-display').IPolylineStyleOptions | import('./map-element-display').IPolygonStyleOptions } styleOptions 样式配置项
   */
  parseHighlightGraphics (geometries, styleOptions = {}) {
    const _geometries = Array.isArray(geometries) ? geometries : [geometries]
    return _geometries.map(geometry => {
      let style = {}, options = {}
      switch (geometry.getType()) {
        case 'Point':
          options = BaseUtils.deepCopy(this.#styleOptions.highlightStyle.pointStyle)
          BaseUtils.jExtent(true, options, styleOptions)
          style = this.#createPointStyle(options)
          break
        case 'LineString':
          options = BaseUtils.deepCopy(this.#styleOptions.highlightStyle.polylineStyle)
          BaseUtils.jExtent(true, options, styleOptions)
          style = this.#createPolylineStyle(options)
          break
        case 'Polygon':
          options = BaseUtils.deepCopy(this.#styleOptions.highlightStyle.polygonStyle)
          BaseUtils.jExtent(true, options, styleOptions)
          style = this.#createPolygonStyle(options)
          break
        default:
          break
      }
      return createFeature({ style, geometry })
    })
  }

  //#endregion

}

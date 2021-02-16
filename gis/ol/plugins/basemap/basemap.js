import { WebMapPlugin } from '../../web-map/web-map'
import { BaseUtils } from '../../../../js-utils'
import { createXYZLayer } from '../../utilities/layer.util'
import LayerGroup from 'ol/layer/Group'
import Collection from 'ol/Collection'
import BaseLayer from 'ol/layer/Base' // eslint-disable-line

/**
 * 底图控制插件类
 */
export class Basemap extends WebMapPlugin {

  //#region 私有属性

  /**
   * 默认底图项池
   * @type { import('./basemap').IDefaultBasemapPool }
   */
  #defaultBasemapPool = {
    '彩色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
    '灰色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
    '蓝黑色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
    '暖色地图': 'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}',
  }

  /**
   * 底图项池
   * @type { import('./basemap').IBasemapPool }
   */
  #basemapPool = {}

  /**
   * 配置项
   * @type { import('./basemap').IBasemapOptions }
   */
  #options = {}

  /**
   * 当前选中的底图项Key值
   * @type { string }
   */
  #selectedKey = '彩色地图'

  /**
   * 底图图层容器组
   * @type { LayerGroup }
   */
  #layerGroup = null

  //#endregion

  //#region getter

  /**
   * 当前选中的底图项Key值
   * @type { string }
   */
  get selectedKey () {
    return this.#selectedKey
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造底图控制插件对象
   * @param { import('./basemap').IBasemapOptions } options 配置项
   */
  constructor (options = {}) {
    super('basemap')
    BaseUtils.jExtent(true, this.#options, options)
  }

  //#endregion

  //#region 私有属性

  /**
   * 初始化
   */
  #init () {
    this.#layerGroup = new LayerGroup()
    this.map.getLayers().insertAt(0, this.#layerGroup)

    const { key } = this.#options
    Object.entries(this.#defaultBasemapPool).forEach(
      ([key, url]) => this.#basemapPool[key] = new Collection([createXYZLayer(url)])
    )
    this.selectBasemap(key)
  }

  //#endregion

  //#region 公有属性

  /**
   * 装载插件
   * @param { WebMap } webMap WebMap应用程式
   * @returns { WebMap }
   */
  installPlugin (webMap) {
    super.installPlugin(webMap)
    this.#init()
    return this
  }

  /**
   * 选择底图项
   * @param { string } key 底图项Key值
   * @returns { this }
   */
  selectBasemap (key) {
    const pool = this.#basemapPool
    if (key in pool) {
      this.#layerGroup.setLayers(pool[key])
      this.#selectedKey = key
    }
    return this
  }

  /**
   * 创建自定义底图项
   * @param { string } key 底图项Key值
   * @param { BaseLayer } layers 图层
   * @example
   *  const url = 'http://192.168.65.130:6080/arcgis/rest/services/GLC30/WorldLand/MapServer/tile/{z}/{y}/{x}'
   *  const layer = createXYZLayer(url)
   *  basemap.createCustomBasemap(layer).select()
   */
  createCustomBasemap (key, layers) {
    const lyrs = Array.isArray(layers) ? layers : [layers]
    this.#basemapPool[key] = new Collection(lyrs)
    const select = () => this.selectBasemap(key)
    return { select }
  }

  //#endregion

}
import { WebMapPlugin } from '../../web-map/web-map'
import { BaseUtils } from '../../../../js-utils'
import { createLayerGroup, createOSMLayer, createXYZLayer } from '../../utilities/layer.util'
import { createCollection } from '../../utilities/base.util'
import BaseLayer from 'ol/layer/Base' // eslint-disable-line

/**
 * 底图控制插件类
 */
export class Basemap extends WebMapPlugin {

  //#region 私有属性

  /**
   * 天地图秘钥
   * @type { String }
   */
  #tianDiTuKey = 'd524142425d379adcf285daba823e28a'

  // TODO: 未兼容投影（当前仅球面墨卡托投影，经纬度投影无法兼容）
  // TODO：注记切片无效果
  /**
   * 天地图地址集合
   */
  #tianDiTuUrls = {
    '影像底图': `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this.#tianDiTuKey}`,
    '影像注记': `http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this.#tianDiTuKey}`,
    '矢量底图': `http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this.#tianDiTuKey}`,
    '矢量注记': `http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this.#tianDiTuKey}`,
    '地形底图': `http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this.#tianDiTuKey}`,
    '地形注记': `http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${this.#tianDiTuKey}`,
  }

  // TODO: 切片布局异常
  /**
   * 百度地图地址
   */
  #baiDuDiTuUrl = `http://online0.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl`

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
  #options = {
    key: '彩色地图',
    visible: true
  }

  /**
   * 当前选中的底图项Key值
   * @type { string }
   */
  #selectedKey = ''

  /**
   * 底图图层容器组
   * @type { LayerGroup }
   */
  #layerGroup = null

  /**
   * 底图可见性
   * @type { boolean }
   */
  #visible = true

  //#endregion

  //#region getter

  /**
   * 当前选中的底图项Key值
   * @type { string }
   */
  get selectedKey () {
    return this.#selectedKey
  }

  /**
   * 底图可见性
   */
  get visible () {
    return this.#visible
  }

  /**
   * 底图项集
   */
  get basemapList () {
    return Object.keys(this.#basemapPool)
  }

  //#endregion

  //#region setter

  /**
   * 底图可见性
   */
  set visible (val) {
    this.#visible = val
    this.fire('change:visible', { visible: val })
    this.#layerGroup.setVisible(val)
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
    this.#visible = this.#options.visible
    this.#selectedKey = this.#options.key
  }

  //#endregion

  //#region 私有属性

  /**
   * 初始化
   */
  #init () {
    this.#layerGroup = createLayerGroup({ visible: this.#visible })
    this.map.getLayers().insertAt(0, this.#layerGroup)

    const key = this.selectedKey
    Object.entries(this.#defaultBasemapPool).forEach(
      ([key, url]) => this.#basemapPool[key.toLowerCase()] = createCollection([createXYZLayer(url)])
    )
    this.selectBasemap(key)
    this.createCustomBasemap('osm', createOSMLayer())
    this.#createTianDiTu()
      .#createBaiDuDiTu()
  }

  /**
   * 创建天地图底图项集合
   * @returns { this }
   */
  #createTianDiTu () {
    const createTianDiTuItem = name => {
      this.createCustomBasemap(`天地图${name}`, createXYZLayer(this.#tianDiTuUrls[`${name}底图`]))
      this.createCustomBasemap(`天地图${name}含注记`, [
        createXYZLayer(this.#tianDiTuUrls[`${name}底图`]),
        createXYZLayer(this.#tianDiTuUrls[`${name}注记`]),
      ])
      return createTianDiTuItem
    }
    createTianDiTuItem('影像')('矢量')('地形')
    return this
  }

  /**
   * 创建百度地图底图项
   * @returns { this }
   */
  #createBaiDuDiTu () {
    this.createCustomBasemap('百度地图', createXYZLayer(this.#baiDuDiTuUrl))
    return this
  }

  //#endregion

  //#region 公有属性

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
   * 选择底图项
   * @param { string } key 底图项Key值
   * @returns { this }
   */
  selectBasemap (key) {
    const pool = this.#basemapPool
    if (key in pool) {
      this.#layerGroup.setLayers(pool[key.toLowerCase()])
      this.#selectedKey = key
    }
    this.fire('change:key', { key })
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
    this.#basemapPool[key.toLowerCase()] = createCollection(lyrs)
    this.fire('change:list', { list: this.basemapList })
    const select = () => this.selectBasemap(key)
    return { select }
  }

  //#endregion

}

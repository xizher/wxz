/*
 * 描    述：ArcGIS API for JavaScript WebMap类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { Listener } from '../../../listener/listener'
import { Basemap } from '../basemap/basemap'
import { BaseUtils } from '../../../js-utils'
import { esri } from '../esri-modules/esri-modules'
import { MapElementDisplay } from '../map-element-display/map-element-display'
import { MapTools } from '../map-tools/map-tools'
import { EsriUtils } from '../esri-utils/esri-utils'
import { LayerOperation } from '../layer-operation/layer-operation'
import { registerEsriExts } from '../esri-exts/esri-exts'

/**
 * WebMap类
 */
export const WebMap = (function () {

  //#region 私有属性

  /**
   * esri地图对象
   * @type { WeakMap<__WebMap__, import('./webmap').$Map> }
   */
  const _map = new WeakMap()

  /**
   * esri视图对象
   * @type { WeakMap<__WebMap__, import('./webmap').$View> }
   */
  const _view = new WeakMap()

  /**
   * 地图容器Dom结点ID值
   * @type { WeakMap<__WebMap__, string> }
   */
  const _divId = new WeakMap()

  /**
   * 底图控制类
   * @type { WeakMap<__WebMap__, Basemap> }
   */
  const _basemap = new WeakMap()

  /**
   * 图元控制类
   * @type { WeakMap<__WebMap__, MapElementDisplay> }
   */
  const _mapElementDisplay = new WeakMap()

  /**
   * 地图工具操作类
   * @type { WeakMap<__WebMap__, MapTools> }
   */
  const _mapTools = new WeakMap()

  /**
   * 图层操作对象
   * @type { WeakMap<__WebMap__, LayerOperation> }
   */
  const _layerOperation = new WeakMap()

  /**
   * 配置项
   * @type { WeakMap<__WebMap__, import('./webmap').IWebMapOptions> }
   */
  const _options = new WeakMap()

  //#endregion

  //#region 私有方法

  /**
   * 加载地图对象
   * @type { WeakMap<__WebMap__, () => void> }
   */
  const _loadMap = new WeakMap()

  /**
   * 加载视图对象
   * @type { WeakMap<__WebMap__, () => void> }
   */
  const _loadMapView = new WeakMap()

  /**
   * 加载底图控制类
   * @type { WeakMap<__WebMap__, () => void> }
   */
  const _loadBasemap = new WeakMap()

  /**
   * 加载图元控制类
   * @type { WeakMap<__WebMap__, () => void> }
   */
  const _loadMapElementDisplay = new WeakMap()

  /**
   * 加载地图工具操作类
   * @type { WeakMap<__WebMap__, () => void> }
   */
  const _loadMapTools = new WeakMap()

  const _loadLayerOperation = new WeakMap()

  //#endregion

  //#region 类体

  class __WebMap__ extends Listener {

    //#region getter

    /**
     * @type { import('./webmap').$Map }
     */
    get map () {
      return _map.get(this)
    }

    /**
     * @type { import('./webmap').$View }
     */
    get view () {
      return _view.get(this)
    }

    get divId () {
      return _divId.get(this)
    }

    get basemap () {
      return _basemap.get(this)
    }

    get mapElementDisplay () {
      return _mapElementDisplay.get(this)
    }

    get mapTools () {
      return _mapTools.get(this)
    }

    get layerOperation () {
      return _layerOperation.get(this)
    }

    get options () {
      return _options.get(this)
    }

    //#endregion

    //#region 构造函数

    constructor (divId, options) {
      super()

      _divId.set(this, divId)
      _options.set(this, {})
      BaseUtils.deepExtent(true, _options.get(this), options)

      //#region 私有方法定义

      _loadMap.set(this, () => {
        const map = new esri.Map()
        map.$owner = this
        _map.set(this, map)
      })

      _loadMapView.set(this, () => {
        const map = _map.get(this)
        const view = new esri.views.MapView({
          container: this.divId,
          map,
          ...this.options.viewOptions,
        })
        view.$owner = this
        _view.set(this, view)
      })

      _loadBasemap.set(this, () => {
        const basemap = new Basemap(this.map, this.options.basemapOptions)
        _basemap.set(this, basemap)
      })

      _loadMapElementDisplay.set(this, () => {
        const mapElementDisplay = new MapElementDisplay(this.map, this.view)
        _mapElementDisplay.set(this, mapElementDisplay)
      })

      _loadMapTools.set(this, () => {
        const mapTools = new MapTools(this.map, this.view)
        _mapTools.set(this, mapTools)
      })

      _loadLayerOperation.set(this, () => {
        const layerOperation = new LayerOperation(this.map, this.options.layerOperationOptions)
        _layerOperation.set(this, layerOperation)
      })

      //#endregion

    }

    //#endregion

    //#region 公有方法

    /**
     * 加载WebMap
     */
    load () {
      esri.config.request.timeout = '600000' // 超时时间限度10分钟
      _loadMap.get(this)()
      _loadMapView.get(this)()
      EsriUtils.register(this.map)(this.view)
      registerEsriExts(this.map)(this.view)
      _loadBasemap.get(this)()
      _loadMapTools.get(this)()
      _loadLayerOperation.get(this)()
      _loadMapElementDisplay.get(this)()

      this.fire('loaded')
    }

    /**
     * 缩放至图层
     * @param { string | __esri.Layer } layerName 图层名
     */
    zoomToLayer (layerName) {
      if (typeof layerName === 'string') {
        const layer = this.layerOperation.findLayerByName(layerName)
        this.view.goTo(layer.fullExtent)
      } else if (layerName instanceof esri.layers.Layer) {
        this.view.goTo(layerName.fullExtent)
      }
      return this
    }

    //#endregion

  }

  //#endregion

  return __WebMap__
}())

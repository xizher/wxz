/*
 * 描    述：ArcGIS API for JavaScript 底图控制类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { esri } from '../esri-modules/esri-modules'
import { Listener } from '../../../listener/listener'

/**
 * 底图控制类
 */
export const Basemap = (function () {

  //#region 四有对象

  /**
   * esri地图对象
   * @type { WeakMap<__Basemap__, __esri.Map> }
   */
  const _map = new WeakMap()

  /**
   * 可选底图图层项
   * @type { WeakMap<__Basemap__, Object<number, import('./basemap').IBasemapItems>> }
   */
  const _basemapItems = new WeakMap()

  /**
   * 配置项
   * @type { WeakMap<__Basemap__, import('./basemap').IBasemapOptions> }
   */
  const _options = new WeakMap()

  /**
   * 当前选择显示的底图项密钥
   * @type { WeakMap<__Basemap__, number> }
   */
  const _selectedKey = new WeakMap()

  //#endregion

  //#region 私有方法

  /**
   * 对象初始化
   * @type { WeakMap<__Basemap__, () => void> }
   */
  const _init = new WeakMap()

  /**
   * 通过密钥设置底图项
   * @type { WeakMap<__Basemap__, (key: number) => void> }
   */
  const _setBasemap = new WeakMap()

  //#endregion


  //#region 类体

  class __Basemap__ extends Listener {

    //#region getter

    /** esri地图对象 */
    get map () {
      return _map.get(this)
    }

    /**
     * 可选底图图层项
     * @type { import('./basemap').IBasemapItems }
     */
    get basemapItems () {
      return _basemapItems.get(this)
    }

    /**
     * 配置项
     * @type { import('./basemap').IBasemapOptions }
    */
    get options () {
      return _options.get(this)
    }

    /** 当前选择显示的底图项密钥 */
    get selectedKey () {
      return _selectedKey.get(this)
    }

    //#endregion

    //#region setter

    /** 当前选择显示的底图项密钥 */
    set selectedKey (key) {
      const oldKey = this.selectedKey
      _selectedKey.set(this, key)
      _setBasemap.get(this)(key)
      this.setVisible(true)

      this.fire('selection-changed', { oldKey, key })
    }

    //#endregion

    //#region 构造函数

    /**
     *
     * @param { __esri.Map } map esri地图对象
     * @param { import('./basemap').IBasemapOptions } options 配置项
     */
    constructor (map, options) {
      super()

      _map.set(this, map)
      _options.set(this, options)
      _basemapItems.set(this, {})

      //#region 定义私有方法

      _init.set(this, () => {
        this.options.layers.forEach(lyr => {
          let layer = null
          if (lyr.type.toLowerCase() === 'webtilelayer') {
            layer = new esri.layers.WebTileLayer(lyr.options)
          }
          _basemapItems.get(this)[lyr.key] = {
            layer, ...lyr
          }
        })
        this.selectedKey = this.options.selectedKey
      })

      _setBasemap.set(this, key => {
        this.setVisible(true)
        if (this.basemapItems[key]) {
          this.map.basemap = {
            baseLayers: [
              this.basemapItems[key].layer
            ]
          }
        }
      })

      //#endregion

      _init.get(this)()
    }

    //#endregion

    //#region 公有方法

    /**
     * 设置底图可见性
     * @param { true | false } visible 可见性
     * @returns { __Basemap__ } this
     */
    setVisible (visible) {
      for (const key in this.basemapItems) {
        const item = this.basemapItems[key]
        item.layer.visible = visible
      }
      return this
    }

    //#endregion

  }

  //#endregion

  return __Basemap__

}())

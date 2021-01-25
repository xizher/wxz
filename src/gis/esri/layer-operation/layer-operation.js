
import { esri } from '../esri-modules/esri-modules'

export const LayerOperation = (function () {

  //#region 私有属性

  /**
   * @type { WeakMap<__LayerOperation__, import('../webmap/webmap').$Map> }
   */
  const _map = new WeakMap()

  /**
   * @type { WeakMap<__LayerOperation__, __esri.GroupLayer> }
   */
  const _layerGroup = new WeakMap()

  const _layerList = new WeakMap()

  const _options = new WeakMap()

  //#endregion

  //#region 私有方法

  const _init = new WeakMap()

  const _loadLayer = new WeakMap()

  //#endregion

  //#region 类体

  class __LayerOperation__ {

    //#region getter

    get map () {
      return _map.get(this)
    }

    get layerGroup () {
      return _layerGroup.get(this)
    }

    get layerList () {
      return _layerList.get(this)
    }

    get options () {
      return _options.get(this)
    }

    //#endregion

    //#region 构造函数

    constructor (map, options) {
      _map.set(this, map)
      _options.set(this, options)
      _layerGroup.set(this, new esri.layers.GroupLayer())
      _layerList.set(this, [])

      //#region 私有方法定义

      _init.set(this, () => {
        this.map.add(this.layerGroup)
        this.options.layerList.forEach(item => {
          _loadLayer.get(this)(item)
        })
      })

      _loadLayer.set(this, (layerItem) => {
        const { target, name, alias, key } = layerItem
        let layer = null
        if (target.type === 'ImageryLayer') {
          layer = new esri.layers.ImageryLayer(target.options)
        } else if (target.type === 'FeatureLayer') {
          layer = new esri.layers.FeatureLayer(target.options)
        }
        if (layer) {
          this.layerGroup.add(layer)
          this.layerList.push({
            name, alias, key, ...target, targetLayer: layer
          })
        }
      })

      //#endregion


      _init.get(this)()
    }

    //#endregion

  }

  //#endregion

  return __LayerOperation__

}())

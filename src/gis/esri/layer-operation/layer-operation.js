
import { esri } from '../esri-modules/esri-modules'

export const LayerOperation = (function () {

  //#region 私有属性

  /**
   * esri地图对象
   * @type { WeakMap<__LayerOperation__, import('../webmap/webmap').$Map> }
   */
  const _map = new WeakMap()

  /**
   * esri视图对象
   * @type { WeakMap<__LayerOperation__, __esri.GroupLayer> }
   */
  const _layerGroup = new WeakMap()

  /**
   * 图层对象列表
   * @type { WeakMap<__LayerOperation__, import('./layer-operation').ILayerOperationLayerItem[]> }
   */
  const _layerList = new WeakMap()

  /**
   * 配置项
   * @type { WeakMap<__LayerOperation__, import('./layer-operation').ILayerOperationOptions> }
   */
  const _options = new WeakMap()

  //#endregion

  //#region 私有方法

  /**
   * 初始化
   * @type { WeakMap<__LayerOperation__, () => void> }
   */
  const _init = new WeakMap()

  /**
   * 加载图层
   * @type { WeakMap<__LayerOperation__, (item: import('./layer-operation').ILayerOperationLayerItem) => void> }
   */
  const _initLayerList = new WeakMap()

  /**
   * 加载图层
   * @type { WeakMap<__LayerOperation__, (target: { type: string, options: any }) => void> }
   */
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
          _initLayerList.get(this)(item)
        })
      })

      _initLayerList.set(this, layerItem => {
        const { target, name, alias, key } = layerItem
        const layer = _loadLayer.get(this)(target)
        if (layer) {
          this.layerGroup.add(layer)
          this.layerList.push({
            name, alias, key, target, targetLayer: layer
          })
        }
      })

      _loadLayer.set(this, target => {
        let layer = null
        if (target.type === 'ImageryLayer') {
          layer = new esri.layers.ImageryLayer(target.options)
        } else if (target.type === 'FeatureLayer') {
          layer = new esri.layers.FeatureLayer(target.options)
        }
        return layer
      })

      //#endregion


      _init.get(this)()
    }

    //#endregion

    //#region 公有方法

    /**
     * 通过图层名获取图层对象
     * @param { string } layerName 图层名
     * @returns { __esri.Layer }
     */
    findLayerByName (layerName) {
      const layer = this.layerList.find(item => item.name === layerName)
      return layer.targetLayer
    }

    /**
     * 克隆图层（图层对象通过图层名匹配）
     * @param { string } layerName 图层名
     */
    cloneLayer (layerName) {
      const layerItem = this.layerList.find(item => item.name === layerName)
      const layer = _loadLayer.get(this)(layerItem.target)
      return layer
    }

    /**
     * 设置图层可见性
     * @param { string } layerName 图层名
     * @param { boolean } visible 可见性
     */
    setLayerVisible (layerName, visible) {
      const layer = this.findLayerByName(layerName)
      layer.visible = visible
      return this
    }

    /**
     * 设置图层可见并缩放至图层
     * @param { string } layerName 图层名
     */
    setLayerVisibleAndZoomTo (layerName) {
      const layer = this.findLayerByName(layerName)
      layer.visible = true
      this.map.$owner.view.goTo(layer.fullExtent)
      return this
    }

    /**
     * 设置所有图层为不可见
     */
    setAllLayersInvisible () {
      this.layerList.forEach(item => item.targetLayer.visible = false)
      return this
    }

    //#endregion

  }

  //#endregion

  return __LayerOperation__

}())

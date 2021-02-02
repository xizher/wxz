import { onUnmounted, ref } from 'vue'

export const esriHooks = {
  /**
   * 创建读取栅格DN值数据钩子
   * @param { __esri.ImageryLayer } layer 栅格图层
   */
  usePixelData (layer) {
    const { view } = esriHooks
    let pixelData = null
    /** @type { __esri.WatchHandle } */
    let watchHandler = null
    const loaded = ref(false)
    onUnmounted(() => watchHandler && watchHandler.remove())
    view.whenLayerView(layer).then(layerView => {
      watchHandler = layerView.watch('updating', updating => {
        if (!updating) {
          pixelData = layerView.pixelData
          loaded.value = true
          watchHandler.remove()
        }
      })
    })
    return [loaded, () => pixelData]
  },

  /**
   * 视图对象事件监听钩子
   * @param { string } name 监听事件名
   * @param { Function } callback 监听事件响应函数
   * @param { import('../web-map/web-map').$View } view 视图对象
   */
  useViewOn (name, callback, view = esriHooks.view) {
    let handler = null
    handler = view.on(name, callback)
    onUnmounted(() => handler && handler.remove())
    return handler
  },
}


/**
 * esri地图对象
 * @type { import('../web-map/web-map').$Map }
 */
esriHooks.map = null

/**
 * esri视图对象
 * @type { import('../web-map/web-map').$View }
 */
esriHooks.view = null

/**
 * 插件名
 * @type { string }
 */
esriHooks.PLUGIN_NAME = 'esriHooks'

/**
 * 插件注册
 * @param { import('../web-map/web-map').WebMap } webMap WebGIS应用程式
 */
esriHooks.REGISTER_PLUGIN = function (webMap) {
  esriHooks.map = webMap.map
  esriHooks.view = webMap.view
}

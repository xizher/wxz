import { onUnmounted, ref } from 'vue'
import { useWebMap } from '../../../../../project/hooks/useWebMap'

/**
 * 创建读取栅格DN值数据钩子
 * @param { __esri.ImageryLayer } layer 栅格图层
 */
export function usePixelData (layer) {
  const { view } = useWebMap()
  const loaded = ref(false)
  let pixelData = null
  /** @type { __esri.WatchHandle } */
  let watchHandler = null
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
  return [
    loaded, () => pixelData
  ]
}

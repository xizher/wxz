import { onUnmounted, reactive, ref, watch } from 'vue'
import { WebMapPlugin } from '../../web-map/web-map'
import { $ext } from '../../../../js-ext'

export class OlHooks extends WebMapPlugin {

  constructor () {
    super('olHooks')
  }

  useBasemap () {
    const { basemap } = this.view.$owner

    function useSelector (k = basemap.selectedKey) {
      const selectedKey = ref(k)
      const handler = basemap.on('change:key', e => selectedKey.value = e.key)
      onUnmounted(() => basemap.off('change:key', handler))
      const setSelectedKey = key => basemap.selectBasemap(key)
      watch(selectedKey, key => setSelectedKey(key))
      return [selectedKey, setSelectedKey]
    }

    function useList () {
      const list = reactive(basemap.basemapList)
      const handler = basemap.on('change:list', e => $ext(list).reset(...e.list))
      onUnmounted(() => basemap.off('change:list', handler))
      return list
    }

    function useVisible (v = basemap.visible) {
      const visible = ref(v)
      const handler = basemap.on('change:visible', e => visible.value = e.visible)
      onUnmounted(() => basemap.off('change:visible', handler))
      const setVisible = v => basemap.visible = v
      watch(visible, v => setVisible(v))
      return [visible, setVisible]
    }

    return {
      useSelector,
      useList,
      useVisible,
    }
  }

}

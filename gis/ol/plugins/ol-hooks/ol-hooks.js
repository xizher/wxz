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

  useMapTools (toolKeys = []) {
    const { mapTools } = this.map.$owner
    const activedKey = ref('default')
    mapTools.on('change:actived-key', e => activedKey.value = e.key)
    const toolList = reactive(toolKeys)
    watch(activedKey, key => mapTools.setMapTool(key))
    return [activedKey, toolList]
  }

  useMarkTool () {
    const { mapTools } = this.map.$owner
    /** @type { import('../map-tools/tools/mark/mark').MarkTool } */
    const markTool = mapTools.getTool('mark')
    function useEnabled () {
      const enabled = ref(false)
      mapTools.on('change:actived-key', e => enabled.value = (e.key === 'mark'))
      watch(enabled, val => {
        if (val) {
          mapTools.setMapTool('mark')
        }
      })
      return enabled
    }
    function useClear () {
      markTool.clearMark()
    }
    function useMarkType () {
      const typeList = ['Point', 'LineString', 'Polygon', 'Circle']
      const selectedType = ref('')
      mapTools.on('change:actived-key', e => {
        if (e.key !== 'mark') {
          selectedType.value = ''
        }
      })
      watch(selectedType, val => {
        if (val) {
          markTool.setMarkType(val)
          mapTools.setMapTool('mark')
        }
      })
      return [selectedType, typeList]
    }

    return {
      useEnabled, useClear, useMarkType
    }
  }

}

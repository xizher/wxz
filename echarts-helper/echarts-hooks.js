import { onMounted } from 'vue'
import { EChartsHelper } from './echarts-hepler'

export function useECharts (divId, options = {}) {
  const echartsHelper = new EChartsHelper(divId)
  onMounted(() => echartsHelper.mount().setOptions(options))
  return [
    function (options) {
      echartsHelper.setOptions(options)
    }
  ]
}

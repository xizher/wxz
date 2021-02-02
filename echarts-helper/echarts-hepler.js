import echarts from 'echarts'
import 'echarts-gl'

export class EChartsHelper {

  //#region 私有变量

  #divId = ''

  /**
   * @type { echarts.ECharts }
   */
  #echarts = null

  //#endregion

  //#region getter

  get echarts () {
    return this.#echarts
  }

  //#endregion

  //#region 构造函数

  constructor (divId) {
    this.#divId = divId
  }

  //#endregion

  //#region 公有方法

  mount () {
    const elem = document.getElementById(this.#divId)
    this.#echarts = echarts.init(elem)
    return this
  }

  /**
   * 设置配置项
   * @param { echarts.EChartOption } options 配置项
   */
  setOptions (options) {
    this.#echarts.setOption(options)
    return this
  }

  //#endregion

}

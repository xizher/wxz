import echarts from 'echarts'
import 'echarts-gl'

export class EChartsHelper {

  //#region 私有变量

  #divId = ''

  /**
   * @type { echarts.ECharts }
   */
  #echarts = null

  /**
   * @type { echarts.EChartOption }
   */
  #options = {}

  //#endregion

  //#region getter

  get echarts () {
    return this.#echarts
  }

  //#endregion

  //#region 构造函数

  /**
   *
   * @param { string } divId
   * @param { echarts.EChartOption } options
   */
  constructor (divId, options = {}) {
    this.#divId = divId
    this.#options = options
  }

  //#endregion

  //#region 公有方法

  mount () {
    const elem = document.getElementById(this.#divId)
    this.#echarts = echarts.init(elem)
    return this.setOptions(this.#options)
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

export class Highlight {

  //#region 私有属性

  /**
   * 视图对象
   * @type { import('../web-map/web-map').$View }
   */
  #view = null

  /**
   * 高亮对象集
   * @type { Array<{ remove(): void }> }
   */
  #highlights = []

  //#endregion

  //#region 构造函数

  constructor () {
    // not
  }

  /**
   * 插件名
   * @type { string }
   */
  get PLUGIN_NAME () {
    return 'highlight'
  }

  /**
   * 插件注册
   * @param { import('../web-map/web-map').WebMap } webMap WebGIS应用程式
   */
  REGISTER_PLUGIN (webMap) { // eslint-disable-line
    this.#view = webMap.view
  }

  //#endregion

  //#region 公有方法

  /**
   * 设置高亮
   * @param { __esri.Layer } layer 图层
   * @param { __esri.Graphic | __esri.Feature | string } graphic 高亮对象
   * @param { boolean } reset 是否重置
   * @returns { Highlight }
   */
  setHighlight (layer, graphic, reset = false) {
    if (reset) {
      this.clearHighlight()
    }
    this.#view.whenLayerView(layer).then(layerView => {
      const highlight = layerView.highlight(graphic)
      this.#highlights.push(highlight)
    })
    return this
  }

  /**
   * 清空高亮对象
   * @returns { Highlight }
   */
  clearHighlight () {
    this.#highlights.forEach(item => item.remove())
    return this
  }

  //#endregion

}

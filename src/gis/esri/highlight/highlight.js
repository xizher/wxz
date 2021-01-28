export const Highlight = (function () {

  //#region 私有变量

  /**
   * esri视图对象
   * @type { WeakMap<__Highlight__, __esri.MapView | __esri.SceneView> }
   */
  const _view = new WeakMap()

  /**
   * esri视图对象
   * @type { WeakMap<__Highlight__, Array<{ remove(): void> }> }
   */
  const _highlightList = new WeakMap()

  //#endregion

  //#region 类体

  class __Highlight__ {

    constructor (view) {
      _view.set(this, view)
      _highlightList.set(this, [])
    }

    /**
     * 设置高亮
     * @param { __esri.Layer } layer 图层
     * @param { __esri.Graphic } graphic 图形
     * @returns { __Highlight__ } this
     */
    setHighlight (layer, graphic) {
      const view = _view.get(this)
      const highlightList = _highlightList.get(this)
      view.whenLayerView(layer).then(layerView => {
        const highlight = layerView.highlight(graphic)
        highlightList.push(highlight)
      })
      return this
    }

    /**
     * 清空高亮
     * @returns { __Highlight__ } this
     */
    clearHighlight () {
      const highlightList = _highlightList.get(this)
      highlightList.forEach(item => item.remove())
      _highlightList.set(this, [])
      return this
    }

  }

  //#endregion

  return __Highlight__

}())

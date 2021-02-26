import { BaseTool } from '../../base-tool/base-tool'
import {
  Draw, Modify, Snap
} from 'ol/interaction'
/* eslint-disable */
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
/* eslint-enable */

/**
 * 标记工具类
 */
export class MarkTool extends BaseTool {

  //#region 私有属性

  /**
   * 矢量数据源
   * @type { VectorSource }
   */
  #source = null

  /**
   * 矢量图层
   * @type { VectorLayer }
   */
  #vectorLayer = null

  /**
   * @type { Modify }
   */
  #modify = null

  /**
   * @type { Draw }
   */
  #draw = null

  /**
   * @type { Snap }
   */
  #snap = null

  /**
   * 标记类型
   * @type { import('./mark').EGeometryType }
   */
  #markGeometryType = 'Point'

  //#endregion

  //#region 构造函数

  /**
   * 构造标记工具对象
   * @param { import('../../../../web-map/web-map').IMap } map 地图对象
   * @param { import('../../../../web-map/web-map').IView } view 视图对象
   */
  constructor (map, view) {
    super(map, view)

    this.#init()
  }

  //#endregion

  //#region 私有方法

  #init () {
    this.#source = new VectorSource()
    this.#vectorLayer = new VectorLayer({
      source: this.#source
    })
    this.#modify = new Modify({ source: this.#source })
    this.#snap = new Snap({ source: this.#source })
    this.#createDraw()
  }

  #createDraw () {
    this.#draw = new Draw({
      source: this.#source,
      type: this.#markGeometryType,
    })
    return this.#draw
  }

  //#endregion

  //#region 公有方法

  /**
   * 清理标记
   * @returns { this }
   */
  clearMark () {
    this.fire('tool-clear')
    return this
  }

  /**
   * 设置标记类型
   * @param { import('./mark').EGeometryType } type 标记类型
   */
  setMarkType (type) {
    this.#markGeometryType = type
    if (this.actived) {
      this.map.removeInteraction(this.#draw)
      this.map.addInteraction(this.#createDraw())
    } else {
      this.#createDraw()
    }
    return this
  }

  /**
   * （重写）激活工具监听事件
   * @param { import('../../../../../../listener').IListenerListenType } event
   */
  onToolActived (event) {
    if (super.onToolActived(event)) {

      this.map.getLayers().remove(this.#vectorLayer)
      this.map.addLayer(this.#vectorLayer)
      this.map.addInteraction(this.#modify)
      this.map.addInteraction(this.#draw)
      this.map.addInteraction(this.#snap)

      return true
    } else {
      return false
    }
  }

  /**
   * （重写）解除激活监听事件
   * @param { import('../../../../../../listener').IListenerListenType } event
   */
  onToolDeActived (event) {
    if (super.onToolDeActived(event)) {

      this.map.removeInteraction(this.#modify)
      this.map.removeInteraction(this.#draw)
      this.map.removeInteraction(this.#snap)

      return true
    } else {
      return false
    }
  }

  /**
   * （重写）工具清理监听事件
   * @param { import('../../../../../../listener').IListenerListenType } event
   */
  onToolClear (event) {
    this.#source.clear()
    if (super.onToolClear(event)) {

      return true
    } else {
      return false
    }
  }

  //#endregion

}

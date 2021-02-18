import { WebMap, WebMapPlugin } from '../../web-map/web-map'
import { Basemap } from '../basemap/basemap'
import { MapElementDisplay } from '../map-element-display/map-element-display'
import { BaseUtils } from '../../../../js-utils'
import DragPan from 'ol/interaction/DragPan'

/**
 * 鹰眼插件类
 */
export class Hawkeye extends WebMapPlugin {

  //#region 私有属性

  /**
   * 鹰眼容器
   * @type { string }
   */
  #divId = ''

  /**
   * WebMap应用程式对象
   * @type { WebMap }
   */
  #webMap = null

  //#endregion

  //#region getter

  get webMap () {
    return this.#webMap
  }

  //#endregion

  //#region 构造函数

  /**
   * 构造鹰眼对象
   */
  constructor (divId) {
    super('hawkeye')
    this.#divId = divId
  }

  //#endregion

  //#region 公有方法

  /**
   * 初始化
   * @param { WebMap } targetWebMap WebMap应用程式
   */
  #init (targetWebMap) {
    const options = BaseUtils.deepCopy(targetWebMap.options)
    BaseUtils.jExtent(true, options, {
      mapOptions: {},
      viewOptions: {
        zoom: 1,
        smoothExtentConstraint: false,
      },
    })
    this.#webMap = new WebMap(this.#divId, options)
      .use(new Basemap({ key: '彩色地图' }))
      .use(new MapElementDisplay())
      .mount()
    this.#webMap.map.getView().setMinZoom(1)
    this.#webMap.map.getView().setMaxZoom(1)

    let pan
    this.#webMap.map.getInteractions().forEach(element => {
      if (element instanceof DragPan) {
        pan = element
      }
    })
    pan.setActive(false)
    this.view.on('change:center', () => {
      this.#webMap.view.setCenter(this.view.getCenter())
    })
    // this.view.on('change:resolution', () => {
    //   this.#webMap.view.setMinZoom(this.view.getZoom())
    //   this.#webMap.view.setMaxZoom(this.view.getZoom())
    // })
  }

  //#endregion

  //#region 公有方法

  /**
   * 装载插件
   * @param { WebMap } webMap WebMap应用程式
   * @returns { this }
   */
  installPlugin (webMap) {
    super.installPlugin(webMap)
    this.#init(webMap)
    return
  }

  //#endregion

}

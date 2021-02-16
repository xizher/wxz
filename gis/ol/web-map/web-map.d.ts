import OlMap from 'ol/Map'
import { MapOptions } from 'ol/PluggableMap'
import View, { ViewOptions } from 'ol/View'
import { Listener } from '../../../listener'
import { Basemap } from '../plugins'

export declare interface IPlugins {
  basemap:? Basemap
}

/**
 * WebMap应用程式类
 */
export declare class WebMap implements IPlugins {
  /**
   * 构造WebMap应用程式对象
   * @param targetDiv 目标容器
   * @param options 配置项
   */
  constructor (targetDiv?: string, options?: IWebMapOptions)
  /**
   * 目标容器
   */
  get targetDiv () : string | HTMLElement
  /**
   * 地图对象
   */
  get map () : IMap
  /**
   * 视图对象
   */
  get view () : IView
  /**
   * 装载应用程式
   */
  mount () : this
  /**
   * 装载应用程式插件
   * @param plugin 应用程式插件
   */
  use (plugin: IWebMapPlugin) : this
}

export declare interface IMap extends OlMap {
  $owner: WebMap
}

export declare interface IView extends View {
  $owner: WebMap
}

export declare interface IWebMapOptions {
  viewOptions: ViewOptions
  mapOptions: MapOptions
}

export declare class WebMapPlugin<T> extends Listener<T> {
  /**
   * 构建WebMap应用程式插件
   * @param pluginName 插件属性名
   */
  constructor (pluginName: string)
  /**
   * 地图对象
   */
  get map () : IMap
  /**
   * 视图对象
   */
  get view () : IView
  /**
   * 插件装载属性名
   */
  get pluginName () : string
  /**
   * 装载应用程式插件
   * @param webMap WebMap应用程式
   */
  installPlugin (webMap: WebMap) : this
}


import { Collection } from "ol";
import BaseLayer from "ol/layer/Base";
import { WebMapPlugin } from "../../web-map/web-map";

/**
 * 底图控制插件类
 */
export class Basemap extends WebMapPlugin<
  { name: 'change:key', data: { key: string } } |
  { name: 'change:visible', data: { visible: boolean } } | 
  { name: 'change:list', data: { list: string[] } }
> {
  /**
   * 构造底图控制插件对象
   * @param options 配置项
   */
  constructor (options?: IBasemapOptions)
  /**
   * 当前选择的底图项Key值
   */
  get selectedKey () : string
  /**
   * 底图可见性
   */
  get visible () : boolean
  /**
   * 底图项集
   */
  get basemapList () : string[]
  /**
   * 底图可见性
   * @param value 可见性
   */
  set visible (value)
  /**
   * 设置底图项
   * @param key 底图项key值
   */
  selectBasemap (key: string) : this
  /**
   * 创建自定义底图项
   * @param key 底图项Key值
   * @param layers 图层
   */
  createCustomBasemap (key: string, layers: BaseLayer[] | BaseLayer) : { select () : this }
}

export interface IDefaultBasemapPool {
  [name: string] : string
}

export interface IBasemapPool {
  [name: string] : Collection<BaseLayer>
}

export interface IBasemapOptions {
  key: string
  visible: boolean
}

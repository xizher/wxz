import { IListenerCallback, Listener } from "../../../../../listener";
import { IMap, IView } from "../../../web-map/web-map";

/**
 * 基础工具类
 */
export declare class BaseTool extends Listener {
  /**
   * 构造基础工具对象
   * @param map 地图对象
   * @param view 视图对象
   * @param isOnceTool 是否为一次性工具
   */
  constructor (map: IMap, view: IView, isOnceTool?: boolean)
  /**
   * 地图对象
   */
  get map () : IMap
  /**
   * 视图对象
   */
  get view () : IView
  /**
   * 是否一次性工具
   */
  get isOnceTool () : boolean
  /**
   * 激活状态
   */
  get actived () : boolean
  /**
   * 激活工具
   */
  active () : this
  /**
   * 解除激活
   */
  deactive () : this
  /**
   * 工具激活监听事件
   * @param event 监听参数
   */
  onToolActived (event: IListenerCallback) : boolean | IListenerCallback
  /**
   * 工具清理监听事件
   * @param event 监听参数
   */
  onToolClear (event: IListenerCallback) : boolean | IListenerCallback
  /**
   * 工具解除激活监听事件
   * @param event 监听参数
   */
  onToolDeActived (event: IListenerCallback) : boolean | IListenerCallback
}
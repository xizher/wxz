import { Feature } from "ol"
import { IListenerCallback } from "../../../../../../listener"
import { IMap, IView } from "../../../../web-map/web-map"
import { EMapCursorType } from "../../../map-cursor/map-cursor"
import { Drawer } from "../../../map-element-display/drawer/drawer"
import { BaseTool } from "../../base-tool/base-tool"

/**
 * 绘制类型控制类
 */
export declare class DrawOperation {
  /**
   * 事件处理池
   */
  static handlerPool : Object<string, { remove(): void }>

  /**
   * 清理绘制相关响应事件
   */
  clearDrawHandler () : typeof DrawOperation
}

export declare type EDrawType =
  'point' |
  'line' |
  'line-faster' |
  'polyline' |
  'polygon' |
  'rectangle' |
  'rectangle-faster' |
  'circle' |
  'circle-faster'


/**
 * 绘制工具类
 */
export declare class DrawTool extends BaseTool<
  { string: 'draw-start', data: {} } |
  { string: 'draw-moving', data: {  } } |
  { string: 'draw-end', data: { features: Feature[] } }
> {
  /**
   * 构造绘制工具对象
   * @param map 地图对象
   * @param view 视图对象
   * @param drawType 绘制类型
   * @param cursorType 鼠标样式
   */
  constructor (map: IMap, view: IView, drawType: EDrawType, cursorType: EMapCursorType)
  /**
   * 绘制器对象
   */
  get drawer () : Drawer
  clearDrawed () : this
  /**
   * 开始绘制监听事件
   * @param event 监听参数
   */
  onDrawStart (event: IListenerCallback<'draw-start'>) : boolean | IListenerCallback<'draw-start'>
  /**
   * 绘制过程监听事件
   * @param event 监听参数
   */
  onDrawMove (event: IListenerCallback<'draw-move'>) : boolean | IListenerCallback<'draw-move'>
  /**
   * 结束绘制监听事件
   * @param event 监听参数
   */
  onDrawEnd (event: IListenerCallback<'draw-end'>) : boolean | IListenerCallback<'draw-end'>
}
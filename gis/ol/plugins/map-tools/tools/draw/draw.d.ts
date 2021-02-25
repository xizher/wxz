import { IMap, IView } from "../../../../web-map/web-map"
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
export declare class DrawTool extends BaseTool {
  /**
   * 构造绘制工具对象
   * @param map 地图对象
   * @param view 视图对象
   * @param drawType 绘制类型
   */
  constructor (map: IMap, view: IView, drawType: EDrawType)
  clearDrawed () : this
}
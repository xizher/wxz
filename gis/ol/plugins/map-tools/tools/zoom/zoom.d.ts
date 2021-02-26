import { IMap, IView } from "../../../../web-map/web-map";
import { BaseTool } from "../../base-tool/base-tool";

/**
 * 放大工具类
 */
export declare class ZoomInTool extends BaseTool {
  /**
   * 构造放大工具对象
   * @param map 地图对象
   * @param view 视图对象
   */
  constructor (map: IMap, view: IView)
}

/**
 * 缩小工具类
 */
export declare class ZoomOutTool extends BaseTool {
  /**
   * 构造缩小工具对象
   * @param map 地图对象
   * @param view 视图对象
   */
  constructor (map: IMap, view: IView)
}

/**
 * 拉框放大工具类
 */
export declare class ZoomInRectTool extends BaseTool {
  /**
   * 构造拉框放大工具对象
   * @param map 地图对象
   * @param view 视图对象
   */
  constructor (map: IMap, view: IView)
}

/**
 * 拉框缩小工具类
 */
export declare class ZoomOutRectTool extends BaseTool {
  /**
   * 构造拉框缩小工具对象
   * @param map 地图对象
   * @param view 视图对象
   */
  constructor (map: IMap, view: IView)
}

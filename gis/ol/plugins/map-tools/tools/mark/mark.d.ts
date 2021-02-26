import { IMap, IView } from "../../../../web-map/web-map";
import { BaseTool } from "../../base-tool/base-tool";

export declare type EGeometryType = 'Point' | 'LineString' | 'Polygon' | 'Circle'

/**
 * 标记工具类
 */
export declare class MarkTool extends BaseTool {
  /**
   * 构造标记工具对象
   * @param map 地图对象
   * @param view 视图对象
   */
  constructor (map:IMap, view: IView)
  /**
   * 清理标记
   */
  clearMark () : this
  /**
   * 设置标记类型
   * @param type 标记类型
   */
  setMarkType (type: EGeometryType) : this
}
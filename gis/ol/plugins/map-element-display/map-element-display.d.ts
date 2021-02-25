import { WebMapPlugin } from "../../web-map/web-map";
import { Options as StrokeOptions } from 'ol/style/Stroke'
import { Options as FillOptions } from 'ol/style/Fill'
import Style from 'ol/style/Style'
import { Feature } from "ol";
import Geometry from "ol/geom/Geometry";

/**
 * 图元控制类
 */
export declare class MapElementDisplay extends WebMapPlugin {
  /**
   * 构造图元控制对象
   */
  constructor()
  /**
   * 图元样式
   */
  get style () : {
    graphicsStyle: {
      pointStyle: Style
      polylineStyle: Style
      polygonStyle: Style
    }
    highlightStyle: {
      pointStyle: Style
      polylineStyle: Style
      polygonStyle: Style
    }
  }
  /**
   * 添加基础图元
   * @param features 要素
   */
  add (features: Feature | Feature[]) : this
  /**
   * 移除指定基础图元
   * @param features 要素
   */
  remove (features: Feature | Feature[]) : this
  /**
   * 清空基础图元
   */
  clear () : this
  /**
   * 设置基础图元
   * @param features 要素
   */
  set (features: Feature | Feature[]) : this
  /**
   * 添加高亮图元
   * @param features 要素
   */
  addHighlight (features: Feature | Feature[]) : this
  /**
   * 移除指定高亮图元
   * @param features 要素
   */
  removeHighlight (features: Feature | Feature[]) : this
  /**
   * 清空高亮图元
   */
  clearHighlight () : this
  /**
   * 设置高亮图元
   * @param features 要素
   */
  setHighlight (features: Feature | Feature[]) : this
  /**
   * 清空所有图元
   */
  clearAll () : this
  /**
   * 解析基础图元
   * @param geometries 几何图形
   * @param styleOptions 样式配置项
   */
  parseGraphics (geometries: Geometry | Geometry[], styleOptions?: IPointStyleOptions | IPolylineStyleOptions | IPolygonStyleOptions) : Feature | Feature[]
  /**
   * 解析高亮图元
   * @param geometries 几何图形
   * @param styleOptions 样式配置项
   */
  parseHighlightGraphics (geometries: Geometry | Geometry[], styleOptions?: IPointStyleOptions | IPolylineStyleOptions | IPolygonStyleOptions) : Feature | Feature[]
}

export declare interface ICircleStyle {
  styleType: 'circle',
  fill: FillOptions,
  stroke: StrokeOptions
  radius: number
}

export declare interface IPointStyleOptions {
  image: ICircleStyle
}
export declare interface IPolylineStyleOptions {
  stroke: StrokeOptions
}
export declare interface IPolygonStyleOptions {
  stroke: StrokeOptions
  fill: FillOptions
}

export declare interface IGeometryStyleOptinos{
  pointStyle: IPointStyleOptions
  polylineStyle: IPolylineStyleOptions
  polygonStyle: IPolygonStyleOptions
}

export declare interface IStyleOptions {
  graphicsStyle: IGeometryStyleOptinos
  highlightStyle: IGeometryStyleOptinos
}

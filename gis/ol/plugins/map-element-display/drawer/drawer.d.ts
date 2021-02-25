import { Feature } from "ol";
import Geometry from "ol/geom/geometry";
import { IGeometryStyleOptinos, MapElementDisplay } from "../map-element-display";

/**
 * 绘制器类
 */
export declare class Drawer {
  /**
   * 构造绘制器对象
   * @param mapElementDisplay 图元控制对象
   */
  constructor (mapElementDisplay: MapElementDisplay)
  /**
   * 设置绘制图形样式
   * @param style 样式
   */
  setDrawedStyle (style?: IGeometryStyleOptinos) : this
  /**
   * 设置绘制过程图形样式
   * @param style 样式
   */
  setDrawingStyle (style?: IGeometryStyleOptinos) :this

  clear () : this
  remove (features: Feature | Feature[]) : this
  add (geometries: Geometry | Geometry[], styleOptions?: IGeometryStyleOptinos) : this
  add (geometries: Geometry, styleOptions?: IGeometryStyleOptinos, returnFeature: true) : Feature
  add (geometries: Geometry[], styleOptions?: IGeometryStyleOptinos, returnFeature: true) : Feature[]
  set (geometries: Geometry | Geometry[], styleOptions?: IGeometryStyleOptinos) : this
  set (geometries: Geometry, styleOptions?: IGeometryStyleOptinos, returnFeature: true) : Feature
  set (geometries: Geometry[], styleOptions?: IGeometryStyleOptinos, returnFeature: true) : Feature[]
  setTemp (geometries: Geometry | Geometry[], styleOptions?: IGeometryStyleOptinos) : this
  setTemp (geometries: Geometry, styleOptions?: IGeometryStyleOptinos, returnFeature: true) : Feature
  setTemp (geometries: Geometry[], styleOptions?: IGeometryStyleOptinos, returnFeature: true) : Feature[]
}
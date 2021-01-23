/*
 * 描    述：TypeScript声明文件：ArcGIS API for JavaScript 图元类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

export declare class MapElementDisplay {
  constructor (map: __esri.Map, view: __esri.MapView | __esri.SceneView)
  get map () : __esri.Map
  get view () : __esri.MapView | __esri.SceneView
  get graphicsLayer () : __esri.GraphicsLayer
  addGraphics (graphics: __esri.Graphic | __esri.Graphic[]) : this
  clearGraphics () : this
  removeGraphics (graphics: __esri.Graphic | __esri.Graphic[]) : this
  setGraphics (graphics: __esri.Graphic | __esri.Graphic[]) : this
  addTempGraphics (graphics: __esri.Graphic | __esri.Graphic[]) : this
  clearTempGraphics () : this
  removeTempGraphics (graphics: __esri.Graphic | __esri.Graphic[]) : this
  setTempGraphics (graphics: __esri.Graphic | __esri.Graphic[]) : this
  clear () : this
  parseGraphics (geometries: __esri.Geometry | __esri.Geometry[]) : __esri.Graphic | __esri.Graphic[]
}

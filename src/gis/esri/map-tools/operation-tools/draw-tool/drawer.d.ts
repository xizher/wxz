/*
 * 描    述：TypeScript声明文件：ArcGIS API for JavaScript Drawer类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { MapElementDisplay } from "../../../map-element-display/map-element-display";

export declare interface IDrawerStyle extends
  __esri.Symbol,
  __esri.SimpleMarkerSymbol,
  __esri.SimpleLineSymbol,
  __esri.SimpleFillSymbol {
}

export declare class Drawer {
  constructor (mapElementDisplay: MapElementDisplay)
  get mapElementDisplay () : MapElementDisplay
  get drawedStyle () : IDrawerStyle
  get drawingStyle () : IDrawerStyle
  get graphicsList () : __esri.Graphic[]
  setDrawedStyle (style: IDrawerStyle) : this
  setDrawingStyle (style: IDrawerStyle) : this
  add (geometries: __esri.Geometry | __esri.Geometry[]) :this
  add (geometries: __esri.Geometry | __esri.Geometry[], returnGraphics: true) : __esri.Graphic | __esri.Graphic[]
  clear () : this
  set (geometries: __esri.Geometry | __esri.Geometry[]) :this
  setTemp (geometries: __esri.Geometry | __esri.Geometry[]) :this
}
import { MapElementDisplay } from '../map-element-display'

export declare type EDrawerStyle =
 __esri.SymbolProperties | 
 __esri.SimpleMarkerSymbolProperties | 
 __esri.SimpleLineSymbolProperties | 
 __esri.SimpleFillSymbolProperties

export declare class Drawer {
  constructor (mapElementDisplay: MapElementDisplay)
  setDrawedStyle (style: EDrawerStyle) : this
  setDrawingStyle (style: EDrawerStyle) : this
  add (geometries: __esri.Geometry | __esri.Geometry[]) :this
  add (geometries: __esri.Geometry | __esri.Geometry[], returnGraphics: true) : __esri.Graphic | __esri.Graphic[]
  clear () : this
  remove (graphics: __esri.Graphic | __esri.Graphic[]) :this
  set (geometries: __esri.Geometry | __esri.Geometry[]) :this
  set (geometries: __esri.Geometry | __esri.Geometry[], returnGraphics: true) : __esri.Graphic | __esri.Graphic[]
  setTemp (geometries: __esri.Geometry | __esri.Geometry[]) :this
}

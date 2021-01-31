import { IWebMapPlugin } from "../web-map/web-map";

export * from './drawer/drawer'

export declare interface IDefaultSumbols {
  simpleMarker: __esri.SimpleMarkerSymbolProperties
  simpleLine: __esri.SimpleLineSymbolProperties
  simpleFull: __esri.SimpleFillSymbolProperties
}

export declare class MapElementDisplay implements IWebMapPlugin {
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

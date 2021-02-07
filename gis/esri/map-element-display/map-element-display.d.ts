import { IWebMapPlugin, WebMap } from "../web-map/web-map";

export * from './drawer/drawer'

export declare interface IDefaultSumbols {
  simpleMarker: __esri.SimpleMarkerSymbolProperties
  simpleLine: __esri.SimpleLineSymbolProperties
  simpleFull: __esri.SimpleFillSymbolProperties
  highlight: {
    simpleMarker: __esri.SimpleMarkerSymbolProperties
    simpleLine: __esri.SimpleLineSymbolProperties
    simpleFull: __esri.SimpleFillSymbolProperties
  }
}

export declare class MapElementDisplay implements IWebMapPlugin {
  PLUGIN_NAME: string
  REGISTER_PLUGIN (webMap: WebMap): void
  get graphicsLayer () : __esri.GraphicsLayer
  addGraphics (graphics: __esri.Graphic | __esri.Graphic[]) : this
  clearGraphics () : this
  removeGraphics (graphics: __esri.Graphic | __esri.Graphic[]) : this
  setGraphics (graphics: __esri.Graphic | __esri.Graphic[]) : this
  addHighlight (graphics: __esri.Graphic | __esri.Graphic[]) : this
  clearHighlight () : this
  removeHighlight (graphics: __esri.Graphic | __esri.Graphic[]) : this
  setHighlight (graphics: __esri.Graphic | __esri.Graphic[]) : this
  addTempGraphics (graphics: __esri.Graphic | __esri.Graphic[]) : this
  clearTempGraphics () : this
  removeTempGraphics (graphics: __esri.Graphic | __esri.Graphic[]) : this
  setTempGraphics (graphics: __esri.Graphic | __esri.Graphic[]) : this
  clear () : this
  parseGraphics (geometries: __esri.Geometry | __esri.Geometry[], symbol: __esri.Symbol) : __esri.Graphic | __esri.Graphic[]
  parseHighlightGraphics (geometries: __esri.Geometry | __esri.Geometry[]) : __esri.Graphic | __esri.Graphic[]
}

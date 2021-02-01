import { Drawer } from "../../../map-element-display/drawer/drawer";
import { $Map, $View } from "../../../web-map/web-map";
import { BaseTool } from '../../base-tool/base-tool'

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

export declare class DrawOperation {
  static clearDrawType () : void
  static point (drawTool: DrawTool) : void
  static line (drawTool: DrawTool) : void
  static 'line-faster' (drawTool: DrawTool) : void
  static polyline (drawTool: DrawTool) : void
  static polygon (drawTool: DrawTool) : void
  static rectangle (drawTool: DrawTool) : void
  static 'rectangle-faster' (drawTool: DrawTool) : void
  static circle (drawTool: DrawTool) : void
  static 'circle-faster' (drawTool: DrawTool) : void
}

export declare class DrawTool extends BaseTool<
  { string: 'tool-actived', data: {} } |
  { string: 'tool-deactived', data: {} } |
  { string: 'tool-clear', data: {} } |
  { string: 'draw-start', data: {} } |
  { string: 'draw-moving', data: { geometry: __esri.Geometry } } |
  { string: 'draw-end', data: { geometry: __esri.Geometry } }
> {
  constructor (map: $Map, view: $View, drawType: EDrawType)
  get cursorType () : string
  get drawer () : Drawer
  setDrawType (type: EDrawType) : this
  clearDrawed () : this
}
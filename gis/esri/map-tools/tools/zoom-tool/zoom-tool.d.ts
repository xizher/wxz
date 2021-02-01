import { $Map, $View } from '../../../web-map/web-map';
import { BaseTool } from '../../base-tool/base-tool'
import { DrawTool } from '../draw-tool/draw-tool';

export declare class ZoomInTool extends BaseTool<any> {
  constructor (map: $Map, view: $View)
}

export declare class ZoomOutTool extends BaseTool<any> {
  constructor (map: $Map, view: $View)
}

export declare class ZoomHomeTool extends BaseTool<any> {
  constructor (map: $Map, view: $View)
  setHomeExtent (extent: __esri.Geometry) : void
}

export declare class ZoomInRectTool extends DrawTool {
  get cursorType () : string
  constructor (map: $Map, view: $View)
}

export declare class ZoomOutRectTool extends DrawTool {
  get cursorType () : string
  constructor (map: $Map, view: $View)
}

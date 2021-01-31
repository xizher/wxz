import { $Map, $View } from '../../../web-map/web-map';
import { BaseTool } from '../../base-tool/base-tool'
import { DrawTool } from '../draw-tool/draw-tool';

export declare class ZoomInTool extends BaseTool {
  constructor (map: $Map, view: $View)
}

export declare class ZoomOutTool extends BaseTool {
  constructor (map: $Map, view: $View)
}

export declare class ZoomHomeTool extends BaseTool {
  constructor (map: $Map, view: $View)
  setHomeExtent (extent: __esri.Geometry) : void
}

export declare class ZoomInRectTool extends DrawTool {
  get cursorType () : 'zoomin'
  constructor (map: $Map, view: $View)
}

export declare class ZoomOutRectTool extends DrawTool {
  get cursorType () : 'zoomout'
  constructor (map: $Map, view: $View)
}

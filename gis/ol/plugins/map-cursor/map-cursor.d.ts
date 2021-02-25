import { WebMapPlugin } from "../../web-map/web-map";

export declare type EMapCursorType = 'default' |
  'pan' |
  'panning' |
  'wait' |
  'draw' |
  'zoomin' |
  'zoomout'

export declare class MapCursor extends WebMapPlugin {
  setMapCursor (type: EMapCursorType) : this
}
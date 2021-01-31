import { IWebMapPlugin } from "../web-map/web-map";

export declare type EMapCursorType = 'default' | 'pan' | 'panning' | 'wait' | 'draw'

export declare class MapCursor implements IWebMapPlugin {
  get cursorType () : EMapCursorType
  setCursor (type: EMapCursorType) : this
}
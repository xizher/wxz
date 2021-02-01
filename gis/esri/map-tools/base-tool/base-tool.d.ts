import { IListenerCallback, IListenerListenType, Listener } from "../../../../listener";
import { $Map, $View, IWebMapPlugin } from "../../web-map/web-map";

export declare class BaseTool<T extends IListenerListenType> extends Listener<T> {
  constructor (map: $Map, view: $View, once?: boolean)
  get map () : $Map
  get view () : $View
  get actived () : boolean
  get isOnce () : boolean
  active () : this
  deactive () : this
  onToolActived (event: IListenerCallback<'tool-actived'>) : boolean
  onToolDeActiced (event: IListenerCallback<'tool-deactived'>) : boolean
  onToolClear (event: IListenerCallback<'tool-clear'>) : boolean
  onDrawStart (event: IListenerCallback<'draw-start'>) : boolean
  onDrawMoving (event: IListenerCallback<'draw-moving'>) : boolean
  onDrawEnd (event: IListenerCallback<'draw-end'>) : boolean
}

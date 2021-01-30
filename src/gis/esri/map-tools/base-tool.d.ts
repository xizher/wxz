/*
 * 描    述：TypeScript声明文件：ArcGIS API for JavaScript 基础工具类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { IListenerBaseObject, IListenerCallback, Listener } from '../../../listener/listener';
import { $Map, $View } from '../webmap/webmap';

export declare class BaseTool<T extends IListenerBaseObject> extends Listener<T> {
  constructor (map: $Map, view: $View, once?: boolean)
  get map () : $Map
  get view () : $View
  get actived () : boolean
  get once () : boolean
  active () : this
  deactive () : this
  onToolActived (event: IListenerCallback<'tool-actived'>) : boolean
  onToolDeActiced (event: IListenerCallback<'tool-deactived'>) : boolean
  onToolClear (event: IListenerCallback<'tool-clear'>) : boolean
  onDrawStart (event: IListenerCallback<'draw-start'>) : boolean
  onDrawMoving (event: IListenerCallback<'draw-moving'>) : boolean
  onDrawEnd (event: IListenerCallback<'draw-end'>) : boolean
}

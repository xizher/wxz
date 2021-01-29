/*
 * 描    述：TypeScript声明文件：ArcGIS API for JavaScript DrawTool类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { $Map, $View } from '../../../webmap/webmap';
import { BaseTool } from '../../base-tool';
import { DrawOperations } from './draw-operations';
import { Drawer } from './drawer'

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

export declare class DrawTool extends BaseTool<
  { string: 'tool-actived', data: {} } |
  { string: 'tool-deactived', data: {} } |
  { string: 'tool-clear', data: {} } |
  { string: 'draw-start', data: {} } |
  { string: 'draw-moving', data: { geometry: __esri.Geometry } } |
  { string: 'draw-end', data: { geometry: __esri.Geometry } }
> {
  constructor (map: $Map, view: $View, drawType: EDrawType)
  get drawer () : Drawer
  get drawOperation () : DrawOperations
  get drawType () : EDrawType
  set drawType (type: EDrawType)
}

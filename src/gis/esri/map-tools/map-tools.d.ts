/*
 * 描    述：TypeScript声明文件：ArcGIS API for JavaScript MapTools类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { $Map, $View } from '../webmap/webmap';
import { BaseTool } from './base-tool';

export declare interface IToolOperations {
  [drawType: string]: BaseTool
}

export declare class MapTools {
  constructor (map: $Map, view: $View)
  get map () : $Map
  get view () : $View
  get toolOperations () : IToolOperations
  get preMapToolKey () : string
  get activedMapToolKey () : string
  setMapTool (mapTool: string) : string
  createCustomTool (toolName: string, toolObject: BaseTool) : void
  hasTool (toolName: string) : true | false
}
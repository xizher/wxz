/*
 * 描    述：TypeScript声明文件：ArcGIS API for JavaScript DrawOperations类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { DrawTool, EDrawType } from "./draw-tool";

export declare class DrawOperations {
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
  constructor (drawTool: DrawTool)
  get drawTool () : DrawTool
  setDrawType (drawType: EDrawType) : void
}
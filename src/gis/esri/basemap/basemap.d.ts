/*
 * 描    述：TypeScript声明文件：ArcGIS API for JavaScript 底图控制类
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { Listener } from '../../../listener/listener';

export declare interface IBasemapItems {
  [n: number]: {
    layer: __esri.Layer
    name: string
    type: string
    alias: string
  }
}

export declare interface IBasemapOptions {
  visible: boolean
  selectedKey: number
  layers: Array<{
    key: number
    alias: string
    name: string
    type: string
    options: any
  }>
}

export declare class Basemap extends Listener<{
  string: 'selection-changed', data: { oldKey: number, key: number }
}> {
  constructor (map: __esri.Map, options: IBasemapOptions)
  get map () : __esri.Map
  get basemapItems () : IBasemapItems
  get options (): IBasemapOptions
  get selectedKey () : number
  set selectedKey (key: number)
  setVisible (visible: true | boolean) : this
}

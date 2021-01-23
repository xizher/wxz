/*
 * 描    述：ArcGIS API for JavaScript 模块初始化
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { loadModules } from 'esri-loader'

export const esri = {}

export class EsriModules {

  static modules = [
    'esri/config',
    'esri/Map',
    'esri/views/MapView',
    'esri/views/SceneView',
    'esri/layers/WebTileLayer',
    'esri/layers/ImageryLayer',
    'esri/layers/GroupLayer',
    'esri/layers/GraphicsLayer',
    'esri/layers/FeatureLayer',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/SimpleFillSymbol',
    'esri/geometry/Point',
    'esri/geometry/Polyline',
    'esri/geometry/Polygon',
    'esri/geometry/Circle',
    'esri/geometry/Extent',
    'esri/widgets/Swipe',
    'esri/core/watchUtils',
  ]

  /**
   * 加载esri模块集
   * @param { import('esri-loader').ILoadScriptOptions } loadOptions 加载配置项
   * @returns { Promise<any> }
   */
  static load (loadOptions) {
    return new Promise((resolve, reject) => {
      loadModules(this.modules, loadOptions)
        .then(classes => {
          initEsriClasses(classes)
          resolve(esri)
        })
        .catch(err => reject(err))
    })

    /**
     * 初始化esri模块集
     * @param { object[] } classes esri模块集
     */
    function initEsriClasses (classes) {
      EsriModules.modules.forEach(
        (item, index) => regNamespace(item, classes[index])
      )
    }

    /**
     * esri模块命名控件注册
     * @param { string } moduleStr esri模块路由字符串
     * @param { object } classObj esri模块类
     */
    function regNamespace (moduleStr, classObj) {
      const arr = moduleStr.split('/')
      let namespace = esri
      for (let i = 1; i < arr.length; i++) {
        if (typeof namespace[arr[i]] === 'undefined') {
          i === arr.length - 1
            ? namespace[arr[i]] = classObj
            : namespace[arr[i]] = {}
        }
        namespace = namespace[arr[i]]
      }
    }
  }

}

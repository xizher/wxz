/*
 * 描    述：TypeScript声明文件： ArcGIS API for JavaScript 模块初始化
 * 作    者：ngheizit on 2021年1月23日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

import { ILoadScriptOptions } from 'esri-loader'
import config from 'esri/config'
import ArcGISMap from 'esri/Map'
import MapView from 'esri/views/MapView'
import SceneView from 'esri/views/SceneView'
import WebTileLayer from 'esri/layers/WebTileLayer'
import ImageryLayer from 'esri/layers/ImageryLayer'
import GroupLayer from 'esri/layers/GroupLayer'
import GraphicsLayer from 'esri/layers/GraphicsLayer'
import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol'
import SimpleLineSymbol from 'esri/symbols/SimpleLineSymbol'
import SimpleFillSymbol from 'esri/symbols/SimpleFillSymbol'
import Point from 'esri/geometry/Point'
import Polyline from 'esri/geometry/Polyline'
import Polygon from 'esri/geometry/Polygon'
import Circle from 'esri/geometry/Circle'
import Extent from 'esri/geometry/Extent'
import FeatureLayer from 'esri/layers/FeatureLayer'
import Swipe from 'esri/widgets/Swipe'
import watchUtils from 'esri/core/watchUtils'

/**
 * esri模块命名空间
 */
export declare const esri = {
  config,
  Map: ArcGISMap,
  views: {
    MapView,
    SceneView,
  },
  layers: {
    WebTileLayer,
    ImageryLayer,
    GroupLayer,
    GraphicsLayer,
    FeatureLayer,
  },
  symbols: {
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
  },
  geometry: {
    Point,
    Polyline,
    Polygon,
    Circle,
    Extent,
  },
  widgets: {
    Swipe,
  },
  core: {
    watchUtils
  }
}

/**
 * esri模块加载工具类
 */
export declare class EsriModules {
  /**
   * 加载esri模块集
   * @param loadOptions 加载配置项
   */
  static load (loadOptions: ILoadScriptOptions) : Promise<typeof esri>
}
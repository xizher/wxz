interface IGeoLocationResult {
  lat: number
  lon: number
  detial: GeolocationPosition
}

interface IGeoLocationError {
  code: number
  message: number
}

/**
 * 基础工具类
 */
export declare class BaseUtils {

  /**
   * 对象深拷贝（利用JSON的特性）
   * @param json JSON对象
   * @returns 新JSON对象
   */
  static deepCopyJSON (json: any | any[]) : any | any[]
  
  /**
   * 对象深拷贝（递归式）
   * @param obj JavaScript对象
   * @returns JavaScript对象
   */
  static deepCopy (obj: any | any[]) : any | any[]

  /**
   * 获取GUID字符串
   * @returns GUID字符串
   */
  static guid () : string

  /**
   * 获取当前页面的根地址
   * @returns 根地址字符串
   */
  static getRootPath () : string

  /**
   * 获取指定范围随机整数
   * @param minValue 最小值
   * @param maxValue 最大值
   * @returns 指定范围的随机整数
   */
  static randomRange (minValue: number, maxValue: number) : number

  /**
   * 获取当前定位
   * @param options 配置
   */
  static getGeoLocation (options: PositionOptions) : Promise<IGeoLocationResult>

  /**
   * 启动定位监听
   * @param success 定位变化回调事件
   * @param error 定位失败回调事件
   * @param options 定位配置
   * @returns 关闭定位监听的对象
   */
  static watchGeoLocation (
    success: (event: IGeoLocationResult) => void,
    error: (event: IGeoLocationError) => void,
    options: PositionOptions
  ) : { remove: () => void }

  /**
   * 判断网页是否通过移动端设备打开
   * @returns 是否通过移动端设备打开
   */
  static isFromMobileBrowser () : boolean

  /**
   * 对象扩展 （like $.extent in JQuery） （ $.extent(true, objSource, objTarget) ）
   * @param deep 是否深扩展
   * @param objSorce 源对象
   * @param objTarget 目标对象
   */
  static deepExtent (deep: boolean, objSource: any, objTarget: any) : any

  /**
   * 复制文本
   * @param txt 文本
   */
  static copyText (txt: string) : Promise<string>

}

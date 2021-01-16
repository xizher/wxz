/*
 * 描    述：基础工具类
 * 作    者：ngheizit on 2021-1-15
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

/**
 * 基础工具类
 */
export class BaseUtils {

  /**
   * 对象深拷贝（利用JSON的特性）
   * @param { Object | Array<any> } json JSON对象
   * @returns { Object | Array<any> } 新JSON对象
   */
  static deepCopyJSON (json) {
    return JSON.parse(
      JSON.stringify(json)
    )
  }

  /**
   * 对象深拷贝（递归式）
   * @param { Object | Array<any> } obj Javascript对象
   * @returns { Object | Array<any> } 深拷贝后的对象引用
   */
  static deepCopy (obj) {
    const newObj = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = typeof obj[key] === 'object'
          ? BaseUtils.deepCopy(obj[key])
          : obj[key]
      }
    }
    return newObj
  }

  /**
   * 获取GUID字符串
   * @returns { string } GUID字符串
   */
  static guid () {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  }

  /**
   * 获取当前页面的根地址
   * @returns { string } 根地址字符串
   */
  static getRootPath () {
    const curPageUrl = window.document.location.href
    const temp = curPageUrl.split('//')
    // let rootPath = temp[0] + '//' + temp[1].split('/')[0] + '/' + temp[1].split('/')[1]
    const rootPath = `${temp[0]}//${temp[1].split('/')[0]}/${temp[1].split('/')[1]}`
    return rootPath
  }

  /**
   * 获取指定范围随机整数
   * @param { number } minValue 最小值
   * @param { number } maxValue 最大值
   * @returns { number } 指定范围的随机整数
   */
  static randomRange (minValue, maxValue) {
    return minValue + Math.round(Math.random() * (maxValue - minValue))
  }

  /**
   * 获取当前定位
   * @param { PositionOptions } options 配置
   * @returns { Promise<import('./base-utils').IGeoLocationResult> }
   */
  static getGeoLocation ({
    enableHighAccuracy = true,
    timeout = 5000,
    maximumAge = 0
  } = {}) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy,
        timeout,
        maximumAge,
      })
      function success (position) {
        const { longitude, latitude } = position.coords
        resolve({
          lon: longitude,
          lat: latitude,
          detial: position
        })
      }
      function error (err) {
        reject(err)
      }
    })
  }

  /**
   * 启动定位监听
   * @param { (event: import('./base-utils').IGeoLocationResult) => void } success 定位变化回调事件
   * @param { (event: import('./base-utils').IGeoLocationError) => void } error 定位失败回调事件
   * @param { PositionOptions } options 定位配置
   * @returns { { remove: () => void } } 关闭定位监听的对象
   */
  static watchGeoLocation (success, error, options) {
    const watchId = navigator.geolocation.watchPosition(position => {
      if (typeof success === 'function') {
        success({
          lon: position.coords.longitude,
          lat: position.coords.latitude,
          detail: position
        })
      }
    }, err => {
      if (typeof error === 'function') {
        error(err)
      }
    }, Object.assign({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }, options))
    return {
      remove () {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }

  /**
   * 判断网页是否通过移动端设备打开
   * @returns { boolean } 是否通过移动端设备打开
   */
  static isFromMobileBrowser () {
    return !!navigator
      .userAgent
      .match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  }

  /**
   * 对象扩展（like $.extent in JQuery）
   */
  static deepExtent () {
    let options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
      deep = target
      target = arguments[1] || {}
      // skip the boolean and the target
      i = 2
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== 'object' && typeof target !== 'function') {
      target = {}
    }

    // extend jQuery itself if only one argument is passed
    if (length === i) {
      target = this
      --i
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) !== null) {
        // Extend the base object
        for (name in options) {
          src = target[name]
          copy = options[name]
          // Prevent never-ending loop
          if (target === copy) {
            continue
          }
          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false
              clone = src && Array.isArray(src) ? src : []
            } else {
              clone = src && isPlainObject(src) ? src : {}
            }
            // Never move original objects, clone them
            target[name] = BaseUtils.deepExtent( deep, clone, copy )
            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }
    // Return the modified object
    return target

    function isPlainObject (obj) {
      let class2type = {}
      let getProto = Object.getPrototypeOf
      let toString = class2type.toString
      let hasOwn = class2type.hasOwnProperty
      let fnToString = hasOwn.toString
      let ObjectFunctionString = fnToString.call(Object)
      let proto, Ctor
      if (!obj || toString.call(obj) !== '[object Object]') {
        return false
      }
      proto = getProto(obj)
      if (!proto) {
        return true
      }
      Ctor = hasOwn.call(proto, 'constructor') && proto.constructor
      return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString
    }
  }

  /**
   * 复制文本
   * @param { string } text 文本
   * @returns { Promise<string> } 复制文本
   */
  static async copyText (text) {
    await navigator.clipboard.writeText(text)
    return text
  }

}

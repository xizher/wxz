interface ICookieOptions {
  days: number
  hours: number
  minutes: number
}

/**
 * Cookie操作工具类
 * （ get、set、del ）
 */
export declare class CookieUtils {

  /**
   * 设置Cookie
   * @param key 键
   * @param value 值
   * @param options 配置
   */
  static setCookie (key: string, value: string, options: ICookieOptions) : void

  /**
   * 删除Cookie
   * @param key 键
   */
  static delCookie (key: string) : void

  /**
   * 获取cookie
   * @param key 键
   * @returns 值
   */
  static getCookie (key: string | null) : void
}
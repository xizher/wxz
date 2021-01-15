/**
 * Cookie操作工具类
 * （ get、set、del ）
 */
export class CookieUtils {

  /**
   * 一天的毫秒数
   */
  static M_SECONDS_A_DAY = 86400000

  /**
   * 一小时的毫秒数
   */
  static M_SECONDS_A_HOUR = 3600000

  /**
   * 一分钟的毫秒数
   */
  static M_SECONDS_A_MINUTE = 60000

  /**
   * 设置Cookie
   * @param { string } key 键
   * @param { string } value 值
   * @param { * } options 配置
   * @param { number } options.days 距过期天数
   * @param { number } options.hours 距过期时数
   * @param { number } options.minutes 距过期分数
   */
  static setCookie (key, value, { days = 0, hours = 0, minutes = 30 } = {}) {
    const {
      M_SECONDS_A_DAY,
      M_SECONDS_A_HOUR,
      M_SECONDS_A_MINUTE
    } = CookieUtils
    const exp = new Date()
    exp.setTime(exp.getTime() + (days * M_SECONDS_A_DAY) + hours * M_SECONDS_A_HOUR + minutes * M_SECONDS_A_MINUTE)
    const cookie = `${key}=${escape(value)};expires=${exp.toGMTString()}`
    document.cookie = cookie
  }

  /**
   * 删除Cookie
   * @param { string } key 键
   */
  static delCookie (key) {
    const exp = new Date()
    document.cookie = `${key}=;expires=${exp.toGMTString()}`
  }

  /**
   * 获取cookie
   * @param { string } key 键
   * @returns { string | null } 值
   */
  static getCookie (key) {
    const cookie = document.cookie.match(new RegExp(`(^| )${key}=([^;]*)(;|$)`))
    if (cookie) {
      return unescape(cookie[2])
    } else {
      return null
    }
  }

}

/**
 * 字符串加密解密工具类
 */
export declare class CryptoUtils {

  /**
   * 设置key值
   * @param key key值
   * @returns 字符串加密解密工具类
   */
  static setKey (key: string) : typeof CryptoUtils

  /**
   * 设置iv值
   * @param iv iv值
   * @returns 字符串加密解密工具类
   */
  static setIv (iv: string) : typeof CryptoUtils

  /**
   * 加密
   * @param str 字符串
   * @returns 加密字符串
   */
  static enCrypto (str: string) : string

  /**
   * 解密
   * @param str 字符串
   * @returns 解密字符串
   */
  static deCrypto (str: string) : string

}
import CryptoJS from '../../../libs/crypto-js/crypto-js.min.js'

/**
 * 字符串加密解密工具类
 */
export class CryptoUtils {

  /**
   * key值
   */
  static STRING_CRYPTO_KEY = ''

  /**
   * iv值
   */
  static STRING_CRYPTO_IV = ''

  /**
   * 设置key值
   * @param { string } key key值
   * @returns { typeof CryptoUtils } 字符串加密解密工具类
   */
  static setKey (key) {
    CryptoUtils.STRING_CRYPTO_KEY = key
    return CryptoUtils
  }

  /**
   * 设置iv值
   * @param { string } iv iv值
   * @returns { typeof CryptoUtils } 字符串加密解密工具类
   */
  static setIv (iv) {
    CryptoUtils.STRING_CRYPTO_IV = iv
    return CryptoUtils
  }

  /**
   * 加密
   * @param { string } str 字符串
   * @returns { string } 加密字符串
   */
  static enCrypto (str) {
    const { STRING_CRYPTO_KEY, STRING_CRYPTO_IV } = CryptoUtils
    const key = CryptoJS.enc.Utf8.parse(STRING_CRYPTO_KEY)
    const iv = CryptoJS.enc.Utf8.parse(STRING_CRYPTO_IV)
    let encrypted = ''
    const newVal = CryptoJS.enc.Utf8.parse(str)
    encrypted = CryptoJS.AES.encrypt(newVal, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })
    return encrypted.ciphertext.toString()
  }

  /**
   * 解密
   * @param { string } str 字符串
   * @returns { string } 解密字符串
   */
  static deCrypto (str) {
    const { STRING_CRYPTO_KEY, STRING_CRYPTO_IV } = CryptoUtils
    const key = CryptoJS.enc.Utf8.parse(STRING_CRYPTO_KEY)
    const iv = CryptoJS.enc.Utf8.parse(STRING_CRYPTO_IV)
    const encryptedHexStr = CryptoJS.enc.Hex.parse(str)
    const newVal = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    const decrypt = CryptoJS.AES.decrypt(newVal, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  }

}

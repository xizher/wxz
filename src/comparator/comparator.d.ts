/*
 * 描    述：TypeScript 声明文件 -> JavaScript 自定义类 比较器
 * 作    者：ngheizit on 2021-1-16
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

 /**
  * 比较器
  * @example
      const obj1 = { a: 1 }
      const obj2 = { a: 2 }
      const comparator = new Comparator((i, j) => i.a - j.a)
      comparator.lessThan(obj1, obj2) // output: true
      comparator.equal(obj1, obj2) // output: false
  */
export class Comparator<T> {
  constructor (comparator?: (a: T, b: T) => number)
  /**
   * 两者是否等于
   * @param { * } a 比较值
   * @param { * } b 比较值
   */
  equal (a: T, b: T) : true | false
  /**
   * 前者是否小于后者
   * @param { * } a 比较值
   * @param { * } b 比较值
   */
  lessThan (a: T, b: T) : true | false
  /**
   * 前者是否大于后者
   * @param { * } a 比较值
   * @param { * } b 比较值
   */
  greaterThan (a: T, b: T) : true | false
  /**
   * 前者是否小于等于后者
   * @param { * } a 比较值
   * @param { * } b 比较值
   */
  lessThanOrEqual (a: T, b: T) : true | false
  /**
   * 前者是否大于等于后者
   * @param { * } a 比较值
   * @param { * } b 比较值
   */
  greaterThanOrEqual (a: T, b: T) : true | false
  /**
   * 反转比较
   */
  reverse () : this
}
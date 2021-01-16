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
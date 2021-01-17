/*
 * 描    述：JavaScript 自定义类 比较器
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
export const Comparator = (function () {

  //#region 私有属性

  const _compare = new WeakMap()

  //#endregion

  class __Comparator__ {

    //#region 静态属性

    static defaultCompareFunction = (a, b) => {
      if (a === b) {
        return 0
      }
      return a < b ? -1 : 1
    }

    //#endregion

    //#region 构造函数

    constructor (compareFunction) {
      _compare.set(this, compareFunction || __Comparator__.defaultCompareFunction)
    }

    //#endregion

    //#region 公有方法

    /**
     * 两者是否等于
     * @param { * } a 比较值
     * @param { * } b 比较值
     */
    equal (a, b) {
      return _compare.get(this)(a, b) === 0
    }

    /**
     * 前者是否小于后者
     * @param { * } a 比较值
     * @param { * } b 比较值
     */
    lessThan (a, b) {
      return _compare.get(this)(a, b) < 0
    }

    /**
     * 前者是否大于后者
     * @param { * } a 比较值
     * @param { * } b 比较值
     */
    greaterThan (a, b) {
      return _compare.get(this)(a, b) > 0
    }

    /**
     * 前者是否小于等于后者
     * @param { * } a 比较值
     * @param { * } b 比较值
     */
    lessThanOrEqual (a, b) {
      return _compare.get(this)(a, b) <= 0
    }

    /**
     * 前者是否大于等于后者
     * @param { * } a 比较值
     * @param { * } b 比较值
     */
    greaterThanOrEqual (a, b) {
      return _compare.get(this)(a, b) >= 0
    }

    /**
     * 反转比较
     */
    reverse () {
      const compareOriginal = _compare.get(this)
      _compare.set(this, (a, b) => compareOriginal(b, a))
      return this
    }

    //#endregion

  }

  return __Comparator__

}())

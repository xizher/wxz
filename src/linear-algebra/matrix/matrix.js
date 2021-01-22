
/**
 * 矩阵类
 */
export const Matrix = (function () {

  //#region 私有属性

  /**
   * 二维数字数组，存储矩阵集合
   * @type { WeakMap<object, number[][]> }
   */
  const _array = new WeakMap()

  /**
   * 矩阵的行数
   * @type { WeakMap<object, number> }
   */
  const _rowCount = new WeakMap()

  /**
   * 矩阵的列数
   * @type { WeakMap<object, number> }
   */
  const _colCount = new WeakMap()

  //#endregion

  //#region 类体

  class __Matrix__ {

    //#region 静态方法

    /**
     * 将一维数字数组根据行列数解析为二维数字数组
     * @param { number[] } arr 一维数字数组
     * @param { number } rowCount 矩阵行数
     * @param { number } colCount 矩阵列数
     * @param { number } noData 空值默认值，默认值为 0
     * @returns { number[][] } 二维数字数组
     */
    static parse1DArrayTo2D (arr, rowCount, colCount, noData = 0) {
      const resultArr = Array.from(
        { length: rowCount },
        () => Array.from({ length: colCount }, () => noData)
      )
      for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
          resultArr[row][col] = arr[row * colCount + col] ?? noData // 超出 arr 索引 统一赋值 0
        }
      }
      return resultArr
    }

    //#endregion

    //#region getter

    /**
     * 矩阵行数
     */
    get rouCount () {
      return _rowCount.get(this)
    }

    /**
     * 矩阵列数
     */
    get colCount () {
      return _colCount.get(this)
    }

    //#endregion

    //#region 构造函数

    /**
     * 根据一维数字数组和行列数创建矩阵对象
     * @param { number[] } arr 一维数字数组
     * @param { number } rowCount 行数
     * @param { number } colCount 列数
     * @param { number } noData 空值默认值，默认值为 0
     */
    constructor (arr, rowCount, colCount, noData = 0) {
      _rowCount.set(this, rowCount)
      _colCount.set(this, colCount)
      const array = __Matrix__.parse1DArrayTo2D(arr, rowCount, colCount, noData)
      _array.set(this, array)
    }

    //#endregion

    //#region 公有方法

    /**
     * 根据行列号获取矩阵集合
     * @param { [number, number] } arr 索引数组
     * @returns { number | number[] | number[][] } 矩阵集合
     */
    getValue ([row = null, col = null] = []) {
      if (
        row < 0 || row > this.rouCount - 1 ||
        col < 0 || col > this.colCount - 1
      ) {
        throw new Error('param row or col is out of index')
      }
      function checkNumber (num) {
        if (isNaN(num) || Array.isArray(num)) {
          throw new Error('param row or col is nor a number')
        }
      }
      const notRow = (row === null)
      const notCol = (col === null)
      if (notRow && notCol) {
        return this.toArray()
      }
      const array = _array.get(this)
      if (notRow && !notCol) {
        checkNumber(col)
        return array.map(item => item[col])
      }
      if (!notRow && notCol) {
        checkNumber(row)
        return array[row]
      }
      checkNumber(row)
      checkNumber(col)
      return array[row][col]
    }

    /**
     * 矩阵转二维数字数组
     * @returns { number[][] } 二维数字数组
     */
    toArray () {
      return _array.get(this)
    }

    //#endregion

  }

  //#endregion

  return __Matrix__

}())


/**
 * 矩阵类
 */
export class Matrix {

  //#region 私有属性

  /**
   * 二维数字数组，存储矩阵集合
   * @type { number[][] }
   */
  #array

  /**
   * 矩阵的行数
   * @type { number }
   */
  #rowCount

  /**
   * 矩阵的列数
   * @type { number }
   */
  #colCount

  //#endregion

  //#region getter

  get rowCount () {
    return this.#rowCount
  }

  get colCount () {
    return this.#colCount
  }

  //#endregion

  //#region 公有静态方法

  /**
   * 将一维数字数组根据行列数解析为二维数字数组
   * @param { number[] } arr 一维数字数组
   * @param { number } rowCount 行数
   * @param { number } colCount 列数
   * @param { number } noData 空值默认值，默认值为 0
     * @returns { number[][] } 二维数字数组
   */
  static parse1DArryTo2D (arr, rowCount, colCount, noData = 0) {
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

  //#region 构造函数

  /**
   * 根据一维数字数组和行列数创建矩阵对象
   * @param { number[] } arr 一维数字数组
   * @param { number } rowCount 行数
   * @param { number } colCount 列数
   * @param { number } noData 空值默认值，默认值为 0
   */
  constructor (arr, rowCount, colCount, noData = 0) {
    this.#rowCount = rowCount
    this.#colCount = colCount
    this.#array = Matrix.parse1DArryTo2D(arr, rowCount, colCount, noData)
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
    const array = this.#array
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
    return this.#array
  }

  //#endregion

}

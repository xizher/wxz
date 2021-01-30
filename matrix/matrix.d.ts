export declare class Matrix {
  /**
   * 将一维数字数组根据行列数解析为二维数字数组
   * @param arr 一维数字数组
   * @param rowCount 行数
   * @param colCount 列数
   * @param noData 空值默认值，默认值为 0
   */
  static parse1DArryTo2D (
    arr: number[],
    rowCount: number,
    colCount: number,
    noData: number = 0
  ) : number[][]
  /**
   * 根据一维数字数组和行列数创建矩阵对象
   * @param arr 一维数字数组
   * @param rowCount 行数
   * @param colCount 列数
   * @param noData 空值默认值，默认值为 0
   */
  constructor (
    arr: number[],
    rowCount: number,
    colCount: number,
    noData: number = 0
  )
  /** 矩阵的行数 */
  get rowCount () : number
  /** 矩阵的列数 */
  get colCount () : number
  /**
   * 根据行列号获取矩阵集合
   * @param arr [行号，列号]，忽略行号则返回某列集合，忽略列号则返回某行集合
   * @returns 子集
   */
  getValue (arr: [number, number] = [])
    : number | number[] | number[][]
  /**
   * 矩阵转二维数字数组
   * @returns 二维数字数组
   */
  toArray () : number[][]
}
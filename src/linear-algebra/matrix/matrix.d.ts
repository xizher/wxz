
/**
 * 矩阵类
 */
export declare class Matrix {

  /**
   * 将一维数字数组根据行列数解析为二维数字数组
   * @param arr 一维数字数组
   * @param rowCount 矩阵行数
   * @param colCount 矩阵列数
   * @param noData 空值默认值，默认值为 0
   * @returns 二维数字数组
   */
  static parse1DArrayTo2D (arr: number[], rowCount: number, colCount: number, noData?: number) : number[][]

  /**
   * 根据一维数字数组和行列数创建矩阵对象
   * @param arr 一维数字数组
   * @param rowCount 行数
   * @param colCount 列数
   * @param noData 空值默认值，默认值为 0
   */
  constructor (arr: number[], rowCount: number, colCount: number, noData?: number)

  /**
   * 矩阵行数
   */
  get rowCount () : number
  
  /**
   * 矩阵列数
   */
  get colCount () : number

  /**
   * 根据行列号获取矩阵集合
   * @param indexs 索引数组
   * @returns 矩阵集合
   */
  getValue (indexs?: [number, number]) : number | number[]

  /**
   * 获取所有矩阵集合
   * @returns 矩阵集合
   */
  getValue () : number[][]

  /**
   * 矩阵转二维数字数组
   * @returns 二维数字数组
   */
  toArray () : number[][]

}
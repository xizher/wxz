import { Matrix } from '../../../../matrix'

export class PixelMatrix extends Matrix {

  //#region 私有属性

  /**
   * 范围对象
   * @type { __esri.Extent }
   */
  #extent = null

  //#endregion

  //#region 构造函数

  /**
   * 创建像元矩阵
   * @param { __esri.PixelData } pixelData pixelData对象
   */
  constructor (pixelData) {
    const { extent, pixelBlock } = pixelData
    const { pixels, width, height } = pixelBlock
    super(pixels, height, width)

    this.#extent = extent
  }

  //#endregion

  //#region 私有方法

  /**
   * 点对象 转 矩阵像元坐标
   * @param {  __esri.Point} point 点对象
   * @returns { [number, number] } 行列号
   */
  #getRowColFromGeoPoint (point) {
    const { xmin, ymin, xmax, ymax } = this.#extent
    const [dx, dy] = [xmax - xmin, ymax - ymin]
    const col = Math.round((point.x - xmin) * (this.colCount - 0) / (dx) + 0)
    const row = Math.round(((ymax - (point.y - ymin) - ymin) * (this.rowCount - 0)) / (dy) + 0)
    return [row, col]
  }

  //#endregion

  //#region 公有方法

  /**
   * 通过点对象获取像元值
   * @param {  __esri.Point} point 点对象
   */
  getValueByGeoPoint (point) {
    const [row, col] = this.#getRowColFromGeoPoint(point)
    return this.getValue([row, col])
  }

  /**
   * 通过线段对象获取像元值集合
   * @param { __esri.Point } startPoint 线段起始点
   * @param { __esri.Point } endPoint 线段终止点
   */
  getValueByGeoLine (startPoint, endPoint) {
    const startXY = this.#getRowColFromGeoPoint(startPoint)
    const endXY = this.#getRowColFromGeoPoint(endPoint)
    return this.DDA(startXY, endXY)
  }

  /**
   * 通过面对象获取像元值集合
   * @param { __esri.Polygon } polygon 面对象
   */
  getValueByGeoPolygon (polygon) {
    const resultArr = []
    for (let i = 0; i < polygon.rings.length; i++) {
      const pts = []
      for (let j = 0; j < polygon.rings[i].length; j++) {
        const point = polygon.getPoint(i, j)
        pts.push(this.#getRowColFromGeoPoint(point))
      }
      resultArr.push(...this.scanLineFilling(pts))
    }
    return resultArr
  }

  //#endregion

}

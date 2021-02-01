
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

  //#region 私有方法

  /**
   * 直线扫描算法
   * @param { [number, number] } startXY 起始点XY坐标
   * @param { [number, number] } endXY 终止点XY坐标
   * @param { boolean } withXYs 是否返回扫描的XY坐标，默认仅范围值
   * @returns { Array<number> | Array<[number, number, number]> }
   */
  DDA (startXY, endXY, withXYs = false) {
    const [sx, sy] = startXY
    const [ex, ey] = endXY
    const dx = Math.abs(ex - sx)
    const dy = Math.abs(ey - sy)
    const k = dx > dy ? dx : dy
    const xincre = (ex - sx) / k
    const yincre = (ey - sy) / k
    let x = sx
    let y = sy
    const resultArr = []
    if (withXYs) {
      for (let i = 0; i < k; i ++) {
        const value = this.getValue([Math.round(y), Math.round(x)])
        resultArr.push([x, y, value])
        x += xincre
        y += yincre
      }
    } else {
      for (let i = 0; i < k; i ++) {
        resultArr.push(this.getValue([Math.round(y), Math.round(x)]))
        x += xincre
        y += yincre
      }
    }
  }

  /**
   * 多边形扫描算法
   * @param { Array<[number, number]> } points 多边形点集
   * @param { boolean } withXYs 是否返回扫描的XY坐标，默认仅范围值
   * @returns { Array<number> | Array<[number, number, number]> }
   */
  scanLineFilling (points, withXYs) {

    class SideInfo {
      constructor () {
        this.yTop = 0
        this.xInt = 0
        this.deltaY = 0
        this.xChangePerScan = 0
      }
    }
    let firstS = 0
    let lastS = 0
    /** @type { SideInfo } */
    const sides = []
    const resultArr = []
    const _self = this

    try {
      scanFill(points)
    } catch { /* 忽略小图形情况 */ }
    return resultArr

    function scanFill (points) {
      const bottomsacn = buildSidesList(points)
      sortSidesList()
      firstS = 0
      lastS = 0
      for (let scan = sides[0].yTop; scan > bottomsacn; scan--) {
        updateFirstAndLast(sides.length, scan)
        const xIntCount = processXIntersections()
        getLineValue(scan, xIntCount, firstS)
        updateSidesList()
      }
      return resultArr
    }

    function buildSidesList (vertexes) {
      let n = vertexes.length
      let p1, p2, p3
      p1 = n - 1
      let bottomsacn = vertexes[p1][1]
      for (let i = 0; i < n; i++) {
        p2 = i
        p3 = (i + 1) % n
        if (vertexes[p1][1] === vertexes[p2][1]) {
          resultArr.push(..._self.DDA(vertexes[p1], vertexes[p2], withXYs))
        } else {
          const changePerscan = (vertexes[p2][0] - vertexes[p1][0]) / (vertexes[p2][1] - vertexes[p1][1])
          let xIntTmp = vertexes[p2][0]
          sides.push(new SideInfo())
          sides[sides.length - 1].deltaY = Math.abs(vertexes[p1][1] - vertexes[p2][1])
          if (vertexes[p1][1] < vertexes[p2][1] && vertexes[p2][1] < vertexes[p3][1]) {
            vertexes[p2][1]--
            xIntTmp = xIntTmp - parseInt(changePerscan)
            sides[sides.length - 1].deltaY--
          } else if (vertexes[p1][1] > vertexes[p2][1] && vertexes[p2][1] > vertexes[p3][1]) {
            vertexes[p2][1]++
            xIntTmp = vertexes[p1][0]
            sides[sides.length - 1].deltaY--
          }
          sides[sides.length - 1].xChangePerScan = changePerscan
          sides[sides.length - 1].xInt = vertexes[p1][1] > vertexes[p2][1] ? vertexes[p1][0] : xIntTmp
          sides[sides.length - 1].yTop = Math.max(vertexes[p1][1], vertexes[p2][1])
        }
        if (vertexes[p2][1] < bottomsacn) {
          bottomsacn = vertexes[p2][1]
        }
        p1 = p2
      }
      return bottomsacn
    }

    function sortSidesList () {
      for (let i = sides.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
          if (sides[j].yTop < sides[j + 1].yTop) {
            const temp = sides[j]
            sides[j] = sides[j + 1]
            sides[j + 1] = temp
          }
        }
      }
    }

    function swap (entry) {
      let temp
      temp = sides[entry].yTop
      sides[entry].yTop = sides[entry - 1].yTop
      sides[entry - 1].yTop = temp
      temp = sides[entry].xInt
      sides[entry].xInt = sides[entry - 1].xInt
      sides[entry - 1].xInt = temp
      temp = sides[entry].deltaY
      sides[entry].deltaY = sides[entry - 1].deltaY
      sides[entry - 1].deltaY = temp
      temp = sides[entry].xChangePerScan
      sides[entry].xChangePerScan = sides[entry - 1].xChangePerScan
      sides[entry - 1].xChangePerScan = temp
    }

    function updateFirstAndLast (count, scan) {
      while (lastS < count - 1 && sides[lastS + 1].yTop >= scan) {
        lastS++
      }
      while (sides[firstS].deltaY === 0 && firstS < lastS) {
        firstS++
      }
    }

    function sortOnX (entry) {
      while (entry > firstS && sides[entry].xInt < sides[entry - 1].xInt) {
        swap(entry)
        entry--
      }
    }

    function processXIntersections (/* scan */) {
      let xIntCount = 0
      for (let i = firstS; i < lastS + 1; i++) {
        if (sides[i].deltaY > 0) {
          xIntCount++
          sortOnX(i)
        }
      }
      return xIntCount
    }

    function getLineValue (scan, xIntCount, index) {
      for (let i = 1; i < xIntCount / 2; i++) {
        while (sides[index].deltaY === 0) {
          index++
        }
        const x1 = parseInt(sides[index].xInt)
        index++
        while (sides[index].deltaY === 0) {
          index++
        }
        const x2 = parseInt(sides[index].xInt)
        resultArr.push(..._self.DDA([x1, scan], [x2, scan], withXYs))
        index++
      }
    }

    function updateSidesList () {
      for (let i = firstS; i < lastS; i++) {
        if (sides[i].deltaY > 0) {
          sides[i].deltaY--
          sides[i].xInt -= sides[i].xChangePerScan
        }
      }
    }
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

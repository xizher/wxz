/*
 * 描    述：JavaScript 原型对象扩展器
 * 作    者：ngheizit on 2021-1-16
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

/**
 * 原型对象扩展
 * @param { Date | string | number | any[] } _this 原型对象
 * @returns { import(".").IDateExtension | import(".").IStringExtension | import(".").INumberExtension | import(".").IArratExtension }
 */
export function $ext (_this) {

  function __results__ (obj) {
    return {
      target: _this,
      ...obj
    }
  }

  // Date对象扩展
  if (_this instanceof Date) {
    const __ext__ = __results__({
      target: _this,
      /**
       * 日期格式化
       * @param { string } fmt 格式化模板
       * @returns { string } 日期格式化字符串
       */
      format (fmt) {
        let o = {
          'M+': _this.getMonth() + 1, //月份
          'd+': _this.getDate(), //日
          'h+': _this.getHours(), //小时
          'm+': _this.getMinutes(), //分
          's+': _this.getSeconds(), //秒
          'q+': Math.floor((_this.getMonth() + 3) / 3), //季度
          'S': _this.getMilliseconds() //毫秒
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (let k in o) {
          if (new RegExp('(' + k + ')').test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
              ? (o[k])
              : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
      },
      /**
       * 获取下一个增量日数的日期对象
       * @param { number } nDays 天数，默认值为 1
       * @returns { Date } 新日期对象
       */
      getNextDate (nDays = 1) {
        return new Date(_this.getTime() + 24 * 60 * 60 * 1000 * nDays)
      },
      /**
       * 获取日期对象的月份
       * @returns { number } 月份
       */
      getMonth () {
        return _this.getMonth() + 1
      },
    })
    return __ext__
  }

  // String对象扩展
  if (typeof _this === 'string') {
    const __ext__ = __results__({
      /**
       * 检查字符串是否包含在给定字符串数组内
       * @param { string[] } arr 字符串数组
       * @returns { boolean } 检查结果
       */
      contain (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (_this === arr[i]) {
            return true
          }
        }
        return false
      },
      /**
       * 获取无空格状态的字符串
       * @return { string } 无空格字符串
       */
      trimAll () {
        return _this.replace(new RegExp(' ', 'gm'), '')
      },
      /**
       * 替换所有符串查询的字符串，并返回替换后结果
       * @param { string } searchValue 查询字符串
       * @param { string } replaceValue 替换字符串
       * @returns { string } 替换后字符串
       */
      replaceAll (searchValue, replaceValue) {
        return _this.replace(new RegExp(searchValue, 'gm'), replaceValue)
      },
    })
    return __ext__
  }

  // Number对象扩展
  if (typeof _this === 'number') {
    const __ext__ = __results__({
      /**
       * 整除
       * @param { number } val 整除值
       * @returns { number }
       */
      divide: val => Math.floor(_this / val),
      /**
       * 向下取整
       * @returns { number }
       */
      floor: () => Math.floor(_this),
      /**
       * 向上取整
       * @returns { number }
       */
      ceil: () => Math.ceil(_this),
      /**
       * 绝对值
       * @returns { number }
       */
      abs: () => Math.abs(_this),
      /**
       * 保留小数位
       * @param { number } count 小数位
       * @returns { number }
       */
      round (count) {
        let n = 1
        if (count > 0) {
          n = count * 10
        } else if (count < 0) {
          n = 0.1 ** $ext(count).abs()
        }
        return Math.round(_this * n) / n
      },
      /**
       * 数字转日期字符串
       * @param { string } fmt 日期格式化模板
       * @return { string }
       */
      toDateFormat: fmt => $ext(new Date(_this)).format(fmt),
      /**
       * 数字转现金字符串
       * @returns { string } 现金字符串
       */
      toCashString: () => String(_this).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      /**
       * 数字转中文数字
       * @returns { string } 中文数字
       */
      toChineseString () {
        let AA = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九')
        let BB = new Array('', '十', '百', '千', '万', '亿', '点', '')
        let a = ('' + _this).replace(/(^0*)/g, '').split('.'),
          k = 0,
          re = ''
        for (let i = a[0].length - 1; i >= 0; i--) {
          switch (k) {
          case 0:
            re = BB[7] + re
            break
          case 4:
            if (!new RegExp('0{4}\\d{' + (a[0].length - i - 1) + '}$').test(a[0])) {
              re = BB[4] + re
            }
            break
          case 8:
            re = BB[5] + re
            BB[7] = BB[5]
            k = 0
            break
          default:
            break
          }
          if (k % 4 === 2 && a[0].charAt(i + 2) !== '0' && a[0].charAt(i + 1) === '0') {
            re = AA[0] + re
          }
          if (a[0].charAt(i) !== '0') {
            re = AA[a[0].charAt(i)] + BB[k % 4] + re
          }
          k++
        }
        if (a.length > 1) { //加上小数部分(如果有小数部分)
          re += BB[6]
          for (let i = 0; i < a[1].length; i++) {
            re += AA[a[1].charAt(i)]
          }
        }
        return re
      }
    })
    return __ext__
  }

  // Array对象扩展
  if (Array.isArray(_this)) {
    const __ext__ = __results__({
      /**
       * 插入
       * @param { number } index 插入位置索引
       * @param { * } item 插入对象
       * @returns { import(".").IArratExtension }
       */
      insert (index, item) {
        _this.splice(index, 0, item)
        return __ext__
      },
      /**
       * 移除
       * @param { number } index 移除位置索引
       * @returns { * }
       */
      remove (index) {
        const removedItem = _this[index]
        _this.splice(index, 1)
        return removedItem
      },
      /**
       * 清空数组
       * @returns { import(".").IArratExtension }
       */
      clear () {
        _this.splice(0, _this.length)
        return __ext__
      },
      /**
       * 重置数组
       * @param  { ...any } items 新子集
       * @returns { import(".").IArratExtension }
       */
      reset (...items) {
        _this.splice(0, _this.length, ...items)
        return __ext__
      },
      /**
       * 移除符合要求的子集
       * @param { * } value 移除的值
       * @param { boolean } removeMany 是否移除所有
       * @returns { import(".").IArratExtension }
       */
      removeValue (value, removeMany = false) {
        const evalStr = `
          for (let i = 0; i < _this.length; i++) {
            if (_this[i] === ${value}) {
              _this.splice(i--, 1)
              ${removeMany ? '' : 'break'}
            }
          }
        `
        eval(evalStr)
        return __ext__
      },
      /**
       * 数组去重
       * @returns { import(".").IArratExtension }
       */
      unique () {
        $ext(_this).reset([...new Set(_this)])
        return __ext__
      },
      /**
       * 获取数组去重后的结果
       * @returns { any[] } 去重结果
       */
      getUnique () {
        return [...new Set(_this)]
      },
      /**
       * 对比数组值是否相等
       * @param { any[] } array 对比数组
       * @returns { boolean }
       */
      equal (array) {
        if (_this.length !== array.length) {
          return false
        }
        for (let i = 0; i < _this.length; i++) {
          if (_this[i] !== array[i]) {
            return false
          }
        }
        return true
      },
      /**
       * 寻找符合要求的第一个对象数组子集
       * @param { string } propName 属性名
       * @param { * } propValue 属性值
       */
      findItem (propName, propValue) {
        for (let i = 0; i < _this.length; i++) {
          const item = _this[i]
          if (item[propName] === propValue) {
            return item
          }
        }
        return null
      },
      /**
       * 寻找所有符合要求的对象数组子集
       * @param { string } propName 属性名
       * @param { * } propValue 属性值
       */
      findItems (propName, propValue) {
        const result = []
        for (let i = 0; i < _this.length; i++) {
          const item = _this[i]
          if (item[propName] === propValue) {
            result.push(item)
          }
        }
        return result
      },
      /**
       * 提取对象数组属性
       * @param { string } propName 属性名
       * @param { any[] } propValue 属性值
       */
      propToArr: propName => _this.map(item => item[propName]),
      /**
       * 获取数字数组值总和
       */
      sum () {
        let sum = 0
        _this.forEach(item => sum += item)
        return sum
      },
      /**
       * 获取数组的最后一位对象
       */
      last: () => _this[_this.length - 1],
      /**
       * 获取数字数组最大值
       */
      max: () => Math.max(..._this),
      /**
       * 获取数字数组最小值
       */
      min: () => Math.min(..._this),
      /**
       * 获取数字数组平均值
       */
      ave: () => $ext(_this).sum() / _this.length,
    })
    return __ext__
  }

}

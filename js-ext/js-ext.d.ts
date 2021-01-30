
type BaseType = String | Number | any[] | Date

interface IExtentsion<T extends BaseType> {
  target: T
}

interface IDateExtension extends IExtentsion<Date> {
  /**
   * 日期格式化
   * @param fmt 格式化模板
   * @returns 日期格式化字符串
   */
  format (fmt: string) : string
  /**
   * 获取下一个增量日数的日期对象
   * @param nDays 天数，默认值为 1
   * @returns 新日期对象
   */
  getNextDate (nDays: number) : Date
  /**
   * 获取日期对象的月份
   * @returns 月份
   */
  getMonth () : number
}

interface IStringExtension extends IExtentsion<String> {
  /**
   * 检查字符串是否包含在给定字符串数组内
   * @param arr 字符串数组
   * @returns 检查结果
   */
  contain (arr: string[]) : true | false
  /**
   * 获取无空格状态的字符串
   * @return 无空格字符串
   */
  trimAll () : string
  /**
   * 替换所有符串查询的字符串，并返回替换后结果
   * @param searchValue 查询字符串
   * @param replaceValue 替换字符串
   * @returns 替换后字符串
   */
  replaceAll (searchValue: string, replaceValue: string) : string
}

interface INumberExtension extends IExtentsion<Number> {
  /**
   * 整除
   * @param val 整除值
   */
  divide (val: number) : number
  /**
   * 向下取整
   */
  floor () : number
  /**
   * 向上取整
   */
  ceil () : number
  /**
   * 绝对值
   */
  abs () : number
  /**
   * 保留小数位
   * @param count 小数位
   */
  round (count: number) : number
  /**
   * 数字转日期字符串
   * @param fmt 日期格式化模板
   */
  toDateFormat (fmt: string) : string
  /**
   * 数字转现金字符串
   */
  toCashString () : string
  /**
   * 数字转中文数字
   */
  toChineseString () : string
}

interface IArratExtension<T> extends IExtentsion<T[]> {
  /**
   * 插入
   * @param index 插入位置索引
   * @param item 插入对象
   */
  insert (index: number, item: T) : IArratExtension<T>
  /**
   * 移除
   * @param index 移除位置索引
   */
  remove (index: number, returnRemoveItem: true) : T
  /**
   * 移除
   * @param index 移除位置索引
   */
  remove (index: number) : IArratExtension<T>
  /**
   * 清空数组
   */
  clear () : IArratExtension<T>
  /**
   * 重置数组
   * @param items 新子集
   */
  reset (...items: T[]) : IArratExtension<T>
  /**
   * 移除符合要求的子集
   * @param value 移除的值
   * @param removeMany 是否移除所有，默认为否
   */
  removeValue (value: T, removeMany: true | false) : IArratExtension<T>
  /**
   * 数组去重
   */
  unique () : IArratExtension<T>
  /**
   * 获取数组去重后的结果
   */
  getUnique () : T[]
  /**
   * 对比数组值是否相等
   * @param arr 对比数组
   * @returns 对比结果
   */
  equal (arr: T[]) : true | false
  /**
   * 寻找所有符合要求的对象数组子集
   * @param propName 属性名
   * @param propValue 属性值
   */
  findItem<U extends keyof T> (propName: U, propValue: any) : T
  /**
   * 寻找符合要求的第一个对象数组子集
   * @param propName 属性名
   * @param propValue 属性值
   */
  findItems<U extends keyof T> (propName: U, propValue: any) : T[]
  /**
   * 提取对象数组属性
   * @param propName 属性名
   */
  propToArr<U extends keyof T> (propName: U) : T[U]
  /**
   * 获取数字数组值总和
   */
  sum () : number
  /**
   * 获取数组的最后一位对象
   */
  last () : T
  /**
   * 获取数字数组最大值
   */
  max () : T
  /**
   * 获取数字数组最小值
   */
  min () : T
  /**
   * 获取数字数组平均值
   */
  ave () : T
}

/** 原型对象扩展（Date） */
export declare function $ext (_this: Date) : IDateExtension
/** 原型对象扩展（String） */
export declare function $ext (_this: string) : IStringExtension
/** 原型对象扩展（NUmber） */
export declare function $ext (_this: number) : INumberExtension
/** 原型对象扩展（Array） */
export declare function $ext<T> (_this: T[]) : IArratExtension<T>

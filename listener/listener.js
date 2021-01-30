/*
 * 描    述：JavaScript 监听器
 * 作    者：ngheizit on 2021年1月30日
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

export class Listener {

  //#region 私有变量

  /**
   * 事件监听池
   * @type { Object<string, Array<[Function, *] | [Function]>> }
   */
  #eventPool

  //#endregion

  //#region 构造函数

  constructor () {
    this.#eventPool = []
  }

  //#endregion

  //#region 公有方法

  /**
   * 绑定事件
   * @param { string } name 事件名称
   * @param { Function } fn 事件处理函数
   * @param { * } context 事件处理函数上下文
   * @returns { Function } 事件处理函数
   */
  on (name, fn, context) {
    if (typeof name !== 'string') {
      throw new Error('first param must be string')
    } else if (typeof fn !== 'function') {
      throw new Error('second param must be function')
    }
    name = name.toLowerCase()
    const eventPool = this.#eventPool
    eventPool[name] || (eventPool[name] = [])
    eventPool[name].push(context ? [fn, context] : [fn])
    return fn
  }

  /**
   * 触发事件
   * @param { string } name 触发的事件名称
   * @param { * } data 触发传递的数据
   */
  fire (name, data = {}) {
    if (typeof name !== 'string') {
      throw new Error('first param must be string')
    }
    name = name.toLowerCase()
    const eventArr = this.#eventPool[name]
    if (eventArr) {
      const event = Object.assign({
        name, // 事件类型
        origin: this, // 绑定的源
      }, data)
      let len = eventArr.length
      for (let i = 0; i < eventArr.length; i++) {
        const item = eventArr[i]
        let fn = item[0]
        // event.scope = item[1] ?? {}
        event.context = item[1] || {}
        fn(event)
        if (eventArr.length < len) {
          i--
          len = eventArr.length
        }
      }
    }
  }

  /**
   * 取消特定的绑定事件
   * @param { string } name 取消的绑定事件
   * @param { Function } fn 需要的判定事件处理函数（null则移除全部）
   */
  off (name, fn) {
    if (typeof name !== 'string') {
      throw new Error('first param must be string')
    }
    name = name.toLowerCase()
    const eventArr = this.#eventPool[name]
    if (!eventArr || eventArr.length === 0) {
      return
    }
    if (fn) {
      for (let i = 0; i < eventArr.length; i++) {
        if (fn === eventArr[i][0]) {
          eventArr.splice(i, 1)
          i-- // 可能存在一个事件一个函数绑定多次的情况
        }
      }
    } else {
      eventArr.splice(0, eventArr.length)
    }
  }

  /**
   * 绑定一次性事件
   * @param { string } name 事件名称
   * @param { () => void } fn 事件处理函数
   * @param { * } context 事件处理函数上下文
   * @returns { () => * } 事件处理函数
   */
  once (name, fn, context) {
    const _self = this
    function nfn () {
      _self.off(name, nfn)
      fn.apply(context || _self, arguments)
    }
    this.on(name, nfn, context)
    return fn
  }

  //#endregion

}

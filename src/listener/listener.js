/*
 * 描    述：JavaScript 自定义类 监听器
 * 作    者：ngheizit on 2021-1-16
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

/**
 * 监听器
 * @example
    class Test extends Listener {
      constructor () {
        super();
        this.val = 0
      }
      ins () {
        this.val++
        this.fire('ins', { value: this.val })
        return this
      }
      des () {
        this.val--
        this.fire('des', { value: this.val })
        return this
      }
    }
    const test = new Test()
    const func = test.on('ins', event => {
      console.log('ins', event.value)
    })
    test.once('des', event => {
      console.log('des', event.value)
    })
    test.ins().des().des()
    test.off('ins', func)
    test.ins()
    console.log(test.val)
    // output:
    //    ins 1
    //    des 0
    //    0
 */
export const Listener = (function() {

  //#region 私有属性

  /**
   * @type { WeakMap<object, Object<string, Function> }
   */
  const _eventPool = new WeakMap()

  //#endregion

  ///#region 类体

  class __Listener__ {

    //#region 构造函数

    constructor () {
      _eventPool.set(this, {})
    }

    //#endregion

    //#region 公有方法

    /**
     * 绑定事件
     * @param { string } name 事件名称
     * @param { Function } fn 事件处理函数
     * @param { * } scope 事件处理函数上下文
     * @returns { Function } 事件处理函数
     */
    on (name, fn, scope) {
      if (typeof name !== 'string') {
        throw new Error('first param must be string')
      } else if (typeof fn !== 'function') {
        throw new Error('second param must be function')
      }
      name = name.toLowerCase()
      const eventPool = _eventPool.get(this)
      eventPool[name] || (eventPool[name] = [])
      eventPool[name].push(scope ? [fn, scope] : [fn])
      return fn
    }

    /**
     * 触发事件
     * @param { string } name 触发的事件名称
     * @param { * } data 触发传递的数据
     */
    fire (name, data) {
      if (typeof name !== 'string') {
        throw new Error('first param must be string')
      }
      name = name.toLowerCase()
      const eventArr = _eventPool.get(this)[name]
      if (eventArr) {
        const event = Object.assign({
          name, // 事件类型
          origin: this, // 绑定的源
        }, data)
        const len = eventArr.length
        for (let i = 0; i < eventArr.length; i++) {
          const item = eventArr[i]
          let fn = item[0]
          // event.scope = item[1] ?? {}
          event.scope = item[1] || {}
          fn(event)
          if (eventArr.length < len) {
            i--
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
      } else if (typeof fn !== 'function') {
        throw new Error('second param must be function')
      }
      name = name.toLowerCase()
      const eventArr = _eventPool.get(this)[name]
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
   * @param { * } scope 事件处理函数上下文
   * @returns { () => * } 事件处理函数
   */
    once (name, fn, scope) {
      const _self = this
      function nfn () {
        _self.off(name, nfn)
        fn.apply(scope || _self, arguments)
      }
      this.on(name, nfn, scope)
      return fn
    }

    //#endregion

  }

  //#endregion

  return __Listener__

}())

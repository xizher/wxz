

import { Listener } from '../../listener/listener'

export const LinkedListNode = (function () {

  //#region 私有变量

  const _value = new WeakMap ()

  //#endregion

  //#region 类体

  class __LinkedListNode__ extends Listener {

    //#region gettrt

    get value () {
      return _value.get(this)
    }

    //#endregion

    //#region setter

    set value (val) {
      const oldVal = this.value
      _value.set(this, val)

      this.fire('value-changed', {
        oldVal, newVal: val
      })
    }

    //#endregion

    //#region 构造函数

    constructor (value, next = null, previous = null) {
      super()

      this.value = value
      this.next = next
      this.previous = previous
    }

    //#endregion

  }

  //#endregion

  return __LinkedListNode__

}())

export default LinkedListNode


import Node from './linked-list-node'
import { Listener } from '../../listener/listener'

/**
 * 单链表
 */
export const LinkedList = (function () {

  //#region 私有变量

  /**
   * 单链表头结点
   * @type { WeakMap<object, Node> }
   */
  const _head = new WeakMap()

  /**
   * 单链表长度
   * @type { WeakMap<object, number> }
   */
  const _length = new WeakMap()

  //#endregion

  //#region 类体

  class __LinkedList__ extends Listener {

    //#region getter

    get length () {
      return _length.get(this)
    }

    //#endregion

    //#region 构造函数

    constructor () {
      super()

      _head.set(this, new Node(null))
      _length.set(this, 0)
    }

    //#endregion

    //#region 公有方法

    /**
     * 查找指定位置索引的结点
     * @param { number } index 位置索引
     */
    getAt (index) {
      if (index < 0 || index >= this.length) {
        throw new Error('index is out of length')
      }
      let current = _head.get(this).next
      for (let i = 0; i < index; i++) {
        current = current.next
      }
      return current
    }

    /**
     * 在单链表末尾添加结点
     * @param { * } value 结点值
     * @returns { __LinkedList__ }
     */
    append (value) {
      const node = new Node(value)
      const head = _head.get(this)
      const length = this.length
      if (head.next === null) {
        head.next = node
      } else {
        const current = this.getAt(length - 1)
        current.next = node
      }
      _length.set(this, length + 1)

      this.fire('appended', {
        appendValue: value, totalLength: this.length
      })
      this.fire('node-changed', {
        changeIndex: length, type: 'append', value, changeMany: false
      })

      return this
    }

    /**
     * 转字符串
     * @param { (node: Node) => any } callBack
     * @returns { string }
     */
    toString (callBack = node => node.value) {
      let current = _head.get(this).next
      let strArr = []
      while (current) {
        strArr.push(callBack(current))
        current = current.next
      }
      return strArr.join(',')
    }

    /**
     * 转数组
     * @returns { any[] }
     */
    toArray () {
      const arr = []
      let current = _head.get(this).next
      while (current) {
        arr.push(current.value)
        current = current.next
      }
      return arr
    }

    /**
     * 在指定位置插入结点
     * @param { number } index 插入位置索引
     * @param { * } value 插入结点值
     * @returns { __LinkedList__ }
     */
    insert (index, value) {
      const length = this.length
      if (index < 0 || index > length) {
        throw new Error('insert index is out of length')
      }
      const node = new Node(value)
      const head = _head.get(this)
      if (index === 0) {
        node.next = head.next
        head.next = node
      } else {
        const previous = this.getAt(index - 1)
        node.next = previous.next
        previous.next = node
      }
      _length.set(this, length + 1)

      this.fire('inserted', {
        insertValue: value, insertIndex: index, totalLength: this.length,
      })
      this.fire('node-changed', {
        changeIndex: length, type: 'insert', value, changeMany: false
      })

      return this
    }

    /**
     * 移除指定位置的结点
     * @param { number } index 位置索引
     * @returns { __LinkedList__ }
     */
    removeAt (index) {
      const length = _length.get(this)
      if (length < 0 || index >= length) {
        throw new Error('remove index is out of length')
      }
      const head = _head.get(this)
      let current = head.next
      if (index === 0) {
        head.next = current.next
      } else {
        const previous = this.getAt(index - 1)
        current = previous.next
        previous.next = current.next
      }
      _length.set(this, length - 1)

      this.fire('removed', {
        removeValue: current.value, removeIndex: index, totalLength: this.length, removeAll: false
      })
      this.fire('node-changed', {
        changeIndex: length, type: 'remove', value: current.value, changeMany: false
      })

      return this
    }

    /**
     * 移除指定结点值的第一的结点
     * @param { * } value 结点值
     * @returns { __LinkedList__ }
     */
    remove (value) {
      let previous = _head.get(this)
      let current = previous.next
      let hasRemoved = false
      let removeIndex = -1, i = 0
      while (current) {
        if (value === current.value) {
          previous.next = current.next
          _length.set(this, this.length - 1)
          hasRemoved = true
          removeIndex = i
          break
        }
        previous = previous.next
        current = current.next
        i++
      }

      if (hasRemoved) {
        this.fire('removed', {
          removeValue: value, removeIndex, totalLength: this.length, removeAll: false
        })
        this.fire('node-changed', {
          changeIndex: this.length, type: 'remove', value, changeMany: false
        })
      }

      return this
    }

    /**
     * 移除指定结点值的所有结点
     * @param { * } value 结点值
     * @returns { __LinkedList__ }
     */
    removeAll (value) {
      let previous = _head.get(this)
      let current = previous.next
      let removedCount = 0
      let removeIndex = -1, i = 0
      while (current) {
        if (value === current.value) {
          previous.next = current.next
          _length.set(this, this.length - 1)
          removedCount++
          if (removeIndex === -1) {
            removeIndex = i
          }
        } else {
          previous = previous.next
        }
        current = current.next
        i++
      }

      if (removedCount > 0) {
        this.fire('removed', {
          removeValue: value, removeIndex: removedCount > 1 ? null : removeIndex, totalLength: this.length, removeAll: removedCount > 1
        })
        this.fire('node-changed', {
          changeIndex: this.length, type: 'remove', value, changeMany: removedCount > 1
        })
      }

      return this
    }

    /**
     * 查找指定结点值的位置
     * @param { * } value 结点值
     */
    indexOf (value) {
      let current = _head.get(this).next
      for (let i = 0; i < this.length; i++) {
        if (current.value === value) {
          return i
        }
        current = current.next
      }
      return -1
    }

    /**
     * 清空链表结点
     */
    clear () {
      _head.get(this).next = null
      _length.set(this, 0)

      this.fire('cleared')
      this.fire('node-changed', {
        changeIndex: 0, type: 'clear', changeMany: true
      })

      return this
    }

    /**
     * 是否为空链表
     */
    isEmpty () {
      return this.length === 0
    }

    //#endregion

  }

  //#endregion

  return __LinkedList__

}())

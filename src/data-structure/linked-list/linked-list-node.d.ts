

import { Listener } from '../../listener/listener'


/**
 * 链表结点
 */
export declare class LinkedListNode<T> extends Listener<{
  string: 'value-changed', data: { oldVal: T, newVal: T}
}> {
  constructor (value: T, next?: LinkedListNode<T>, previous?: LinkedListNode<T>)
  /**
   * 结点值
   */
  get value () : T
  /**
   * 结点值
   */
  set value (val: T)
  /**
   * 下一结点对象
   */
  next: LinkedListNode<T> | null

  /**
   * 上一个结点对象（双向链表）
   */
  previous?: LinkedListNode<T> | null
}

export default LinkedListNode

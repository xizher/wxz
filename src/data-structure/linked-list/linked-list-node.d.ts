/*
 * 描    述：TypeScript 声明文件 -> JavaScript 自定义类 链表结点类
 * 作    者：ngheizit on 2021-1-17
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

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

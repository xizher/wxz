
import Node from './linked-list-node'
import { Listener } from '../../listener/listener'

export class LinkedList<T> extends Listener<
  { string: 'node-changed', data: { changeIndex: number, type: 'append' | 'insert' | 'remove', value?: T, changeMany: true | false } } |
  { string: 'appended', data: { appendValue: T, totalLength: number } } |
  { string: 'inserted', data: { insertValue: T, insertIndex: number, totalLength: number } } |
  { string: 'removed', data: { removeValue: T, removeIndex?: number, totalLength: number, removeAll: true | false } } |
  { string: 'cleared', data: {} }
> {
  /**
   * 链表结点数
   */
  get length () : T
  /**
   * 获取指定位置索引上的结点
   * @param index 位置索引
   */
  getAt (index: number) : T
  /**
   * 在链表尾部添加结点
   * @param value 结点值
   */
  append (value: T) : LinkedList<T>
  /**
   * 链表转字符串
   * @param callBack 回调函数
   */
  toString (callBack?: (node: Node<T>) => any) : string
  /**
   * 链表转数组
   */
  toArray () : T[]
  /**
   * 在指定位置插入结点
   * @param index 插入位置索引
   * @param value 插入结点值
   */
  insert (index: number, value: T) : this
  /**
   * 移除指定位置的结点
   * @param index 位置索引
   */
  removeAt (index: number) : this
  /**
   * 移除指定结点值的第一的结点
   * @param value 结点值
   */
  remove (value: T) : this
  /**
   * 移除指定结点值的所有结点
   * @param value 结点值
   */
  removeAll (value: T) : this
  /**
   * 查找指定结点值的位置
   * @param value 结点值
   */
  indexOf (value: T) : number
  /**
   * 清空链表结点
   */
  clear () : this
  /**
   * 是否为空链表
   */
  isEmpty () : boolean
}
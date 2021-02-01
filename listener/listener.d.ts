
export declare interface IListenerCallback<T> {
  name: T
  origin: this
}

export declare interface IListenerListenType {
  [key: string]: any
}

/**
 * 监听器
 */
export declare class Listener<T extends IListenerListenType> {

  /**
   * 绑定事件
   * @param name 事件名称
   * @param fn 事件处理函数
   * @param context 事件处理函数上下文
   * @returns 事件处理函数
   */
  on (
    name: T['name'],
    fn: (event?: IListenerCallback<T['name']> & T['data']) => any,
    context?: any
  ) : (event?: IListenerCallback<T['name']> & T['data']) => any

  /**
   * 触发事件
   * @param name 触发的事件名称
   * @param data 触发传递的数据
   */
  fire (
    name: T['name'],
    data?: T['data']
  ) : void

  /**
   * 取消特定的绑定事件
   * @param name 取消的绑定事件
   * @param fn 需要的判定事件处理函数（不指定则移除全部）
   */
  off (
    name: T['name'],
    fn?: (event?: IListenerCallback<T['name']> & T['data']) => any,
  ) : void

  /**
   * 绑定一次性事件
   * @param name 事件名称
   * @param fn 事件处理函数
   * @param context 事件处理函数上下文
   * @returns 事件处理函数
   */
  once (
    name: T['name'],
    fn: (event?: IListenerCallback<T['name']> & T['data']) => any,
    context?: any
  ) : (event?: IListenerCallback<T['name']> & T['data']) => any

}

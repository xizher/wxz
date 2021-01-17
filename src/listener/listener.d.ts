/*
 * 描    述：TypeScript 声明文件 -> JavaScript 自定义类 监听器
 * 作    者：ngheizit on 2021-1-16
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

interface ICallBack<T> {
  name: T
  origin: this
}

interface IBaseObject {
  [key: string]: any
}

export class Listener<T extends IBaseObject> {
  /**
   * 绑定事件
   * @param name 事件名称
   * @param fn 事件处理函数
   * @param scope 事件处理函数上下文
   * @returns 事件处理函数
   */
  on (name: T['string'], fn: (event?: ICallBack<T['string']> & T['data']) => void, scope?: any) : (event?: ICallBack<T>) => void
  /**
   * 触发事件
   * @param name 触发的事件名称
   * @param data 触发传递的数据
   */
  fire (name: T['string'], data: any) : void
  /**
   * 取消特定的绑定事件
   * @param name 取消的绑定事件
   * @param fn 需要的判定事件处理函数（null则移除全部）
   */
  off (name: T['string'], fn?: (event?: ICallBack<T['string']> & T['data']) => void): void
  /**
   * 绑定一次性事件
   * @param name 事件名称
   * @param fn 事件处理函数
   * @param scope 事件处理函数上下文
   * @returns 事件处理函数
   */
  once (name: T['string'], fn: (event?: ICallBack<T['string']> & T['data']) => void, scope?: any): (event?: ICallBack<T>) => void
}
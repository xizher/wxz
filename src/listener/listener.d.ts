/*
 * 描    述：TypeScript 声明文件 -> JavaScript 自定义类 监听器
 * 作    者：ngheizit on 2021-1-16
 * 联系方式：xizher@163.com | 198907836@qq.com
 */

interface ICallBack<T> {
  name: T
  origin: this
  [key: string]: string
}


export class Listener<T extends String> {
  on (name: T, fn: (event?: ICallBack<T>) => void, scope?: any) : (event?: ICallBack<T>) => void
  fire (name: T, data: any) : void
  off (name: string, fn?: (event?: ICallBack<T>) => void): void
  once (name: string, fn: (event?: ICallBack<T>) => void, scope?: any): (event?: ICallBack<T>) => void
}
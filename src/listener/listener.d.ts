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
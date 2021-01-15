import {
  BaseUtils,
  CryptoUtils
} from '../src/js-utils'

let NO = 1
function log (sth) {
  console.log(`${NO++}. ----- ${sth}`)
}

{
  CryptoUtils
    .setKey('11111111111111111111111111111111')
    .setIv('1111111111111111')
  const str = 'hello world'
  const enStr = CryptoUtils.enCrypto(str)
  const deStr = CryptoUtils.deCrypto(enStr)
  log(`${str} -> ${enStr} -> ${deStr}`)
}

{
  const obj = { a: { b: 2} }
  const obj2 = obj
  obj2.a.b = 1
  const obj3 = BaseUtils.deepCopyJSON(obj)
  obj3.a.b = 3
  log(`${JSON.stringify(obj)} <-> ${JSON.stringify(obj3)}`)
}

{
  const obj = { a: { b: 2} }
  const obj2 = obj
  obj2.a.b = 1
  const obj3 = BaseUtils.deepCopy(obj)
  obj3.a.b = 3
  log(`${JSON.stringify(obj)} <-> ${JSON.stringify(obj3)}`)
}

{
  log(BaseUtils.guid())
}

{
  log(BaseUtils.randomRange(0, 10))
}

{
  const obj = { a: { b: 2, c: 1 } }
  BaseUtils.deepExtent(true, obj, { a: { b: 0 } })
  log(`${JSON.stringify({ a: { b: 2, c: 1 } })} <-> ${JSON.stringify(obj)}`)
}



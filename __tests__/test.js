import {
  BaseUtils,
  CryptoUtils
} from '../src/js-utils'
import { $ext } from '../src/js-ext'

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
{
  const dateStr = $ext(new Date()).format('yyyy-MM-dd hh-mm-ss')
  log(dateStr)
}
{
  const nextDate = $ext(new Date()).getNextDate(2)
  log(nextDate)
}
{
  const month = $ext(new Date()).getMonth()
  log(month)
}
{
  const arr = ['a', 'b', 'c']
  const str = 'b'
  const str2 = 'e'
  const result1 = $ext(str).contain(arr)
  const result2 = $ext(str2).contain(arr)
  log(`${result1} <-> ${result2}`)
}
{
  const str = ' a  bc d'
  log($ext(str).trimAll())
}
{
  const str = 'hello world'
  log(`${str} <-> ${$ext(str).replaceAll('l', 'L')}`)
}
{
  const num = 1.6
  log(`${num} <-> ${$ext(num).floor()}`)
}
{
  const num = 1.4
  log(`${num} <-> ${$ext(num).ceil()}`)
}
{
  const num = -1.4
  log(`${num} <-> ${$ext(num).abs()}`)
}
{
  const num = 105.45
  log(`${num} <-> ${$ext(num).round(-1)}`)
}
{
  const num = 100999999.23
  log($ext(num).toChineseString())
}
{
  const arr = [1, 2, 3]
  log($ext(arr).insert(2, 4).target)
}
{
  const arr = [1, 2, 3, 4]
  $ext(arr).remove(2)
  log(arr)
}
{
  const arr = [4, 2, 3, 4]
  $ext(arr).clear()
  log(arr.length)
}
{
  const arr = [4, 2, 3, 4]
  $ext(arr).reset(1, 1, 1, 1)
  log(arr)
}
{
  const arr = [0, 1, 1, 2, 1, 4]
  $ext(arr).removeValue(1, true)
  log(arr)
}
{
  const arr = [0, 1, 1, 2, 1, 4]
  $ext(arr).unique()
  log(arr)
}
{
  const arr = [0, 1, 1, 2, 1, 4]
  const arr2 = $ext(arr).getUnique()
  log(`${arr} -> ${arr2}`)
}
{
  const arr = [4, 2]
  const arr2 = [1, 2]
  const arr3 = [4, 2]
  log(`${$ext(arr).equal(arr2)} <-> ${$ext(arr).equal(arr3)}`)
}
{
  const arr = [{ a: 0 }, { a: 1 }, { a: 1 }, { a: 2 }, { a: 1 }, { a: 4 }]
  const result = $ext(arr).findItem('a', 1)
  log(JSON.stringify(result))
}
{
  const arr = [{ a: 0 }, { a: 1 }, { a: 1 }, { a: 2 }, { a: 1 }, { a: 4 }]
  const result = $ext(arr).findItems('a', 1)
  log(JSON.stringify(result))
}
{
  const arr = [{ a: 0 }, { a: 1 }, { a: 1 }, { a: 2 }, { a: 1 }, { a: 4 }]
  const result = $ext(arr).propToArr('a')
  log(JSON.stringify(result))
}
{
  const arr = [0, 1, 1, 2, 1, 4]
  log($ext(arr).sum())
}
{
  const arr = [0, 1, 1, 2, 1, 4]
  log($ext(arr).last())
}
{
  const arr = [0, 1, 1, 2, 1, 4]
  log($ext(arr).max())
}
{
  const arr = [0, 1, 1, 2, 1, 4]
  log($ext(arr).min())
}
{
  const arr = [0, 1, 1, 2, 1, 4]
  log($ext(arr).ave())
}

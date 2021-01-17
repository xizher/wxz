import {
  BaseUtils,
  CryptoUtils,
  $ext,
  Listener,
  Comparator,
  LinkedList
} from '..'
import { LinkedListNode } from '../src/data-structure/linked-list/linked-list-node'

let NO = 1
function log (sth) {
  console.log(`${NO++}. ----- ${sth}`)
}
function slog () {
  console.log(`${NO++}. ----- START`)
}
function elog () {
  console.log(`  END`)
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
{
  slog()
  
  class Test extends Listener {
    constructor () {
      super();
      this.val = 0
    }
    ins () {
      this.val++
      this.fire('ins', { value: this.val })
      return this
    }
    des () {
      this.val--
      this.fire('des', { value: this.val })
      return this
    }
  }
  const test = new Test()
  const func = test.on('ins', event => {
    console.log('ins', event.value)
  })
  test.once('des', event => {
    console.log('des', event.value)
  })
  test.ins().des().des()
  test.off('ins', func)
  test.ins()
  console.log(test.val)

  elog()
}
{
  slog()

  const obj1 = { a: 1 }
  const obj2 = { a: 2 }
  const comparator = new Comparator((i, j) => i.a - j.a)
  console.log(comparator.lessThan(obj1, obj2))

  elog()
}
{
  slog()

  const node = new LinkedListNode(1)
  node.on('value-changed', event => {
    const { oldVal, newVal } = event
    console.log(`${oldVal} -> ${newVal}`)
  })
  node.value = 2

  elog()
}
{
  slog()

  /** @type {LinkedList<number>} */
  const list = new LinkedList()
  list.on('node-changed', event => {
    console.log(JSON.stringify(event))
  })
  // list.once('appended', event => {
  //   console.log(JSON.stringify(event))
  // })
  // list.on('inserted', event => {
  //   console.log(JSON.stringify(event))
  // })
  list.on('cleared', event => {
    console.log(JSON.stringify(event))
  })
  list
    .append(11)
    .append(22)
    .insert(2, 33)
    .insert(1, 33)
    .insert(0, 44)
    // .removeAt(3)
    // .remove(44)
    .removeAll(33)
    .clear()
  console.log(list.toArray(), list.length, list.isEmpty())


  elog()
}
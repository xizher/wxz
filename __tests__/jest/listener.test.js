import { Listener } from '../../listener';

class Obj extends Listener {
  constructor () {
    super()
    this.value = 0
  }
  inc () {
    const oldVal = this.value
    this.value++
    this.fire('inc', { oldVal, newVal: this.value })
  }
  dec () {
    const oldVal = this.value
    this.value--
    this.fire('dec', { oldVal, newVal: this.value })
  }
  set (val) {
    const oldVal = this.value
    this.value = val
    this.fire('set', { oldVal, newVal: this.value })
  }
}


test('can listen on and fire', () => {
  const obj = new Obj() // 0
  obj.on('inc', event => {
    obj.value++ // +1
  })
  obj.inc() // +1
  expect(obj.value).toBe(2)
})

test('can listen on and fire more', () => {
  const obj = new Obj() // 0
  obj.on('inc', event => {
    obj.value++ // +1
  })
  obj.on('inc', event => {
    obj.value++ // +1
  })
  obj.inc() // +1
  expect(obj.value).toBe(3)
})

test('can listen off one handler', () => {
  const obj = new Obj() // 0
  const handler = obj.on('inc', event => {
    obj.value++ // +1 only fire once
  })
  obj.inc() // +1
  obj.off('inc', handler)
  obj.inc() // +1
  expect(obj.value).toBe(3)
})

test('can listen off all handlers', () => {
  const obj = new Obj() // 0
  obj.on('inc', event => {
    obj.value++ // +1 only fire once
  })
  obj.on('inc', event => {
    obj.value++ // +1 only fire once
  })
  obj.inc() // +1
  obj.off('inc')
  obj.inc() // +1
  expect(obj.value).toBe(4)
})

test('can listen off one handler and other handlers also can fire', () => {
  const obj = new Obj() // 0
  const handler = obj.on('inc', event => {
    obj.value++ // +1 only fire once
  })
  obj.on('inc', event => {
    obj.value++ // +1
  })
  obj.inc() // +1
  obj.off('inc', handler)
  obj.inc() // +1
  expect(obj.value).toBe(5)
})

test('can listen once', () => {
  const obj = new Obj() // 0
  obj.once('inc', event => {
    obj.value++ // +1
  })
  obj.inc() // +1
  obj.inc() // +1
  expect(obj.value).toBe(3)
})


test('can listen once and other handlers also can fire', () => {
  const obj = new Obj() // 0
  obj.once('inc', event => {
    obj.value++ // +1
  })
  obj.on('inc', event => {
    obj.value++ // +1
  })
  obj.inc() // +1
  obj.inc() // +1
  expect(obj.value).toBe(5)
})

test('can listen once and other handlers also can fire which on is before once', () => {
  const obj = new Obj() // 0
  obj.on('inc', event => {
    obj.value++ // +1
  })
  obj.once('inc', event => {
    obj.value++ // +1
  })
  obj.inc() // +1
  obj.inc() // +1
  expect(obj.value).toBe(5)
})

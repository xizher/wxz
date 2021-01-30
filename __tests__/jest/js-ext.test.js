import { $ext } from '../../js-ext'

test('format 2000-01-01 00:00:00', () => {
  const timeStr = '2000-01-01 00:00:00'
  const date = new Date('2000-01-01 00:00:00')
  const timeStrByFmt = $ext(date).format('yyyy-MM-dd hh:mm:ss')
  expect(timeStrByFmt).toBe(timeStr)
})

test('2000-01-01 next day is 2000-01-02', () => {
  const date = new Date('2000-01-01')
  const newDate = $ext(date).getNextDate()
  expect(newDate.getDate()).toBe(2)
})

test('2000-01-01 next three day is 2000-01-04', () => {
  const date = new Date('2000-01-01')
  const newDate = $ext(date).getNextDate(3)
  expect(newDate.getDate()).toBe(4)
})

test('2000-01-01 previous day is 1999-12-31', () => {
  const date = new Date('2000-01-01')
  const newDate = $ext(date).getNextDate(-1)
  expect(newDate.getDate()).toBe(31)
})

test('2000-01-01 month is 1', () => {
  const date = new Date('2000-01-01')
  const month = $ext(date).getMonth()
  expect(month).toBe(1)
})

test('a is in array which has a', () => {
  expect($ext('a').contain(['a', 'b', 'c'])).toBe(true)
})

test('a is in array which has a', () => {
  expect($ext('a').contain(['b', '', 'a'])).toBe(true)
})

test('clear all space', () => {
  expect($ext(' a a b ').trimAll()).toBe('aab')
})

test('aaaababacaaa replace all a is bbc', () => {
  expect($ext('aaaababacaaa').replaceAll('a', '')).toBe('bbc')
})

test('7 整除 3 为 2', () => {
  expect($ext(7).divide(3)).toBe(2)
})

test('7.6 向下取整 为 7', () => {
  expect($ext(7.6).floor()).toBe(7)
})

test('7.4 向上取整 为 8', () => {
  expect($ext(7.4).ceil()).toBe(8)
})

test('-7.4 绝对值 为 7.4', () => {
  expect($ext(-7.4).abs()).toBe(7.4)
})

test('7.4 保留0为小数 为 7', () => {
  expect($ext(7.4).round()).toBe(7)
})

test('7.45 保留1为小数 为 7.5', () => {
  expect($ext(7.45).round(1)).toBe(7.5)
})

test('7.45 保留十位 为 10', () => {
  expect($ext(7.45).round(-1)).toBe(10)
})

test('4 保留十位 为 0', () => {
  expect($ext(4).round(-1)).toBe(0)
})

test('0 时间戳 为 1970年', () => {
  expect($ext(0).toDateFormat('yyyy')).toBe('1970')
})

test('1000 现金为 1,000', () => {
  expect($ext(1000).toCashString()).toBe('1,000')
})

test('1000 中文为 一千', () => {
  expect($ext(1000).toChineseString()).toBe('一千')
})

test('[1, 2, 3] 在 0 索引位插入2', () => {
  const arr = [1, 2, 3]
  $ext(arr).insert(0, 2)
  expect(
    arr[0]
  ).toBe(2)
})

test('[1, 2, 3] 在 3 索引位插入2', () => {
  const arr = [1, 2, 3]
  $ext(arr).insert(3, 2)
  expect(
    arr[3]
  ).toBe(2)
})

test('[1, 2, 3] 在 2 索引位插入2', () => {
  const arr = [1, 2, 3]
  $ext(arr).insert(2, 2)
  expect(
    arr[2]
  ).toBe(2)
})

test('[1, 2, 3] 移除 0 索引位', () => {
  const arr = [1, 2, 3]
  $ext(arr).remove(0)
  expect(arr.length).toBe(2)
  expect(arr[0]).toBe(2)
})

test('[1, 2, 3] 移除 1 索引位', () => {
  const arr = [1, 2, 3]
  $ext(arr).remove(1)
  expect(arr.length).toBe(2)
  expect(arr[0]).toBe(1)
  expect(arr[1]).toBe(3)
})

test('[1, 2, 3] 移除 2 索引位', () => {
  const arr = [1, 2, 3]
  $ext(arr).remove(2)
  expect(arr.length).toBe(2)
  expect(arr[2]).toBe(undefined)
})

test('[1, 2, 3] 清空', () => {
  const arr = [1, 2, 3]
  $ext(arr).clear()
  expect(arr.length).toBe(0)
})

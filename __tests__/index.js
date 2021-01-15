import {
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

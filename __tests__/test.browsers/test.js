import { reactive, ref, toRef, watch } from 'vue'
import { LinkedList } from '../../src/data-structure/linked-list/linked-list'
import LinkedListNode from '../../src/data-structure/linked-list/linked-list-node'
import {
  BaseUtils
} from '../../src/js-utils'
const { log } = console

window.onload = () => {
  {
    log(BaseUtils.getRootPath())
  }
  {
    // BaseUtils.getGeoLocation().then(res => {
    //   log(res)
    // })
  }
  {
    // const removeEvent = BaseUtils.watchGeoLocation(event => {
    //   log(event)
    // })
    // setTimeout(() => {
    //   removeEvent.remove()
    // }, 1000)
  }
  {
    log(BaseUtils.isFromMobileBrowser())
  }
  {
    // BaseUtils.copyText('copy hhh').then(res => {
    //   console.log(res)
    // })
  }
  {
    // const list = new LinkedList()
    // const vlist = reactive(list)
    // watch(toRef(vlist, 'length'), val => {
    //   console.log(val)
    // })
    // list.append('00')
    // vlist.value.append('00')
    // console.log(vlist)

    const node = reactive(new LinkedListNode(1))
    // const node = new LinkedListNode(1)

    watch(node, val => {
      console.log(val.value)
    }, { deep: true })
    node.value = 2

    console.log(node.value)

    // const test = reactive({
    //   a: 1
    // })
    // watch(toRef(test, 'a'), val => {
    //   console.log(val)
    // })
    // test.a++
    

  }
}
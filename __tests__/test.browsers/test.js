import {
  BaseUtils
} from '../../src/js-utils'
const { log } = console

window.onload = () => {
  {
    log(BaseUtils.getRootPath())
  }
  {
    BaseUtils.getGeoLocation().then(res => {
      log(res)
    })
  }
  {
    const removeEvent = BaseUtils.watchGeoLocation(event => {
      log(event)
    })
    setTimeout(() => {
      removeEvent.remove()
    }, 1000)
  }
  {
    log(BaseUtils.isFromMobileBrowser())
  }
  {
    BaseUtils.copyText('copy hhh').then(res => {
      console.log(res)
    })
  }
}
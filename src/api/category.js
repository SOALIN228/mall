import axios from 'axios'
import {SUCC_CODE, TIMEOUT} from './config'

const CancelToken = axios.CancelToken
let cancel
// 获取内容数据--ajax
export const getCategoryContent = (id) => {
  cancel && cancel('取消了前一次的请求！')
  cancel = null
  return axios.get(`http://www.imooc.com/api/category/content/${id}`, {
    timeout: TIMEOUT,
    cancelToken: new CancelToken((c) => { // 取消前一次的请求
      cancel = c
    })
  }).then(res => {
    if (res.data.code === SUCC_CODE) {
      return res.data.content
    }

    throw new Error('没有成功获取到数据！')
  }).catch(err => {
    if (axios.isCancel(err)) { // 捕获取消前一次的请求的
      console.log(err)
    } else {
      console.log(err)
    }
  })
}

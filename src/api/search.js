import jsonp from 'assets/js/jsonp'
import { jsonpOptions } from './config'

// 获取热门搜索数据--jsonp
export const getSearchHotKeyword = () => {
  const url = 'https://wq.jd.com/bases/searchhotword/GetHotWords'
  return jsonp(url, null, jsonpOptions).then(res => {
    if (res && res.owner) { // succeed
      return res.owner
    }

    throw new Error('没有成功获取到数据！')
  }).catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

// 获取搜索结果数据--jsonp
export const getSearchResult = keyword => {
  const url = 'https://suggest.taobao.com/sug'
  const params = {
    q: keyword,
    code: 'utf-8',
    area: 'c2c',
    nick: '',
    sid: null
  }

  return jsonp(url, params, jsonpOptions).then(res => {
    if (res.result) {
      return res.result
    }

    throw new Error('没有成功获取到数据！')
  }).catch(err => {
    if (err) {
      console.log(err)
    }
  })
}

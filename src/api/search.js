// 和搜索相关的请求都在这里
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: '1'
  })
  return jsonp(url, data, options)
}

export function search(query, page, zhida) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  const data = Object.assign({}, commonParams, {
    p: page,
    catZhida: zhida ? 1 : 0,
    w: query,
    flag: 1,
    t: 0,
    sem: 1,
    ie: 'utf-8',
    aggr: 0,
    perpage: 20,
    n: 20,
    remoteplace: 'txt.mqq.all',
    needNewCode: 1,
    platform: 'h5',
    uid: 0
  })
  return jsonp(url, data, options)
}
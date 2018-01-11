import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'
<<<<<<< HEAD
// 当export没有default的时,在调用的时候就需要加花括号
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5', // 说明请求来源于h5平台
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getDiscList() {
=======
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getDiskList() {
>>>>>>> origin/master
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
<<<<<<< HEAD
    format: 'json'
  })

=======
    notice: 0,
    picmid: 1,
    format: 'json'
  })
>>>>>>> origin/master
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
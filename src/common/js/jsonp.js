<<<<<<< HEAD
import orginJSONP from 'jsonp'
// 做了jsonp的一个封装 先引入jsonp
export default function jsonp(url, data, option) {
// 对外抛出一个方法  url指的是地址 data是参数也就是qurey option对应着jsonp的option 详见github
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    orginJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
        // 这样在then方法就可以接收到请求的数据了
=======
import myJsonp from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    myJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
>>>>>>> origin/master
      } else {
        reject(err)
      }
    })
  })
}
<<<<<<< HEAD
function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    // !==undfined的时候 拼上data[k] 否则就传个空
    url += `&${k} = ${encodeURIComponent(value)}`
=======

function param(data) {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
>>>>>>> origin/master
  }
  return url ? url.substring(1) : ''
}
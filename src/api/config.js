export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}
// 这些公用的变量 是为了模拟qq音乐在请求数据的时候的参数 大部分参数都是qq音乐在真是请求的时候
// 返回的参数
export const options = {
  param: 'jsonpCallback'
}
export const ERR_OK = 0 // 在qq音乐请求返回数据中 当数据正确返回的时候 一般都会有code为0
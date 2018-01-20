function getRandomInt(min, max) {
  // 取出min和max中间的一个随机数字取整
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle(arr) {
  // 这样就不会直接修改原数组
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
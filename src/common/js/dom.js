export function addClass(el, className) {
<<<<<<< HEAD
  if (hasClass(el, className)) { return }
=======
  if (hasClass(el, className)) {
    return
  }
>>>>>>> origin/master
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
<<<<<<< HEAD
  return reg.test(el.className)
=======
  return reg.test(el, className)
}
export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}
// 浏览器能力检测
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'Moztransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transfrom'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
>>>>>>> origin/master
}
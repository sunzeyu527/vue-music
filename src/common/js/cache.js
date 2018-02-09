// 所有和本地存储相关的逻辑都是在这里来实现
import storage from 'good-storage'
const SEARCH_KEY = '__search__'
const PLAY_KEY = '__play__'
const PLAY_MAX_LENGTH = 200
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LENGTH = 200
// 定义一个最大的存储空间 当达到最大的数量的时候 就把最前面的删除掉
const SEARCH_MAX_LENGTH = 15
// 为了保证最新搜索的结果总是在存储位置的最前面  所以封装一个方法
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    // 如果在当前数组中找到该元素且不是第一个 就删除掉
    arr.splice(index, 1)
  }
  arr.unshift(val)
  // 如果有maxlen 并且数组长度大于最大长度的时候 就删除一个
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
export function saveSearch(query) {
  // 在这里我们不直接操作localstorage 用一个开源的依赖
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

// state中的searchHistory需要从本地的localstorage中去读取播放历史纪录 所以在这定义一个方法

export function loadSearch() {
  // 第二个参数代表是默认的返回值  这里可以去看看作者写的这个session的这个库
  return storage.get(SEARCH_KEY, [])
}

function deleteFromArray(arr, compare) {
  // 当compare这个函数返回值为true的时候 就执行删除的操作
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  // 在删除完毕之后不要忘记再把这个操作过的数组设置回去
  // 还需要有返回值的
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}
// 修改的时候也要修改缓存
export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}
// 初始值也要从缓存里面来读取
export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}
// actions通常是异步操作，第二种是对mutations的封装，比如说在某个动作需要触发多个mutations 我们可以对多个mutations进行封装
// 通过调用一个action 来实现对多个mutation进行修改的目的
import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch} from 'common/js/cache'
function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
export const selectPlay = function ({ commit, state }, { list, index }) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAY_LIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
export const randomPlay = function ({ commit }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAY_LIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({commit, state}, song) {
  // 这个提交主要是为了搜索界面 因为搜索界面当点击歌曲的时候 要同时修改三个mutation
  // 参数中的state因为在搜索界面是直接拿不到state中的playlist 所以就从这里直接获取了
  // 注意数组是引用类型 要修改副本 不然会报错
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 首先我们先记录当前的歌曲
  let currentSong = playList[currentIndex]
  // 还要确认在当前列表里面有没有这首歌曲 并返回其索引
  let fpIndex = findIndex(playList, song)
  // 然后将歌曲插入当前列表
  // 因为是插入歌曲  所以索引要加1
  currentIndex++
  playList.splice(currentIndex, 0, song)
  // 判断如果已经包含这首歌 那就要找到这首歌给删除掉
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的歌曲的序号
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      // 因为插入元素 整个数据的index发生了变化 所以要+1
      playList.splice(fpIndex + 1, 1)
    }
  }
  // 下面是处理插入到播放顺序列表的逻辑
  // 这是要插入的位置  在当前歌曲在列表的位置+1
  let currentSIndex = findIndex(sequenceList, currentSong) + 1

  let fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({commit}, query) {
  // 需要设计一个方法 将搜索记录存储到本地session中 localstorage
  // savesearch 方法就是把query写到storage 同时返回一个存储query的新列表 这个时候我们在来提交
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  // 从当前的搜索历史列表中删除当前的query 返回一个新的query 删除的结果要保存到本地缓存
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSong = function ({commit, state}, song) {
  // 复制复制  vuex默认是不支持不提交直接来修改的 而splice是直接修改原数组的
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playList, song)
  playList.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
// 这里为什么只判断currentIndex > pIndex 这一种情况呢 小于的时候是不用考虑的 因为对于当前播放歌曲的是没有影响的
  if (currentIndex > pIndex || currentIndex === playList.length) {
    currentIndex--
  }

  commit(types.SET_PLAY_LIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  if (!playList.length) {
    commit(types.SET_PLAYING_STATE, false)
  }
}

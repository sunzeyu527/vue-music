// actions通常是异步操作，第二种是对mutations的封装，比如说在某个动作需要触发多个mutations 我们可以对多个mutations进行封装
// 通过调用一个action 来实现对多个mutation进行修改的目的
import * as types from './mutation-types'
export const selectPlay = function ({ commit, state }, { list, index }) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
// getters就是对数据的一层映射，里面是一些函数，类似计算属性，它会根据state不同值来计算新的值
// 也可以写一些复杂的逻辑 写完state 即是getters
export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
export const disc = (state) => state.disc
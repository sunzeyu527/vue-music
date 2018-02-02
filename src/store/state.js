import { playMode } from 'common/js/config'
import {loadSearch} from 'common/js/cache'
// state 只保存基础的数据所有在这些基础数据上可以计算来的数据都放在getters里面
// 在配置vuex的时候 要想清楚原始数据是什么，这些数据最好都是一些底层的数据
const state = {
  singer: {},
  // 由于多个组件都可打开播放器，这样的话就需要把播放器相关的数据存储到vuex中进行集中管理
  playing: false, // 播放的状态
  fullScreen: false, // 全屏
  playList: [], // 播放列表
  sequenceList: [], // 播放顺序列表 因为有三种播放模式，当时顺序播放模式的时候，它是和playList一样的
  mode: playMode.sequence, // 播放模式
  currentIndex: -1, // 当前播放歌曲 通过currentIndex和playList就可以计算出当前播放的歌曲
  disc: {},
  topList: {},
  // 这样就能保证vuex中的searchHistory中的数据能够一直和本地localstorage中进行同步
  searchHistory: loadSearch()
}
export default state
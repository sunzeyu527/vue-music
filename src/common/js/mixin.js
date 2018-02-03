// 定义了多个组件中可以共用的代码
import { mapGetters, mapMutations, mapActions } from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    this.handlePlayList(this.playList)
  },
  activated() {
    this.handlePlayList(this.playList)
  },
  watch: {
    playList(newVal) {
      this.handlePlayList(newVal)
    }
  },
  methods: {
    handlePlayList() {
      // 组件中必须要实现这个函数 如果实现这个函数就会覆盖掉mixin中的handlePlayList 否则就会抛出一个错误
      throw new Error('component must implement handlePlayList method')
    }
  }
}

export const playerMixin = {
  computed: {
    iconMode() {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode ===
        playMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playList',
      'mode'
    ])
  },
  methods: {
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        // 当目前是随机模式的时候 要对sequenceList进行一个洗牌的功能 在common/js/util.js中实现
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex(list) {
      // 这个方法的主要作用是当播放模式发生改变的时候，当前的播放的歌曲不改变
      let index = list.findIndex((item) => {
        // es6数组的新api findIndex
        return item.id === this.currentSong.id
      })
      this.setCurrnetIndex(index)
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAY_LIST'
    })
  }
}

export const searchMixin = {
  data() {
    return {
      query: ''
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    blurInput() {
      this.$refs.searchBox.blur()
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    onQueryChange(query) {
      this.query = query
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    ...mapActions([
      // 这样写也可以直接去调用 不用在methods再重复代理一次 上面的两个方法就可以直接注释掉了
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
}
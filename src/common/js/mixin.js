// 定义了多个组件中可以共用的代码
import { mapGetters } from 'vuex'
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
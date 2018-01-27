<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length>0" ref="playBtn" @click='random'>
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll 
        :data="songs" 
        class='list' 
        ref="list"
        :probe-type='probeType'
        :listen-scroll='listenScroll'
        @scroll="scroll"
        >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import {prefixStyle} from 'common/js/dom'
  import Loading from 'base/loading/loading'
  import {mapActions} from 'vuex'
  import {playListMixin} from 'common/js/mixin'
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')
  const RESERVED_HEIGHT = 40
  export default {
    // 一个组件可以插入多个mixin 一旦组件插入mixin mixin中的代码就会插入到组件中
    mixins: [playListMixin],
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: function () {
          return []
        }
      },
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        scrollY: 0
      }
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
      // this.$refs.list拿到的是vue实例的对象所以要加上$el 解决初始化的时候高度显示的问题 将scroll组件向下移动背景图的高度
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
      // 将这两个值传回scroll组件 来监听滚动事件获得滚动高度 来操作this.$refs.layer的移动距离 实现联动的效果
    },
    computed: {
      bgStyle() {
        return `backgroundImage:url(${this.bgImage})`
      }
    },
    components: {
      Scroll,
      SongList,
      Loading
    },
    methods: {
      scroll(pos) {
        this.scrollY = pos.y
      },
      back() {
        this.$router.back()
      },
      selectItem(item, index) {
        // 在点击单个歌曲的时候，要播放整个歌曲列表，也就是要设置playList和sequenceList
        // 根据点击的索引设置currentList和playstate 默认展开大的播放器 fullscreen
        // 多次操作mutation 需要在action中进行封装
        this.selectPlay({
          list: this.songs, // 因为这里是需要播放整个列表所以传this.songs
          index
        })
      },
      random() {
        this.randomPlay({
          list: this.songs
        })
      },
      handlePlayList(playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },
    watch: {
      scrollY(newY) {
        let translateY = Math.max(this.minTranslateY, newY)
        let zIndex = 0
        let scale = 1
        let blur = 0
        this.$refs.layer.style[transform] = `translate3D(0, ${translateY}px, 0)`
        const percent = Math.abs(newY / this.imageHeight)
        // 根据当前newY和背景div的比例来判断图片放大的比例
        if (newY > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          blur = Math.min(20 * percent, 20)
        }
        this.$refs.filter.style[backdrop] = `blur(${blur})px`
        if (newY < this.minTranslateY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          // 整个背景div 的高度是靠padding来撑起来的 这个时候要将padding设置为0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          // 这个设置让整个背景div能够留出40px的高度 这样就达到了设计图的效果
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = ''
        }
        this.$refs.bgImage.style.zIndex = zIndex
        this.$refs.bgImage.style[transform] = `scale(${scale})`
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
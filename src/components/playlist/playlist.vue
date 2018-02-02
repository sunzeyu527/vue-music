<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon"></i>
            <span class="text"></span>
            <span class="clear"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll ref="listContent" class="list-content" :data="sequenceList">
          <ul ref="list" name="list">
            <li class="item" 
                v-for="(item, index) in sequenceList" 
                :key="index" 
                @click="selectItem(item, index)" 
                ref="listItem">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like">
                <i></i>
              </span>
              <span class="delete" @click="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </ul>
        </scroll>
        <div class="list-operate">
          <div class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import Scroll from 'base/scroll/scroll'
  import {playMode} from 'common/js/config'
  export default {
    data() {
      return {
        showFlag: false
      }
    },
    computed: {
      ...mapGetters([
        'sequenceList',
        'currentSong',
        'playList',
        'mode'
      ])
    },
    methods: {
      show() {
        this.showFlag = true
        // 这里要注意一个问题 为什么scroll组件初始化后不能滚动
        // 当我们调用show方法的时候 由隐藏到显示  只有当显示的时候 dom需要重新计算 也就是说需要调用scroll的refresh方法
        // 这也是再许多场景中调用scroll组件时都会遇到的情况
        setTimeout(() => {
          this.$refs.listContent.refresh()
          // 再组件刚显示的时候 直接滚动到当前播放的歌曲
          this.scrollToCurrent(this.currentSong)
        }, 20)
      },
      hide() {
        this.showFlag = false
      },
      getCurrentIcon(item) {
        if (this.currentSong.id === item.id) {
          return 'icon-play'
        } else {
          return ''
        }
      },
      selectItem(item, index) {
        if (this.mode === playMode.random) {
          index = this.playList.findIndex((song) => {
            // 如果是随机播放的话 就再当前的播放列表中找到点击的歌曲并且设置播放索引为当前点击的index
            return song.id === item.id
          })
        }
        this.setCurrentIndex(index)
        this.setPlayingState(true)
      },
      scrollToCurrent(current) {
        const index = this.sequenceList.findIndex((song) => {
          return current.id === song.id
        })
        this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
      },
      deleteOne(item) {
      },
      ...mapMutations({
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayingState: 'SET_PLAYING_STATE'
      })
    },
    watch: {
      currentSong(newSong, oldSong) {
        // 如果当前组件没有显示 或者点的歌曲是和当前播放的是同一个 就直接return
        if (!this.showFlag || newSong.id === oldSong.id) {
          return
        }
        this.scrollToCurrent(newSong)
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-highlight-background
      .list-header
        position: relative
        padding: 20px 30px 10px 20px
        .title
          display: flex
          align-items: center
          .icon
            margin-right: 10px
            font-size: 30px
            color: $color-theme-d
          .text
            flex: 1
            font-size: $font-size-medium
            color: $color-text-l
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 240px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            no-wrap()
            font-size: $font-size-medium
            color: $color-text-d
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
      .list-operate
        width: 140px
        margin: 20px auto 30px auto
        .add
          display: flex
          align-items: center
          padding: 8px 16px
          border: 1px solid $color-text-l
          border-radius: 100px
          color: $color-text-l
          .icon-add
            margin-right: 5px
            font-size: $font-size-small-s
          .text
            font-size: $font-size-small
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size-medium-x
        color: $color-text-l
</style>
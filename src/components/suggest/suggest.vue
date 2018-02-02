<template>
  <scroll 
        class="suggest" 
        :data='result' 
        :pullup='pullup' 
        @scrollToEnd='searchMore'
        ref="suggest"
        :beforeScroll='beforeScroll'
        @befortScroll='listScroll'

        > 
    <ul class="suggest-list">
      <li 
          class="suggest-item" 
          v-for="(item,index) in result" 
          :key="index"
          @click="selectItem(item)"
          >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=''></loading> 
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Singer from 'common/js/singer'
  import { mapMutations, mapActions } from 'vuex'
  import NoResult from 'base/no-result/no-result'
  const TYPE_SINGER = 'singer'
  const perpage = 20
  export default {
    props: {
      query: {
        type: String,
        default: ''
      },
      // 要不要显示歌手 决定组件行为通过props传入 默认可以展示歌手
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        page: 1,
        result: [],
        pullup: true,
        hasMore: true,
        beforeScroll: true
      }
    },
    methods: {
      search() {
        // 在query变化的时候 一定要做一些重置的操作 这样才能保证页面正确的效果
        this.hasMore = true
        this.page = 1
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data)
            // 在每次拿到结果的时候 check一下
            this._checkMore(res.data)
          }
        })
      },
      // 定义一个方法，根据请求返回数据的不同来处理数据 这种方法非常好 感觉上就很舒服
      _genResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSong(data.song.list))
        }
        return ret
      },
      _normalizeSong(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
          // 也就是说没有数据了
          this.hasMore = false
        }
      },
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      searchMore() {
        if (!this.hasMore) return
        this.page ++
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            // 在下拉搜索还有数据的情况下 要注意这时要用数组的拼接 将刚获得的数据拼接到原来的数组上
            // 这样数据渲染就没有问题了
            this.result = this.result.concat(this._genResult(res.data))
            this._checkMore(res.data)
          }
        })
      },
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }
        // 派发一个事件 让外部关心搜索历史的组件来完成 也就事他的父组件search
        this.$emit('select')
      },
      listScroll() {
        // 监听到listScroll事件之后也是派发出去  在search组件中才是真正关心这个事件的
        this.$emit('listScroll')
      },
      refresh() {
        // 这个事件主要是给父组件来进行调用的 在设置底部自适应高度的时候来刷新scroll组件
        this.$refs.suggest.refresh()
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query() {
        this.search()
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
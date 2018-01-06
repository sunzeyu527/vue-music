<template>
  <scroll class='listview' :data='data' ref='listview' :listenScroll='listenScroll' @scroll='scroll' :probeType=3>
    <ul>
      <li :key='idx' v-for='(group,idx) in data'  class='list-group' ref='listGroup'>
        <h2 class='list-group-title'>{{group.title}}</h2>
        <ul>
          <li :key='index' v-for='(item,index) in group.items' class="list-group-item">
            <img v-lazy="item.avatar" class="avatar" alt=""/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart='onShortcutTouchStart' @touchmove.stop.prevent='onShortcutTouchMove'>
      <ul>
        <li :key='indx' v-for='(item,indx) in shortcutList' class='item' :data-index='indx'>
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'
  const ANCHOR_HEIGHT = 18 // 定义每个锚点元素之间的高度
  export default {
    created() {
      this.touch = {} // 为什么不定义在data数据里面而是定义在created 因为vue要对所有定义在data中的数据进行监听，主要是为了更新视图
      // 这个数据只是为了两个函数之间传值使用 所以不用定义在data中
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0 // 对应到shortcutList列表高亮 默认第一个高亮
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      }
    },
    components: {
      Scroll
    },
    methods: {
      onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0] // e.touches会获得一个数组，0位置就是手指触碰的位置
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex // 记录当前的点击锚点的索引
        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0  // 这里的| 0相当于向下取整 算出来相当于锚点跨越的多少个值
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      scroll(pos) {
        this.scrollY = pos.Y
      },
      _scrollTo(index) {
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
        // 为上面两个函数封装一个专门的方法 靠传入index不同执行不同的滚动 scrollToElemet方法是在引入scroll组件的时候引入的
        // 具体可以去scroll组件中看看，主要的思想还是利用的better-scroll中的滚动的方法
        // scrollToElement 第二个参数 是滚动动画的时间
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      watch: {
        data() {
          setTimeout(() => {   // 数据的变化到dom的变化会有一个延迟
            this._calculateHeight()
          }, 20)
        },
        scrollY(newY) {
          const listHeight = this.listHeight
          for (let i = 0; i < listHeight.length; i++) {
            let height1 = listHeight[i]
            let height2 = listHeight[i + 1]
            if (!height2 || (-newY > height1 && -newY < height2)) {
              this.currentIndex = i
              console.log(this.currentIndex)
              return
            }
          }
          this.currentIndex = 0
        }
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

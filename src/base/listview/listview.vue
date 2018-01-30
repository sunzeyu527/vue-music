<template>
  <scroll class='listview' 
          :data='data' 
          ref='listview' 
          :listen-scroll='listenScroll' 
          @scroll='scroll' 
          :probe-type='probeType'>
    <ul>
      <li :key='idx' v-for='(group,idx) in data'  class='list-group' ref='listGroup'>
        <h2 class='list-group-title'>{{group.title}}</h2>
        <ul>
          <li :key='index'
              v-for='(item,index) in group.items'
              class="list-group-item"
              @click='selectItem(item)'
              >
            <img v-lazy="item.avatar" class="avatar" alt=""/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
  </ul>
    <div class="list-shortcut" @touchstart='onShortcutTouchStart' @touchmove.stop.prevent='onShortcutTouchMove'>
      <ul>
        <li :key='indx'
            v-for='(item,indx) in shortcutList'
            class='item'
            :data-index='indx'
            :class="{'current':currentIndex === indx}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show='fixedTitle' ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div v-show='!data.length' class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'
  import Loading from 'base/loading/loading'
  const ANCHOR_HEIGHT = 18 // 定义每个锚点元素之间的高度
  const TITLE_HEIGHT = 30  // 定义每个fixedTop的高度
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
        currentIndex: 0, // 对应到shortcutList列表高亮 默认第一个高亮
        diff: -1 // 表示滚动到的位置的上限-scrollY的差值 用这个差值来和title 的高度来比较
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
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return false
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    components: {
      Scroll,
      Loading
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
        // listview 是基础组件 它的点击事件是不会有任何业务逻辑相关的，仅仅是将这个事件派发出去，我被点击了，
        // 以及点击的元素是什么，只有外部关心这个事件的才会决定这个点击要做什么
      },
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
      refresh() {
        // 暴露一个方法 给singer.vue来使用
        this.$refs.listview.refresh()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _scrollTo(index) {
        // 右侧列表上下各有两个空白区域，当点击到空白的区域时候，index 为null 这个判断是为了防止点击到空白区域的
        // 后面的index !==0 因为0取反也为true 所以加了一个拦截
        if (!index && index !== 0) {
          return
        }
        index < 0 && (index = 0)
        index > this.listHeight.length - 2 && (index = this.listHeight - 2)
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
        // 为上面两个函数封装一个专门的方法 靠传入index不同执行不同的滚动 scrollToElemet方法是在引入scroll组件的时候引入的
        // 具体可以去scroll组件中看看，主要的思想还是利用的better-scroll中的滚动的方法
        // scrollToElement 第二个参数 是滚动动画的时间
      },
      _calculateHeight() {
        // 这个方法中存储一个数组，数组中对应左边列表的每一段的高度
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    watch: {
      data() {
        setTimeout(() => {   // 数据的变化到dom的变化会有一个延迟
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        // newY是scroll中传过来的值，是当前滚动的高度
        const listHeight = this.listHeight
        // 当滚动到顶部 newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if ((-newY >= height1 && -newY < height2)) {
            // height2取反的意思是如果是最后一个，也就是说listHeight[i+1]没有值得时候，直接让currentIndex为最后一个
            this.currentIndex = i
            // 右边列表的index主要是用来保存当前哪个字母添加class，也就是高亮
            this.diff = height2 + newY
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素上限的时候
        this.currentIndex = listHeight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0 // div.listfixedlist的偏移量
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    }
  }
  // 整体组件的思路 整个组件主要难度在于左边和右边的联动，我们需要知道它时时滚动的位置，根据滚动的位置来算出来当前的左边的区间。
  // 根据左边的区间来让右边对应的区间索引来显示高亮
  // 在vue中用到的watch来监听数据的时时变化配合scroll时时派发的scrollY的变化 根据这个变化来计算currentIndex，用currentIndex来
  // 让索引区间动态添加高亮的样式
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
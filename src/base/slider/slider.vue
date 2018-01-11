<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
<<<<<<< HEAD
      <span class="dot" v-for="(item,idx) in dots" :key="idx" :class="{active: currentPageIndex === idx}"></span>
=======
      <span class="dot" :key= key v-for="(item, key) in dots" :class='{active:currentPageIndex === key}'>
      </span>
>>>>>>> origin/master
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
<<<<<<< HEAD
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    // 可以用this.$nextTick来确保元素的渲染 也可以使用一次性定时器 浏览器
    // 的刷新通常是17毫秒一次 20毫秒算是一个经验值
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
  },
  methods: {
    _setSliderWidth() {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
        // betterScroll 提供的接口 因为是横向轮播 所以第二个参数是0
      }, this.interval)
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,  // 可以横向滚动
        scrollY: false,  // 不可以纵向滚动
        momentum: false,  // 惯性？false
        snap: true,
        snapLoop: this.loop, // 循环
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    }
  },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.slider {
  min-height: 1px;
  position: relative
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
=======
  import BScroll from 'better-scroll'
  import {addClass} from 'common/js/dom'
  export default {
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 2000
      }
    },
    mounted() {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots() // 注意 初始化dots的时候 要在初始化slider 前面否则better-scroll 会多生成两个元素 那样的dots.length为7
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      // 监听window 的resize事件  消除每次窗口改变时候 轮播宽度不变产生的bug
      window.addEventListener('resize', () => {
        if (!this.slider) { // slider没初始化的时候 直接return
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh() // better-scroll 提供的接口 重新刷新
      })
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        console.log(this.children.length)
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initDots() {
        this.dots = new Array(this.children.length)
        console.log(this.children.length)
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setInterval(() => {
          this.slider.goToPage(pageIndex, 0, 400)  // better-scroll 提供的interface
        }, this.interval)
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })
        this.slider.on('scrollEnd', () => { // 这个事件是在每次图片滚动后自动触发 pageX就是滚动页面的index
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            clearTimeout(this.timer) // 清除前一次定时器
            this._play() // 再推动执行一次  实现无限滚动
          }
        })
      }
    },
    destroyed() {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    position: relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
>>>>>>> origin/master
</style>
<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  // 抽象出一个scroll组件 来初始化一些数据 这样不用每个组件都重复性的去初始化数据
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean, // 这个作用就是scroll是否监听滚动事件
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        // 在滚动开始会派发一个事件
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          let me = this // 保留vue实例的this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos) // 调用vue实例的$emit方法派发一个scroll事件
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            // scrollEnd 在滚动结束之后会派发一次 在这里判断如果滚动的高度小于最大高度加上一个50px的缓冲区
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              // scrollToEnd 和scrollEnd不一样scrollToEnd表示滚动到底部了  scrollEnd表示scroll 停止了
              this.$emit('scrollToEnd')
            }
          })
        }

        if (this.beforeScroll) {
          // 在滚动一开始的时候 向外派发一个事件
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
          // 通过外部props来控制scroll组件的刷新时间
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>

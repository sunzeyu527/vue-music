<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
        @touchstart.prevent='progressTouchStart'
        @touchmove.prevent= 'progressTouchMove'
        @touchend= 'progressTouchEnd'
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const progressBtnWidth = 16
  import {prefixStyle} from 'common/js/dom'
  const transform = prefixStyle('transform')
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    watch: {
      percent (newCent) {
        if (newCent >= 0 && !this.touch.initiated) {
          // !this.touch.initiated 是为了确保拖动的优先级最高
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = newCent * barWidth
          this._offset(offsetWidth)
        }
      }
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initiated = true // 表示对象已经初始化了
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth // 开始点击按钮的时候 在 整体进度条上偏移的位置
      },
      progressTouchMove(e) {
        // 确保先进入touchStart事件
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX // 横向的偏移量
        // Math.min和Math.max 分别取最大值和最小值 这个方法值得借鉴
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
        this._offset(offsetWidth)
      },
      progressTouchEnd() {
        this.touch.initiated = false
        // 需要派发一个事件 在其父组件中接收这个事件 具体派发在_triggerPercent方法中执行
        this._triggerPercent()
      },
      progressClick(e) {
        // this._offset(e.offsetX) // 获得当前点击位置的offsetX e是MouseEvent 事件 _offset改变视图中进度条的位置
        // 这里有一个小bug 当我们点击到progressBtn的时候 e.offsetX是不对的
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        this._triggerPercent()  // _triggerPercent 派发一个事件 在父组件player中去修改
      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px` // 表示已经唱完歌曲的进度条
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
      },
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
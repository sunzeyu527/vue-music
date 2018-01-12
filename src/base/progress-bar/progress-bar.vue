<template>
<<<<<<< HEAD
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
=======
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
        @touchstart.prevent='progressTouchStart'
        @touchmove.prevent= 'progressTouchMove'
        @touchend= 'progressTouchEnd'
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
<<<<<<< HEAD
  import {prefixStyle} from 'common/js/dom'

  const progressBtnWidth = 16
  const transform = prefixStyle('transform')

=======
  const progressBtnWidth = 16
  import {prefixStyle} from 'common/js/dom'
  const transform = prefixStyle('transform')
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
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
<<<<<<< HEAD
    methods: {
      progressTouchStart(e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
=======
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
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
        this._offset(offsetWidth)
      },
      progressTouchEnd() {
        this.touch.initiated = false
<<<<<<< HEAD
        this._triggerPercent()
      },
      progressClick(e) {
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
        // this._offset(e.offsetX)
        this._triggerPercent()
=======
        // 需要派发一个事件 在其父组件中接收这个事件 具体派发在_triggerPercent方法中执行
        this._triggerPercent()
      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px` // 表示已经唱完歌曲的进度条
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
      },
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
<<<<<<< HEAD
      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = newPercent * barWidth
          this._offset(offsetWidth)
        }
=======
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
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
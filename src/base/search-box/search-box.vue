<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" class="box" :placeholder='placeholder' v-model="query"/>
    <i class="icon-dismiss" v-show="query" @click="clear"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from 'common/js/util'
  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲/歌手'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      }
    },
    created() {
      // 当query发生改变的时候 就会派发一个事件 来告诉外部组件
      // 当前组件并不关注query的变化 它只负责自身组件的逻辑以及对外提供query这个事件
      this.$watch('query', debounce((newQuery) => {
        // 在这里要引入一个节流函数 因为在搜索框快速操作的时候 请求过于密集
        // 节流函数的具体实现可以参考util.js 主要是通过一个定时器 来限制函数执行的次数
        this.$emit('query', newQuery)
      }, 200))
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      font-size: 16px
      color: $color-background
</style>
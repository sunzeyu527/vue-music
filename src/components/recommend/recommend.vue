<template>
  <div class="recommend" ref="recommend"> 
      <scroll :data="diskList" class="recommend-content" ref='scroll'>
        <div>
          <div class="slider-wrapper" ref="sliderWrapper" v-if="recommend.length">
              <slider>
                <div v-for="(item,key) in recommend" :key='key'>
                  <a :href="item.linkUrl">
                    <img :src="item.picUrl" @load="loadImage" alt="" class='needsclick'>
                  </a>
                </div>
              </slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li  class="item" v-for="(item,idx) in diskList" :key='idx' @click="selectItem(item)">
                <div class="icon">
                  <img width="60" height="60" v-lazy='item.imgurl'>
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="loading-container" v-show='!diskList.length'>
          <loading></loading>
        </div>
      </scroll>
      <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Slider from 'base/slider/slider'
  import {getRecommend, getDiskList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {playListMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'
  export default {
    mixins: [playListMixin],
    data() {
      return {
        recommend: [],
        diskList: [],
        checkLoaded: false
      }
    },
    created() {
      this._getRecommend()
      this._getDiskList()
    },
    methods: {
      handlePlayList(playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommend = res.data.slider
          }
        })
      },
      _getDiskList() {
        getDiskList().then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data)
            this.diskList = res.data.list
          }
        })
      },
      loadImage() {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh() // 通过监听图片加载 来确定图片已经加载 也就是说轮播的高度被撑开 只确定一张图片加载成功就可 所以通过一个开关来控制
          this.checkLoaded = true
        }
      },
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        // 在这通过mutations修改disc的数据
        // 当通过路由跳转到disc组件的时候读取vuex中的值
        this.setDisc(item)
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
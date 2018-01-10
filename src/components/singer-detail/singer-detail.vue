<template>
  <transition name="slider">
    <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'
  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getDetail()
      console.log(this.singer)
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
        } // 只有当前页面有this.singer的时候，也就是说vuex中有singer这个数据的时候，才留在当前页面，否则就跳转回singer页面
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
            console.log(this.songs)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) { // 只有有这两个id的时候createSong工厂方法才有意义
          // 在之后去开发榜单的歌曲列表还有排行榜的歌曲列表 都可以 直接用createSong这个工厂方法
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .slider-enter-active,.slider-leave-active
    transition: all 0.5s
  .slider-enter,.slider-leave-to
    transform: translate3d(100%, 0, 0)  
</style>
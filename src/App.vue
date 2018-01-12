<template>
  <div id="app">
<<<<<<< HEAD
     <m-header></m-header>
     <tab></tab>
     <keep-alive>
       <router-view></router-view>
     </keep-alive>
     <player></player>   
=======
    <m-header/>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>      
    </keep-alive>
    <player></player> 
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'
export default {
  name: 'app',
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
<<<<<<< HEAD
=======
  @import "~common/stylus/variable"
  
  #app
    color: $color-theme
>>>>>>> 9496c9a63fba904017f211a76726e0aa7e07618c
</style>

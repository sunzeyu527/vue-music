<template>
  <div class= "singer" ref= "singer">
    <list-view ref= "list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>

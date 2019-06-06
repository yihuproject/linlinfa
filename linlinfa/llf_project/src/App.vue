<template>
  <div id="app">
<!-- <keep-alive>
         <router-view v-if="$route.meta.keepAlive" class='router-view'></router-view> 
     </keep-alive> -->
    <router-view></router-view>
      
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="stylus">
  #app
    margin-top: 88px
    width: 100vw
    width: 100%
</style>

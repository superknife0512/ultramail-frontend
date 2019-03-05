<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>

<script>
import navBar from './components/navbar'
export default {
  components:{
    navBar
  }
}
</script>


<style lang="scss">
</style>

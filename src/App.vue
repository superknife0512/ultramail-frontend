<template>
  <div id="app">
    <nav-bar @activeSideMenu="isActive = true"></nav-bar>      
    <side-nav :isActive="isActive" 
              @deActiveSidenav="isActive = false"></side-nav>
    <router-view/>
  </div>
</template>

<script>
import navBar from './components/navbar'
import sideNav from './components/sidenav'
export default {
  data(){
    return {
      isActive: false
    }
  },

  components:{
    navBar,
    sideNav
  }
}
</script>


<style lang="scss">
  $color-primary: #0097a7;
  $color-background: #ffe3e5;
  $color-secondary: #5a2669;
</style>

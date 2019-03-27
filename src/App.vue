<template>
  <div id="app">
    <grid-layout>
      <nav-bar @activeSideMenu="isActive = true" v-if="!isLogin"></nav-bar>      
      <side-nav :isActive="isActive" 
                @deActiveSidenav="isActive = false"></side-nav>
      <side-bar class="grid-nav" v-if="isLogin" @activeNav="isActive = true"></side-bar>
      <!-- <div class="grid-nav" style="background: #edf6f4; height: 100vh" v-if="!isLogin"></div> -->
      <router-view/>
    </grid-layout>
  </div>
</template>

<script>
import navBar from './components/navbar'
import sideNav from './components/sidenav'
import sideBar from './components/sidebar'
export default {  
  created(){
    this.expiryId = localStorage.getItem('expiryId') || 0;
    this.remainingTime =this.expiryId - Date.now() ;
    if(this.remainingTime > 0){
      this.autoDeleteTemp()
    } else {
      this.deleteHandler()
    }

    // check if it can auto login 
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    if(loginData){
      this.loginExpiryTime = loginData.loginExpire - Date.now();
      if(this.loginExpiryTime < 0){
        localStorage.removeItem('loginData');
        this.$store.commit('logoutHandler');
      } else {
        this.$store.commit('autoLogin', loginData)
        this.$store.dispatch('autoLogout', this.loginExpiryTime);
      }
    }
  },

  data(){
    return {
      isActive: false,
      expiryId: '',
      remainingTime: '',
      loginExpiryTime: 0,
    }
  },


  components:{
    navBar,
    sideNav,
    sideBar
  },

  methods:{
    autoDeleteTemp(){
      setTimeout(() => {
        this.deleteHandler();
      }, this.remainingTime);
    },

    deleteHandler(){
        localStorage.removeItem('signupId');
        localStorage.removeItem('expiryId');
        this.$store.commit('deleteTempData')
    }
  },
  computed: {
    isLogin(){
      return this.$store.state.isLogin
    }
  },
}
</script>


<style lang="scss">
  $color-primary: #0097a7;
  $color-background: #ffe3e5;
  $color-secondary: #5a2669;

  .grid-nav{
    grid-column: 1/2;
    grid-row: 1/-1;
    @media screen and (max-width: 667px) {
        grid-column: 1/13;
        grid-row: 1/2;
    } 
  }

  #app{
    background-color: #f3f3f3
  }
</style>

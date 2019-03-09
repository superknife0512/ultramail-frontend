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
    sideNav
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
    
  },
}
</script>


<style lang="scss">
  $color-primary: #0097a7;
  $color-background: #ffe3e5;
  $color-secondary: #5a2669;
</style>

<template>
  <div id="app">
    <grid-layout>
      
      <side-nav :isActive="isActive" 
                @deActiveSidenav="isActive = false"></side-nav>
      <side-bar class="grid-nav" v-if="isLogin" @activeNav="isActive = true"></side-bar>
      
      <router-view/>
    </grid-layout>
  </div>
</template>

<script>
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

    if(this.isLogin){
      this.initialize();
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
    sideNav,
    sideBar
  },

  methods:{
    autoDeleteTemp(){
      setTimeout(() => {
        this.deleteHandler();
      }, this.remainingTime);
    },

    initialize(){
      fetch(`${process.env.VUE_APP_PORT}/userDash/${this.userId}`,{
      headers:{
            'Authorization': 'Bearer '+ this.$store.state.token
        }
      }).then(resp=>{
          return resp.json()
      }).then(resData=>{
          if(status === 'fail'){
              return this.firePopup('error', 'Phát hiện lỗi', resData.msg)
          }
          this.$store.commit('createUserData', resData.user)
      }).catch(err=>{
          throw err
      })
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
    },
    userId(){
      return this.$store.state.userId
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

<template>
  <nav>
    <div class="nav-wrapper white ">
      <div class="container">
        <a href="#">
          <i class="material-icons left cyan-text darken-2 resp-icon"
            @click="activeSideMenu()">
            menu
          </i>
        </a>
        <router-link to="/" tag="a" class="brand-logo cyan-text text-darken-3">
          Ultra Mail
        </router-link>
        <ul id="nav-mobile " class=" right hide-on-med-and-down">

          <router-link tag="li" 
                        to="/auth/login" 
                        exact exact-active-class="active"
                        v-if="!isLogin">
            <a class="nav__link grey-text text-darken-3">
              <i class="material-icons left">account_box</i> 
            Đăng nhập</a>
          </router-link>

          <router-link tag="li" 
                        to="/auth/signup" 
                        exact exact-active-class="active"
                        v-if="!isLogin">

            <a class="nav__link cyan-text text-darken-2">
              <i class="material-icons left">account_circle</i>
            Đăng kí</a>
          </router-link>

          <li v-if="isLogin" @click="logout">
            <a class="nav__link white-text cyan ">
              <i class="material-icons left">exit_to_app</i>
              Thoát 
            </a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
  .nav{
    &__link{
    }
  }
  nav{

    ul{
      li.active{
        background-color: #e0f7fa;
        color: #333;
      }
    }
  }
  .resp-icon{
    padding: 0 1rem;
  }

</style>

<script>
export default {
  methods:{
    activeSideMenu(){
      this.$emit('activeSideMenu')
    },
    logout(){
      this.$store.commit('logoutHandler')
      this.$router.push('/auth/login')
    }
  },
  computed: {
    isLogin(){
      return this.$store.state.isLogin
    }
  },
}
</script>




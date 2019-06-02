<template>
  <div class="navbar-fixed">

    <nav>
      <div class="nav-wrapper grey darken-3 ">
        <div class="container">
            <i class="material-icons left orange-text text-lighten-4 resp-icon"
              @click="activeSideMenu()">
              menu
            </i>
          <router-link to="/" tag="a" class="brand-logo white-text text-lighten-3">
            MailCampro
          </router-link>
          <ul id="nav-mobile " class=" right hide-on-med-and-down">

            <router-link tag="li" 
                          to="/auth/login" 
                          exact exact-active-class="active"
                          v-if="!isLogin">
              <a class="nav__link grey-text text-lighten-3">
                <i class="material-icons left">account_box</i> 
              Đăng nhập</a>
            </router-link>

            <router-link tag="li" 
                          to="/auth/signup" 
                          exact exact-active-class="active"
                          v-if="!isLogin">

              <a class="nav__link cyan-text text-lighten-4">
                <i class="material-icons left">account_circle</i>
              Đăng kí</a>
            </router-link>

            <li v-if="isLogin" @click="logout">
              <a class="nav__link grey-text text-darken-4 amber lighten-1 ">
                <i class="material-icons left">exit_to_app</i>
                Thoát 
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss">
  .nav-wrapper{
    &__link{
    }
  }
  nav{

    ul{
      li.active{
        background-color: #57e8fc;
        .nav__link{
          &:link, &:visited{
            color: rgb(31, 31, 31) !important; 
          }
        }
      }
    }
  }
  .resp-icon{
    padding: 0 1rem;
    cursor: pointer;
    @media screen and (min-width: 900px) {
      display: none !important;
    }
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




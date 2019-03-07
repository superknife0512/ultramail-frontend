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
        <a href="/" class="brand-logo cyan-text text-darken-3">Ultra Mail</a>
        <ul id="nav-mobile " class=" right hide-on-med-and-down">

          <router-link tag="li" to="/auth/login" exact exact-active-class="active">
            <a class="nav__link grey-text text-darken-3">
              <i class="material-icons left">account_box</i> 
            Đăng nhập</a>
          </router-link>

          <router-link tag="li" to="/auth/signup" exact exact-active-class="active">
            <a class="nav__link cyan-text text-darken-2">
              <i class="material-icons left">account_circle</i>
            Đăng kí</a>
          </router-link>

          <li>
            <a class="nav__link grey-text text-darken-3">
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
    }
  }
}
</script>




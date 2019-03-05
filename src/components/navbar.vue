<template>
  <nav>
    <div class="nav-wrapper lime lighten-2 ">
      <div class="container">
        <a href="#">
          <i class="material-icons left hide-on-med-and-up teal-text darken-2">
            menu
          </i>
        </a>
        <a href="/" class="brand-logo teal-text text-darken-3">Ultra Mail</a>
        <ul id="nav-mobile " class=" right hide-on-sm-and-down">
          <router-link tag="li" to="/auth/login" exact exact-active-class="active">
            <a class="nav__link grey-text text-darken-4">
              <i class="material-icons left">account_box</i> 
            Login</a>
          </router-link>
          <router-link tag="li" to="/auth/signup" exact exact-active-class="active">
            <a class="nav__link teal darken-4">
              <i class="material-icons left">account_circle</i>
            Signup</a>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
  .nav{
    &__link{
      font-size: 1.22rem;
    }
  }
</style>



import Vue from 'vue'
import Router from 'vue-router'
import adminBoard from './views/AdminBoard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Admin pannel',
      component: adminBoard
    },

    // authetication route
    {
      path: '/auth/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (auth.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "auth" */ './views/auth/login.vue')
    },

    {
      path: '/auth/signup',
      name: 'Signup',
      // route level code-splitting
      // this generates a separate chunk (auth.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "auth" */ './views/auth/signup.vue')
    },
    
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'

import auth from './views/auth/auth.vue'
import login from './views/auth/login.vue'
import signup from './views/auth/signup.vue'

import admin from './views/admin/admin.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home page',
      component: home
    },

    // authetication route ********************
    {
      path: '/auth',
      name: 'Authentication',
      component: auth,
      children: [
        {
          path: '/auth/login',
          name: 'Login',
          // route level code-splitting
          // this generates a separate chunk (auth.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: login,
        },
    
        {
          path: '/auth/signup',
          name: 'Signup',
          component: signup,
        },
      ]
    },  
    
    //admin route *************************
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children:[
        {
          path: '/',
          name: 'adminBoard',
          component: () => import(/* webpackChunkName: "admin-group" */ './views/admin/adminBoard.vue'),
        },
      ]
    }
  ]
})

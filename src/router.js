import store from './store.js'
import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'
import error404 from './views/404Error.vue'

import auth from './views/auth/auth.vue'
import login from './views/auth/login.vue'
import signup from './views/auth/signup.vue'
import sucessLog from './views/auth/sucessLog.vue'
import forgot from './views/auth/forgot.vue'
import reset from './views/auth/reset.vue'

import user from './views/user/user.vue'

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

        {
          path: '/auth/sucess',
          name: 'sucess',
          component: sucessLog,
        },
        {
          path: '/auth/forgot',
          name: 'forgot-password',
          component: forgot,
        },
        {
          path: '/auth/reset/:token',
          name: 'reset-password',
          component: reset,
          props: true,
        },
      ]
    },  

    // admin router ***********************
    {
      path: '/admin',
      name: 'Admin',
      component: () => import(/* webpackChunkName: "admin-group" */ './views/admin/admin-pannel.vue'),
      beforeEnter: (to,from,next)=>{
        const isLogin = store.getters.loginState
        const isAdmin = store.state.userId
        
        if(isLogin === false && isAdmin !== '5c8f5280cecd5524d8e7fc4c'){
          next('/');
        } else {
          next()
        }        
      },
    },
    
    //user route *************************
    {
      path: '/user/:userId',
      name: 'user',
      props: true,
      component: user,
      
      beforeEnter: (to,from,next)=>{
        const isLogin = store.getters.loginState
        
        if(isLogin == false){
          next('/auth/login');
        } else if(isLogin == true){
          next()
        }        
      },

      children:[
        {
          path: '',
          name: 'userBoard',
          props:true,
          component: () => import(/* webpackChunkName: "user-group" */ './views/user/userBoard.vue'),
        },
        {
          path: 'create-email',
          name: 'createEmail',
          component: () => import(/* webpackChunkName: "user-group" */ './views/user/createEmail.vue'),
        },
        {
          path: 'contact',
          name: 'contact',
          component: () => import(/* webpackChunkName: "user-group" */ './views/user/contact.vue'),
        },
      ]
    },

    //gift router *****************************
    {
      path: '/gift/:userId',
      name: 'gift',
      props: true,
      component: () => import(/* webpackChunkName: "gift-group" */ './views/user/giftPage.vue'),
    },

    // marketing campaign router
    {
      path: '/campaign',
      name: 'campaign',
      component: () => import(/* webpackChunkName: "campaign-group" */ './views/Email-mar/campaign.vue'),
      children: [
        {
          path: '/',
          name: 'campaigns',
          component: () => import(/* webpackChunkName: "campaign-group" */ './views/Email-mar/createCampaign.vue'),
        },
        {
          path: ':campaignId',
          name: 'detail',
          props: true,
          component: () => import(/* webpackChunkName: "campaign-group" */ './views/Email-mar/campaignDetail.vue'),
        },
        {
          path: ':campaignId/wizard',
          name: 'wizard',
          component: () => import(/* webpackChunkName: "campaign-group" */ './views/Email-mar/emailWizard.vue'),
        },
      ]
    },

    {
      path: '*',
      name: '404',
      component: error404
    },
  ]
})

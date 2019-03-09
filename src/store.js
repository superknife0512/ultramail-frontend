import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signupUserId: localStorage.getItem('signupId') || '',

    isLogin: false,
    loginExpire :  0,
    token:  '',
    userId: '',
  },

  mutations: {
    deleteTempData(state){
      state.signupUserId = '';
    },
    loginHandler(state, resData){
      state.isLogin = true;
      state.loginExpire = Date.now() + 1*60*60*1000;
      state.token = resData.token;
      state.userId = resData.userId;

      localStorage.setItem('loginData', JSON.stringify({
        loginExpire: state.loginExpire,
        token: state.token,
        userId: state.userId
      }))
    },
    autoLogin(state, loginData){
      state.isLogin = true;
      state.userId = loginData.userId;
      state.token = loginData.token;
      state.loginExpire = loginData.loginExpire;
    },
    

    logoutHandler(state){
      state.isLogin = false;
      state.loginExpire = 0 ;
      state.token = '';
      localStorage.removeItem('loginData')
    },
    
  },
  
  actions: {
    autoLogout({commit}, remainingTime){
      setTimeout(()=>{
        commit('logoutHandler')
      }, 
      remainingTime)
    },
  },
  
  getters:{
    loginState(state){
      return state.isLogin;
    }
  }
})

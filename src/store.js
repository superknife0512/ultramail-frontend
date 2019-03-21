import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signupUserId: localStorage.getItem('signupId') || '',

    isLogin: false,
    loginExpire :  0,
    token:  '',
    userId: '',
    userData: {},
    userRole: null,

    templates: [],
    editedTemplateId: '',
    editMode: false,
  },

  mutations: {
    deleteTempData(state){
      state.signupUserId = '';
    },
    loginHandler(state, resData){
      state.isLogin = true;
      state.loginExpire = Date.now() + 2*60*60*1000;
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
      localStorage.removeItem('loginData');
      router.push('/auth/login');
    },

    createUserData(state, userData){
      state.userData = userData
    },



    setTemplates(state, templates){
      state.templates = templates
    },

    changeEditMode(state, mode){
      state.editMode = mode.mode;
    },

    setEditTemplate(state, templateId){
      state.editedTemplateId = templateId
    }
    
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
    }, 

    editedTemplate: (state)=> id =>{
      return state.templates.find(temp=> temp._id === id)
    }
  }
})
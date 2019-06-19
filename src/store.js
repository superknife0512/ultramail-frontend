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
    ownerTemplates: [],
    editedTemplateId: '',
    editMode: false,

    automail: {
      customTemplate: '',
      mailName:'',
      contacts:[],
      subject:'',
      from: '',
      dateTime: '',
    }
    
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
    },

    updateAvatar(state, avatar){
      state.userData.avatarUrl = avatar;
    },

    // email marketing function
    loadUserTemplates(state, templateData){
      state.ownerTemplates = templateData.ownerTemplate;
      state.templates = templateData.adminTemplate
    },

    setAutomail(state, payload){
      state.automail[payload.field] = payload.value
    },

    // Contact function
    addContact(state,newContact){
      state.userData.studentContacts = newContact;
    },

    deleteContact(state,contactId){
      let contacts = state.userData.studentContacts;
      const newContacts = contacts.filter(contact=>{
        return contact._id !== contactId
      })
      state.userData.studentContacts = newContacts
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

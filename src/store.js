import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    signupUserId: localStorage.getItem('signupId') || '',
  },
  mutations: {

  },
  actions: {

  },
  getters:{
    
  }
})

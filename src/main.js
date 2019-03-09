import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import {firePopup} from './mixins/swalPopup.js'

Vue.use(VueSweetalert2);

Vue.mixin(firePopup);

Vue.config.productionTip = false



new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

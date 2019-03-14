import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import {firePopup} from './mixins/swalPopup.js'
import submitBtn from './components/button/submitBtn.vue'
import warningMsg from './components/messages/warningMsg.vue'
import Tooltip from 'vue-directive-tooltip';
import 'vue-directive-tooltip/css/index.css';

Vue.use(Tooltip);

Vue.use(VueSweetalert2);

Vue.component(submitBtn)
Vue.component(warningMsg)


Vue.mixin(firePopup);

Vue.config.productionTip = false



new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

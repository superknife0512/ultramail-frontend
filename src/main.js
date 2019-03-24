import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import {Slider} from 'vue-color';
import grapesjs from 'grapesjs';
import Chart from 'chart.js'
// import jquery from 'jquery';

import {firePopup} from './mixins/swalPopup.js'
import Tooltip from 'vue-directive-tooltip';
import 'vue-directive-tooltip/css/index.css';

import submitBtn from './components/button/submitBtn.vue'
import warningMsg from './components/messages/warningMsg.vue'
import expirationMsg from './components/messages/expirationMsg'
import gridLayout from './components/layouts/grid-layout'
import loader from './components/button/loader'

Vue.use(Tooltip);

Vue.use(VueSweetalert2);

Vue.component('submit-btn',submitBtn)
Vue.component('warning-msg', warningMsg)
Vue.component('expiration-msg',expirationMsg)
Vue.component('grid-layout',gridLayout)
Vue.component('slider-picker',Slider)
Vue.component('v-loader',loader)

Object.defineProperty(Vue.prototype, '$grapesjs', {value: grapesjs});
Object.defineProperty(Vue.prototype, '$Chart', {value: Chart});
// Object.defineProperty(Vue.prototype, '$', {value: jquery})

Vue.mixin(firePopup);

Vue.config.productionTip = false



new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

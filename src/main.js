import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lodash from 'lodash';
import Api from "./api/api";

// import * as custom from './utils/filters.js'

// Object.keys(custom).forEach(key => Vue.filter(key, custom[key]))
Vue.config.productionTip = false

//定义成全局组件
Vue.prototype.$store = store;
Vue.prototype.$api = Api;

Vue.prototype.$lodash = lodash
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

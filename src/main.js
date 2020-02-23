import Vue from 'vue';
import App from './App';
import router from './router/index';
import store from './store/index';
import echarts from 'echarts'

import "element-ui/lib/theme-chalk/index.css";
import './plugins/element.js'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  echarts
}).$mount('#app')

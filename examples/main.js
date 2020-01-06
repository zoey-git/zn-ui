import Vue from 'vue'
import App from './App.vue'

import ZnUI from '../packages'
import '../lib/theme-chalk/index.css'

Vue.use(ZnUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

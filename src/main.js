import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'
import scroller from '@/components/Scroller'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg)
})

Vue.component(scroller.name, scroller)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

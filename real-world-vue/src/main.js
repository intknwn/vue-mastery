import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import registerGlobals from './_globals'
import 'nprogress/nprogress.css'
import LocaleDateFilter from './filters/date'

Vue.filter('date', LocaleDateFilter)
Vue.use(Vuelidate)

registerGlobals()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

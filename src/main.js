import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import ElementLocale from 'element-ui/lib/locale'
import elementEnLocale from 'element-ui/lib/locale/lang/en';
import 'element-ui/lib/theme-chalk/index.css'
import VueClipBoard from 'vue-clipboard2';
// import 'default-passive-events'

Vue.config.productionTip = false

Vue.use(ElementUI).use(VueClipBoard)

ElementLocale.use(elementEnLocale);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

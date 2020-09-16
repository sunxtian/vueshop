// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import "../static/js/rem"
import store from "./store"
import filterObj from "./filter"
for(let k in filterObj){
  Vue.filter(k,filterObj[k])
}

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',

  router,
  store,
  components: { App },
  template: '<App/>'
})

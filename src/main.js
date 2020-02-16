// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css';
Vue.use(Share)
Vue.use(resource)
Vue.config.productionTip = false
Vue.http.options.emulateJSON = true
Vue.http.options.withCredentials = true;//解决cookie丢失
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

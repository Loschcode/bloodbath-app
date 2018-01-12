// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'

import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'

Vue.config.productionTip = false

// ActionCable configuration
// NOTE : ActionCable is activated after the log-in
// Please checkout ConnectRouting.vue

// Axios configuration
Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'http://localhost:8000'

// VueCookie configuration
Vue.use(VueCookie)

// User configuration
Vue.prototype.$user = {
  token () {
    return localStorage.getItem('token')
    // return VueCookie.get('token')
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }

  // created () {
  //   axios.interceptors.request.use((config) => {
  //     config.headers.client = window.localStorage.getItem('client')
  //     config.headers['access-token'] = window.localStorage.getItem('access-token')
  //     config.headers.uid = window.localStorage.getItem('uid')
  //     config.headers['token-type'] = window.localStorage.getItem('token-type')
  //
  //     return config
  //   })
  //
  //   axios.interceptors.response.use((response) => {
  //     console.log(response.headers)
  //     // Set user headers only if they are not blank.
  //     // If DTA gets a lot of request quickly, it won't return headers for some requests
  //     // so you need a way to keep headers in localStorage to gettting set to undefined
  //     if (response.headers.client) {
  //       localStorage.setItem('access-token', response.headers['access-token'])
  //       localStorage.setItem('client', response.headers.client)
  //       localStorage.setItem('uid', response.headers.uid)
  //       localStorage.setItem('token-type', response.headers['token-type'])
  //     }
  //     // You have to return the response here or you won't have access to it
  //     // later
  //     return response
  //   })
  // }
})

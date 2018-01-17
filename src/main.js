// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'

import _ from 'lodash'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import VueMeta from 'vue-meta'

// NOTE : to reset users or memory
// just uncomment this line
localStorage.clear()

// Global configuration
Vue.config.productionTip = false

// ActionCable configuration
// Configuration is made on connection
// Because for this project we don't
// any connection out of token

// Axios configuration
Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'http://localhost:8000'

// VueCookie configuration
Vue.use(VueCookie)

// VueMeta
Vue.use(VueMeta)

// User configuration
Vue.prototype.$user = {
  token () {
    return localStorage.getItem('token')
  }
}

// VueRouter
// Vue.use(Router)

// VueMeta
// Vue.use(Meta)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },

  created () {
    axios.interceptors.request.use((config) => {
      /**
       * if the token isn't already present we add it up to the system
       * we also keep the other data by merging the objects
       */
      config.params = _.merge({token: this.$user.token()}, config.params)
      return config
    })

    // axios.interceptors.response.use((response) => {
    //   return response
    // })
  }
})

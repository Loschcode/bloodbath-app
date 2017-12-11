import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Currency from '@/components/Currency'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'

Vue.use(Router)

Vue.router = new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    { path: '/currencies/:currency',
      component: Currency
    }
  ]
})

export default Vue.router

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'http://localhost:8000/'

Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),

  loginData: {url: '/user_token', fetchUser: true}
})

import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Currency from '@/components/Currency'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    { path: '/currencies/:id',
      component: Currency
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Coin from '@/components/Coin'

Vue.use(Router)

Vue.router = new Router({
  routes: [

    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },

    {
      path: '/coins/:coin',
      component: Coin,
      meta: {
        layout: 'layoutDefault'
      }
    }

  ]
})

export default Vue.router

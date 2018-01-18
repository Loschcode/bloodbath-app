import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Coin from '@/components/Coin'

Vue.use(Router)

Vue.router = new Router({
  routes: [

    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/coins/:coinName',
      name: 'coin',
      component: Coin,
      meta: {
        layout: 'layoutDefault'
      }
    }

  ]
})

export default Vue.router

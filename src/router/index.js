import Vue from 'vue'
import Router from 'vue-router'
import Coins from '@/components/Coins'
import Coin from '@/components/Coin'
import Portfolio from '@/components/Portfolio'

Vue.use(Router)

Vue.router = new Router({
  routes: [

    {
      path: '/',
      redirect: { name: 'coins' }
    },

    {
      path: '/coins',
      name: 'coins',
      component: Coins
    },

    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
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

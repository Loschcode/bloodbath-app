import Vue from 'vue'
import Router from 'vue-router'
import Coins from '@/components/Coins'
import CoinsFullWeather from '@/components/CoinsFullWeather'
import Connect from '@/components/Connect'
import Portfolio from '@/components/Portfolio'
import PortfolioFullWeather from '@/components/PortfolioFullWeather'
import Setting from '@/components/Setting'
import Index from '@/components/Index'

Vue.use(Router)

Vue.router = new Router({
  routes: [

    {
      path: '/',
      component: Index
    },

    {
      path: '/watchlist',
      name: 'watchlist',
      component: Coins
    },

    {
      path: '/watchlist/weather',
      name: 'watchlist-weather',
      component: CoinsFullWeather
    },

    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
    },

    {
      path: '/portfolio/weather',
      name: 'portfolio-weather',
      component: PortfolioFullWeather
    },

    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },

    {
      path: '/connect',
      name: 'connect',
      component: Connect
    }

  ]
})

export default Vue.router

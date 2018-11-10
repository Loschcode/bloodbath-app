import Vue from 'vue'
import Router from 'vue-router'
import Watchlist from '@/components/Watchlist'
import WatchlistWeather from '@/components/WatchlistWeather'
import Connect from '@/components/Connect'
import Portfolio from '@/components/Portfolio'
import PortfolioWeather from '@/components/PortfolioWeather'
import Setting from '@/components/Setting'
import Index from '@/components/Index'
import Test from '@/components/Test'

Vue.use(Router)

Vue.router = new Router({
  routes: [
    {
      path: '/test',
      component: Test
    },

    {
      path: '/',
      component: Index
    },

    {
      path: '/watchlist',
      name: 'watchlist',
      component: Watchlist
    },

    {
      path: '/watchlist/weather',
      name: 'watchlist-weather',
      component: WatchlistWeather
    },

    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
    },

    {
      path: '/portfolio/weather',
      name: 'portfolio-weather',
      component: PortfolioWeather
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

import Vue from 'vue'
import Vuex from 'vuex'

import baseCurrencies from './modules/baseCurrencies'
import marketCoins from './modules/marketCoins'
import portfolioCoins from './modules/portfolioCoins'
import userMarketCoins from './modules/userMarketCoins'
import users from './modules/users'
import userSettings from './modules/userSettings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    baseCurrencies,
    marketCoins,
    portfolioCoins,
    userMarketCoins,
    userSettings,
    users
  }
})

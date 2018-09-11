import Vue from 'vue'
import Vuex from 'vuex'

import baseCurrencies from './modules/baseCurrencies'
import marketCoinChannels from './modules/marketCoinChannels'
import marketCoins from './modules/marketCoins'
import portfolio from './modules/portfolio'
import portfolioCoins from './modules/portfolioCoins'
import userMarketCoins from './modules/userMarketCoins'
import users from './modules/users'
import userSettings from './modules/userSettings'
import watchlistCoins from './modules/watchlistCoins'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    baseCurrencies,
    marketCoinChannels,
    marketCoins,
    portfolio,
    portfolioCoins,
    userMarketCoins,
    userSettings,
    users,
    watchlistCoins
  }
})

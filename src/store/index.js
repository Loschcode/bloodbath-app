import Vue from 'vue'
import Vuex from 'vuex'

import baseCurrencies from './modules/baseCurrencies'
import marketCoinChannels from './modules/marketCoinChannels'
import marketCoins from './modules/marketCoins'
import marketWeather from './modules/marketWeather'
import marketWeatherChannel from './modules/marketWeatherChannel'
import portfolioCoins from './modules/portfolioCoins'
import userMarketCoins from './modules/userMarketCoins'
import users from './modules/users'
import userSettings from './modules/userSettings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    baseCurrencies,
    marketCoinChannels,
    marketCoins,
    marketWeather,
    marketWeatherChannel,
    portfolioCoins,
    userMarketCoins,
    userSettings,
    users
  }
})

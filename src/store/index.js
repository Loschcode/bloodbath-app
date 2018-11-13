import Vue from 'vue'
import Vuex from 'vuex'

import VuexORM from '@vuex-orm/core'
import VuexORMGraphQL from '@vuex-orm/plugin-graphql'

import MarketCoin from './models/MarketCoin'
import marketCoins from './modules/marketCoins'

import User from './models/User'
import users from './modules/users'

Vue.use(Vuex)

// Create new instance of Database.
const database = new VuexORM.Database()
const debug = process.env.NODE_ENV !== 'production'
const url = process.env.GRAPHQL_ENDPOINT
const headers = {
  token: localStorage.getItem('userToken')
}
const connectionQueryMode = 'plain'

// Register Model and Module. The First argument is the Model, and
// second is the Module.
database.register(MarketCoin, marketCoins)
database.register(User, users)

VuexORM.use(VuexORMGraphQL, { database, url, debug, headers, connectionQueryMode })

// Create Vuex Store and register database through Vuex ORM.
const store = new Vuex.Store({
  plugins: [VuexORM.install(database)]
})

export default store

// old system
// import baseCurrencies from './modules/baseCurrencies'
// import marketCoinChannels from './modules/marketCoinChannels'
// import marketCoins from './modules/marketCoins'
// import portfolio from './modules/portfolio'
// import portfolioCoins from './modules/portfolioCoins'
// import userMarketCoins from './modules/userMarketCoins'
// import users from './modules/users'
// import userSettings from './modules/userSettings'
// import watchlistCoins from './modules/watchlistCoins'
// end of old system

// export default new Vuex.Store({
//   modules: {
//     baseCurrencies,
//     marketCoinChannels,
//     marketCoins,
//     portfolio,
//     portfolioCoins,
//     userMarketCoins,
//     userSettings,
//     users,
//     watchlistCoins
//   }
// })

import axios from 'axios'
import _ from 'lodash'

function dispatchAllStores (context, data) {
  if (data.market_coin) {
    context.commit('setMarketCoin', data.market_coin)
  }

  if (data.user_market_coin) {
    context.commit('setUserMarketCoin', data.user_market_coin)
  }

  if (data.watchlist_coin) {
    context.commit('setWatchlistCoin', data.watchlist_coin)
  }

  if (data.portfolio_coin) {
    context.commit('setPortfolioCoin', data.portfolio_coin)
  }
}

// initial state
const state = {
  marketCoins: [],
  watchlistCoins: [],
  topCoins: [],

  resultCoins: [],
  resultLoading: false
}

// getters
const getters = {
  getMarketCoins: (state) => state.marketCoins,
  getMarketCoin: (state) => (id) => state.marketCoins.find((item) => item.id === id),
  getMarketCoinByCode: (state) => (code) => state.marketCoins.find((item) => item.code === code),
  getResultCoins: (state) => state.resultCoins,
  getResultLoading: (state) => state.resultLoading
}

// actions
const actions = {
  async fetchMarketCoin (context, params) {
    let response = await axios.get(`coins/${params.id}`)
    dispatchAllStores(context, response.data)
  },

  // TODO : this should be 'SearchCoins'
  async fetchResultCoins (context, query) {
    context.commit('setResultLoading', true)
    let response = await axios.get(`coins/search`, { params: { query: query } })
    context.commit('setResultCoins', response.data)
    context.commit('setResultLoading', false)
    if (response.data) {
      response.data.forEach(function (data, index, object) {
        dispatchAllStores(context, data)
      })
    }
  }
}

// mutations
const mutations = {
  setMarketCoin (state, marketCoin) {
    let current = state.marketCoins.find(entry => entry.id === marketCoin.id)
    if (_.isUndefined(current)) {
      state.marketCoins.push(marketCoin)
    } else {
      let index = state.marketCoins.indexOf(current)
      state.marketCoins.splice(index, 1, marketCoin)
    }
  },

  setTopCoins (state, topCoins) {
    state.topCoins = topCoins
  },

  setResultCoins (state, resultCoins) {
    state.resultCoins = resultCoins
  },

  setResultLoading (state, value) {
    state.resultLoading = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

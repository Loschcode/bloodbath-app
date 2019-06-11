import axios from 'axios'
import _ from 'lodash'

/**
 * We dispatch the data to all important stores
 */
function dispatchAllStores (context, data) {
  /**
   * We set the market coin itself
   */
  context.commit('setMarketCoin', data.market_coin)

  /**
   * If possible we set the user market coin too
   */
  if (data.user_market_coin) {
    context.commit('setUserMarketCoin', data.user_market_coin)
  }

  /**
   * And portfolio coin if available
   */
  if (data.portfolio_coin) {
    context.commit('setPortfolioCoin', data.portfolio_coin)
  }
}

// initial state
const state = {
  marketCoins: [],
  favoriteCoins: [],
  topCoins: [],

  resultCoins: [],
  resultLoading: false
}

// getters
const getters = {
  getMarketCoins: (state) => state.marketCoins,
  getMarketCoin: (state) => (id) => state.marketCoins.find((item) => item.id === id),
  getMarketCoinByCode: (state) => (code) => state.marketCoins.find((item) => item.code === code),

  getFavoriteCoins: (state) => state.favoriteCoins,
  getTopCoins: (state) => state.topCoins,

  getResultCoins: (state) => state.resultCoins,
  getResultLoading: (state) => state.resultLoading,

  getWatchlistWeather (state, getters) {
    var total = 0.0
    var quantity = 0
    let favoriteCoins = getters.getFavoriteCoins

    favoriteCoins.forEach(function (favoriteCoin, index, object) {
      let marketCoin = getters.getMarketCoin(favoriteCoin.market_coin.id)
      if (!_.isNil(marketCoin)) {
        total += marketCoin.price_variation
        quantity++
      }
    })

    if (total === 0.0) {
      return 0
    }

    return total / quantity
  }
}

// actions
const actions = {
  async fetchMarketCoin (context, params) {
    let response = await axios.get(`coins/${params.id}`)
    dispatchAllStores(context, response.data)
  },

  async fetchFavoriteCoins (context) {
    let response = await axios.get(`coins/favorite`)
    context.commit('setFavoriteCoins', response.data)
    if (response.data) {
      response.data.forEach(function (data, index, object) {
        dispatchAllStores(context, data)
      })
    }
  },

  async fetchTopCoins (context) {
    let response = await axios.get(`coins/top`)
    context.commit('setTopCoins', response.data)
    if (response.data) {
      response.data.forEach(function (data, index, object) {
        dispatchAllStores(context, data)
      })
    }
  },

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

  setFavoriteCoins (state, favoriteCoins) {
    state.favoriteCoins = favoriteCoins
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

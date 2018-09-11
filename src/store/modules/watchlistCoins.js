import axios from 'axios'
import _ from 'lodash'

// initial state
const state = {
  watchlistCoins: []
}

// getters
const getters = {
  getWatchlistCoins: (state) => state.watchlistCoins,
  getWatchlistCoin: (state) => (id) => state.watchlistCoins.find((item) => item.id === id),
  getWatchlistCoinByMarketCoin: (state) => (marketCoinId) => state.watchlistCoins.find((item) => item.market_coin_id === marketCoinId)
}

// actions
const actions = {
  async destroyWatchlistCoin (context, params) {
    await axios.delete(`watchlist_coins/${params.id}`)
    context.dispatch('fetchWatchlistCoins')
  },

  async updateWatchlistCoin (context, params) {
    let response = await axios.patch(`watchlist_coins/${params.id}`, { watchlist_coin: params.changeset })
    context.commit('setWatchlistCoin', response.data)
    context.commit('setMarketCoin', response.data.market_coin)
    context.dispatch('subscribeMarketCoinChannel', response.data.market_coin)
    context.dispatch('fetchWatchlistCoins')
  },

  async createWatchlistCoin (context, params) {
    let response = await axios.post(`watchlist_coins`, { watchlist_coin: params.changeset })
    context.commit('setWatchlistCoin', response.data)
  },

  async fetchWatchlistCoins (context) {
    let response = await axios.get(`watchlist_coins`)

    context.commit('cleanWatchlistCoins')
    response.data.forEach(function (watchlistCoin) {
      context.commit('setWatchlistCoin', watchlistCoin)
      context.commit('setMarketCoin', watchlistCoin.market_coin)
      context.dispatch('subscribeMarketCoinChannel', watchlistCoin.market_coin)
    })
  }

}

// mutations
const mutations = {
  cleanWatchlistCoins (state) {
    state.watchlistCoins = []
  },

  setWatchlistCoin (state, watchlistCoin) {
    let current = state.watchlistCoins.find(entry => entry.id === watchlistCoin.id)
    if (_.isUndefined(current)) {
      state.watchlistCoins.push(watchlistCoin)
    } else {
      let index = state.watchlistCoins.indexOf(current)
      state.watchlistCoins.splice(index, 1, watchlistCoin)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

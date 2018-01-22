import axios from 'axios'
import _ from 'lodash'

// initial state
const state = {
  currentChannels: [],

  marketCoins: [],
  favoriteCoins: [],
  topCoins: []
}

// getters
const getters = {
  getMarketCoins: (state) => state.marketCoins,
  getMarketCoin: (state) => (id) => state.marketCoins.find((item) => item.id === id),
  getFavoriteCoins: (state) => state.favoriteCoins,
  getTopCoins: (state) => state.topCoins
}

// actions
const actions = {

  fetchMarketCoin (context, params) {
    return new Promise((resolve, reject) => {
      axios
      .get(`coins/${params.name}`)
      .then(response => {
        context.commit('setMarketCoin', response.data.market_coin)
        context.commit('setUserMarketCoin', response.data.user_market_coin)
        /**
         * We transmit the fixed IDs to the component
         */
        resolve({
          marketCoinId: response.data.market_coin.id,
          userMarketCoinId: response.data.user_market_coin.id
        })
      })
    })
  },

  fetchFavoriteCoins (context) {
    axios
    .get(`coins/favorite`)
    .then(response => {
      context.commit('setFavoriteCoins', response.data.favorite_coins)
    })
  },

  fetchTopCoins (context) {
    console.log('top coin call')
    axios
    .get(`coins/top`)
    .then(response => {
      context.commit('setTopCoins', response.data.top_coins)
    })
  }
}

// mutations
const mutations = {
  setMarketCoin (state, marketCoin) {
    let current = state.marketCoins.find(entry => entry.id === marketCoin.id)
    if (_.isUndefined(current)) {
      state.marketCoins.push(marketCoin)
    } else {
      state.marketCoins.splice(current, 0, marketCoin)
    }
  },

  setFavoriteCoins (state, favoriteCoins) {
    state.favoriteCoins = favoriteCoins
  },

  setTopCoins (state, topCoins) {
    state.topCoins = topCoins
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

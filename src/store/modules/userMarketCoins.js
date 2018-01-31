import axios from 'axios'
import _ from 'lodash'

// initial state
const state = {
  userMarketCoins: []
}

// getters
const getters = {
  getUserMarketCoins: (state) => state.userMarketCoins,
  getUserMarketCoin: (state) => (id) => state.userMarketCoins.find((item) => item.id === id),
  getUserMarketCoinByMarketCoin: (state) => (marketCoinId) => state.userMarketCoins.find((item) => item.market_coin_id === marketCoinId)
}

// actions
const actions = {
  async updateUserMarketCoin (context, params) {
    let response = await axios.patch(`user_market_coins/${params.id}`, { user_market_coin: params.changeset })
    context.commit('setUserMarketCoin', response.data)
    context.dispatch('fetchFavoriteCoins')
    context.dispatch('fetchTopCoins')
  }
}

// mutations
const mutations = {
  setUserMarketCoin (state, userMarketCoin) {
    let current = state.userMarketCoins.find(entry => entry.id === userMarketCoin.id)
    if (_.isUndefined(current)) {
      state.userMarketCoins.push(userMarketCoin)
    } else {
      let index = state.userMarketCoins.indexOf(current)
      state.userMarketCoins.splice(index, 1, userMarketCoin)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

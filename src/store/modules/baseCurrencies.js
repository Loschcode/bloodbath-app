import axios from 'axios'
import _ from 'lodash'

// initial state
const state = {
  baseCurrencies: []
}

// getters
const getters = {
  getBaseCurrencies: (state) => state.baseCurrencies,
  getBaseCurrency: (state) => (id) => state.baseCurrencies.find((item) => item.id === id)
}

// actions
const actions = {
  async fetchBaseCurrencies (context) {
    let response = await axios.get(`base_currencies`)
    context.commit('setBaseCurrencies', response.data.base_currencies)
  }
}

// mutations
const mutations = {
  setBaseCurrencies (state, baseCurrencies) {
    state.baseCurrencies = baseCurrencies
  },

  setBaseCurrency (state, userMarketCoin) {
    let current = state.baseCurrencies.find(entry => entry.id === userMarketCoin.id)
    if (_.isUndefined(current)) {
      state.baseCurrencies.push(userMarketCoin)
    } else {
      let index = state.baseCurrencies.indexOf(current)
      state.baseCurrencies.splice(index, 1, userMarketCoin)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

import axios from 'axios'
import _ from 'lodash'

// initial state
const state = {
  portfolioCoins: []
}

// getters
const getters = {
  getPortfolioCoins: (state) => state.portfolioCoins,
  getPortfolioCoin: (state) => (id) => state.portfolioCoins.find((item) => item.id === id),
  getPortfolioCoinByMarketCoin: (state) => (marketCoinId) => state.portfolioCoins.find((item) => item.market_coin_id === marketCoinId)
}

// actions
const actions = {
  async destroyPortfolioCoin (context, params) {
    await axios.delete(`portfolio_coins/${params.id}`)
    context.dispatch('fetchPortfolioCoins')
  },

  async updatePortfolioCoin (context, params) {
    let response = await axios.patch(`portfolio_coins/${params.id}`, { portfolio_coin: params.changeset })
    context.commit('setPortfolioCoin', response.data)
    context.commit('setMarketCoin', response.data.market_coin)
    context.dispatch('fetchPortfolioCoins')
  },

  async createPortfolioCoin (context, params) {
    let response = await axios.post(`portfolio_coins`, { portfolio_coin: params.changeset })
    context.commit('setPortfolioCoin', response.data)
  },

  async fetchPortfolioCoins (context) {
    let response = await axios.get(`portfolio_coins`)
    context.commit('setPortfolioCoins', response.data)
  }

}

// mutations
const mutations = {
  setPortfolioCoins (state, portfolioCoins) {
    state.portfolioCoins = portfolioCoins
  },

  setPortfolioCoin (state, portfolioCoin) {
    let current = state.portfolioCoins.find(entry => entry.id === portfolioCoin.id)
    if (_.isUndefined(current)) {
      state.portfolioCoins.push(portfolioCoin)
    } else {
      let index = state.portfolioCoins.indexOf(current)
      state.portfolioCoins.splice(index, 1, portfolioCoin)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

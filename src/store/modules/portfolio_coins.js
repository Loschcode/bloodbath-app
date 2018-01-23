import axios from 'axios'
import _ from 'lodash'

// initial state
const state = {
  portfolioCoins: []
}

// getters
const getters = {
  getPortfolioCoins: (state) => state.portfolioCoins,
  getPortfolioCoin: (state) => (id) => state.portfolioCoins.find((item) => item.id === id)
}

// actions
const actions = {
  createPortfolioCoin (context, params) {
    axios
    .post(`portfolio_coins/`, { portfolio_coin: params.changeset })
    .then(
      (response) => {
        context.commit('setPortfolioCoin', response.data.portfolio_coin)
      }
    )
  },

  fetchPortfolioCoins (context) {
    axios
    .get(`portfolio_coins`)
    .then(
      (response) => {
        context.commit('setPortfolioCoins', response.data.portfolio_coins)
      }
    )
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

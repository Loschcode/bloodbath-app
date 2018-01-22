import axios from 'axios'

// initial state
const state = {
  favoriteCoins: [],
  topCoins: []
}

// getters
const getters = {
  getFavoriteCoins: (state) => state.favoriteCoins,
  getTopCoins: (state) => state.topCoins
}

// actions
const actions = {
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

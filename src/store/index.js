import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favoriteCoins: [],
    topCoins: []
  },

  mutations: {
    setFavoriteCoins (state, favoriteCoins) {
      state.favoriteCoins = favoriteCoins
    },

    setTopCoins (state, topCoins) {
      state.topCoins = topCoins
    }
  },

  actions: {
    fetchFavoriteCoins (context) {
      axios
      .get(`coins/favorite`)
      .then(response => {
        context.commit('setFavoriteCoins', response.data.favorite_coins)
      })
    },

    fetchTopCoins (context) {
      axios
      .get(`coins/top`)
      .then(response => {
        context.commit('setTopCoins', response.data.top_coins)
      })
    }
  },

  getters: {
    getFavoriteCoins: (state) => state.favoriteCoins,
    getTopCoins: (state) => state.topCoins
  }
})

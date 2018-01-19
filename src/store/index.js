import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favoriteCoins: []
  },

  mutations: {
    setFavoriteCoins (state, favoriteCoins) {
      state.favoriteCoins = favoriteCoins
    }
  },

  actions: {
    fetchFavoriteCoins (context) {
      axios
      .get(`coins/favorite`)
      .then(response => {
        context.commit('setFavoriteCoins', response.data.favorite_coins)
      })
    }
  },

  getters: {
    getFavoriteCoins: (state) => state.favoriteCoins
  }
})

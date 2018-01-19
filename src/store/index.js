import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import _ from 'lodash'

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
        let mc = _.map(response.data.favorite_coins, 'market_coin')
        console.log(_.map(mc, 'symbol'))

        let uc = _.map(response.data.favorite_coins, 'user_market_coin')
        console.log(_.map(uc, 'id'))

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
  },

  getters: {
    getFavoriteCoins: (state) => state.favoriteCoins,
    getTopCoins: (state) => state.topCoins
  }
})

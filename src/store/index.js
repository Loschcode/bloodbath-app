import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favoriteCoins: [],
    topCoins: [],
    userMarketCoins: []
  },

  mutations: {
    setFavoriteCoins (state, favoriteCoins) {
      state.favoriteCoins = favoriteCoins
    },

    setTopCoins (state, topCoins) {
      state.topCoins = topCoins
    },

    setUserMarketCoin (state, userMarketCoin) {
      console.log('we will change the data of user market coin')
      let current = state.userMarketCoins.find(entry => entry.id === userMarketCoin.id)
      if (_.isUndefined(current)) {
        state.userMarketCoins.push(userMarketCoin)
      } else {
        state.userMarketCoins.splice(current, 0, userMarketCoin)
      }
    }
  },

  actions: {
    updateUserMarketCoin (context, params) {
      axios
      .patch(`user_market_coins/${params.id}`, { user_market_coin: params.changeset })
      .then(
        (response) => {
          console.log(response.data.user_market_coin)
          context.commit('setUserMarketCoin', response.data.user_market_coin)
          context.dispatch('fetchFavoriteCoins')
        }
      )
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
  },

  getters: {
    getFavoriteCoins: (state) => state.favoriteCoins,
    getTopCoins: (state) => state.topCoins,
    getUserMarketCoins: (state) => state.userMarketCoins
  }
})

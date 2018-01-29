import axios from 'axios'
import _ from 'lodash'
import Cable from '@/misc/Cable'

function dispatchAllStores (context, data) {
  /**
   * We set the market coin itself
   */
  context.commit('setMarketCoin', data.market_coin)
  context.dispatch('subscribeMarketCoin', data.market_coin.id)

  /**
   * If possible we set the user market coin too
   */
  if (data.user_market_coin) {
    context.commit('setUserMarketCoin', data.user_market_coin)
  }

  /**
   * And portfolio coin if available
   */
  if (data.portfolio_coin) {
    context.commit('setPortfolioCoin', data.portfolio_coin)
  }
}

// initial state
const state = {
  currentChannels: [],

  marketCoins: [],
  favoriteCoins: [],
  topCoins: [],

  resultCoins: [],
  resultLoading: false
}

// getters
const getters = {
  getMarketCoins: (state) => state.marketCoins,
  getMarketCoin: (state) => (id) => state.marketCoins.find((item) => item.id === id),
  getMarketCoinByCode: (state) => (code) => state.marketCoins.find((item) => item.code === code),

  getFavoriteCoins: (state) => state.favoriteCoins,
  getTopCoins: (state) => state.topCoins,

  getResultCoins: (state) => state.resultCoins,
  getResultLoading: (state) => state.resultLoading
}

// actions
const actions = {
  subscribeMarketCoin (context, params) {
    /**
    * We start the stream
    */
    var channelName = 'MarketCoinChannel'
    var channelId = params.id
    var channel = Cable.cable.subscriptions
    .create(
      { channel: channelName, id: channelId },
      {
        connected (data) {
          console.log(`connected to ${channelName}.${channelId}`)
        },
        received (data) {
          if (data.action === 'show') {
            console.log(`received data from ${channelName}.${channelId}`)
            context.commit('setMarketCoin', data.market_coin)
          }
        }
      }
    )
    context.state.currentChannels.push({id: channelId, channel: channel})
  },

  unsubscribeMarketCoin (context, params) {
    let current = context.state.currentChannels.find(entry => entry.id === params.id)
    if (!_.isNil(current)) {
      current.channel.unsubscribe()
      context.state.currentChannels.splice(current, 1)
      console.log('destroy channel ' + params.id)
    }
  },

  async fetchMarketCoin (context, params) {
    let response = await axios.get(`coins/${params.id}`)
    dispatchAllStores(context, response.data)
  },

  async fetchFavoriteCoins (context) {
    let response = await axios.get(`coins/favorite`)
    context.commit('setFavoriteCoins', response.data.favorite_coins)
    if (response.data.favorte_coins) {
      response.data.favorites_coins.forEach(function (data, index, object) {
        dispatchAllStores(context, data)
      })
    }
  },

  async fetchTopCoins (context) {
    let response = await axios.get(`coins/top`)
    context.commit('setTopCoins', response.data.top_coins)
    if (response.data.top_coins) {
      response.data.top_coins.forEach(function (data, index, object) {
        dispatchAllStores(context, data)
      })
    }
  },

  async fetchResultCoins (context, query) {
    context.commit('setResultLoading', true)
    let response = await axios.get(`coins/search`, { params: { query: query } })
    context.commit('setResultCoins', response.data.result_coins)
    context.commit('setResultLoading', false)
    if (response.data.result_coins) {
      response.data.result_coins.forEach(function (data, index, object) {
        dispatchAllStores(context, data)
      })
    }
  }

}

// mutations
const mutations = {
  setMarketCoin (state, marketCoin) {
    let current = state.marketCoins.find(entry => entry.id === marketCoin.id)
    if (_.isUndefined(current)) {
      state.marketCoins.push(marketCoin)
    } else {
      let index = state.marketCoins.indexOf(current)
      state.marketCoins.splice(index, 1, marketCoin)
    }
  },

  setFavoriteCoins (state, favoriteCoins) {
    state.favoriteCoins = favoriteCoins
  },

  setTopCoins (state, topCoins) {
    state.topCoins = topCoins
  },

  setResultCoins (state, resultCoins) {
    state.resultCoins = resultCoins
  },

  setResultLoading (state, value) {
    state.resultLoading = value
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

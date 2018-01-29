import axios from 'axios'
import _ from 'lodash'
import Cable from '@/misc/Cable'

// initial state
const state = {
  currentChannels: [],

  marketCoins: [],
  favoriteCoins: [],
  topCoins: []
}

// getters
const getters = {
  getMarketCoins: (state) => state.marketCoins,
  getMarketCoin: (state) => (id) => state.marketCoins.find((item) => item.id === id),

  getFavoriteCoins: (state) => state.favoriteCoins,
  getTopCoins: (state) => state.topCoins
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

  fetchMarketCoin (context, params) {
    return new Promise((resolve, reject) => {
      axios
      .get(`coins/${params.id}`)
      .then(response => {
        context.commit('setMarketCoin', response.data.market_coin)
        context.dispatch('subscribeMarketCoin', response.data.market_coin)

        /**
        * We transmit the fixed IDs to the component
        */
        resolve({
          marketCoinId: response.data.market_coin.id,
          userMarketCoinId: response.data.user_market_coin.id
        })
      })
    })
  },

  async fetchFavoriteCoins (context) {
    let response = await axios.get(`coins/favorite`)
    context.commit('setFavoriteCoins', response.data.favorite_coins)
  },

  async fetchTopCoins (context) {
    let response = await axios.get(`coins/top`)
    context.commit('setTopCoins', response.data.top_coins)
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

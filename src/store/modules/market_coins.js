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
  destroyMarketCoin (context, params) {
    let channel = context.state.currentChannels.find(entry => entry.id === params.id)
    channel.unsubscribe()
    context.state.currentChannels.splice(channel, 1)
    console.log('unsubscribe the coin')
  },

  destroyMarketCoins (context, params) {
    context.state.currentChannels.forEach(function (channel, index, object) {
      channel.unsubscribe()
      object.splice(index, 1)
    })
    console.log('unsubscribed all channels')
  },

  fetchMarketCoin (context, params) {
    return new Promise((resolve, reject) => {
      axios
      .get(`coins/${params.id}`)
      .then(response => {
        context.commit('setMarketCoin', response.data.market_coin)
        context.commit('setUserMarketCoin', response.data.user_market_coin)

        /**
        * We start the stream
        */
        var channelName = 'MarketCoinChannel'
        var channelId = response.data.market_coin.id
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

        context.state.currentChannels.push(channel)

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
  setMarketCoin (state, marketCoin) {
    let current = state.marketCoins.find(entry => entry.id === marketCoin.id)
    if (_.isUndefined(current)) {
      state.marketCoins.push(marketCoin)
    } else {
      state.marketCoins.splice(current, 0, marketCoin)
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

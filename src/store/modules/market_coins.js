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
    let current = context.state.currentChannels.find(entry => entry.id === params.id)
    current.channel.unsubscribe()
    context.state.currentChannels.splice(current, 1)
    console.log(context.state.currentChannels)
  },

  destroyMarketCoins (context, params) {
    context.state.currentChannels.forEach(function (current, index, object) {
      current.channel.unsubscribe()
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
        context.dispatch('listenMarketCoin', response.data.market_coin)

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

  listenMarketCoin (context, params) {
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
    console.log(channelId)
    console.log(channel)
    context.state.currentChannels.push({id: channelId, channel: channel})
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

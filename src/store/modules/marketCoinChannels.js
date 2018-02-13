// import _ from 'lodash'
import Cable from '@/misc/Cable'

// initial state
const state = {
  marketCoinChannels: []
}

// getters
const getters = {
  getMarketCoinChannel: (state) => (id) => state.marketCoinChannels.find((item) => item.id === id)
  // getMarketCoinByCode: (state) => (code) => state.marketCoins.find((item) => item.code === code),
}

// actions
const actions = {
  subscribeMarketCoinChannel (context, params) {
    /**
     * If the client has already subscribed to this channel we don't go twice on it
     */
    let existingMarketCoinChannel = context.getters.getMarketCoinChannel(params.id)
    if (existingMarketCoinChannel) {
      console.log('already subscribed to this channel')
      // We double it so when we unsubscribe we are careful about this
      context.commit('setMarketCoinChannel', existingMarketCoinChannel)
      return false
    }

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
            context.commit('setBaseCurrencies', data.base_currencies)
          }
        }
      }
    )

    let marketCoinChannel = {id: channelId, channel: channel}
    context.commit('setMarketCoinChannel', marketCoinChannel)
  },

  unsubscribeMarketCoinChannel (context, params) {
    let marketCoinChannel = context.getters.getMarketCoinChannel(params.id)

    if (marketCoinChannel) {
      context.commit('unsetMarketCoinChannel', marketCoinChannel)

      let left = context.getters.getMarketCoinChannel(params.id)

      if (left) {
        console.log('we cannot unsubscribe, there are other listeners.')
      } else {
        marketCoinChannel.channel.unsubscribe()
        console.log('destroy channel ' + params.id)
      }
    }
  }

}

// mutations
const mutations = {
  unsetMarketCoinChannel (state, marketCoinChannel) {
    let index = state.marketCoinChannels.indexOf(marketCoinChannel)
    state.marketCoinChannels.splice(index, 1)
  },

  /**
   * We don't check if it already exists because it can exist in double in our system
   */
  setMarketCoinChannel (state, marketCoinChannel) {
    state.marketCoinChannels.push(marketCoinChannel)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

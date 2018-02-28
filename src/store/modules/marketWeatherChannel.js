// import _ from 'lodash'
import Cable from '@/misc/Cable'

// initial state
const state = {
  marketWeatherChannel: {}
}

// getters
const getters = {
  getMarketWeatherChannel: (state) => state.marketWeatherChannel
}

// actions
const actions = {
  subscribeMarketWeatherChannel (context, params) {
    /**
     * If the client has already subscribed to this channel we don't go twice on it
     */
    let marketWeatherChannel = context.getters.getMarketWeatherChannel
    if (marketWeatherChannel.length > 0) {
      console.log('already subscribed to this channel')
      // We double it so when we unsubscribe we are careful about this
      context.commit('setMarketWeatherChannel', marketWeatherChannel)
      return false
    }

    /**
    * We start the stream
    */
    var channelName = 'MarketWeatherChannel'
    var channel = Cable.cable.subscriptions
    .create(
      { channel: channelName },
      {
        connected (data) {
          console.log(`connected to ${channelName}`)
        },
        received (data) {
          if (data.action === 'show') {
            console.log(`received data from ${channelName}`)
            console.log(data.market_weather)
            context.commit('setMarketWeather', data.market_weather)
          }
        }
      }
    )

    marketWeatherChannel = {channel: channel}
    context.commit('setMarketWeatherChannel', marketWeatherChannel)
  },

  unsubscribeMarketWeatherChannel (context, params) {
    let marketWeatherChannel = context.getters.getMarketWeatherChannel

    if (marketWeatherChannel) {
      context.commit('unsetMarketWeatherChannel')
      marketWeatherChannel.channel.unsubscribe()
      console.log('destroy channel ' + params.id)
    }
  }
}

// mutations
const mutations = {
  /**
   * We don't check if it already exists because it can exist in double in our system
   */
  setMarketWeatherChannel (state, marketWeatherChannel) {
    state.marketWeatherChannel = marketWeatherChannel
  },

  unsetMarketWeatherChannel (state) {
    state.marketWeatherChannel = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

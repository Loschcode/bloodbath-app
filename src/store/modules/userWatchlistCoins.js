import axios from 'axios'
import _ from 'lodash'
import EventBus from '@/misc/EventBus'

// TODO : this should be regularized and put into something better
/**
* We dispatch the data to all important stores
*/
function dispatchAllStores (context, data) {
  /**
  * We set the market coin itself
  */
  context.commit('setMarketCoin', data.market_coin)

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
  marketCoins: [],
  watchlistCoins: [],
  topCoins: [],

  resultCoins: [],
  resultLoading: false
}

// getters
const getters = {
  getWatchlistCoins: (state) => state.watchlistCoins,
  getWatchlistWeather (state, getters) {
    var total = 0.0
    var quantity = 0
    let watchlistCoins = getters.getWatchlistCoins

    watchlistCoins.forEach(function (watchlistCoin, index, object) {
      let marketCoin = getters.getMarketCoin(watchlistCoin.market_coin.id)
      if (!_.isNil(marketCoin)) {
        total += marketCoin.price_variation
        quantity++
      }
    })

    if (total === 0.0) {
      return 0
    }

    return total / quantity
  }
}

// actions
const actions = {
  async fetchwatchlistCoins (context) {
    try {
      let response = await axios.get(`user_watchlist/`)
      context.commit('setWatchlistCoins', response.data)
      if (response.data) {
        response.data.forEach(function (data, index, object) {
          dispatchAllStores(context, data)
        })
      }
    } catch (error) {
      EventBus.$emit('errorEvent', error.response.data.error)
    }
  }
}

// mutations
const mutations = {
  setWatchlistCoins (state, watchlistCoins) {
    state.watchlistCoins = watchlistCoins
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

import axios from 'axios'

// initial state
const state = {
  marketWeather: 0.0
}

// getters
const getters = {
  getMarketWeather: (state) => state.marketWeather
}

// actions
const actions = {
  async fetchMarketWeather (context, params) {
    let response = await axios.get(`coins/weather`)
    context.commit('setMarketWeather', response.data)
  }
}

// mutations
const mutations = {
  setMarketWeather (state, marketWeather) {
    state.marketWeather = marketWeather
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

// import axios from 'axios'

// initial state
const state = {
  userSetting: {
    primary_market_coin_id: null
  }
}

// getters
const getters = {
  getUserSetting: (state) => () => state.userSetting
}

// actions
const actions = {
}

// mutations
const mutations = {
  setUserSetting (state, userSetting) {
    state.userSetting = userSetting
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

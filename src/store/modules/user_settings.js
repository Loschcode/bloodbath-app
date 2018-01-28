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
  },

  setUserToken (state, token) {
    // we will keep that in-memory even afte refresh
    localStorage.setItem('userToken', token)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

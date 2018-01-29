import axios from 'axios'

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
  async updateUserSetting (context, params) {
    let response = await axios.patch(`user_setting`, { user_setting: params.changeset })
    context.commit('setUserSetting', response.data.user.user_setting)
  }
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

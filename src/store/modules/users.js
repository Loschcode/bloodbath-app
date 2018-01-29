import axios from 'axios'
import _ from 'lodash'

// initial state
const state = {
  // the first state is actually the localStorage
  userToken: localStorage.getItem('userToken'),
  currentUser: {
    email: null,
    role: null
  }
}

// keep a copy to unset
const initialState = _.clone(state)

// getters
const getters = {
  // we don't use the state for this specific entry so we keep the user throughout pages
  getUserToken: (state) => () => state.userToken,
  getCurrentUser: (state) => () => state.currentUser
}

// actions
const actions = {
  async createAnonymousUser (context) {
    let response = await axios.post(`connect/anonymous`)
    context.commit('setUserToken', response.data.token)
  },

  async fetchCurrentUser (context, params) {
    let response = await axios.get(`user`, {params: params})
    context.commit('setUserToken', response.data.user.token)
    context.commit('setCurrentUser', response.data.user)
    context.commit('setUserSetting', response.data.user.user_setting)
    console.log('current user was set.')
  }

}

// mutations
const mutations = {
  setCurrentUser (state, user) {
    state.currentUser = user
  },

  unsetCurrentUser (state) {
    localStorage.clear()
    state.currentUser = initialState.currentUser
    state.userToken = null // we have to manually set it to null because we play with localStorage
  },

  setUserToken (state, token) {
    // we will keep that in-memory even afte refresh
    // this will be used if the user refreshes the page
    // we also set it manually on the state
    localStorage.setItem('userToken', token)
    state.userToken = token
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

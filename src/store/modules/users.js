import axios from 'axios'

// initial state
const state = {
  // the first state is actually the localStorage
  userToken: localStorage.getItem('userToken'),
  currentUser: {
    email: null,
    role: null
  }
}

// getters
const getters = {
  // we don't use the state for this specific entry so we keep the user throughout pages
  getUserToken: (state) => () => state.userToken,
  getCurrentUser: (state) => () => state.currentUser
}

// actions
const actions = {
  signOutCurrentUser (context) {
    context.commit('setCurrentUser', {})
    localStorage.clear()
  },
  createAnonymousUser (context) {
    axios
    .post(`connect/anonymous`)
    .then(
      (response) => {
        context.commit('setUserToken', response.data.token)
      }
    )
  },

  fetchCurrentUser (context, params) {
    axios
    .get(`user`, {params: params})
    .then(
      (response) => {
        context.commit('setUserToken', response.data.user.token)
        context.commit('setCurrentUser', response.data.user)
        context.commit('setUserSetting', response.data.user.user_setting)
        console.log('current user was set.')
      }
    )
  }

}

// mutations
const mutations = {
  setCurrentUser (state, user) {
    state.currentUser = user
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

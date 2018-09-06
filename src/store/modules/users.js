import axios from 'axios'
import _ from 'lodash'
import EventBus from '@/misc/EventBus'

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
  getUserToken: (state) => state.userToken,
  getCurrentUser: (state) => state.currentUser
}

// actions
const actions = {
  async registerUser (context, registerData) {
    try {
      let response = await axios.post(`connect/register`, registerData)
      context.commit('setCurrentUser', response.data)
      window.location.href = '/'
    } catch (error) {
      EventBus.$emit('errorEvent', error.response.data.error)
    }
  },

  async authenticateUser (context, authenticateData) {
    try {
      let response = await axios.post(`connect/authenticate`, authenticateData)
      context.commit('setUserToken', response.data.token)
      context.commit('setCurrentUser', response.data)
      context.commit('setUserSetting', response.data.user_setting)
      window.location.href = '/'
    } catch (error) {
      EventBus.$emit('errorEvent', error.response.data.error)
    }
  },

  async createAnonymousUser (context) {
    try {
      let response = await axios.post(`connect/anonymous`)
      context.commit('setUserToken', response.data.token)
    } catch (error) {
      EventBus.$emit('errorEvent', error.response.data.error)
    }
  },

  async fetchCurrentUser (context, params) {
    try {
      let response = await axios.get(`user`, {params: params})
      context.commit('setUserToken', response.data.token)
      context.commit('setCurrentUser', response.data)
      context.commit('setUserSetting', response.data.user_setting)
      console.log('current user was set.')
    } catch (error) {
      if (error.response.status === 500) {
        // if it's a server crash we don't attempt anything anymore
        EventBus.$emit('crashEvent', {})
      } else {
        EventBus.$emit('rebootEvent', error.response.data.error)
      }
    }
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
